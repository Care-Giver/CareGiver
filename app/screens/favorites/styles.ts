import { BASIC_BACKGROUND_PADDING_WIDTH } from "#components"
import { LBG, MIDDLE_LINE } from "#theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  filterBox: {
    paddingTop: 20,
    paddingBottom: 12,
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

  radioContainer: {
    width: 172,
    padding: 14.5,

    justifyContent: "center",
    alignItems: "center",

    borderColor: MIDDLE_LINE,
    borderWidth: 2,
    borderRadius: 9,
  },
})
