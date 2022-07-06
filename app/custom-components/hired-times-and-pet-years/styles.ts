import { LIGHT_LINE } from "../../theme/palette"
import { StyleSheet } from "react-native"
import { WIDTH, HEIGHT, palette } from "../../theme"

export const styles = StyleSheet.create({
  ROW_ROUNDED_LARGE_BOX: {
    width: WIDTH * 358,
    height: HEIGHT * 80,
    backgroundColor: palette.white,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: LIGHT_LINE,
    justifyContent: "space-evenly",
  },

  TEXT_ALIGNMENT: {
    flexDirection: "column",
    alignItems: "center",
  },

  VERTICAL_LINE: {
    width: WIDTH * 2,
    height: HEIGHT * 44,
    backgroundColor: LIGHT_LINE,
  },
})
