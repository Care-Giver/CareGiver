import { BASIC_BACKGROUND_PADDING_WIDTH } from "#components"
import { LBG } from "#theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  filterBox: {
    paddingVertical: 12,
    justifyContent: "space-between",
  },

  filterImg: {
    width: 16,
    height: 16,

    marginLeft: 5,
  },

  divisionLine: {
    backgroundColor: LBG,
    height: 2,
  },

  bottomSheetContainer: {
    paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
  },

  bottomSheetTitleBox: {
    paddingVertical: 12,
    justifyContent: "space-between",
  },
})
