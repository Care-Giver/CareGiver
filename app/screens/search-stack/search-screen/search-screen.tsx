import React, { FC, useState, useLayoutEffect, useRef, useCallback, useEffect } from "react"
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
  ScreenRootView,
  Row,
  PreReg14,
  SelectedPetCard,
  ServiceTypeIndicatorHeader,
  PreBol14,
  ConditionalButton,
  RowRoundedButton,
  SelectPetDropdownBox,
  TimePicker,
  ServiceType,
} from "#components"
import { navigate, NavigatorParamList } from "#navigators"
import { IOS_BOTTOM_HOME_BAR_HEIGHT, DISABLED, HEAD_LINE, SUB_HEAD_LINE } from "#theme"
import { images } from "#images"
import { styles } from "./styles"
import { Calendar, DateData } from "react-native-calendars"
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

export const SearchScreen: FC<StackScreenProps<NavigatorParamList, "search-screen">> = observer(
  ({ navigation, route }) => {
    //* 서비스 형태
    const [serviceType, setServiceType] = useState<ServiceType>("방문") //? 방뮨 or 위탁
    const [service, setService] = useState(null) //? 팻시팅 or 훈련

    //* 달력 - Calendar
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const [date, setDate] = useState<DateData>() //? 선택된 날짜

    //* 선택된 반려동물
    const [selectedPets, setSelectedPets] = useState([])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    //* 시간선택 - TimePicker
    const [beginDate, setBeginDate] = useState<Date>(nearestPastTime) // `지금 시간으로 부터 가장 가까운 5분단위 과거 시간`으로 초기값 세팅
    const [endDate, setEndDate] = useState<Date>(oneHourLaterFromNearestPastTime) // `"지금 시간으로 부터 가장 가까운 5분단위 과거 시간" 에서 딱 1시간 뒤`로 초기값 세팅
    const [selectedTimeText, selectedSetTimeText] = useState("방문시간을 선택해주세요")

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
      const beginDateText = timeText(beginDate)
      const endDateText = timeText(endDate)
      selectedSetTimeText(`${beginDateText} - ${endDateText}`)

      bottomSheetRef.current?.close()
    }

    //! useLayoutEffect 과 useEffect 의 차이: https://merrily-code.tistory.com/46
    useLayoutEffect(() => {
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
      if (!date) return false

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

    return (
      <ScreenRootView testID="SearchScreen" preset="fixed">
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
                  ? "케어기버가 직접 집을 방문합니다."
                  : "케어기버가 있는 곳으로 아이를 맡기러 갑니다."
              }
              color={DISABLED}
              style={styles.text}
            />
          </Row>

          {/* //* 날짜 선택 */}
          {!isCalendarOpen ? (
            <RowRoundedButton
              onPress={() => {
                setIsCalendarOpen(true)
                LayoutAnimation.configureNext(LayoutAnimation.create(170, "easeOut", "opacity"))
              }}
              image={images.calendar}
              text={
                date
                  ? `${date.dateString.replace("-", ".").replace("-", ".")}`
                  : "날짜를 선택해주세요"
              }
              textColor={HEAD_LINE}
              style={{ marginTop: 36 }}
            />
          ) : (
            //? 캘린더 표출
            <Calendar
              onDayPress={(date) => {
                setIsCalendarOpen(!isCalendarOpen)
                setDate(date)
                LayoutAnimation.configureNext(LayoutAnimation.create(170, "easeIn", "opacity"))
              }}
              style={{
                marginTop: 36,
                backgroundColor: "#F0F0F6",
                padding: 4,
                borderRadius: 8,
              }}
              // Collection of dates that have to be marked. Default = {}
              markedDates={
                {
                  // _time: { selected: true, marked: true, selectedColor: "red" },
                  // "2022-06-16": { selected: true, marked: true, selectedColor: "orange" },
                  // "2022-06-24": { selected: true, marked: true, selectedColor: "green" },
                }
              }
            />
          )}

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
              navigate("search-result", {
                service: service,
                serviceType: serviceType,
                //TODO "위탁"인 경우 사용될 값입니다. cg-calendar로 바뀌면 startDate, endDate로 나눠져 들어가야합니다. 우선 한 값만 선택할 수 있기 때문에 selectedDate로만 넘깁니다.
                selectedDate: date,
                selectedPets: selectedPets.map((item) => {
                  return item.id
                }),
                //? "방문"인 경우 사용될 값
                beginDate: serviceType == "방문" ? beginDate.toISOString().substring(0, 19) : null,
                endDate: serviceType == "방문" ? endDate.toISOString().substring(0, 19) : null,
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
            beginDate={beginDate}
            setBeginDate={setBeginDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />

          <View style={{ paddingHorizontal: 16, marginBottom: 20 }}>
            <ConditionalButton label={"확인"} isActivated onPress={closeBottomSheet} />
          </View>
        </BottomSheet>
      </ScreenRootView>
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
