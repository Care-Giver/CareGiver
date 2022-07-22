import { StyleSheet } from "react-native"
import { HEIGHT, WIDTH } from "~/app/theme"
import { GIVER_CASUAL_NAVY } from "~/app/theme/palette"

export const styles = StyleSheet.create({
  typeBtn: {
    borderRadius: 4,
    backgroundColor: GIVER_CASUAL_NAVY,
    paddingVertical: HEIGHT * 3,
    paddingHorizontal: WIDTH * 8,
  },
})
