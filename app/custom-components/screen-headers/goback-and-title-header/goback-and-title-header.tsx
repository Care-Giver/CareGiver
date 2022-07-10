import { View, Image, Platform, Pressable } from "react-native"
import React from "react"
import { WIDTH, HEIGHT, HEADER_HEIGHT, IOS_NOTCH_STATUS_BAR_HEIGHT } from "../../../theme"
import { PreMed20 } from "../../custom-texts/custom-texts"
import IMAGES from "../../../../assets/common-images"
import { styles } from "./styles"

const HEADER_ROOT = {
  backgroundColor: "white",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  height: Platform.select({
    ios: HEADER_HEIGHT + IOS_NOTCH_STATUS_BAR_HEIGHT,
    android: HEADER_HEIGHT,
  }),

  //! iOS 헤더 스타일링 개선: Status Bar 영역까지 헤더 컴포넌트가 있어야 함!
  paddingTop: Platform.select({
    ios: IOS_NOTCH_STATUS_BAR_HEIGHT,
    android: 0,
  }),
}

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
      <PreMed20 style={{ marginLeft: WIDTH * 8 }}> {title}</PreMed20>
    </View>
  )
}
