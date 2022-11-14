import { HEIGHT, WIDTH } from "#theme/device-size-constant"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  root: {
    height: HEIGHT * 48,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  arrow: {
    width: WIDTH * 16,
    height: HEIGHT * 16,
  },
})
