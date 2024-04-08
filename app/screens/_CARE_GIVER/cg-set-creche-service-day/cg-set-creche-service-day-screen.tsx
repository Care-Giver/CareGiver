import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  ScrollView,
  StyleSheet,
  View,
  Switch,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  CheckerInput,
  ConditionalButton,
  CustomInputModal,
  DivisionLine,
  PopSem24,
  PreBol16,
  PreBol18,
  PreBol20,
  PreMed14,
  PreMed16,
  PreMed18,
  PreReg16,
  Screen,
} from "#components"
import {
  BODY,
  BOTTOM_HEIGHT,
  DEVICE_SCREEN_WIDTH,
  GIVER_CASUAL_NAVY,
  HEAD_LINE,
  LBG,
  LIGHT_LINE,
  SUB_HEAD_LINE,
} from "#theme"
import { images } from "#images"
import {
  createCrecheDate,
  disableCrecheDate,
  restoreCrecheDate,
  updateCreche,
  updateCrecheDate,
} from "#api"
import { price as priceFormatter } from "../../../utils/format"
import {
  CARE_GIVER_COMMISION_RATE,
  PricePerSize,
} from "../cg-set-visiting-service-day/cg-set-visiting-service-day-screen"
import { useStores } from "#models"
import { alertModal } from "../../../utils/alert-modal"
import _ from "lodash"
import { useKeyboardShown } from "../../../utils/hooks"
import { useFetchAvgPrice } from "../cg-registration-2/use-fetch-avg-price"
import { BottomSheetBackdrop, BottomSheetFooter, BottomSheetModal } from "@gorhom/bottom-sheet"
import { STANDARD_PRICE_DESC_TEXT } from "../cg-registration-2/cg-set-price"
import { useAdditionalPriceChecker } from "../cg-set-visiting-service-day/use-additional-price-checker"
import {
  ExtraSizeFee,
  HandleType,
} from "../../../services/api/types/creches.visitings.common.types"

export const CgSetCrecheServiceDayScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-set-creche-service-day-screen">
> = observer(function CgSetCrecheServiceDayScreen({ route, navigation }) {
  const { selectedDates, crecheId, isAvailableDate, availableDate, isDeleted } = route.params
  const 날짜 =
    selectedDates?.length === 1
      ? selectedDates[0].slice(5).replace("-", "월 ") + "일"
      : `날짜 ${selectedDates?.length}개`
  const {
    petsitterStore: { hasDogs, petsitter, setCrechePetsitter },
  } = useStores()
  console.log("isDeleted 🔷", isDeleted)

  const [isAvailable, setIsAvailable] = useState(isAvailableDate)
  const [isSaveButtonActivated, setIsSaveButtonActivated] = useState(false)

  // 헤더 타이틀 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      //@ts-ignore
      title: isAvailableDate ? `날짜 별 서비스 수정` : `날짜 별 서비스 등록`,
    })
  }, [isAvailableDate, navigation])

  // 저장하기 버튼 활성화 핸들링
  useEffect(() => {
    setIsSaveButtonActivated(
      (isAvailableDate && !isAvailable) ||
        (!isAvailableDate && isAvailable) ||
        (availableDate ? fee !== availableDate.fee : false),
    )
  }, [availableDate, fee, isAvailable, isAvailableDate])

  const toggleSwitch = () => {
    setIsAvailable((prev) => !prev)
  }

  // 시간당 가격 설정하는 modal 관련 state
  // 1박 당 가격 설정하기 누르면 모달창 뜨게 관리
  const [priceModalOpen, setPricemodalOpen] = useState(false)
  const [fee, setFee] = useState(availableDate ? availableDate.fee : 0)

  //*가격 모달창에서 모달 창 닫을때 넣어주는 함수
  const handlepriceModalHide = () => {
    setPricemodalOpen(false)
  }

  //*모달창에서 가격 변경시 사용 함수
  const handlePriceInput = (newPrice) => {
    let fee = Number(newPrice)
    if (_.isNaN(fee)) {
      fee = 0
    }
    setFee(fee)
  }

  const totalPrice = useMemo(() => petsitter.defaultFee + fee, [petsitter.defaultFee, fee])

  const totalPriceExcludeCommission = useMemo(
    () => Math.floor((1 - CARE_GIVER_COMMISION_RATE) * totalPrice),
    [totalPrice],
  )

  const keyboardShown = useKeyboardShown()
  const showSaveButton = !keyboardShown

  const onPressSave = () => {
    // console.log(
    //   "저장하기 버튼이 눌리면, 서비스 수정에 관한 정보들이 POST 되어야 합니다",
    //   selectedDates,
    //   fee,
    //   crecheId,
    // )

    // 처음 생성 시나리오
    if (!isAvailableDate) {
      if (!isAvailable) {
        alertModal("서비스 가능 토글", "서비스 가능 여부를 먼저 정해주세요.")
        return
      }

      createCrecheDate({
        startDates: selectedDates,
        crecheId,
        fee,
      })
        .then((response) => {
          if (response.isSuccess) {
            setIsSaveButtonActivated(false)
            setTimeout(() => {
              navigation.goBack()
              setIsSaveButtonActivated(true)
            }, 1000)
          } else {
            alertModal("등록 실패", "잠시 후 다시 시도해주세요.")
          }
        })
        .catch(console.log)
    }
    // 수정 혹은 삭제 시나리오
    else {
      // 비활성화 (SOFT DELETE)
      // TODO: disableCrecheDate() response 수정 필요함 - 백엔드 API 업데이트 대기중
      if (!isDeleted && !isAvailable) {
        disableCrecheDate({
          crecheId,
          date: selectedDates[0],
        }).then((res) => {
          if (res.isSuccess) {
            setIsSaveButtonActivated(false)
            setTimeout(() => {
              navigation.goBack()
              setIsSaveButtonActivated(true)
            }, 1000)
          } else {
            alertModal(
              "비활성화 실패",
              "예상치 못한 문제가 발생했습니다. 잠시후 다시 시도해주세요.",
            )
          }
        })
        return
      }

      // 비활성화 해제 (SOFT RESTORE)
      if (isDeleted && isAvailable) {
        restoreCrecheDate({
          crecheId,
          date: selectedDates[0],
        }).then((res) => {
          if (res.isSuccess) {
            setIsSaveButtonActivated(false)
            setTimeout(() => {
              navigation.goBack()
              setIsSaveButtonActivated(true)
            }, 1000)
          } else {
            alertModal("활성화 실패", "예상치 못한 문제가 발생했습니다. 잠시후 다시 시도해주세요.")
          }
        })
      }

      // UPDATE
      updateCrecheDate(availableDate?.id, {
        startDate: selectedDates[0],
        crecheId,
        fee,
      })
        .then((res) => {
          if (res.isSuccess) {
            setIsSaveButtonActivated(false)
            setTimeout(() => {
              navigation.goBack()
              setIsSaveButtonActivated(true)
            }, 1000)
          } else {
            alertModal("수정 실패", "잠시 후 다시 시도해주세요.")
          }
        })
        .catch(console.log)
    }
  }

  // 이 지역 평균 기본 요금
  const avgPriceData = useFetchAvgPrice("위탁")
  // 이 지역 평균 요금 바텀시트
  const standardPriceBottomSheetModalRef = useRef<BottomSheetModal>(null)
  const standardPriceBottomSheetModalFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={BOTTOM_HEIGHT}>
        <ConditionalButton
          label={"확인"}
          isActivated
          onPress={() => {
            standardPriceBottomSheetModalRef.current?.close()
          }}
        />
      </BottomSheetFooter>
    ),
    [],
  )
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0} // backdrop이 등장할 때의 snap point -> snap point가 0이면 backdrop 나타남
        disappearsOnIndex={-1} // backdrop이 사라질 때의 snap point -> snap point가 -1이면 backdrop 사라짐
        pressBehavior={"close"}
      />
    ),
    [],
  )

  // 강아지 크기 별 추가 요금
  const [checker, setChecker, hasChanges] = useAdditionalPriceChecker(petsitter)
  // 깅아지 크기 별 추가 요금 바텀시트
  const additionalPriceBottomSheetModalRef = useRef<BottomSheetModal>(null)
  const additionalPriceBottomSheetModalFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={BOTTOM_HEIGHT}>
        <ConditionalButton
          label={"확인"}
          isActivated={hasChanges}
          onPress={() => {
            const data = {
              handleType: checker.filter((v) => v.isChecked).map((v) => v.handleType),
              extraSizeFee: _.reduce(
                checker,
                function (obj, param) {
                  obj[param.handleType] = param.addtionalPrice
                  return obj
                },
                {},
              ) as ExtraSizeFee,
            }
            // 방문 펫시터 업데이트
            updateCreche(petsitter.id, data).then(({ isSuccess, creche, reason }) => {
              if (isSuccess) {
                // MST 업데이트
                setCrechePetsitter(creche)
              } else {
                alertModal(`강아지 크기 별 추가 요금 업데이트 실패`, `${reason}`)
              }
            })
            additionalPriceBottomSheetModalRef.current?.close()
          }}
        />
      </BottomSheetFooter>
    ),
    [checker, hasChanges, petsitter.id, setCrechePetsitter],
  )

  return (
    <Screen testID="SetCrecheServiceDay" style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <PreBol20 text={날짜} mt={20} mb={10} mh={BASIC_BACKGROUND_PADDING_WIDTH} />
        <DivisionLine height={8} color={LIGHT_LINE} />

        {/* 서비스 가능 여부 토글 버튼 */}
        <View style={styles.servicePossible}>
          <PreMed18 text="서비스 가능" />
          <Switch
            trackColor={{ false: LIGHT_LINE, true: GIVER_CASUAL_NAVY }}
            thumbColor={isAvailable ? "white" : "white"}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isAvailable}
            style={styles.switch}
          />
        </View>

        {isDeleted ? (
          <View
            style={{
              paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
              paddingVertical: 20,
              alignItems: "center",
            }}
          >
            <PreBol20 text="비활성화된 날짜입니다." />
            <PreMed14 text="서비스 가능 토글을 활성화 해주세요." mt={12} />
          </View>
        ) : (
          <View>
            <DivisionLine
              height={2}
              color={LBG}
              style={{
                width: DEVICE_SCREEN_WIDTH - 2 * BASIC_BACKGROUND_PADDING_WIDTH,
                alignSelf: "center",
              }}
            />

            {/* 서비스 요금 설정 , 평균 요금 알아보기 클릭시 bottom sheet 오픈*/}
            <View style={[styles.rowText, { marginTop: 20 }]}>
              <PreMed18 text="서비스 요금 설정" />
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => {
                  standardPriceBottomSheetModalRef.current?.present()
                }}
              >
                <PreMed14 text="평균 요금 알아보기" color={BODY} />
                <Image style={styles.image28} source={images.question_mark} />
              </TouchableOpacity>
            </View>

            {/* 1박 당 가격 설정 */}
            <View style={[styles.rowText, { marginTop: 25 }]}>
              <PreReg16 text="1박 당" color={SUB_HEAD_LINE} />
              <Pressable
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => setPricemodalOpen(true)}
              >
                <PreBol16 text={`${priceFormatter(totalPrice?.toString())} 원`} mr={4} />
                <Image style={styles.image} source={images.arrow_right} />
              </Pressable>
            </View>

            {/* 강아지 크기별 추가요금 설정 */}
            {hasDogs && (
              <>
                <View style={[styles.rowText, { marginTop: 18, marginBottom: 10 }]}>
                  <PreReg16 text="강아지 크기 별 추가 요금" color={SUB_HEAD_LINE} />
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => {
                      additionalPriceBottomSheetModalRef.current?.present()
                    }}
                  >
                    <PreMed16 text="설정하기" mr={4} />
                    <Image style={styles.image} source={images.arrow_right} />
                  </TouchableOpacity>
                </View>
                <View style={styles.dogSizeBox}>
                  <PricePerSize
                    style={{ flex: 1 }}
                    size="소형견"
                    priceText={
                      _.includes(petsitter?.handleType, HandleType.SMALL)
                        ? `+${priceFormatter(petsitter?.extraSizeFee?.Small?.toString())}원`
                        : "-"
                    }
                  />
                  <View style={styles.verticalLine} />
                  <PricePerSize
                    style={{ flex: 1 }}
                    size="중형견"
                    priceText={
                      _.includes(petsitter?.handleType, HandleType.MEDIUM)
                        ? `+${priceFormatter(petsitter?.extraSizeFee?.Medium?.toString())}원`
                        : "-"
                    }
                  />
                  <View style={styles.verticalLine} />
                  <PricePerSize
                    style={{ flex: 1 }}
                    size="대형견"
                    priceText={
                      _.includes(petsitter?.handleType, HandleType.LARGE)
                        ? `+${priceFormatter(petsitter?.extraSizeFee?.Large?.toString())}원`
                        : "-"
                    }
                  />
                </View>
              </>
            )}

            {/* 1박 당 받는 총 금액 */}
            <View style={styles.totalPriceBox}>
              <View>
                <PreBol16 text="내가 1박 당 받는 총 금액" mb={4} />
                <PreReg16 text="(수수료 포함)" color={BODY} />
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <Text style={styles.totalPrice}>84,600</Text> */}
                <PopSem24
                  text={priceFormatter(totalPriceExcludeCommission.toString())}
                  color={GIVER_CASUAL_NAVY}
                />
                <PreBol16 text="원" ml={2} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* 1박 당 가격 설정  모달 창 */}
      <CustomInputModal
        visibleState={priceModalOpen}
        handleModalHide={handlepriceModalHide}
        title="1박 당 받을 요금을 입력해주세요(원)"
        placeholderInput={`기본요금 ${priceFormatter(
          petsitter.defaultFee.toString(),
        )}원에 더해집니다.`}
        handleInput={handlePriceInput}
        textInputProps={{
          keyboardType: "number-pad",
        }}
        rules={{
          required: true,
          pattern: {
            value: /^[0-9]+$/,
            message: "숫자만 입력해주세요.",
          },
        }}
      />

      {/* 저장하기 버튼 클릭시 데이터 POST */}
      {showSaveButton && (
        <View
          style={{
            position: "absolute",
            bottom: BOTTOM_HEIGHT,
            left: BASIC_BACKGROUND_PADDING_WIDTH,
            right: BASIC_BACKGROUND_PADDING_WIDTH,
          }}
        >
          <ConditionalButton
            label="저장하기"
            isActivated={isSaveButtonActivated}
            onPress={onPressSave}
          />
        </View>
      )}

      {/* 이 지역 평균 요금 바텀시트모달 */}
      <BottomSheetModal
        ref={standardPriceBottomSheetModalRef}
        backdropComponent={renderBackdrop}
        index={0}
        snapPoints={["60%"]}
        enablePanDownToClose
        footerComponent={standardPriceBottomSheetModalFooter}
        style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}
      >
        <View style={{ paddingTop: 20 }}>
          <PreBol18 text={`이 지역 위탁 케어기버가 받는 평균 요금은?`} color={GIVER_CASUAL_NAVY} />
          <PreReg16 mt={32} text="이 지역에서 서비스하는 케어기버 분들은 보통" color={HEAD_LINE} />
          {/* // ? 적정가 범위 */}
          <PreBol16
            mv={6}
            text={`${
              avgPriceData ? priceFormatter(avgPriceData.minAvgPrice.toString()) : "?0,000"
            }원 ~ ${
              avgPriceData ? priceFormatter(avgPriceData.maxAvgPrice.toString()) : "?0,000"
            }원`}
            color={SUB_HEAD_LINE}
          />
          <PreReg16 text="사이의 요금을 받습니다." color={HEAD_LINE} />
          <PreReg16
            style={{ marginTop: 16, lineHeight: 22 }}
            text={STANDARD_PRICE_DESC_TEXT}
            color={BODY}
          />
        </View>
      </BottomSheetModal>

      {/* 깅아지 크기 별 추가 요금 바텀시트 바텀시트모달 */}
      <BottomSheetModal
        ref={additionalPriceBottomSheetModalRef}
        backdropComponent={renderBackdrop}
        index={0}
        snapPoints={["60%"]}
        keyboardBehavior="fillParent"
        enablePanDownToClose
        footerComponent={additionalPriceBottomSheetModalFooter}
        style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}
      >
        <View style={{ paddingTop: 20 }}>
          <PreBol18 text={"강아지 크기 별 추가 요금을 설정해주세요."} color={HEAD_LINE} />
          {_.sortBy(checker, "priority").map((item, _) => (
            <CheckerInput
              label={item.label}
              isChecked={item.isChecked}
              onCheckPress={() => {
                setChecker([
                  { ...item, isChecked: !item.isChecked },
                  ...checker.filter((compare) => compare.priority !== item.priority),
                ])
              }}
              input={priceFormatter(item.addtionalPrice.toString())}
              setInput={(text) => {
                setChecker([
                  { ...item, addtionalPrice: Number(text.replace(/,/g, "")) },
                  ...checker.filter((compare) => compare.priority !== item.priority),
                ])
              }}
              textInputProps={{
                keyboardType: "number-pad",
                returnKeyType: "done",
              }}
              style={{ marginTop: 20 }}
              inBottomSheet={true}
              key={item.priority}
            />
          ))}
        </View>
      </BottomSheetModal>
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 0,
  },
  contentContainerStyle: {
    paddingBottom: 100,
    // backgroundColor: "orange",
  },
  servicePossible: {
    paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 21,
    marginBottom: 17,
  },
  switch: {
    width: 51,
    height: 31,
  },
  rowText: {
    paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 16,
    height: 16,
  },
  image28: {
    width: 28,
    height: 28,
  },
  dogSizeBox: {
    marginHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
    flexDirection: "row",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: LIGHT_LINE,
    borderRadius: 10,
    justifyContent: "space-between",
    paddingVertical: 18,
  },
  verticalLine: {
    width: 2,
    backgroundColor: LIGHT_LINE,
    height: "100%",
  },
  totalPriceBox: {
    marginHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: LBG,
    marginTop: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
})
