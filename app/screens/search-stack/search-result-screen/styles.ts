import { StyleSheet } from "react-native"
import { LBG, palette } from "#theme"
import { BASIC_BACKGROUND_PADDING_WIDTH } from "#components"

export const styles = StyleSheet.create({
  filterTextContainer: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    flexDirection: "row",
    // backgroundColor: "red",
  },

  filterImg: {
    width: 16,
    height: 16,
  },

  bottomSheetContainer: {
    paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
  },

  bottomSheetTitleBox: {
    paddingVertical: 12,
    justifyContent: "space-between",
  },

  divisionLine: {
    backgroundColor: LBG,
    height: 2,
  },
})
