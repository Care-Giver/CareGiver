import React, { FC, useState, useLayoutEffect, useEffect } from "react"
import {
  FlatList,
  Image,
  Pressable,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  ScreenRootView,
  Row,
  PreReg14,
  DivisionLine,
  SelectedPetCard,
  ServiceTypeIndicatorHeader,
  PreMed14,
  PreBol14,
  ConditionalButton,
  SelectPetItem,
  RowRoundedBox,
} from "../../../../custom-components"
import { NavigatorParamList } from "../../../../navigators"
import { HEIGHT, WIDTH } from "../../../../theme"
import {
  BODY,
  DISABLED,
  HEAD_LINE,
  LBG,
  LIGHT_LINE,
  SUB_HEAD_LINE,
} from "../../../../theme/palette"
import { RowRoundedButton } from "../../../../custom-components/buttons/row-rounded-button/row-rounded-button"
import { petsDummy } from "./dummy-data"
import IMAGES from "../../../../../assets/common-images"
import { styles } from "./styles"
import DropDownPicker from "react-native-dropdown-picker"
import { Calendar } from "react-native-calendars"
import { SelectPetDropdownBox } from "../../../../custom-components/dropdown-boxes/select-pet-dropdown-box/select-pet-dropdown-box"
// import * as Calendar from 'expo-calendar';
// import DateTimePicker from "@react-native-community/datetimepicker"
import RNDateTimePicker from "@react-native-community/datetimepicker"
import { RowRoundedTimeIntervalPicker } from "../../../../custom-components/row-rounded-time-interval-picker/row-rounded-time-interval-picker"

export const SearchScreen: FC<StackScreenProps<NavigatorParamList, "search">> = observer(
  ({ navigation, route }) => {
    const [serviceType, setServiceType] = useState("방문") //? 방뮨 or 위탁
    const [service, setService] = useState(null) //? 팻시팅 or 훈련

    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const [isTimePickerOpen, setIsTimePickerOpen] = useState(false)

    const [open, setOpen] = useState(false)
    const [selectedPets, setSelectedPets] = useState([])

    const [items, setItems] = useState(
      petsDummy.map((ele) => ({ label: ele.name, value: ele.id, petData: ele })),
    )
    // items = [
    //   Object {
    //     "age": 3,
    //     "id": "1",
    //     "name": "초코",
    //     "sex": "female",
    //     "size": "중형견",
    //     "species": "푸들",
    //   },
    //   Object {
    //     "age": 3,
    //     "id": "3",
    //     "name": "자두",
    //     "sex": "male",
    //     "size": "소형",
    //     "species": "산냥이",
    //   },
    //   Object {
    //     "age": 3,
    //     "id": "2",
    //     "name": "우유",
    //     "sex": "female",
    //     "size": "중형견",
    //     "species": "비숑",
    //   },
    // ]

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    //* useLayoutEffect 과 useEffect 의 차이: https://merrily-code.tistory.com/46
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

    const addPet = (petData) => {
      //! forEach 는 retrun 값을 못 내보낸다. 항상 undefined 임 주의할 것! (map 과의 가장 큰 차이!) https://dream-frontend.tistory.com/341
      //! 이때문에, map 을 사용하였다
      //? 이전 값들(pet 객체) 중에서, id 값이 이미 존재하면, true 를 리턴한다.
      const didAlreadyHave = selectedPets.map((ele) => ele.id === petData.id).includes(true)

      //? 이미 있으면 아무것도 안하고(null), 없으면 state 를 추가한다(setSelectedPets)
      didAlreadyHave ? null : setSelectedPets((prevState) => [...prevState, petData])
    }

    // console.log(selectedPets)

    const goToSearchResultScreen = (params?) => {
      navigation.navigate("search-result", params)
    }

    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true)
      }
    }

    return (
      <ScreenRootView testID="SearchScreen" preset="fixed">
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

        {!isCalendarOpen ? (
          //* 날짜 선택
          <RowRoundedButton
            onPress={() => {
              setIsCalendarOpen(true)
            }}
            image={IMAGES.calendar}
            text={"날짜를 선택해보세요."}
            textColor={HEAD_LINE}
            style={{ marginTop: HEIGHT * 36 }}
          />
        ) : (
          //? 캘린더 표출
          <Calendar
            onDayPress={() => {
              setIsCalendarOpen(!isCalendarOpen)
            }}
            // Collection of dates that have to be marked. Default = {}
            markedDates={{
              "2022-06-16": { selected: true, marked: true, selectedColor: "orange" },
              "2012-05-17": { marked: true },
              "2012-05-18": { marked: true, dotColor: "red", activeOpacity: 0 },
              "2012-05-19": { disabled: true, disableTouchEvent: true },
            }}
          />
        )}

        {/*//* 시간 선택 */}
        <RowRoundedTimeIntervalPicker
          style={{ marginTop: HEIGHT * 12 }}
          isTimePickerOpen={true}
          setIsTimePickerOpen={setIsTimePickerOpen}
          platform={Platform.OS}
        />

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
        <View style={isDropdownOpen ? styles.hidden : styles.shown}>
          <PreBol14
            text="선택된 반려동물"
            color={SUB_HEAD_LINE}
            style={{ marginTop: HEIGHT * 18, marginLeft: WIDTH * 16 }}
          />
          <DivisionLine height={HEIGHT * 2} color={LBG} style={{ marginTop: HEIGHT * 8 }} />

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
          />
        </View>

        <ConditionalButton
          label={service === "펫시팅" ? " 펫시터 찾기" : "훈련사 찾기"}
          isActivated={selectedPets.length !== 0}
          style={{ marginTop: "auto", marginBottom: HEIGHT * 34 }}
          onPress={() => {
            goToSearchResultScreen({ service: service, serviceType: serviceType })
          }}
        />
      </ScreenRootView>
    )
  },
)
