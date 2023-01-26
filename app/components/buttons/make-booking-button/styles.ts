import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: 56,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
    backgroundColor: "red",
  },
  activatedViewStyle: {
    backgroundColor: "#00196C",
  },
  disabledViewStyle: {
    backgroundColor: "#F1F1F4",
  },
})
