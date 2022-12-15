import { HEIGHT, WIDTH } from "#theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  root: {
    paddingVertical: HEIGHT * 8,
    paddingHorizontal: WIDTH * 16,

    borderRadius: 4,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingRight: 0,
  },

  x_container: {
    paddingHorizontal: WIDTH * 16,
  },

  x_img: {
    width: WIDTH * 10,
    height: HEIGHT * 10,
  },
})
