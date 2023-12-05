import { GIVER_CASUAL_NAVY, palette } from "#theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  goBackButton: {
    width: 28,
    height: 28,
    marginLeft: 16,
    // backgroundColor: "orange",
  },
  petsitterBadge: {
    marginLeft: 4,
    backgroundColor: palette.white,
    borderColor: GIVER_CASUAL_NAVY,
    borderWidth: 2,
    paddingVertical: 3 - 2,
    paddingHorizontal: 8 - 2,
  },
})
