import { View, Image, Pressable } from "react-native"
import React from "react"
import { WIDTH } from "#theme"
import { images } from "#images"
import { styles } from "./styles"
import { HEADER_ROOT } from "../common-styles"
import { navigate } from "#navigators"

export const HomeScreenHeader = (props) => {
  // console.log("HomeScreenHeader props:", props)

  return (
    <View {...props} style={HEADER_ROOT}>
      {/* //? 케어기버 로고 */}
      <Pressable
        onPress={() => {
          navigate("Favorites", { screen: "home-screen" })
        }}
      >
        <Image style={styles.careGiverLogo} source={images.care_giver_logo_162x20} />
      </Pressable>

      {/* //? 알람 버튼 */}
      <Pressable
        onPress={() => {
          // alert("알림 기능은 준비중입니다.")
          // console.warn("임시로 마이페이지 이동버튼으로 사용중")
          navigate("mypage-screen")
        }}
        style={{
          marginLeft: "auto",
          marginRight: WIDTH * 16,
        }}
      >
        <Image style={styles.bell} source={images.bell} />
      </Pressable>
    </View>
  )
}
