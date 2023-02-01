import { BODY, LIGHT_LINE } from "#theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    alignItems: "center",

    paddingVertical: 8,
    paddingHorizontal: 10,

    borderColor: LIGHT_LINE,
    borderWidth: 2,
    borderRadius: 9,

    width: 114,
    height: 129,
  },

  image: {
    borderRadius: 8,
    // backgroundColor: BODY,
    width: 94,
    height: 94,
  },

  name: {
    paddingTop: 4,
  },
})
