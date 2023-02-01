import { StyleSheet } from "react-native"

import { LIGHT_LINE } from "#theme"

export const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: 60,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: LIGHT_LINE,
    resizeMode: "cover",
  },
  star: {
    width: 13.12,
    height: 12,
  },
  rightArrow: { width: 16, height: 16 },
})
