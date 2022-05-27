import { LIGHT_LINE } from "../../../theme/palette"
import { StyleSheet } from "react-native"
import { WIDTH, HEIGHT, palette } from "../../../theme"

export const styles = StyleSheet.create({
  ROW_PRESET: {
    width: "100%",
    height: "auto",
    backgroundColor: palette.white,
    flexDirection: "row",
    alignItems: "center",
  },

  ROW_ROUNDED_BOX_PRESET: {
    width: "100%",
    height: HEIGHT * 48,
    backgroundColor: palette.white,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: LIGHT_LINE,
  },
})
