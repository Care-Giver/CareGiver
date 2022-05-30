import { GIVER_CASUAL_NAVY, LIGHT_LINE } from "../../../theme/palette"
import { StyleSheet } from "react-native"
import { WIDTH, HEIGHT, palette } from "../../../theme"

export const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: HEIGHT * 56,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  activatedViewStyle: {
    backgroundColor: "#00196C",
  },
  disabledViewStyle: {
    backgroundColor: "#F1F1F4",
  },
})
