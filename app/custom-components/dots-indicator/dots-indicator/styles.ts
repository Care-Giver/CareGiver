import { GIVER_CASUAL_NAVY, CARE_NATURAL_BLUE } from "./../../../theme/palette"
import { StyleSheet } from "react-native"
import { WIDTH, HEIGHT } from "../../../theme"

export const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: WIDTH * 6,
    height: HEIGHT * 6,
    borderRadius: 6,
    backgroundColor: CARE_NATURAL_BLUE,
    marginHorizontal: WIDTH * 3,
  },
  activeDot: {
    width: WIDTH * 8,
    height: HEIGHT * 8,
    borderRadius: 8,
    backgroundColor: GIVER_CASUAL_NAVY,
    marginHorizontal: WIDTH * 3,
  },
})
