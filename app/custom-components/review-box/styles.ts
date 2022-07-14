import { StyleSheet } from "react-native"
import { HEIGHT, WIDTH } from "../../theme"

export const styles = StyleSheet.create({
  root: {},
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImg: {
    width: WIDTH * 28,
    height: HEIGHT * 28,
  },
  moreBtn: {
    width: WIDTH * 3,
    height: HEIGHT * 14,
  },
})
