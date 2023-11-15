import { LIGHT_LINE, palette } from "#theme"
import { StyleSheet } from "react-native"

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
    height: 48,
    backgroundColor: palette.white,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: LIGHT_LINE,
  },
})
