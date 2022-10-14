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
//import { PRETENDARD_REGULAR } from "~/assets/fonts"

export const MyProfileManagementScreen: FC<
  StackScreenProps<NavigatorParamList, "my-profile-management-screen">
> = observer(({ navigation, route }) => {
  return (
    <ScreenRootView preset="fixed">
      <Image
        style={{
          marginTop: HEIGHT * 20,
          width: WIDTH * 130,
          height: HEIGHT * 130,
          borderRadius: (WIDTH * 130) / 2,
          alignSelf: "center",
        }} //? width 를 곱하는것이 맞는지?
        source={IMAGES.my_profile_management_default}
      />

      <Row style={{ marginTop: 20 }}>
        <PreMed14 color={BODY} text={`닉네임`} style={{ paddingLeft: WIDTH * 16 }} />
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
      </Row>
    </ScreenRootView>
  )
})
