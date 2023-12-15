import { CARE_SOFT_YELLOW, GIVER_CASUAL_NAVY, palette } from "#theme"
import { StyleSheet, ViewStyle } from "react-native"

const badge: ViewStyle = {
  backgroundColor: palette.white,
  borderColor: GIVER_CASUAL_NAVY,
  borderWidth: 2,
  paddingVertical: 3 - 2,
  paddingHorizontal: 8 - 2,
}

export const styles = StyleSheet.create({
  goBackButton: {
    width: 28,
    height: 28,
  },

  petsitterBadge: {
    ...badge,
    borderColor: GIVER_CASUAL_NAVY,
  },

  clientBadge: {
    ...badge,
    borderColor: CARE_SOFT_YELLOW,
    backgroundColor: CARE_SOFT_YELLOW,
  },
})
