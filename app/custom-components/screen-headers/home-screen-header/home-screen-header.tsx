import { View, Image, Platform, Pressable } from "react-native"
import React from "react"
import { WIDTH, HEIGHT, HEADER_HEIGHT, IOS_NOTCH_STATUS_BAR_HEIGHT } from "../../../theme"
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
