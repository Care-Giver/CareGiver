import { HEIGHT } from "#theme"
import { LIGHT_LINE } from "#theme"
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
})
