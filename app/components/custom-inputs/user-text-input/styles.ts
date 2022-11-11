import { HEIGHT, WIDTH } from "#theme/device-size-constant"
import { LBG } from "#theme/palette"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  root: {
    height: HEIGHT * 78,

    paddingVertical: HEIGHT * 14,
    paddingHorizontal: WIDTH * 18,

    backgroundColor: LBG,

    borderRadius: 8,
  },
})
