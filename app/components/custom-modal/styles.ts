import { color, GIVER_CASUAL_NAVY, HEIGHT, WIDTH } from "#theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
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
