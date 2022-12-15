import { HEIGHT, WIDTH } from "#theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  root: {
    paddingVertical: HEIGHT * 8,
    paddingHorizontal: WIDTH * 16,

    borderRadius: 4,

    flexDirection: "row",
    justifyContent: "space-between",
  },

  x_img: {
    width: WIDTH * 10,
    height: HEIGHT * 10,
  },
})
