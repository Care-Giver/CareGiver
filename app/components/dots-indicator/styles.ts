import { GIVER_CASUAL_NAVY, CARE_NATURAL_BLUE } from "#theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
  },
  dotsContainer: {
    flexDirection: "row",
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
