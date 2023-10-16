// edit-pet-info-screen과 같은 원리로
// typescript무시
// @ts-nocheck

import React from "react"
import { StyleProp, ViewStyle, View, StyleSheet, Pressable, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { images } from "#images"
import { PreMed18 } from "../../basics/custom-texts/custom-texts"
import { HEADER_ROOT } from "../common-styles"
import { useNavigation, useRoute } from "@react-navigation/native"
import { goBack } from "#navigators"
export const NotificationScreenHeader = (props) => {
  const navigation = useNavigation()
  const route = useRoute()

  const params = route.params
  //@ts-ignore
  const removeAllToggle = params?.removeAllToggle

  //@ts-ignore
  const removeAllHandler = () => {
    navigation.setParams({ removeAllToggle: true })
  }

  return (
    <View style={[HEADER_ROOT, { flexDirection: "row" }]}>
      {/* //* 뒤로가기 (headerLeft 위치) */}
      <Pressable onPress={goBack} style={{ marginLeft: 16 }}>
        <Image style={{ width: 28, height: 28 }} source={images.go_back} />
      </Pressable>

      {/* //* 타이틀 */}
      <PreMed18 style={{ marginLeft: 16, alignSelf: "center" }}>알림</PreMed18>

      {/* //* 편집버튼 (headerRight 위치) */}
      <Pressable
        onPress={removeAllHandler}
        style={{
          marginLeft: "auto",
          marginRight: 8,
        }}
      >
        <Image style={{ width: 28, height: 28 }} source={images.trashcan} />
      </Pressable>
    </View>
  )
}
