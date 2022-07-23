import { LIGHT_LINE } from "~/app/theme/palette"
import { StyleSheet } from "react-native"
import { WIDTH, HEIGHT, palette } from "~/app/theme"

export const styles = StyleSheet.create({
  image: {
    width: WIDTH * 28,
    height: HEIGHT * 28,
    marginLeft: WIDTH * 16,
  },
  text: {
    marginLeft: WIDTH * 8,
  },
})
