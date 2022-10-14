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
import { BODY, LBG, CARE_NATURAL_BLUE } from "#theme/palette"
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
  PreMed14,
  styles,
} from "#components"
import { useKeyboard } from "@react-native-community/hooks"
import IMAGES from "#images"

export const UserOrPetProfileInfo = (title, moreInfoButtonAble, profileInfo) => {
  return (
    <View>
      <PreMed14 color={BODY} text={title} style={{ paddingLeft: WIDTH * 16 }} />

      <Pressable
        onPress={() => {
          alert("hi")
        }}
      >
        <Image
          source={IMAGES.more_info_bigger}
          style={{ width: WIDTH * 16, height: HEIGHT * 16, marginLeft: WIDTH * 4 }}
        />
      </Pressable>
    </View>
  )
}
