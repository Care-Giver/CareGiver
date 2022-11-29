import React, { FC, useState, useLayoutEffect, useEffect } from "react"
import { FlatList, Image, View, LayoutAnimation, Platform, UIManager } from "react-native"
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
  RowRoundedTimeIntervalPicker,
  PreReg16,
  BASIC_BACKGROUND_PADDING,
  BASIC_BACKGROUND_PADDING_WIDTH,
} from "#components"
import { navigate, NavigatorParamList } from "#navigators"
import {
  HEIGHT,
  IOS_BOTTOM_HOME_BAR_HEIGHT,
  WIDTH,
  DISABLED,
  HEAD_LINE,
  LBG,
  SUB_HEAD_LINE,
  LIGHT_LINE,
  NAV_BUTTON_BOTTOM_PADDING,
} from "#theme"
import { images } from "#images"
import { styles } from "./styles"
import { Calendar } from "react-native-calendars"
import { Picker } from "@react-native-picker/picker"
import { ScrollView } from "react-native-gesture-handler"

const timeOptions = [
  "00:00",
  "00:15",
  "00:30",
  "00:45",
  "01:00",
  "01:15",
  "01:30",
  "01:45",
  "02:00",
  "02:15",
  "02:30",
  "02:45",
  "03:00",
  "03:15",
  "03:30",
  "03:45",
  "04:00",
  "04:15",
  "04:30",
  "04:45",
  "05:00",
  "05:15",
  "05:30",
  "05:45",
  "06:00",
  "06:15",
  "06:30",
  "06:45",
  "07:00",
  "07:15",
  "07:30",
  "07:45",
  "08:00",
  "08:15",
  "08:30",
  "08:45",
  "09:00",
  "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",
  "14:15",
  "14:30",
  "14:45",
  "15:00",
  "15:15",
  "15:30",
  "15:45",
  "16:00",
  "16:15",
  "16:30",
  "16:45",
  "17:00",
  "17:15",
  "17:30",
  "17:45",
  "18:00",
  "18:15",
  "18:30",
  "18:45",
  "19:00",
  "19:15",
  "19:30",
  "19:45",
  "20:00",
  "20:15",
  "20:30",
  "20:45",
  "21:00",
  "21:15",
  "21:30",
  "21:45",
  "22:00",
  "22:15",
  "22:30",
  "22:45",
  "23:00",
  "23:15",
  "23:30",
  "23:45",
]

export const SearchScreen: FC<StackScreenProps<NavigatorParamList, "search-screen">> = observer(
  ({ navigation, route }) => {
    const [serviceType, setServiceType] = useState<"방문" | "위탁">("방문") //? 방뮨 or 위탁
    const [service, setService] = useState<"펫시팅" | "훈련" | null>(null) //? 팻시팅 or 훈련
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const [date, setDate] = useState(null) //? 선택된 날짜
    const [selectedPets, setSelectedPets] = useState([])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()

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

    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true)
      }
    }

    const time = new Date(2022, 5, 30)
    // console.log(time)
    const _time = time.toISOString().split("T")[0]
    // console.log(_time)

    //* 네비게이션 버튼 라벨 결정
    const handleLabel = () => {
      if (!date) {
        return "날짜를 선택해주세요"
      }

      if (serviceType === "방문" && (!startTime || !endTime)) {
        return "시간을 선택해주세요"
      }

      if (selectedPets.length === 0) {
        return "반려동물을 선택해주세요"
      }

      return service === "펫시팅" ? " 펫시터 찾기" : "훈련사 찾기"
    }

    //* 네비게이션 버튼 활성화 여부 결정
    const hadleIsActivated = () => {
      if (!date) return false
      if (selectedPets.length === 0) return false
      return true
    }

    return (
      <ScreenRootView testID="SearchScreen" preset="fixed">
        {/* //* 방문 | 위탁 */}
        <Row style={{ marginTop: HEIGHT * 12 }}>
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
            style={{ marginLeft: WIDTH * 10 }}
            label={"위탁"}
            state={serviceType}
          />
        </Row>
        <Row style={{ marginTop: HEIGHT * 16 }}>
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

        <ScrollView>
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
              style={{ marginTop: HEIGHT * 36 }}
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
                marginTop: HEIGHT * 36,
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
            // <RowRoundedTimeIntervalPicker style={{ marginTop: HEIGHT * 12 }} platform={Platform.OS} />
            //! (임시로 추가함) - Web 에서는 @gorhom/bottom-sheet 작동 안 함 🥲
            <>
              <PreReg16
                text={"방문시간을 선택해주세요"}
                textColor={HEAD_LINE}
                style={{ marginVertical: HEIGHT * 10 }}
              />
              <Row style={{ justifyContent: "space-around" }}>
                <Picker
                  selectedValue={startTime}
                  onValueChange={(itemValue, itemIndex) => setStartTime(itemValue)}
                  style={{
                    width: "45%",
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: LIGHT_LINE,
                    height: 40,
                    textAlign: "center",
                  }}
                >
                  {timeOptions.map((value, index) => (
                    <Picker.Item label={value} value={value} key={index} />
                  ))}
                </Picker>

                <Picker
                  selectedValue={endTime}
                  onValueChange={(itemValue, itemIndex) => setEndTime(itemValue)}
                  style={{
                    width: "45%",
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: LIGHT_LINE,
                    height: 40,
                    textAlign: "center",
                  }}
                >
                  {timeOptions.map((value, index) => (
                    <Picker.Item label={value} value={value} key={index} />
                  ))}
                </Picker>
              </Row>
            </>
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
            style={{ marginTop: HEIGHT * 12 }}
          />

          {/*//* 반려동물 선택 */}
          <SelectPetDropdownBox
            style={{ marginTop: HEIGHT * 12 }}
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
          <PreBol14
            text="선택된 반려동물"
            color={SUB_HEAD_LINE}
            style={{ marginTop: HEIGHT * 18, marginLeft: WIDTH * 16 }}
          />

          {/* //* 선택된 반려동물 리스트 */}
          {/* //- TODO: 높이가 굉장히 협소할떄는 이렇게 하면, 아래 버튼이 안 보임 */}
          {/* //- TODO: 버튼 스타일을 수정하던가, 아니면 지금처럼 바깥을 ScrollView 로 감싸야함 */}
          <FlatList
            data={selectedPets}
            renderItem={(
              { item, index }, //! renderItem 에다가 사용하는 params 는 item 이다. 딴걸로 바꿔 쓰지 말 것!!!
            ) => (
              <SelectedPetCard
                petData={item}
                onPress={() => {
                  setSelectedPets((pets) => pets.filter((pet) => pet.id !== item.id))
                }}
              />
            )}
            // indicatorStyle={"black"} //! scroll indicator 의 디자인 props 는 black 과 white 두 종류 밖에 없다. custom scroll indicator 는 따로 직접 만들어야 한다.
          />
        </ScrollView>

        {/*//* 펫시터 찾기 */}
        <ConditionalButton
          label={handleLabel()}
          isActivated={hadleIsActivated()}
          style={{
            marginTop: "auto",
            // margin: HEIGHT * 24,
            marginBottom: HEIGHT * NAV_BUTTON_BOTTOM_PADDING,
          }}
          onPress={() => {
            //? 펫시터 검색결과 스크린으로 이동
            navigate("search-result", { service: service, serviceType: serviceType })
          }}
        />
      </ScreenRootView>
    )
  },
)
