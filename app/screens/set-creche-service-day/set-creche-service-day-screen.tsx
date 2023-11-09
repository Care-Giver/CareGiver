import React, { FC, useLayoutEffect, useMemo, useState } from "react"
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
import { NavigatorParamList, navigate } from "#navigators"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  ConditionalButton,
  DivisionLine,
  PopSem24,
  PreBol16,
  PreBol20,
  PreMed14,
  PreMed16,
  PreMed18,
  PreReg16,
  Screen,
  WeightModal,
} from "#components"
import {
  BODY,
  BOTTOM_HEIGHT,
  DEVICE_SCREEN_WIDTH,
  GIVER_CASUAL_NAVY,
  LBG,
  LIGHT_LINE,
  SUB_HEAD_LINE,
} from "#theme"
import { images } from "#images"
import { createCrecheDate, updateCrecheDate } from "#axios"
import { price as priceFormatter } from "../../utils/format"
import { useKeyboard } from "@react-native-community/hooks"
import {
  CARE_GIVER_COMMISION_RATE,
  PricePerSize,
} from "../set-visiting-service-day/set-visiting-service-day-screen"
import { useStores } from "#models"
import { alertModal } from "../../utils/alert-modal"

export const SetCrecheServiceDayScreen: FC<
  StackScreenProps<NavigatorParamList, "set-creche-service-day-screen">
> = observer(function SetCrecheServiceDayScreen({ route, navigation }) {
  const { selectedDates, crecheId, isAvailableDate, availableDate } = route.params
  const {
    petsitterStore: { hasDogs, petsitter },
  } = useStores()

  // 헤더 타이틀 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      //@ts-ignore
      title: isAvailableDate ? `날짜 별 서비스 수정` : `날짜 별 서비스 등록`,
    })
  }, [isAvailableDate, navigation])

  const [isAvailable, setIsAvailable] = useState(isAvailableDate)
  const toggleSwitch = () => {
    setIsAvailable((prev) => !prev)
  }

  // 시간당 가격 설정하는 modal 관련 state
  // 1박당 가격 설정하기 누르면 모달창 뜨게 관리
  const [priceModalOpen, setPricemodalOpen] = useState(false)
  const [fee, setFee] = useState(availableDate ? availableDate.fee : 0)

  //*가격 모달창에서 모달 창 닫을때 넣어주는 함수
  const handlepriceModalHide = () => {
    setPricemodalOpen(false)
  }

  //*모달창에서 가격 변경시 사용 함수
  const handlePriceInput = (newPrice) => {
    setFee(newPrice)
  }

  const totalPrice = useMemo(() => petsitter.defaultFee + fee, [petsitter.defaultFee, fee])

  const totalPriceExcludeCommission = useMemo(
    () => Math.floor((1 - CARE_GIVER_COMMISION_RATE) * totalPrice),
    [totalPrice],
  )

  const { keyboardShown } = useKeyboard()
  const showSaveButton = !keyboardShown

  const onPressSave = () => {
    console.log(
      "저장하기 버튼이 눌리면, 서비스 수정에 관한 정보들이 POST 되어야 합니다",
      selectedDates,
      fee,
      crecheId,
    )

    // POST
    if (!isAvailableDate) {
      createCrecheDate({
        startDates: selectedDates,
        crecheId,
        fee,
      })
        .then((response) => {
          if (response.isSuccess) {
            navigation.goBack()
          } else {
            alertModal("등록 실패", "잠시 후 다시 시도해주세요.")
          }
        })
        .catch(console.log)
    }
    // PUT
    else {
      updateCrecheDate(availableDate?.id, {
        startDate: selectedDates[0],
        crecheId,
        fee,
      })
        .then((response) => {
          if (response.isSuccess) {
            navigation.goBack()
          } else {
            alertModal("수정 실패", "잠시 후 다시 시도해주세요.")
          }
        })
        .catch(console.log)
    }
  }

  return (
    <Screen testID="SetCrecheServiceDay" style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <PreBol20 text="9월 15일" mb={10} ml={16} />
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
          <Pressable
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              alert("🏗️")
            }}
          >
            <PreMed14 text="평균 요금 알아보기" color={BODY} />
            <Image style={styles.image28} source={images.question_mark} />
          </Pressable>
        </View>

        {/* 1박당 가격 설정 */}
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
                  navigate("cg-registration-2-screen", { from: "set-creche-service-day-screen" })
                }}
              >
                <PreMed16 text="설정하기" mr={4} />
                <Image style={styles.image} source={images.arrow_right} />
              </TouchableOpacity>
            </View>
            <View style={styles.dogSizeBox}>
              <PricePerSize
                size="소형견"
                price={priceFormatter(petsitter?.extraSizeFee?.Small?.toString())}
              />
              <View style={styles.verticalLine} />
              <PricePerSize
                size="중형견"
                price={priceFormatter(petsitter?.extraSizeFee?.Medium?.toString())}
              />
              <View style={styles.verticalLine} />
              <PricePerSize
                size="대형견"
                price={priceFormatter(petsitter?.extraSizeFee?.Large?.toString())}
              />
            </View>
          </>
        )}

        {/* 1박당 받는 총 금액 */}
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

        {/* 1박당 가격 설정  모달 창 */}
        {/* // TODO: WeightModal 대신, CustomInputModal 으로 대체할 것  */}
        {/* // TODO: CustomInputModal 업데이트 필요함 */}
        <WeightModal
          visibleState={priceModalOpen}
          handleModalHide={handlepriceModalHide}
          title="1박당 받을 요금을 입력해주세요(원)"
          handleInput={handlePriceInput}
        />
      </ScrollView>

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
          <ConditionalButton label="저장하기" isActivated onPress={onPressSave} />
        </View>
      )}
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
    paddingHorizontal: 42,
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
