import { StyleSheet } from "react-native"
import { WIDTH, HEIGHT } from "../../../../theme"
import { LBG, LIGHT_LINE } from "../../../../theme/palette"

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
    height: HEIGHT * 236,
    marginTop: HEIGHT * 8,
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
