import {
  Keyboard,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
  Text,
  View,
  Image,
  ImageStore,
  Pressable,
} from "react-native"
import React, { FC, useLayoutEffect, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { observer } from "mobx-react-lite"
import { BODY, LBG, CARE_NATURAL_BLUE, HEAD_LINE, MIDDLE_LINE } from "#theme/palette"
import {
  HEIGHT,
  WIDTH,
  DEVICE_SCREEN_HEIGHT,
  HEADER_HEIGHT,
  ADNROID_STATUS_BAR_HEIGHT,
  ADNROID_BOTTOM_NAVIGATION_HEIGHT,
} from "#theme/index"
import {
  PublicPrivateSwitchButton,
  ScreenRootView,
  PopSem14,
  PopReg14,
  Row,
  PreMed16,
  PreMed14,
  styles,
  DivisionLine,
  BASIC_BACKGROUND_PADDING_WIDTH,
} from "#components"
import { useKeyboard } from "@react-native-community/hooks"
import IMAGES from "#images"

export const UserOrPetProfileInfo = (props) => {
  //? props 를 이런 문법으로 쓰는 이유?
  //? 아래와 같은 방뻐과 좀 다름 https://react.vlpt.us/basic/05-props.html
  const { title, profileInfo } = props

  return (
    <View style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH, paddingTop: WIDTH * 20 }}>
      <PreMed14 color={BODY} text={title} style={{ marginBottom: HEIGHT * 10 }} />
      <PreMed16 color={HEAD_LINE} text={profileInfo} />
      <DivisionLine color={MIDDLE_LINE} style={{ marginTop: HEIGHT * 4 }} />
    </View>
  )
}
