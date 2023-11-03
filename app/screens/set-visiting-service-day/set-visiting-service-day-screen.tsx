import React, { FC, useCallback, useMemo, useRef, useState } from "react"
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
import { NavigatorParamList } from "#navigators"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  ConditionalButton,
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
  WeightModal,
  timeText,
} from "#components"
import { BODY, BOTTOM_HEIGHT, GIVER_CASUAL_NAVY, LBG, LIGHT_LINE } from "#theme"
import { images } from "#images"
import { BottomSheetBackdrop, BottomSheetFooter, BottomSheetModal } from "@gorhom/bottom-sheet"
import { addMinutes } from "date-fns"
import { price as numberStringToPrice } from "../../utils/format"
import { useKeyboard } from "@react-native-community/hooks"

const nowInUTCZero = new Date()
const now = addMinutes(nowInUTCZero, -1 * nowInUTCZero.getTimezoneOffset())

const minutesPassed = now.getMinutes()

// Calculate how many minutes remain to reach the nearest multiple of 5
const remainder = minutesPassed % 5

// Subtract the remainder from the current minutes to get the nearest past time in 5-minute intervals
const nearestPastTime = new Date(now)

// 지금 시간으로 부터 가장 가까운 5분단위 과거 시간
nearestPastTime.setMinutes(minutesPassed - remainder)
// console.log(nearestPastTime)

// "지금 시간으로 부터 가장 가까운 5분단위 과거 시간" 에서 딱 1시간 뒤
const oneHourLaterFromNearestPastTime = new Date(nearestPastTime.getTime() + 60 * 60 * 1000)

export const SetVisitingServiceDayScreen: FC<
  StackScreenProps<NavigatorParamList, "set-visiting-service-day-screen">
