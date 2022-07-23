import { StyleSheet } from "react-native"
import { WIDTH, HEIGHT } from "~/app/theme"

export const styles = StyleSheet.create({
  root: {
    width: "auto",
    height: "auto",
    // height: HEIGHT * 28,
    // backgroundColor: "pink",
  },
  badgeImage: {
    width: WIDTH * 28,
    height: HEIGHT * 28,
  },
  moreInfoImage: {
    width: WIDTH * 28,
    height: HEIGHT * 28,
  },
})
