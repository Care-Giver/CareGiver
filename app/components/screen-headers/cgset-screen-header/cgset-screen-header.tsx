import { View, Image, Pressable } from "react-native"
import React from "react"

import { PreMed18, PreMed16 } from "../../basics/custom-texts/custom-texts"
import { images } from "#images"
import { styles } from "./styles"
import { HEADER_ROOT } from "../common-styles"
import { DISABLED } from "#theme"

export const CgsetAddressHeader = (props) => {
  // console.log("TestHeaderTitle props:", props)

  const title = props.options.title ? props.options.title : props.route.name

  return (
    <View {...props} style={HEADER_ROOT}>
      {/* //? 뒤로가기 버튼 */}
      <Pressable
        onPress={() => {
          props.navigation.goBack()
        }}
      >
        <Image style={styles.goBackButton} source={images.go_back} />
      </Pressable>

      <Pressable
        onPress={() => {
          alert("저장 후 나가기")
        }}
        style={{ alignItems: "flex-end" }}
      >
        <PreMed16 text={"저장 후 나가기"} color={DISABLED} style={styles.SaveAndExit} />
      </Pressable>

      {/* //? 타이틀 */}
      <PreMed18 style={{ marginLeft: 8 }}> {title}</PreMed18>
    </View>
  )
}
