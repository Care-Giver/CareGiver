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
import { price as priceFormatter } from "../../../utils/format"
import { useStores } from "#models"
import {
  VisitingAvailableTime,
  createVisitingAvailableTime,
  deleteVisitingAvailableTime,
  disableVisitingAvailableTime,
  getAvailableTimesByDate,
  restoreVisitingAvailableTime,
  updateVisitingAvailableTime,
} from "#axios"
import _, { isDate } from "lodash"
import { alertModal } from "../../../utils/alert-modal"
import { useKeyboardShown } from "../../../utils/hooks"
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

interface Timeframe {
  selected: SelectedTimeframe[]
  deleted: SelectedTimeframe[]
  added: SelectedTimeframe[]
}
interface SelectedTimeframe {
  id: number //! 프론트에서 추가한 id 는 float 이고, API 를 통해 DB 에서 가져온 id 는 integer 입니다.
  beginTime: VisitingAvailableTime["startTime"]
  endTime: string
  isBooked: VisitingAvailableTime["isBooked"]
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
  const { selectedDates, visitingId, isAvailableDate, isDeleted } = route.params
  const 날짜 =
    selectedDates?.length === 1
      ? selectedDates[0].slice(5).replace("-", "월 ") + "일"
      : `날짜 ${selectedDates?.length}개`
  const {
    petsitterStore: { serviceType, serviceTypeKorean, hasPetsitterProfile, hasDogs, petsitter },
  } = useStores()

  const [beginDate, setBeginDate] = useState<Date>(nearestPastTime) // 시간선택 - TimePicker: `지금 시간으로 부터 가장 가까운 5분단위 과거 시간`으로 초기값 세팅
  const [endDate, setEndDate] = useState<Date>(oneHourLaterFromNearestPastTime) // 시간선택 - TimePicker: `"지금 시간으로 부터 가장 가까운 5분단위 과거 시간" 에서 딱 1시간 뒤`로 초기값 세팅
  const [previousSelectedTimeframes, setPreviousSelectedTimeframes] = useState<SelectedTimeframe[]>(
    [],
  )
  const [timeframe, setTimeframe] = useState<Timeframe>({
    selected: [],
    deleted: [],
    added: [],
  })
  const isInitiallyCreating = _.isEqual(timeframe.added, timeframe.selected) && !isAvailableDate
  const [isAvailable, setIsAvailable] = useState(isDeleted ? false : isAvailableDate)
  const [isSaveButtonActivated, setIsSaveButtonActivated] = useState(false)

  // console.log("previousSelectedTimeframes ", previousSelectedTimeframes)
  // console.log("selectedDates", selectedDates)
  console.log("isDeleted 🔷", isDeleted)
  // console.log("isAvailableDate", isAvailableDate)
  // console.log("timeframe 🔷", timeframe)🔷
  // console.log(_.isEqual(timeframe.added, timeframe.selected))
  // console.log("isPOST", isPOST)

