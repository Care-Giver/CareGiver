import { StyleSheet } from "react-native"
import { WIDTH, HEIGHT } from "@theme/index"
import { LBG } from "@theme/palette"

const ROOT_HEIGHT = HEIGHT * 52
const BORDER_BOTTOM_WIDTH = 2

export const PET_ITEM_HEIGHT = ROOT_HEIGHT

export const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: ROOT_HEIGHT,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: WIDTH * 10,
    borderBottomWidth: BORDER_BOTTOM_WIDTH,
    borderColor: LBG,
  },
  nameContainer: {
    width: WIDTH * 74.32,
    height: ROOT_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "orange",
  },
  sizeContainer: {
    width: WIDTH * 56.32,
    height: ROOT_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "pink",
  },
  speciesContainer: {
    width: WIDTH * 62.32,
    height: ROOT_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  ageContainer: {
    width: WIDTH * 44.32,
    height: ROOT_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  sexContainer: {
    width: WIDTH * 44.32,
    height: ROOT_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxContainer: {
    width: WIDTH * 56.32,
    height: ROOT_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "cyan",
  },
})
