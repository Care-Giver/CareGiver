import React, { FC, useState, useEffect, useRef, useCallback } from "react"
import {
  Image,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
  ViewStyle,
  ScrollView,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Screen,
  Row,
  PreReg14,
  SelectedPetCard,
  ServiceTypeIndicatorHeader,
  PreBol14,
  ConditionalButton,
  RowRoundedButton,
  SelectPetDropdownBox,
  TimePicker,
  BASIC_BACKGROUND_PADDING_WIDTH,
  ClientCalendar,
} from "#components"
import { navigate, NavigatorParamList } from "#navigators"
import {
  IOS_BOTTOM_HOME_BAR_HEIGHT,
  DISABLED,
  HEAD_LINE,
  SUB_HEAD_LINE,
  BOTTOM_HEIGHT,
  LIGHT_LINE,
  GIVER_CASUAL_NAVY,
} from "#theme"
import { images } from "#images"
import { styles } from "./styles"
import { DateData } from "react-native-calendars"
import BottomSheet from "@gorhom/bottom-sheet"
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

type ServiceType = "방문" | "위탁"

interface Location {
  lat: number
  lng: number
}

const 한양대에리카제5공학관 = {
  lat: 37.2955072, // 위도
  lng: 126.83539, // 경도
}

export const SearchScreen: FC<StackScreenProps<NavigatorParamList, "search-screen">> = observer(
  ({ navigation, route }) => {
    //* 서비스 형태
    const [serviceType, setServiceType] = useState<ServiceType>("방문") //? 방뮨 or 위탁
    const [service, setService] = useState(null) //? 팻시팅 or 훈련

    //* 달력 - Calendar
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const [date, setDate] = useState<DateData>(null) //? 선택된 날짜
    const [dateRange, setDateRange] = useState<DateData[]>([]) //? 선택된 날짜 범위

    //* 선택된 반려동물
    const [selectedPets, setSelectedPets] = useState([])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    //* 시간선택 - TimePicker
    const [startTime, setStartTime] = useState<Date>(nearestPastTime) // `지금 시간으로 부터 가장 가까운 5분단위 과거 시간`으로 초기값 세팅
    const [endTime, setEndTime] = useState<Date>(oneHourLaterFromNearestPastTime) // `"지금 시간으로 부터 가장 가까운 5분단위 과거 시간" 에서 딱 1시간 뒤`로 초기값 세팅
    const [selectedTimeText, selectedSetTimeText] = useState("방문시간을 선택해주세요")

    //* 위치선택
    const [location, setLocation] = useState<Location>({ ...한양대에리카제5공학관 })

    // 시간선택 BottomSheet - ref
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
      const beginDateText = timeText(startTime)
      const endDateText = timeText(endTime)
      selectedSetTimeText(`${beginDateText} - ${endDateText}`)

      bottomSheetRef.current?.close()
    }

    useEffect(() => {
      if (!route.params) {
        console.error("params 가 없습니다. 정상적인 screen-flow 인지 확인 바랍니다.")
        if (!route.params.service) console.error("home-screen 에서 service 가 선택되지 않았습니다.")
      }
      //? service 할당
      route.params.service === "펫시팅" ? setService("펫시팅") : setService("훈련")
      //? Header, 이름 설정
      navigation.setOptions({
        title: route.params.service === "펫시팅" ? "펫시팅" : "훈련",
      })
    }, [])

    //? 펫시터 찾기 버튼 활성화 여부 결정
    const hadleIsActivated = () => {
      // 임시로 주석처리함 - 캘린더 도입시 주석해제 해야 함
      // if (!date) return false

      if (serviceType === "방문" && selectedTimeText === "방문시간을 선택해주세요") return false

      if (selectedPets.length === 0) return false

      return true
    }

    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true)
      }
    }

    const hasSelectedPetsAndDropdownClosed = selectedPets.length > 0 && !isDropdownOpen

    const isActivated = hadleIsActivated()

    const calendarButtonText = () => {
      // 방문
      if (serviceType === "방문") {
        return date ? `${date?.dateString?.replace(/-/g, ".")}` : "날짜를 선택해주세요"
      }

      // 위탁
      switch (dateRange.length) {
        case 0:
          return "날짜 범위를 선택해주세요"
        case 1:
          return `${dateRange[0]?.dateString?.replace(/-/g, ".")} ~ `
        case 2:
          return `${dateRange[0]?.dateString?.replace(
            /-/g,
            ".",
          )} ~ ${dateRange[1]?.dateString?.replace(/-/g, ".")}`
      }
    }

    return (
      <Screen testID="SearchScreen" preset="fixed">
        {/* //* 방문 | 위탁 */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Row style={{ marginTop: 12 }}>
            <ServiceTypeIndicatorHeader
              onPress={() => {
                setServiceType("방문")
              }}
              label={"방문"}
              state={serviceType}
            />
            <ServiceTypeIndicatorHeader
              onPress={() => {
                setServiceType("위탁")
              }}
              style={{ marginLeft: 10 }}
              label={"위탁"}
              state={serviceType}
            />
          </Row>
          <Row style={{ marginTop: 16 }}>
            <Image source={images.right_arrow_grey} style={styles.image} />
            <PreReg14
              text={
                serviceType === "방문"
                  ? "케어기버가 직접 당신의 집을 방문합니다. \n날짜와 시간을 선택해주세요."
                  : "케어기버가 있는 곳으로 아이를 맡기러 갑니다. \n날짜 범위를 선택해주세요."
              }
              color={DISABLED}
              style={styles.text}
            />
          </Row>

          {/* //* 날짜 선택 */}
          {/* //? 날짜 선택 버튼 */}
          <RowRoundedButton
            onPress={() => {
              setIsCalendarOpen(!isCalendarOpen)
              LayoutAnimation.configureNext(LayoutAnimation.create(170, "easeOut", "opacity"))
            }}
            image={images.calendar}
            // text={date ? `${date?.dateString?.replace(/-/g, ".")}` : "날짜를 선택해주세요"} // 주의! replaceAll() 은 RN 에서 사용불가 (안드로이드에서 작동 불능 😂) - https://stackoverflow.com/q/69297024/16673541
            text={calendarButtonText()}
            textColor={HEAD_LINE}
            style={{ marginTop: 36 }}
            borderColor={isCalendarOpen ? GIVER_CASUAL_NAVY : LIGHT_LINE}
          />
          {/* 캘린더 */}
          {isCalendarOpen &&
            (serviceType === "방문" ? (
              // 방문 캘린더: 한 개의 날짜만 선택
              <ClientCalendar
                style={{ alignSelf: "center", marginTop: 12 }}
                onDayPress={(date) => {
                  setDate(date)
                  setIsCalendarOpen(false)
                  LayoutAnimation.configureNext(LayoutAnimation.create(170, "easeIn", "opacity"))
                }}
                selectedDate={date ? date.dateString : now.toISOString().substring(0, 10)}
                dateRange={[]} //? 방문인 경우, dateRange 는 사용하지 않음
              />
            ) : (
              // 위탁 캘린더: 날짜 범위(시작일, 종료일)를 선택
              <ClientCalendar
                style={{ alignSelf: "center", marginTop: 12 }}
                onDayPress={(date) => {
                  switch (dateRange.length) {
                    case 0:
                      // 첫번째 날짜 (시작일) 설정
                      setDateRange([date])
                      break
                    case 1:
                      // 두번째 날짜 (종료일) 추가후, 시간순으로 날짜 정렬
                      setDateRange((pre) =>
                        [...pre, date].sort((a, b) => a.timestamp - b.timestamp),
                      )
                      break
                    case 2:
                      // 날짜 초기화후, 선택한 날짜를 새로운 첫번째 날짜(시작일)로 설정
                      setDateRange([date])
                      break
                  }
                }}
                selectedDate={""} //? 위탁 경우, selectedDate 는 사용하지 않음
                dateRange={dateRange}
              />
            ))}

          {/* //* 시간 선택 */}
          {serviceType === "방문" && (
            <RowRoundedButton
              onPress={() => {
                handleBottomSheet(true)
              }}
              image={images.timer}
              text={selectedTimeText}
              style={{ marginTop: 12 }}
            />
          )}

          {/*//* 위치 선택 */}
          <RowRoundedButton
            onPress={() => {
              // navigate("test-map-screen")
              alert("추후, 위치를 선택할 수 있는 화면이 추가될 예정입니다 😉")
            }}
            image={images.location}
            text={"경기도 안산시 상록구 한양대학로 55"}
            textColor={HEAD_LINE}
            style={{ marginTop: 12 }}
          />

          {/*//* 반려동물 선택 */}
          <SelectPetDropdownBox
            style={{ marginTop: 12 }}
            isOpen={isDropdownOpen}
            onPress={() => {
              setIsDropdownOpen(!isDropdownOpen)
              // LayoutAnimation.create(300, "easeInEaseOut", "opacity")
              //? 드롭박스 열고 닫을 때 애니메이션 효과: https://docs.expo.dev/versions/latest/react-native/layoutanimation/ https://reactnative.dev/docs/layoutanimation  https://qcoding.tistory.com/17
              LayoutAnimation.configureNext(LayoutAnimation.create(170, "easeInEaseOut", "opacity"))
            }}
            selectedPets={selectedPets}
            setSelectedPets={setSelectedPets}
          />

          {/*//* 선택된 반려동물 */}
          {hasSelectedPetsAndDropdownClosed && (
            <View>
              <PreBol14
                text="선택된 반려동물"
                color={SUB_HEAD_LINE}
                style={{ marginTop: 18, marginLeft: 16 }}
              />
              <View style={isDropdownOpen ? styles.hidden : styles.shown}>
                {/*//* 선택된 반려동물 리스트 */}

                {selectedPets.map((item, index) => (
                  <SelectedPetCard
                    key={index}
                    petData={item}
                    onPress={() => {
                      setSelectedPets((pets) => pets.filter((pet) => pet.id !== item.id))
                    }}
                  />
                ))}
              </View>
            </View>
          )}

          {/*//* 펫시터 찾기 */}

          <ConditionalButton
            label={service === "펫시팅" ? " 펫시터 찾기" : "훈련사 찾기"}
            isActivated={isActivated}
            style={{
              marginTop: 40,
              marginBottom: Platform.select({
                ios: IOS_BOTTOM_HOME_BAR_HEIGHT,
                android: 0,
              }),
            }}
            onPress={() => {
              //? 펫시터 검색결과 스크린으로 이동
              navigate("search-result-screen", {
                service,
                serviceType,
                // TODO: API 를 통해 받아온 pet 에서 선택한 값들로 변경해야합니다.
                selectedPets: selectedPets.map((item) => {
                  return item.id
                }),

                // "방문"인 경우 사용될 값
                startTime:
                  serviceType === "방문"
                    ? startTime
                        .toISOString()
                        .substring(0, 19)
                        .replace(startTime.toISOString().substring(0, 10), date.dateString) // 날짜만 선택한 "날짜"로 변경 (시/분/초 는 유지)
                    : null,
                endTime:
                  serviceType === "방문"
                    ? endTime
                        .toISOString()
                        .substring(0, 19)
                        .replace(endTime.toISOString().substring(0, 10), date.dateString) // 날짜만 선택한 "날짜"로 변경 (시/분/초 는 유지)
                    : null,

                // "위탁"인 경우 사용될 값
                startDate: serviceType === "위탁" ? `${dateRange[0].dateString}T00:00:00` : null,
                endDate: serviceType === "위탁" ? `${dateRange[1].dateString}T00:00:00` : null,

                // 위치 값
                ...location,
              })
            }}
          />
        </ScrollView>

        {/* 시간 선택 바텀시트 - !항상 컴포넌트 최하단에 있을것! */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={["80%"]}
          onChange={handleSheetChanges}
          backgroundStyle={$bottomSheetBackgroundStyleForShadow}
          enablePanDownToClose
        >
          <TimePicker
            beginDate={startTime}
            setBeginDate={setStartTime}
            endDate={endTime}
            setEndDate={setEndTime}
          />

          <View
            style={{
              paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
              marginBottom: BOTTOM_HEIGHT,
            }}
          >
            <ConditionalButton label={"확인"} isActivated onPress={closeBottomSheet} />
          </View>
        </BottomSheet>
      </Screen>
    )
  },
)

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
