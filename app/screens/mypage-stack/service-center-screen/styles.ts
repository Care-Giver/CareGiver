import { LIGHT_LINE } from "#theme"
import { StyleSheet } from "react-native"
import { BASIC_BACKGROUND_PADDING_WIDTH } from "#components"

export const styles = StyleSheet.create({
  divisionLine: {
    height: 2,
    backgroundColor: LIGHT_LINE,
    marginHorizontal: -2 * BASIC_BACKGROUND_PADDING_WIDTH,
  },
})
