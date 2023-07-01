import { DEVICE_SCREEN_WIDTH, LIGHT_LINE, palette } from "#theme"
import { StyleSheet } from "react-native"
import { BASIC_BACKGROUND_PADDING_WIDTH } from "#components"
export const styles = StyleSheet.create({
  root: { alignSelf: "center" },
  modalPetWeight: {
    width: DEVICE_SCREEN_WIDTH - 2 * BASIC_BACKGROUND_PADDING_WIDTH,
    paddingTop: 36,
    paddingBottom: 16,
    paddingHorizontal: 16,
    height: 226,
    borderRadius: 8,
    backgroundColor: palette.white,
  },
})
