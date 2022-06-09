import { View, Image, Platform, Pressable } from "react-native"
import React from "react"
import { WIDTH, HEIGHT, HEADER_HEIGHT } from "../../../theme"
import { PreMed20, PreBol32 } from "../../custom-texts/custom-texts"
import IMAGES from "../../../../assets/common-images"
import { styles } from "./styles"

const HEADER_ROOT = {
  // backgroundColor: "orange",
  width: WIDTH * 390,
  height: HEADER_HEIGHT,
  flexDirection: "row",
  //   justifyContent: "center",
  alignItems: "center",
  marginTop:
    HEIGHT *
    Platform.select({
      ios: 47,
      android: 0,
    }),
}

export const GobackAndTitleHeader = (props) => {
  // console.log("TestHeaderTitle props:", props)

  const Title = props.options.title ? props.options.title : props.route.name

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
      <PreMed20 style={{ marginLeft: WIDTH * 8 }}> {Title}</PreMed20>
    </View>
  )
}
