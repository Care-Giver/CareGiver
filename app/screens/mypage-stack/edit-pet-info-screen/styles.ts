import { DEVICE_SCREEN_WIDTH, LBG, LIGHT_LINE, palette } from "#theme"
import { StyleSheet } from "react-native"
import { BASIC_BACKGROUND_PADDING_WIDTH } from "#components"
export const styles = StyleSheet.create({
  petDescTextBox: {
    width: "auto",
    height: "auto",
    borderRadius: 8,
    backgroundColor: LBG,
    marginHorizontal: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  saveBox: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 0,
    paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
  },
})
