import { HEIGHT } from "#theme/device-size-constant"
import { GIVER_CASUAL_NAVY } from "#theme/palette"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",

    paddingVertical: HEIGHT * 14,

    borderWidth: 1,
    borderRadius: 8,
  },
})
