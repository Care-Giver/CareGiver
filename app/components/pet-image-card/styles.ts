import { HEIGHT, WIDTH } from "#theme"
import { BODY, LIGHT_LINE } from "#theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    alignItems: "center",

    paddingVertical: HEIGHT * 8,
    paddingHorizontal: WIDTH * 10,

    borderColor: LIGHT_LINE,
    borderWidth: 2,
    borderRadius: 9,

    width: WIDTH * 114,
    height: HEIGHT * 129,
  },

  image: {
    borderRadius: 8,
    backgroundColor: BODY,
    width: WIDTH * 94,
    height: HEIGHT * 94,
  },

  name: {
    paddingTop: HEIGHT * 4,
  },
})
