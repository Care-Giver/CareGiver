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

export const SearchResultScreen: FC<
  StackScreenProps<NavigatorParamList, "search-result">
> = observer(({ navigation }) => {
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
    <ScreenRootView testID="SearchResultScreen" preset="fixed">
      <Row
      // style={{ alignSelf: "center" }}
      >
        <ServiceTypeIndicatorHeader
          label={"방문"}
          state={serviceType}
          onPress={() => {
            setServiceType("방문")
          }}
        />
        <ServiceTypeIndicatorHeader
          label={"위탁"}
          state={serviceType}
          onPress={() => {
            setServiceType("위탁")
          }}
        />
      </Row>
    </ScreenRootView>
  )
})
