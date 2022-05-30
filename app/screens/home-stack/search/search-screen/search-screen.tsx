import React, { FC, useState, useCallback, useEffect } from "react"
import { FlatList, Image } from "react-native"
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
import { ConditionalButton } from "../../../../custom-components/buttons/conditional-button/conditional-button"
import DropDownPicker from "react-native-dropdown-picker"

export const SearchScreen: FC<StackScreenProps<NavigatorParamList, "search">> = observer(
  ({ navigation }) => {
    const [isOn, setIsOn] = useState(false)
    const toggle = () => {
      isOn ? setIsOn(false) : setIsOn(true)
    }

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null)
    const [items, setItems] = useState([
      { label: "초코 중형견 푸들 3세 여", value: 1 },
      { label: "우유 소형견 비숑 3세 여", value: 2 },
    ])
    const [isActivated, setIsActivated] = useState(false)
    const [serviceType, setServiceType] = useState("방문")

    const triggerActivate = () => {
      if (!value) return

      setIsActivated(true)
    }

    useEffect(() => {
      triggerActivate()
    }, [value])

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

        {/*//? 반려동물 선택 */}
        {/* //* 드롭박스 추가해야 함 */}
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={"반려동물 선택"}
          style={{ marginTop: HEIGHT * 12, borderWidth: 2, borderColor: LIGHT_LINE }}
        />

        <PreMed14
          text="선택된 반려동물"
          color={SUB_HEAD_LINE}
          style={{ marginTop: HEIGHT * 18, marginLeft: WIDTH * 16 }}
        />
        <DivisionLine height={HEIGHT * 2} color={LBG} style={{ marginTop: HEIGHT * 8 }} />

        {/*//? 선택된 반려동물 리스트 */}
        <FlatList
          data={petsDummy.filter((element) => parseInt(element.id) === value)}
          renderItem={(
            { item, index }, //! renderItem 에다가 사용하는 params 는 item 이다. 딴걸로 바꿔 쓰지 말 것!!!
          ) => (
            <SelectedPetCard
              petData={item}
              onPress={() => {
                setValue(null)
              }}
            />
          )}
        />
        {/* <SelectedPetCard petData={petsDummy[0]} />
        <SelectedPetCard petData={petsDummy[1]} />
        <SelectedPetCard petData={petsDummy[2]} /> */}

        <ConditionalButton
          label={"이 조건으로 검색하기"}
          isActivated={isActivated}
          style={{ marginTop: "auto", marginBottom: HEIGHT * 34 }}
          onPress={() => {
            navigation.navigate("search-result")
          }}
        />
      </ScreenRootView>
    )
  },
)
