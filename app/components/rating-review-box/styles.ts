import { StyleSheet } from "react-native"
import { HEIGHT, WIDTH } from "#theme/index"

export const styles = StyleSheet.create({
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",

    // marginTop: HEIGHT * 4,
  },
  star: {
    width: WIDTH * 13,
    height: HEIGHT * 12,
  },
})
