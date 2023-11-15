import { GIVER_CASUAL_NAVY } from "#theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: 56,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
    backgroundColor: "red",
  },
  activatedViewStyle: {
    backgroundColor: GIVER_CASUAL_NAVY,
  },
  disabledViewStyle: {
    backgroundColor: "#F1F1F4",
  },
})
