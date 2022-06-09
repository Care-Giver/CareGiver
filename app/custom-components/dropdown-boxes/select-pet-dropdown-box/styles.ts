import { LBG, LIGHT_LINE } from "../../../theme/palette"
import { StyleSheet } from "react-native"
import { WIDTH, HEIGHT, palette } from "../../../theme"

export const styles = StyleSheet.create({
  test: {
    backgroundColor: "red",
  },
  root: {
    paddingHorizontal: WIDTH * 16,
  },
  placeholderBoxClosed: {
    paddingHorizontal: WIDTH * 16,
  },
  placeholderBoxOpen: {
    paddingHorizontal: WIDTH * 16,
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: HEIGHT * 46, //? borderBottomWidth = 0 이 되므로 이것을 고려하여 높이도 조정
  },
  image: {
    width: WIDTH * 16,
    height: HEIGHT * 16,
    marginLeft: "auto",
  },
  text: {
    marginLeft: WIDTH * 8,
  },
  addNewPetBox: {
    height: HEIGHT * 52,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderColor: LBG,
    justifyContent: "center",
    alignItems: "center",
  },
})
