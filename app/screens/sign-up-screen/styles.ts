import { MIDDLE_LINE } from "#theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  radioContainer: {
    width: "48%",
    height: 48,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    borderColor: MIDDLE_LINE,
    borderWidth: 2,
    borderRadius: 9,
  },

  radioImg: {
    width: 16,
    height: 16,
  },
})
