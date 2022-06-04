import React, { FC, useState, useCallback, useEffect } from "react"
import { FlatList, Image, Pressable } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  ScreenRootView,
  Row,
  PreBol18,
  PreBol20,
  ServiceChoiceButton,
  SitterProfileButton,
  PreReg14,
  DivisionLine,
  SelectedPetCard,
  PressableButton,
  BlueCheckbox,
  ServiceTypeIndicatorHeader,
  PreMed14,
  PreBol14,
  ConditionalButton,
  SelectPetItem,
  RowRoundedBox,
} from "../../../../custom-components"
import { NavigatorParamList } from "../../../../navigators"
import { HEIGHT, palette, SHADOW_1, WIDTH } from "../../../../theme"
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
// import * as Calendar from 'expo-calendar';
export const SearchScreen: FC<StackScreenProps<NavigatorParamList, "search">> = observer(
  ({ navigation, route }) => {
    const [serviceType, setServiceType] = useState("방문") //? 방뮨 or 위탁
    const [service, setService] = useState(null) //? 팻시팅 or 훈련

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

    useEffect(() => {
      if (!route.params.service) {
        console.error("service 안 주어짐!")
      }
      route.params.service === "펫시팅" ? setService("펫시팅") : setService("훈련")
    }, [])

    const addPet = (petData) => {
      //! forEach 는 retrun 값을 못 내보낸다. 항상 undefined 임 주의할 것! (map 과의 가장 큰 차이!) https://dream-frontend.tistory.com/341
      //! 이때문에, map 을 사용하였다
      //? 이전 값들(pet 객체) 중에서, id 값이 이미 존재하면, true 를 리턴한다.
      const didAlreadyHave = selectedPets.map((ele) => ele.id === petData.id).includes(true)

      //? 이미 있으면 아무것도 안하고(null), 없으면 state 를 추가한다(setSelectedPets)
      didAlreadyHave ? null : setSelectedPets((prevState) => [...prevState, petData])
    }

    // const triggerActivate = () => {
    //   if (!selectedPet) return
    //   setIsActivated(true)
    // }
    // useEffect(() => {
    //   triggerActivate()
    // }, [selectedPet])

    console.log(selectedPets)
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

        {/*//? 날짜 선택 */}
        <RowRoundedButton
          onPress={() => {
            alert("dd")
          }}
          image={IMAGES.calendar}
          text={"날짜를 선택해보세요."}
          textColor={HEAD_LINE}
          style={{ marginTop: HEIGHT * 36 }}
        />

        {/*//? 시간 선택 */}
        <RowRoundedButton
          onPress={() => {
            alert("dd")
          }}
          image={IMAGES.timer}
          text={"00:00 - 24:00"}
          textColor={"#BFBFBF"}
          fontType="Poppins"
          style={{ marginTop: HEIGHT * 12 }}
        />

        {/*//? 위치 선택 */}
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
        <DropDownPicker
          //! 기본설정
          open={open}
          setOpen={setOpen}
          items={items}
          setItems={setItems}
          // value={value}
          // setValue={setValue}
          //? 기능구현
          onSelectItem={(selected) => {
            addPet(selected.petData)
          }}
          placeholder={"반려동물 선택"}
          style={{ marginTop: HEIGHT * 12, borderWidth: 2, borderColor: LIGHT_LINE }}
        />

        <PreBol14
          text="선택된 반려동물"
          color={SUB_HEAD_LINE}
          style={{ marginTop: HEIGHT * 18, marginLeft: WIDTH * 16 }}
        />
        <DivisionLine height={HEIGHT * 2} color={LBG} style={{ marginTop: HEIGHT * 8 }} />

        {/*//? 선택된 반려동물 리스트 */}
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

        <SelectPetItem petData={petsDummy[0]} />
        <RowRoundedBox
          style={styles.addNewPetBox}
          preset="pressable"
          onPress={() => {
            alert("gg")
          }}
        >
          <PreMed14 text="+ 추가 등록하기" color={BODY} />
        </RowRoundedBox>

        <ConditionalButton
          label={service === "펫시팅" ? " 펫시터 찾기" : "훈련사 찾기"}
          isActivated={selectedPets.length !== 0}
          style={{ marginTop: "auto", marginBottom: HEIGHT * 34 }}
          onPress={() => {
            navigation.navigate("search-result")
          }}
        />
      </ScreenRootView>
    )
  },
)
