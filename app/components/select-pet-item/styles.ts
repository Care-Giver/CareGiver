import { StyleSheet } from "react-native"

import { LBG } from "#theme"

const ROOT_HEIGHT = 52
const BORDER_BOTTOM_WIDTH = 2

export const PET_ITEM_HEIGHT = ROOT_HEIGHT

export const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: ROOT_HEIGHT,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    borderBottomWidth: BORDER_BOTTOM_WIDTH,
    borderColor: LBG,
  },
  nameContainer: {
    width: 74.32,
    height: ROOT_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "orange",
  },
  sizeContainer: {
    width: 56.32,
    height: ROOT_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "pink",
  },
  speciesContainer: {
    width: 62.32,
    height: ROOT_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  ageContainer: {
    width: 44.32,
    height: ROOT_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  sexContainer: {
    width: 44.32,
    height: ROOT_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxContainer: {
    width: 56.32,
    height: ROOT_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "cyan",
  },
})
