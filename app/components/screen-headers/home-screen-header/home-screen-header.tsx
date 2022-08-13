import { View, Image, Pressable } from "react-native"
import React from "react"
import { WIDTH } from "#theme/index"
import IMAGES from "#images"
import { styles } from "./styles"
import { HEADER_ROOT } from "../common-styles"

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
