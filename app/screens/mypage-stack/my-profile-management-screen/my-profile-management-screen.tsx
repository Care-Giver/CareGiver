import { Keyboard, TextInput, LayoutAnimation, Platform, UIManager } from "react-native"
import React, { FC, useLayoutEffect, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { observer } from "mobx-react-lite"
import { BODY, LBG } from "#theme/palette"
import {
  HEIGHT,
  WIDTH,
  DEVICE_SCREEN_HEIGHT,
  HEADER_HEIGHT,
  ADNROID_STATUS_BAR_HEIGHT,
  ADNROID_BOTTOM_NAVIGATION_HEIGHT,
} from "#theme/index"
import { PublicPrivateSwitchButton, ScreenRootView, PopSem14, PopReg14, Row } from "#components"
import { useKeyboard } from "@react-native-community/hooks"
//import { PRETENDARD_REGULAR } from "~/assets/fonts"

export const MyProfileManagementScreen: FC<
  StackScreenProps<NavigatorParamList, "my-profile-management-screen">
> = observer(({ navigation, route }) => {
  return (
    <ScreenRootView preset="fixed">
      <text> hi </text>
    </ScreenRootView>
  )
})
