import { View, Image, Pressable } from "react-native"
import React from "react"
import { WIDTH } from "../../../theme"
import { PreMed18 } from "../../custom-texts/custom-texts"
import IMAGES from "../../../../assets/common-images"
import { styles } from "./styles"
import { HEADER_ROOT } from "../common-styles"

export const GobackAndTitleHeader = (props) => {
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
        <Image style={styles.goBackButton} source={IMAGES.go_back} />
      </Pressable>

      {/* //? 타이틀 */}
      <PreMed18 style={{ marginLeft: WIDTH * 8 }}> {title}</PreMed18>
    </View>
  )
}
