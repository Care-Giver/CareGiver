import { StyleSheet } from "react-native"
import { WIDTH, HEIGHT } from "#theme/index"

export const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: HEIGHT * 56,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: WIDTH * 32,
    backgroundColor: "red",
  },
  activatedViewStyle: {
    backgroundColor: "#00196C",
  },
  disabledViewStyle: {
    backgroundColor: "#F1F1F4",
  },
})
