import { HEIGHT, WIDTH, GIVER_CASUAL_NAVY, LIGHT_LINE, color } from "#theme"
import { StyleSheet } from "react-native"
import { BASIC_BACKGROUND_PADDING_WIDTH } from "#components"

export const styles = StyleSheet.create({
  divisionLine: {
    height: HEIGHT * 2,
    backgroundColor: LIGHT_LINE,

    marginHorizontal: -2 * BASIC_BACKGROUND_PADDING_WIDTH,
  },
  versionBox: {
    paddingTop: HEIGHT * 20,
    paddingBottom: HEIGHT * 16,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(17, 17, 17, 0.25)",
  },
  modalView: {
    alignItems: "center",

    paddingTop: HEIGHT * 48,
    paddingBottom: HEIGHT * 16,

    paddingHorizontal: WIDTH * 16,

    height: HEIGHT * 370,

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

    paddingVertical: HEIGHT * 16,
  },
  modalNoBtn: {
    flex: 1,
    alignItems: "center",

    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 2,
    borderColor: GIVER_CASUAL_NAVY,

    backgroundColor: GIVER_CASUAL_NAVY,

    paddingVertical: HEIGHT * 16,
  },
})
