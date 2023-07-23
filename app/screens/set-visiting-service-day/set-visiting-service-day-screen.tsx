import React, { FC, useCallback, useRef, useState } from "react"
import {
  StyleSheet,
  View,
  Switch,
  Text,
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
  PreBol14,
  PreBol16,
  PreBol18,
  PreBol20,
  PreMed14,
  PreMed16,
  PreMed18,
  PreReg14,
  PreReg16,
  Screen,
  TimePicker,
  WeightModal,
} from "#components"
import { BODY, GIVER_CASUAL_NAVY, LBG, LIGHT_LINE } from "#theme"
import { POPPINS_SEMIBOLD } from "#fonts"
import { images } from "#images"
import BottomSheet from "@gorhom/bottom-sheet"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

// Calculate the number of minutes passed since the start of the hour
const now = new Date()
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

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const SetVisitingServiceDayScreen: FC<
  StackScreenProps<NavigatorParamList, "set-visiting-service-day-screen">
> = observer(function SetVisitingServiceDayScreen() {
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => {
    setIsEnabled((prev) => !prev)
  }

  //* 시간선택 - TimePicker
  const [beginDate, setBeginDate] = useState<Date>(nearestPastTime) // `지금 시간으로 부터 가장 가까운 5분단위 과거 시간`으로 초기값 세팅
  const [endDate, setEndDate] = useState<Date>(oneHourLaterFromNearestPastTime) // `"지금 시간으로 부터 가장 가까운 5분단위 과거 시간" 에서 딱 1시간 뒤`로 초기값 세팅
  const [selectedTimeText, selectedSetTimeText] = useState("방문시간을 선택해주세요")
  const [newTime, setNewTime] = useState(false)

  // 시간당 가격 설정 모달 관련 state
  const [priceModalOpen, setPricemodalOpen] = useState(false)
  const [price, setPrice] = useState(null)

  // 시간당 가격 설정 모달 관련 함수
  const handlepriceModalHide = () => {
    setPricemodalOpen(false)
  }

  const handlePriceInput = (newPrice) => {
    setPrice(newPrice)
    // isChangeMade()
  }
  console.log(price)

  // 시간 선택 BottomSheet -> search-screen 참고!
  const bottomSheetRef = useRef<BottomSheet>(null)

  // 시간선택 BottomSheet - callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  const handleBottomSheet = (isOpen) => {
    if (isOpen) {
      bottomSheetRef.current?.expand()
    } else {
      bottomSheetRef.current?.collapse()
    }
  }

  const timeText = (time: Date) => {
    const hours = time.getHours()
    const minute = time.getMinutes()
    return `${hours.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
  }

  const closeBottomSheet = () => {
    const beginDateText = timeText(beginDate)
    const endDateText = timeText(endDate)
    selectedSetTimeText(`${beginDateText} - ${endDateText}`)

    setNewTime(true)
    bottomSheetRef.current?.close()
  }

  console.log(newTime)
  console.log(selectedTimeText)

  // 서비스 시간 : 오전(오후) 08:00 ~ 오전(오후) 03:00
  const ServiceTime = (props) => {
    return (
      <View style={[styles.box, { marginBottom: 12 }]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <PreReg16 text="오전" mr={4} />
          <PopSem16 text={props.startTime} />
          <PreReg16 text="~" mr={10} />
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

  // 저장하기 버튼 클릭시 데이터 POST
  // const onPress = () => {
  //   console.log("데이터 POST")
  // }

  return (
    <Screen testID="SetVisitingServiceDay" style={styles.root}>
      <ScrollView>
        <PreBol20 text="날짜 5개" mb={10} ml={16} />
        <DivisionLine height={8} />

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

        <View style={styles.line} />

        {/* 가능한 서비스 시간대 & 시간 추가하기 */}
        <PreMed18 text="서비스 시간대" mt={16} ml={16} mb={12} />
        <ServiceTime startTime="08:00" endTime="04:00" style={{ marginBottom: 12 }} />
        <ServiceTime startTime="03:00" endTime="05:00" />
        {newTime && (
          <ServiceTime
            startTime={selectedTimeText.slice(0, 5)}
            endTime={selectedTimeText.slice(8, 13)}
          />
        )}
        <Pressable style={styles.boxTwo} onPress={() => handleBottomSheet(true)}>
          <Image style={styles.image} source={images.plus_grey} />
          <PreReg16 text="가능한 시간 추가하기" ml={12} color={BODY} />
        </Pressable>

        <View style={styles.line} />

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
            <PreBol16 text="10,000 원" mr={4} />
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

        {/* //시간당 가격 설정  모달 */}
        <WeightModal
          visibleState={priceModalOpen}
          handleModalHide={handlepriceModalHide}
          title="시간당 받을 요금을 입력해주세요(원)"
          handleInput={handlePriceInput}
        />

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={["80%"]}
          onChange={handleSheetChanges}
          backgroundStyle={$bottomSheetBackgroundStyleForShadow}
          enablePanDownToClose
        >
          <TimePicker
            beginDate={beginDate}
            setBeginDate={setBeginDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />

          <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
            <ConditionalButton label={"확인"} isActivated onPress={closeBottomSheet} />
          </View>
        </BottomSheet>

        {/* 저장하기 버튼 클릭시 데이터 POST */}
        {/* <View
          style={{
            paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
          }}
        >
          <ConditionalButton label="저장하기" isActivated onPress={onPress} />
        </View> */}
      </ScrollView>
    </Screen>
  )
})

const $bottomSheetBackgroundStyleForShadow: ViewStyle = {
  backgroundColor: "white",
  borderRadius: 32,
  elevation: 8,
  shadowColor: "black",
  shadowOffset: {
    width: 2,
    height: 2,
  },
  shadowOpacity: 0.2,
  shadowRadius: 20,
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  servicePossible: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 21,
    marginBottom: 17,
  },
  switch: {
    width: 51,
    height: 31,
  },
  line: {
    height: 2,
    backgroundColor: LBG,
    marginHorizontal: 16,
  },
  box: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: LIGHT_LINE,
    marginHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "white",
    //안드로이드 경우 box-shadow
    elevation: 2,
    alignItems: "center",
  },
  text: {
    fontFamily: POPPINS_SEMIBOLD,
    fontSize: 16,
    textAlign: "center",
    marginRight: 10,
  },
  boxTwo: {
    paddingVertical: 14,
    marginHorizontal: 16,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  dogSizeBox: {
    flexDirection: "row",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: LIGHT_LINE,
    borderRadius: 10,
    justifyContent: "space-between",
    paddingVertical: 18,
    marginHorizontal: 16,
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
