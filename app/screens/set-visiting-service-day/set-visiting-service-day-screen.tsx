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
  StyleSheet,
  View,
  Switch,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  ConditionalButton,
  CustomInputModal,
  DivisionLine,
  PopSem16,
  PopSem24,
  PreBol16,
  PreBol20,
  PreMed14,
  PreMed16,
  PreMed18,
  PreReg14,
  PreReg16,
  Screen,
  TimePicker,
  timeTextAMPM,
} from "#components"
import { BODY, BOTTOM_HEIGHT, GIVER_CASUAL_NAVY, LBG, LIGHT_LINE } from "#theme"
import { images } from "#images"
import { BottomSheetBackdrop, BottomSheetFooter, BottomSheetModal } from "@gorhom/bottom-sheet"
import { addMinutes, isAfter, subMinutes, isEqual } from "date-fns"
import { price as priceFormatter } from "../../utils/format"
import { useStores } from "#models"
import { createVisitingAvailableTime, getAvailableTimesByDate } from "#axios"
import _ from "lodash"
import { alertModal } from "../../utils/alert-modal"
import { useKeyboardShown } from "../../utils/hooks"
import dayjs from "dayjs"

const nowInUTCZero = new Date()
const now = subMinutes(nowInUTCZero, nowInUTCZero.getTimezoneOffset())

// const minutesPassed = now.getMinutes()

// // Calculate how many minutes remain to reach the nearest multiple of 5
// const remainder = minutesPassed % 5
// // 지금 시간으로 부터 가장 가까운 5분단위 과거 시간
// nearestPastTime.setMinutes(minutesPassed - remainder)

// Subtract the remainder from the current minutes to get the nearest past time in 5-minute intervals
// const nearestPastTime = new Date(now)

// 지금 시간으로 부터 가장 가까운 정시
const nearestPastTime = dayjs(new Date(now)).minute(0).second(0).millisecond(0).toDate()

// "지금 시간으로 부터 가장 가까운 5분단위 과거 시간" 에서 딱 1시간 뒤
const oneHourLaterFromNearestPastTime = new Date(nearestPastTime.getTime() + 60 * 60 * 1000)

interface SelectedTimeframe {
  id: number
  beginTime: string
  endTime: string
}

