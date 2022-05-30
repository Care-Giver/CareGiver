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
} from "../../../../custom-components"
import { NavigatorParamList } from "../../../../navigators"
import { HEIGHT, palette, SHADOW_1, WIDTH } from "../../../../theme"
import { BODY, DISABLED, HEAD_LINE, LBG, SUB_HEAD_LINE } from "../../../../theme/palette"
import { ComeHomeGoToSwitchButton } from "../../../../custom-components/buttons/come-home-go-to-switch-button/come-home-go-to-switch-button"
import { RowRoundedButton } from "../../../../custom-components/buttons/row-rounded-button/row-rounded-button"
import { petsDummy } from "./dummy-data"
import IMAGES from "../../../../../assets/common-images"
import { styles } from "./styles"
import { Checkbox } from "../../../../components"
import { ConditionalButton } from "../../../../custom-components/buttons/conditional-button/conditional-button"
import DropDownPicker from "react-native-dropdown-picker"

const FLATLIST_PADDING_VERTICAL = HEIGHT * 6 //? FlatList 내부의 있는 요소에 그림자가 있을 경우, FlatList 의 contentContainerStyle 에 padding 이 없을 경우, 그림자가 짤린다
const FLATLIST_PADDING_HORIZONTAL = WIDTH * 10 //? ""

export const SearchScreen: FC<StackScreenProps<NavigatorParamList, "search">> = observer(
  ({ navigation }) => {
    const [isOn, setIsOn] = useState(false)

    const toggle = () => {
      isOn ? setIsOn(false) : setIsOn(true)
    }

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null)
    const [items, setItems] = useState([
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
    ])

    // //? 기본값은 "방문" 으로 한다 (기획) _
    // const [petsitters, setPetsitters] = useState(petsittersDummy)
    // const [trainers, settrainers] = useState(trainersDummy)

    // const [isComeHomePetSitter, setIsComeHomePetSitter] = useState(true)
    // const [isComeHomeTrainer, setIsComeHomeTrainer] = useState(true)
    // const [selectedPetsitter, setSelectedPetsitter] = useState(0)
    // const [selectedTrainer, setSelectedTrainer] = useState(0)

    // useEffect(() => {
    //   isComeHomePetSitter
    //     ? setPetsitters(petsittersDummy.filter((item) => item.isComeHome === true))
    //     : setPetsitters(petsittersDummy.filter((item) => item.isGoTo === true))
    // }, [isComeHomePetSitter])

    // useEffect(() => {
    //   isComeHomeTrainer
    //     ? settrainers(trainersDummy.filter((item) => item.isComeHome === true))
    //     : settrainers(trainersDummy.filter((item) => item.isGoTo === true))
    // }, [isComeHomeTrainer])

    // const onPetsitterFlatlistUpdate = useCallback(({ viewableItems }) => {
    //   // ? 선택된 이미지, 즉 viewableItems 의 index 값을 activeIndex 로 설정.
    //   // ? 왜 viewableItems[0] 인지는 console.log(viewableItems); 로 보면 이해갈 꺼임.
    //   if (viewableItems.length > 0) {
    //     setSelectedPetsitter(viewableItems[0].index || 0)
    //   }
    //   // console.log(viewableItems)
    // }, [])

    // const onTrainerFlatlistUpdate = useCallback(({ viewableItems }) => {
    //   if (viewableItems.length > 0) {
    //     setSelectedTrainer(viewableItems[0].index || 0)
    //   }
    // }, [])

    return (
      <ScreenRootView testID="SearchScreen" preset="fixed">
        <Row>
          <ServiceTypeIndicatorHeader label={"방문"} state={"방문"} />
          <ServiceTypeIndicatorHeader label={"위탁"} />
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
        />

        {/*//? 선택된 반려동물 리스트 */}
        {/* {/* <SelectedPetCard name={"d"} size={"d"} species={"d"} age={"d"} sex={"d"} /> */}
        {/* <SelectedPetCard />
        <SelectedPetCard />
        <SelectedPetCard /> */}

        <BlueCheckbox onToggle={toggle} value={isOn} />

        <ConditionalButton
          label={"이 조건으로 검색하기"}
          isActivated={!true}
          style={{ marginTop: "auto", marginBottom: HEIGHT * 34 }}
        />
      </ScreenRootView>
    )
  },
)
