import { DEVICE_SCREEN_WIDTH, palette } from "#theme"
import { StyleSheet } from "react-native"
import { BASIC_BACKGROUND_PADDING_WIDTH } from "#components"
export const styles = StyleSheet.create({
  root: { alignSelf: "center" },
  modalPetBirthday: {
    width: DEVICE_SCREEN_WIDTH - 2 * BASIC_BACKGROUND_PADDING_WIDTH,
    paddingTop: 36,
    paddingBottom: 16,
    paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
    height: 226,
    borderRadius: 8,
    backgroundColor: palette.white,
  },
  divisionLine: { marginTop: 4, marginBottom: 4 },
})
