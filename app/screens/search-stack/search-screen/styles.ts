import { StyleSheet } from "react-native"

import { LBG, LIGHT_LINE } from "#theme"

export const styles = StyleSheet.create({
  image: { width: 16, height: 16 },
  text: { marginLeft: 8 },
  addNewPetBox: {
    height: 52,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderColor: LBG,
    justifyContent: "center",
    alignItems: "center",
  },
  shown: {
    width: "auto",
    minHeight: 10,
    marginTop: 8,
    borderRadius: 8,
    borderColor: LIGHT_LINE,
    borderWidth: 2,
    // backgroundColor: "red",
  },
  hidden: {
    width: 0,
    height: 0,
  },
})
