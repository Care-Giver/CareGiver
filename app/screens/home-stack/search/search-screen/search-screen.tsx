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
} from "../../../../custom-components"
import { NavigatorParamList } from "../../../../navigators"
import { HEIGHT, IOS_BOTTOM_HOME_BAR_HEIGHT, WIDTH } from "../../../../theme"
import { DISABLED, HEAD_LINE, LBG, SUB_HEAD_LINE } from "../../../../theme/palette"
import { RowRoundedButton } from "../../../../custom-components/buttons/row-rounded-button/row-rounded-button"
import IMAGES from "../../../../../assets/common-images"
import { styles } from "./styles"
import { Calendar } from "react-native-calendars"
import { SelectPetDropdownBox } from "../../../../custom-components/dropdown-boxes/select-pet-dropdown-box/select-pet-dropdown-box"
import { RowRoundedTimeIntervalPicker } from "../../../../custom-components/row-rounded-time-interval-picker/row-rounded-time-interval-picker"

export const SearchScreen: FC<StackScreenProps<NavigatorParamList, "search">> = observer(
  ({ navigation, route }) => {
    const [serviceType, setServiceType] = useState("방문") //? 방뮨 or 위탁
    const [service, setService] = useState(null) //? 팻시팅 or 훈련
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const [date, setDate] = useState() //? 선택된 날짜
    const [selectedPets, setSelectedPets] = useState([])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

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
    const hadle = () => {
      if (!date) return false

      if (selectedPets.length === 0) return false

      return true
    }

    //? 펫싴터 검색결과 스크린으로 이동
    const goToSearchResultScreen = (params?) => {
      navigation.navigate("search-result", params)
    }

    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true)
      }
    }

    const time = new Date(2022, 5, 30)
    // console.log(time)
    const _time = time.toISOString().split("T")[0]
    // console.log(_time)

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
          <Image source={IMAGES.right_arrow_grey} style={styles.image} />
          <PreReg14 text="케어기버가 직접 집을 방문합니다." color={DISABLED} style={styles.text} />
        </Row>

        {/* //* 날짜 선택 */}
        {!isCalendarOpen ? (
          <RowRoundedButton
            onPress={() => {
              setIsCalendarOpen(true)
              LayoutAnimation.configureNext(LayoutAnimation.create(170, "easeOut", "opacity"))
            }}
            image={IMAGES.calendar}
            text={
              date
                ? `${date.dateString.replace("-", ".").replace("-", ".")}`
                : "날짜를 선택해보세요."
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
            headerStyle
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

        {/*//* 시간 선택 */}
        {serviceType === "방문" && (
          <RowRoundedTimeIntervalPicker style={{ marginTop: HEIGHT * 12 }} platform={Platform.OS} />
        )}

        {/*//* 위치 선택 */}
        <RowRoundedButton
          onPress={() => {
            alert("dd")
          }}
          image={IMAGES.location}
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
        <View style={isDropdownOpen ? styles.hidden : styles.shown}>
          {/*//* 선택된 반려동물 리스트 */}
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
        </View>

        {/*//* 펫시터 찾기 */}
        <ConditionalButton
          label={service === "펫시팅" ? " 펫시터 찾기" : "훈련사 찾기"}
          isActivated={hadle()}
          style={{
            marginTop: "auto",
            // margin: HEIGHT * 24,
            marginBottom: Platform.select({
              ios: IOS_BOTTOM_HOME_BAR_HEIGHT,
              android: 0,
            }),
          }}
          onPress={() => {
            goToSearchResultScreen({ service: service, serviceType: serviceType })
          }}
        />
      </ScreenRootView>
    )
  },
)
