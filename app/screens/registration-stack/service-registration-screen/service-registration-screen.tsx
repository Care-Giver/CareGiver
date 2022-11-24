import { TextStyle, View } from "react-native"
import React from "react"
import { FC } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators/app-navigator"
import { observer } from "mobx-react-lite"
import { RegistrationButton } from "#components/"
import { PreReg14 } from "#components/"
import { ScreenRootView } from "#components/"
import { PressableButton } from "#components/"
import { PreBol16 } from "#components/"
import { styles } from "./styles"
import { useState } from "react"
import { StyleProp } from "react-native"
import { color } from "#theme/color"

export const ServiceRegistrationScreen: FC<
  StackScreenProps<NavigatorParamList, "service-registration-screen">
> = observer(() => {
  const [selectedOptions, setSelectedOptions] = useState<Array<string>>([])

  const [isSubmitActive, setIsSubmitActive] = useState<boolean>(false)
  const submitText = `총 ${selectedOptions.length}개 등록`

  return (
    <ScreenRootView>
      <RegistrationButton text="🐶 애견카페" />

      <PressableButton
        style={[styles.submitBtn, { backgroundColor: isSubmitActive ? "#00196C" : "#F1F1F4" }]}
      >
        <PreBol16 text={submitText} color={color.palette.white} />
      </PressableButton>
    </ScreenRootView>
  )
})
