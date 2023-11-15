import { CARE_NATURAL_BLUE, GIVER_CASUAL_NAVY } from "#theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  dotsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: CARE_NATURAL_BLUE,
    marginHorizontal: 3,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: GIVER_CASUAL_NAVY,
    marginHorizontal: 3,
  },
})
