import { StyleSheet } from "react-native"
import { DEVICE_WINDOW_WIDTH, LBG, LIGHT_LINE } from "#theme"
import { BASIC_BACKGROUND_PADDING_WIDTH } from "#components"

export const styles = StyleSheet.create({
  headerImage: {
    width: DEVICE_WINDOW_WIDTH - BASIC_BACKGROUND_PADDING_WIDTH,
    paddingLeft: BASIC_BACKGROUND_PADDING_WIDTH,
    height: 111,
    resizeMode: "contain",
    alignSelf: "flex-end",
  },
  image: { width: 16, height: 16, alignSelf: "flex-start" },
  text: { marginLeft: 8, lineHeight: 20 },
  addNewPetBox: {
    height: 52,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderColor: LBG,
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

  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: BASIC_BACKGROUND_PADDING_WIDTH,
    right: BASIC_BACKGROUND_PADDING_WIDTH,
  },
})
