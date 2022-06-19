import { StyleSheet } from "react-native"
import { WIDTH, HEIGHT, palette } from "../../../../theme"
import { LBG } from "../../../../theme/palette"

export const styles = StyleSheet.create({
  image: { width: WIDTH * 16, height: HEIGHT * 16 },
  text: { marginLeft: WIDTH * 8 },
  addNewPetBox: {
    height: HEIGHT * 52,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderColor: LBG,
    justifyContent: "center",
    alignItems: "center",
  },
  shown: {
    width: "auto",
    height: "auto",
    // backgroundColor: "red",
  },
  hidden: {
    width: 0,
    height: 0,
  },
})
