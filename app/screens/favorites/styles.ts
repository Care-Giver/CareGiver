import { BASIC_BACKGROUND_PADDING_WIDTH } from "#components"
import { GIVER_CASUAL_NAVY, LBG, LIGHT_LINE, MIDDLE_LINE } from "#theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  filterBox: {
    paddingTop: 20,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

  radioImg: {
    width: 16,
    height: 16,
  },

  btnContainer: {
    // marginBottom: 34,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
  },

  submitBtn: {
    marginTop: 20,
    paddingVertical: 18,

    width: "100%",

    backgroundColor: GIVER_CASUAL_NAVY,
    borderRadius: 8,

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
  },
  hidden: {
    width: 0,
    height: 0,
  },
})
