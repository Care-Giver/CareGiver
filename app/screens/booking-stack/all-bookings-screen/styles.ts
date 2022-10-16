import { HEIGHT, WIDTH } from "#theme/device-size-constant"
import { CARE_NATURAL_BLUE, GIVER_CASUAL_NAVY } from "#theme/palette"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  dotsContainer: {
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
