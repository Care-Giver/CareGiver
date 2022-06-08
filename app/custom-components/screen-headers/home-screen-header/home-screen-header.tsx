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

export const HomeScreenHeader = (props) => {
  // console.log("HomeScreenHeader props:", props)

  return (
    <View {...props} style={HEADER_ROOT}>
      {/* //? 케어기버 로고 */}
      <Image style={styles.careGiverLogo} source={IMAGES.care_giver_logo_162x20} />

      {/* //? 알람 버튼 */}
      <Pressable
        onPress={() => {
          alert("알림 기능은 준비중입니다.")
        }}
        style={{
          marginLeft: "auto",
          marginRight: WIDTH * 16,
        }}
      >
        <Image style={styles.bell} source={IMAGES.bell} />
      </Pressable>
    </View>
  )
}