  // 헤더 타이틀 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      //@ts-ignore
      title: selectedDates?.length === 1 ? `날짜 별 서비스 수정` : `날짜 별 서비스 등록`,
    })
  }, [selectedDates, navigation])

  // 최초 렌더링시, availableTimes 객체 호출
  useEffect(() => {
    getAvailableTimesByDate({ visitingId: petsitter.id, date: selectedDates[0] }).then((res) => {
      const sorted = _.uniqBy(
        _.sortBy(
          res.map((item) => ({
            beginTime: item.startTime,
            endTime: addMinutes(new Date(item.startTime), 60).toISOString(),
            isBooked: item.isBooked,
            id: item.id,
          })),
          ["beginTime"],
        ),
        "beginTime",
      )
      setPreviousSelectedTimeframes(sorted)
      setTimeframe((timeframe) => ({
        ...timeframe,
        selected: sorted,
      }))
    })
  }, [petsitter.id, selectedDates])

  // 서비스 가능 활성화 핸들링
  useEffect(() => {
    if (isDeleted) {
      setIsAvailable(false)
    } else {
      setIsAvailable(timeframe.selected.length !== 0)
    }
  }, [timeframe.selected.length, isDeleted])

  // 저장하기 버튼 활성화 핸들링
  useEffect(() => {
    if (isInitiallyCreating && !isAvailable) {
      setIsSaveButtonActivated(false)
      return
    }

    console.log("isDeleted, isAvailable, isAvailableDate", isDeleted, isAvailable, isAvailableDate)
    if (isDeleted && isAvailable) {
      setIsSaveButtonActivated(true)
    } else {
      setIsSaveButtonActivated(
        (previousSelectedTimeframes.length === 0 && timeframe.selected.length !== 0) ||
          (previousSelectedTimeframes.length !== 0 &&
            previousSelectedTimeframes !== timeframe.selected) ||
          (isAvailableDate && !isAvailable) ||
          (!isAvailableDate && isAvailable),
      )
    }
  }, [isAvailable, isAvailableDate, isInitiallyCreating, previousSelectedTimeframes, timeframe.selected, isDeleted])

  const toggleSwitch = () => {
    if (isDeleted) {
      setIsAvailable((prev) => !prev)
      return
    }
    if (!isAvailable && timeframe.selected.length === 0) {
      alertModal("시간대를 선택해주세요", "선택된 시간대가 없습니다.")
      return
    }
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

  const checkIsValidTimeframe = useCallback((selected: SelectedTimeframe[]) => {
    const sorted: SelectedTimeframe[] = _.uniqBy(_.sortBy(selected, ["beginTime"]), "beginTime")

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

  /**
   * 1시간 간격으로 잘라서 ISOString 생성
   * @param beginTime "2023-12-09T08:00:00.000Z"
   * @param endTime "2023-12-09T13:00:00.000Z"
   * @returns ["2023-12-09T08:00:00.000Z", "2023-12-09T09:00:00.000Z", "2023-12-09T10:00:00.000Z", "2023-12-09T11:00:00.000Z", "2023-12-09T12:00:00.000Z"]
   */
  function create1HourISOStringFrom(beginTime: string, endTime: string) {
    const resultArray = []

    // Parse the timestamps into Date objects
    const startTime = new Date(beginTime)
    const endTimeObj = new Date(endTime)
    if (!isDate(startTime) || !isDate(endTimeObj)) {
      return []
    }

    // eslint-disable-next-line no-unmodified-loop-condition
    while (startTime < endTimeObj) {
      resultArray.push(startTime.toISOString())
      startTime.setHours(startTime.getHours() + 1)
    }

    return resultArray
  }

  // 서비스 시간대 삭제버튼 클릭시 작동
  const onPressDelete = (item: SelectedTimeframe) => {
    if (item.isBooked) {
      alertModal(
        "예약이 진행중인 시간대 입니다.",
        "예약 진행중에는 서비스 시간대를 수정할 수 없습니다.",
      )
      return
    }

    setTimeframe({
      selected: _.uniqBy(
        _.sortBy(
          timeframe.selected.filter((fItem) => fItem.id !== item.id),
          ["beginTime"],
        ),
        "beginTime",
      ),
      added: _.uniqBy(
        _.sortBy(
          timeframe.added.filter((fItem) => fItem.beginTime !== item.beginTime), //! DO NOT CHANGE THIS
          ["beginTime"],
        ),
        "beginTime",
      ),
      deleted: _.uniqBy(_.sortBy([...timeframe.deleted, item], ["beginTime"]), "beginTime"),
    })
  }

  // 저장하기 버튼 클릭시 데이터 POST 또는 DELETE
  const onPressSave = () => {
    //! 비활성화되어 있었다면, 활성화
    if (isDeleted && isAvailable) {
      restoreVisitingAvailableTime({
        visitingId,
        date: selectedDates[0],
      }).then(({ isSuccess }) => {
        if (isSuccess) {
          setIsSaveButtonActivated(false)
          setTimeout(() => {
            navigation.goBack()
            setIsSaveButtonActivated(true)
          }, 1000)
        } else {
          alertModal("활성화 실패", "예상치 못한 문제가 발생했습니다. 잠시후 다시 시도해주세요.")
        }
      })
      return
    }

    const isValid = checkIsValidTimeframe(timeframe.selected)
    console.log("🔷 isValid", isValid)
    if (!isValid) {
      alertModal("올바른 서비스 시간대가 아닙니다", "이미 선택한 서비스 시간대와 겹침니다.")
      return
    }

    // 처음 생성 시나리오
    if (isInitiallyCreating) {
      Promise.all(
        selectedDates.map((dateItem) =>
          timeframe.selected.forEach((tiemItem) =>
            createVisitingAvailableTime({
              startTime: dateItem.slice(0, 10) + tiemItem.beginTime.slice(10, 19),
              endTime: dateItem.slice(0, 10) + tiemItem.endTime.slice(10, 19),
              visitingId,
              fee: fee,
            }),
          ),
        ),
      ).then(() => {
        setIsSaveButtonActivated(false)
        setTimeout(() => {
          navigation.goBack()
          setIsSaveButtonActivated(true)
        }, 1000)
      })
    }
    // 수정 시나리오
    else {
      const added = timeframe.added
      const hasAdded = added.length !== 0
      const trulyDeleted = timeframe.deleted.filter((v) => _.isSafeInteger(v.id))
      const hasTrulyDeleted = trulyDeleted.length !== 0

      // 시간대 추가 OR 삭제
      if (hasAdded || hasTrulyDeleted) {
        updateVisitingAvailableTime(visitingId, {
          add: create1HourISOStringFrom(added[0]?.beginTime, added[0]?.endTime),
          delete: trulyDeleted.map((v) => v.beginTime),
        })
      }

      // 비활성화
      if (isAvailableDate && !isAvailable) {
        disableVisitingAvailableTime({
          visitingId,
          date: selectedDates[0],
        })
      }

      setIsSaveButtonActivated(false)
      setTimeout(() => {
        navigation.goBack()
        setIsSaveButtonActivated(true)
      }, 1000)
    }
  }

  /** 시간선택 "확인 버튼" */
  const onPressTimePickerConfirm = useCallback(() => {
    const newTimeframe: SelectedTimeframe = {
      id: (Math.random() + 1) / 10, //! 0 과 1 사이 랜덤 float
      beginTime: selectedDates[0].slice(0, 10) + beginDate.toISOString().slice(10),
      endTime: selectedDates[0].slice(0, 10) + endDate.toISOString().slice(10),
      isBooked: false,
    }

    // 시간대 검증
    const isValid = checkIsValidTimeframe([...timeframe.selected, newTimeframe])
    console.log("🔷 isValid", isValid)
    if (!isValid) {
      alertModal("올바른 서비스 시간대가 아닙니다", "이미 선택한 서비스 시간대와 겹침니다.")
      return
    }

    // 통과시;
    setTimeframe({
      ...timeframe,
      selected: _.uniqBy(
        _.sortBy([...timeframe.selected, newTimeframe], ["beginTime"]),
        "beginTime",
      ),
      added: _.uniqBy(_.sortBy([...timeframe.added, newTimeframe], ["beginTime"]), "beginTime"),
    })
    bottomSheetModalRef.current?.close()
  }, [beginDate, checkIsValidTimeframe, endDate, selectedDates, timeframe])

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ["60%"], [])
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
  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={BOTTOM_HEIGHT} style={styles.btnContainer}>
        <ConditionalButton label={"확인"} isActivated onPress={onPressTimePickerConfirm} />
      </BottomSheetFooter>
    ),
    [onPressTimePickerConfirm],
  )

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
            value={isAvailable}
            onValueChange={toggleSwitch}
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
            {/* 가능한 서비스 시간대 & 시간 추가하기 */}
            <View style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}>
              <DivisionLine height={2} color={LBG} />
              <PreMed18 text="서비스 시간대" mt={16} mb={12} />
              {timeframe.selected.length > 0 &&
                timeframe.selected.map((item) => {
                  return (
                    <ServiceTime
                      key={item.id}
                      startTimeText={timeTextAMPM(new Date(item.beginTime))}
                      endTimeText={timeTextAMPM(new Date(item.endTime))}
                      onPress={() => {
                        onPressDelete(item)
                      }}
                    />
                  )
                })}
              <TouchableOpacity
                style={styles.boxTwo}
                onPress={() => {
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
                      //@ts-ignore
                      navigate("CgMypage", {
                        screen: "cg-registration-2-screen",
                        params: { from: "set-visiting-service-day-screen" },
                      })
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
          </View>
        )}
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
        <ConditionalButton
          label="저장하기"
          isActivated={isSaveButtonActivated}
          onPress={onPressSave}
        />
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
