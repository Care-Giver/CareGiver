import { View, Image, Pressable } from "react-native"
import React from "react"

import { images } from "#images"
import { styles } from "./styles"
import { HEADER_ROOT } from "../common-styles"
import { navigate } from "#navigators"
import { SHADOW_1 } from "#theme"

export const HomeScreenHeader = (props) => {
  // console.log("HomeScreenHeader props:", props)

  return (
    <View {...props} style={[HEADER_ROOT, SHADOW_1]}>
      {/* //? 케어기버 로고 */}
      <Image style={styles.careGiverLogo} source={images.care_giver_logo_162x20} />

      {/* //? 알람 버튼 */}
      <Pressable
        onPress={() => {
          alert("알림 기능은 준비중입니다.")
        }}
        style={{
          marginLeft: "auto",
          marginRight: 16,
        }}
      >
        <Image style={styles.bell} source={images.bell} />
      </Pressable>
    </View>
  )
}
