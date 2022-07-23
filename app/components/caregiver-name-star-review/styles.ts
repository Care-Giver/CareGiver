import { StyleSheet } from "react-native"
import { WIDTH, HEIGHT } from "~/app/theme"
import { LIGHT_LINE } from "~/app/theme/palette"

export const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: HEIGHT * 60,
  },
  profileImage: {
    width: WIDTH * 60,
    height: HEIGHT * 60,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: LIGHT_LINE,
    resizeMode: "cover",
  },
  star: {
    width: WIDTH * 13.12,
    height: HEIGHT * 12,
  },
  rightArrow: { width: WIDTH * 16, height: HEIGHT * 16 },
})
