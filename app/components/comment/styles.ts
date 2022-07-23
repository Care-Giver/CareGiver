import { StyleSheet } from "react-native"
import { WIDTH, HEIGHT } from "~/app/theme"

export const styles = StyleSheet.create({
  root: {
    width: WIDTH * 358,
    height: "auto",
    // backgroundColor: "pink",
  },
  profileImage: {
    width: WIDTH * 28,
    height: HEIGHT * 28,
  },
  threeDots: {
    width: WIDTH * 3,
    height: HEIGHT * 14,
  },
  desc: {
    marginTop: HEIGHT * 10,
    // backgroundColor: "yellow",
    // maxWidth: WIDTH * 342,
    marginRight: WIDTH * 13,
    lineHeight: HEIGHT * 20,
  },
})
