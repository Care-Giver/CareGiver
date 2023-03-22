import { DEVICE_SCREEN_WIDTH, LIGHT_LINE, palette } from "#theme"
import { StyleSheet } from "react-native"
import { BASIC_BACKGROUND_PADDING_WIDTH } from "#components"
export const styles = StyleSheet.create({
  profileImage: {
    marginTop: 20,
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    alignSelf: "center",
  },

  speechBubble: {
    width: 172,
    height: 50.03,
    position: "absolute",
    top: 18.5, //*'닉네임' 에서부터 18.5 떨어짐
    left: BASIC_BACKGROUND_PADDING_WIDTH, //*parent view 에 주어진 padding 만큼 띄우기
    alignItems: "center",
    alignContent: "center",
  },
})
