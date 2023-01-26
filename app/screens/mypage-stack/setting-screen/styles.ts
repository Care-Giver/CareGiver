import { GIVER_CASUAL_NAVY, LIGHT_LINE, color } from "#theme"
import { StyleSheet } from "react-native"
import { BASIC_BACKGROUND_PADDING_WIDTH } from "#components"

export const styles = StyleSheet.create({
  divisionLine: {
    height: 2,
    backgroundColor: LIGHT_LINE,

    marginHorizontal: -2 * BASIC_BACKGROUND_PADDING_WIDTH,
  },
  versionBox: {
    paddingTop: 20,
    paddingBottom: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(17, 17, 17, 0.25)",
  },
  modalView: {
    alignItems: "center",

    paddingTop: 48,
    paddingBottom: 16,

    paddingHorizontal: 16,

    height: 370,

    backgroundColor: color.palette.white,
    borderRadius: 8,
  },
  modalYesBtn: {
    flex: 1,
    alignItems: "center",

    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderWidth: 2,
    borderColor: GIVER_CASUAL_NAVY,

    paddingVertical: 16,
  },
  modalNoBtn: {
    flex: 1,
    alignItems: "center",

    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 2,
    borderColor: GIVER_CASUAL_NAVY,

    backgroundColor: GIVER_CASUAL_NAVY,

    paddingVertical: 16,
  },
})