// 서비스 시간 : 오전(오후) 08:00 ~ 오전(오후) 03:00
const ServiceTime = (props) => {
  return (
    <View style={[styles.box, { marginBottom: 12 }]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <PreReg16 text={props.startTimeText.ampm} mr={4} />
        <PopSem16 text={props.startTimeText.time} />
        <PreReg16 text="~" mh={10} />
        <PreReg16 text={props.endTimeText.ampm} mr={4} />
        <PopSem16 text={props.endTimeText.time} />
      </View>
      <Pressable onPress={props.onPress}>
        <Image style={styles.image} source={images.x_grey} />
      </Pressable>
    </View>
  )
}

// 강아지크기별 가격
export const PricePerSize = (props) => {
  return (
    <View>
      <PreReg14 text={props.size} mb={8} color={BODY} style={{ textAlign: "center" }} />
      <PreMed14 text={`+${props.price}원`} style={{ textAlign: "center" }} />
    </View>
  )
}

export const CARE_GIVER_COMMISION_RATE = 0.06 as const

export const SetVisitingServiceDayScreen: FC<
  StackScreenProps<NavigatorParamList, "set-visiting-service-day-screen">
> = observer(function SetVisitingServiceDayScreen({ route, navigation }) {
  const { selectedDates, visitingId, isAvailableDate } = route.params
  const 날짜 =
    selectedDates?.length === 1
      ? selectedDates[0].slice(5).replace("-", "월 ") + "일"
      : `날짜 ${selectedDates?.length}개`
  const {
    petsitterStore: { serviceType, serviceTypeKorean, hasPetsitterProfile, hasDogs, petsitter },
  } = useStores()
  // console.log("petsitter", petsitter)
  console.log("isAvailableDate", isAvailableDate)

  const [isActivated, setIsActivated] = useState(true)

  // 헤더 타이틀 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      //@ts-ignore
      title: isAvailableDate ? `날짜 별 서비스 수정` : `날짜 별 서비스 등록`,
    })
  }, [isAvailableDate, navigation])

  useEffect(() => {
    if (isAvailableDate) {
      getAvailableTimesByDate({ visitingId: petsitter.id, date: selectedDates[0] }).then((res) =>
        setSelectedTimeframes(
          _.sortBy(
            res.map((item) => ({
              beginTime: item.startTime,
              endTime: addMinutes(new Date(item.startTime), 60).toISOString(),
              id: item.id,
            })),
            ["beginTime"],
          ),
        ),
      )
    }
  }, [isAvailableDate, petsitter.id, selectedDates])

  const [isAvailable, setIsAvailable] = useState(isAvailableDate)
  const toggleSwitch = () => {
    setIsAvailable((prev) => !prev)
  }

  // 시간당 가격 설정 모달 관련 state
  const [priceModalOpen, setPricemodalOpen] = useState(false)
  const [fee, setFee] = useState(0)

  // 시간당 가격 설정 모달 관련 함수
  const handlepriceModalHide = () => {
    setPricemodalOpen(false)
  }

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

  //* 시간선택 - TimePicker
  const [beginDate, setBeginDate] = useState<Date>(nearestPastTime) // `지금 시간으로 부터 가장 가까운 5분단위 과거 시간`으로 초기값 세팅
  const [endDate, setEndDate] = useState<Date>(oneHourLaterFromNearestPastTime) // `"지금 시간으로 부터 가장 가까운 5분단위 과거 시간" 에서 딱 1시간 뒤`로 초기값 세팅
  const [selectedTimeframes, setSelectedTimeframes] = useState<SelectedTimeframe[]>([])
  console.log("selectedTimeframes", selectedTimeframes)

  const checkIsValidTimeframe = useCallback((sorted: SelectedTimeframe[]) => {
    console.log("sorted", sorted)

    let isValid = false
    if (sorted.length === 1) {
      isValid = true
    } else {
      for (let index = 0; index < sorted.length; index++) {
        if (index === sorted.length - 1) {
          isValid = true
          break
        }

        const curr = sorted[index]
        const next = sorted[index + 1]
        if (!isAfter(new Date(next.beginTime), new Date(curr.endTime))) {
          if (isEqual(new Date(next.beginTime), new Date(curr.endTime))) {
            isValid = true
            break
          }

          isValid = false
          break
        }
      }
    }
    return isValid
  }, [])

  // 저장하기 버튼 클릭시 데이터 POST
  const onPressSave = () => {
    const sorted: SelectedTimeframe[] = _.sortBy(selectedTimeframes, ["beginTime"])
    const isValid = checkIsValidTimeframe(sorted)
    console.log("🔷 isValid", isValid)
    if (!isValid) {
      alertModal("시간대 겹침", "올바른 서비스 시간대가 아닙니다.")
      return
    }

    if (!isAvailableDate) {
      Promise.all(
        selectedDates.map((dateItem) =>
          selectedTimeframes.forEach((tiemItem) =>
            createVisitingAvailableTime({
              startTime: dateItem.slice(0, 10) + tiemItem.beginTime.slice(10, 19),
              endTime: dateItem.slice(0, 10) + tiemItem.endTime.slice(10, 19),
              visitingId,
              fee: fee,
            }),
          ),
        ),
      )
        .then((response) => {
          // console.log("response >>>", response)
          setIsActivated(false)
          setTimeout(() => {
            navigation.goBack()
            setIsActivated(true)
          }, 1000)
        })
        .catch(console.log)
    } else {
      alertModal("개발중", "🏗️ 수정 기능은 개발중입니다.")
    }
  }

  // 시간선택 바텀시트모달 - ref -> search-screen 참고!
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // 시간선택 바텀시트모달 - snapPoints
  const snapPoints = useMemo(() => ["60%"], [])

  /** 시간선택 바텀시트모달 backdrop */
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

  /** 시간선택 바텀시트모달 Footer - 확인 버튼 클릭시 작동 */
  const closeBottomSheet = useCallback(() => {
    setSelectedTimeframes(
      _.sortBy(
        [
          ...selectedTimeframes,
          {
            id: Math.random(),
            beginTime: beginDate.toISOString(),
            endTime: endDate.toISOString(),
          },
        ],
        ["beginTime"],
      ),
    )
    bottomSheetModalRef.current?.close()
  }, [beginDate, endDate, selectedTimeframes])

  /** 시간선택 바텀시트모달 Footer - 확인 버튼 렌더링 */
  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={BOTTOM_HEIGHT} style={styles.btnContainer}>
        <ConditionalButton label={"확인"} isActivated onPress={closeBottomSheet} />
      </BottomSheetFooter>
    ),
    [closeBottomSheet],
  )

  const keyboardShown = useKeyboardShown()
  const showSaveButton = !keyboardShown

  return (
    <Screen testID="SetVisitingServiceDay" style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <PreBol20 text={날짜} mt={20} mb={10} mh={BASIC_BACKGROUND_PADDING_WIDTH} />
        <DivisionLine height={8} color={LIGHT_LINE} />

        {/* 서비스 가능 토글 영역 */}
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

        {/* 가능한 서비스 시간대 & 시간 추가하기 */}
        <View style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}>
          <DivisionLine height={2} color={LBG} />
          <PreMed18 text="서비스 시간대" mt={16} mb={12} />
          {selectedTimeframes.length > 0 &&
            selectedTimeframes.map((item) => {
              // const beginDateText = timeText(beginDate)
              // const endDateText = timeText(endDate)
              return (
                <ServiceTime
                  key={item.id}
                  startTimeText={timeTextAMPM(new Date(item.beginTime))}
                  endTimeText={timeTextAMPM(new Date(item.endTime))}
                  onPress={() => {
                    setSelectedTimeframes(
                      _.sortBy(
                        selectedTimeframes.filter((fItem) => fItem.id !== item.id),
                        ["beginTime"],
                      ),
                    )
                  }}
                />
              )
            })}
          <TouchableOpacity
            style={styles.boxTwo}
            onPress={() => {
              if (!isAvailable) {
                alertModal("서비스 가능 토글", "서비스 가능 여부를 먼저 정해주세요.")
                return
              }

              bottomSheetModalRef.current?.present()
            }}
          >
            <Image style={styles.image} source={images.plus_grey} />
            <PreReg16 text="가능한 시간 추가하기" ml={12} color={BODY} />
          </TouchableOpacity>
          <DivisionLine height={2} color={LBG} />
        </View>

        {/* 서비스 요금 설정 시작 */}
        <View style={[styles.rowText, { marginTop: 20 }]}>
          <PreMed18 text="서비스 요금 설정" />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <PreMed14 text="평균 요금 알아보기" mr={4} color={BODY} />
            <Image style={styles.image} source={images.more_info_bigger} />
          </View>
        </View>

        {/* 서비스 요금 설정 - 시간당 요금 설정 */}
        <View style={[styles.rowText, { marginTop: 25 }]}>
          <PreReg16 text="시간 당" />
          <Pressable
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => setPricemodalOpen(true)}
          >
            <PreBol16 text={`${priceFormatter(totalPrice.toString())} 원`} mr={4} />
            <Image style={styles.image} source={images.arrow_right} />
          </Pressable>
        </View>

        {/* 서비스 요금 설정 - 강아지별 크기 추가 요금 설정 */}
        {hasDogs && (
          <>
            <View style={[styles.rowText, { marginTop: 18, marginBottom: 10 }]}>
              <PreReg16 text="강아지 크기 별 추가 요금" />
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => {
                  navigate("cg-registration-2-screen", { from: "set-visiting-service-day-screen" })
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

        {/* 시간당 받는 총 금액 */}
        <View style={styles.totalPriceBox}>
          <View>
            <PreBol16 text="내가 시간당 받는 총 금액" mb={4} />
            <PreReg16 text="(수수료 포함)" color={BODY} />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <PopSem24
              text={priceFormatter(totalPriceExcludeCommission.toString())}
              color={GIVER_CASUAL_NAVY}
            />
            <PreBol16 text="원" ml={2} />
          </View>
        </View>
      </ScrollView>

      {/* 저장하기 버튼 클릭시 데이터 POST */}
      <View
        style={{
          width: "100%",
          paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
          position: "absolute",
          bottom: BOTTOM_HEIGHT,
        }}
      >
        <ConditionalButton label="저장하기" isActivated={isActivated} onPress={onPressSave} />
      </View>

      {/* 시간당 가격 설정  모달 */}
      <CustomInputModal
        visibleState={priceModalOpen}
        handleModalHide={handlepriceModalHide}
        title="1박당 받을 요금을 입력해주세요(원)"
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

      {/* 시간 선택 바텀시트모달 - !항상 컴포넌트 최하단에 있을것! */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        footerComponent={renderFooter}
      >
        <TimePicker
          style={{ marginTop: 20 }}
          beginDate={beginDate}
          setBeginDate={setBeginDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
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
  box: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: LIGHT_LINE,
    borderRadius: 10,
    backgroundColor: "white",
    //안드로이드 경우 box-shadow
    elevation: 2,
    alignItems: "center",
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: BASIC_BACKGROUND_PADDING_WIDTH,
    right: BASIC_BACKGROUND_PADDING_WIDTH,
  },
  boxTwo: {
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: LIGHT_LINE,
    borderRadius: 10,
    marginBottom: 28,
    flexDirection: "row",
  },
  rowText: {
    paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    marginTop: 20,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: LBG,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 16,
    height: 16,
  },
})
