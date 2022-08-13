import { StyleSheet } from "react-native"
import { HEIGHT, WIDTH } from "@theme/index"

export const styles = StyleSheet.create({
  dateBox: {
    flexDirection: "column",
    alignItems: "center",
  },
  arrow: {
    width: WIDTH * 16,
    height: HEIGHT * 16,

    marginHorizontal: WIDTH * 36,
  },
})