> = observer(function SetVisitingServiceDayScreen({ route }) {
  const { selectedDates: date, visitingId } = route.params

  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => {
    setIsEnabled((prev) => !prev)
  }

  // 시간당 가격 설정 모달 관련 state
  const [priceModalOpen, setPricemodalOpen] = useState(false)
  const [price, setPrice] = useState(0)

  // 시간당 가격 설정 모달 관련 함수
  const handlepriceModalHide = () => {
    setPricemodalOpen(false)
  }

  const handlePriceInput = (newPrice) => {
    setPrice(newPrice)
    // isChangeMade()
  }
  console.log(price)

  //* 시간선택 - TimePicker
  const [beginDate, setBeginDate] = useState<Date>(nearestPastTime) // `지금 시간으로 부터 가장 가까운 5분단위 과거 시간`으로 초기값 세팅
  const [endDate, setEndDate] = useState<Date>(oneHourLaterFromNearestPastTime) // `"지금 시간으로 부터 가장 가까운 5분단위 과거 시간" 에서 딱 1시간 뒤`로 초기값 세팅
  const [selectedTimeText, selectedSetTimeText] = useState("방문시간을 선택해주세요")
  const [newTime, setNewTime] = useState(false)

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
    const beginDateText = timeText(beginDate)
    const endDateText = timeText(endDate)
    selectedSetTimeText(`${beginDateText} - ${endDateText}`)
    setNewTime(true)
    bottomSheetModalRef.current?.close()
  }, [beginDate, endDate])

  /** 시간선택 바텀시트모달 Footer - 확인 버튼 렌더링 */
  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={BOTTOM_HEIGHT} style={styles.btnContainer}>
        <ConditionalButton label={"확인"} isActivated onPress={closeBottomSheet} />
      </BottomSheetFooter>
    ),
    [closeBottomSheet],
  )

  console.log(newTime)
  console.log(selectedTimeText)

  // 서비스 시간 : 오전(오후) 08:00 ~ 오전(오후) 03:00
  const ServiceTime = (props) => {
    return (
      <View style={[styles.box, { marginBottom: 12 }]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <PreReg16 text="오전" mr={4} />
          <PopSem16 text={props.startTime} />
          <PreReg16 text="~" mh={10} />
          <PreReg16 text="오후" mr={4} />
          <PopSem16 text={props.endTime} />
        </View>
        <Image style={styles.image} source={images.x_grey} />
      </View>
    )
  }

  // 강아지크기별 가격
  const PricePerSize = (props) => {
    return (
      <View>
        <PreReg14 text={props.size} mb={8} color={BODY} style={{ textAlign: "center" }} />
        <PreMed14 text={`+${props.price}원`} style={{ textAlign: "center" }} />
      </View>
    )
  }

  const { keyboardShown } = useKeyboard()
  const showSaveButton = !keyboardShown

  // 저장하기 버튼 클릭시 데이터 POST
  // const onPress = () => {
  //   console.log("데이터 POST")
  // }

  return (
    <Screen testID="SetVisitingServiceDay" style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <PreBol20 text="날짜 5개" mt={20} mb={10} mh={BASIC_BACKGROUND_PADDING_WIDTH} />
        <DivisionLine height={8} color={LIGHT_LINE} />

        {/* 서비스 가능 토글 영역 */}
        <View style={styles.servicePossible}>
          <PreMed18 text="서비스 가능" />
          <Switch
            trackColor={{ false: LIGHT_LINE, true: GIVER_CASUAL_NAVY }}
            thumbColor={isEnabled ? "white" : "white"}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={styles.switch}
          />
        </View>

        {/* 가능한 서비스 시간대 & 시간 추가하기 */}
        <View style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}>
          <DivisionLine height={2} color={LBG} />
          <PreMed18 text="서비스 시간대" mt={16} mb={12} />
          <ServiceTime startTime="08:00" endTime="04:00" style={{ marginBottom: 12 }} />
          <ServiceTime startTime="03:00" endTime="05:00" />
          {newTime && (
            <ServiceTime
              startTime={selectedTimeText.slice(0, 5)}
              endTime={selectedTimeText.slice(8, 13)}
            />
          )}
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
            <PreMed14 text="평균 요금 알아보기" mr={4} />
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
            <PreBol16 text={`${numberStringToPrice(price?.toString())} 원`} mr={4} />
            <Image style={styles.image} source={images.arrow_right} />
          </Pressable>
        </View>

        {/* 서비스 요금 설정 - 강아지별 크기 추가 요금 설정 */}
        <View style={[styles.rowText, { marginTop: 18, marginBottom: 10 }]}>
          <PreReg16 text="강아지 크기 별 추가 요금" />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <PreMed16 text="설정하기" mr={4} />
            <Image style={styles.image} source={images.arrow_right} />
          </View>
        </View>
        <View style={styles.dogSizeBox}>
          <PricePerSize size="소형견" price="0" />
          <View style={styles.verticalLine} />
          <PricePerSize size="중형견" price="1000" />
          <View style={styles.verticalLine} />
          <PricePerSize size="대형견" price="2000" />
        </View>

        {/* 시간당 받는 총 금액 */}
        <View style={styles.totalPriceBox}>
          <View>
            <PreBol16 text="내가 시간당 받는 총 금액" mb={4} />
            <PreReg16 text="(수수료 포함)" color={BODY} />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <PopSem24 text="9400" color={GIVER_CASUAL_NAVY} />
            <PreBol16 text="원" ml={2} />
          </View>
        </View>

        {/* 시간당 가격 설정  모달 */}
        {/* // TODO: WeightModal 대신, CustomInputModal 으로 대체할 것  */}
        {/* // TODO: CustomInputModal 업데이트 필요함 */}
        <WeightModal
          visibleState={priceModalOpen}
          handleModalHide={handlepriceModalHide}
          title="시간당 받을 요금을 입력해주세요(원)"
          handleInput={handlePriceInput}
        />

        {/* 저장하기 버튼 클릭시 데이터 POST */}
        {/* <View
          style={{
            paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
          }}
        >
          <ConditionalButton label="저장하기" isActivated onPress={onPress} />
        </View> */}
      </ScrollView>

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
    marginHorizontal: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: LBG,
    marginTop: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 16,
    height: 16,
  },
})
