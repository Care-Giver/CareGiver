import { StyleSheet } from "react-native"
import { HEIGHT, WIDTH } from "../../../theme"
import { LBG } from "../../../theme/palette"

export const styles = StyleSheet.create({
  cardContainer: {
    marginTop: HEIGHT * 4,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: LBG,
    // borderColor: "red",
    // paddingHorizontal: WIDTH * 10,
  },

  dropdownTitle: {
    flexDirection: "row",
    alignItems: "center",
  },

  dropdownLogo: {
    width: WIDTH * 16,
    height: HEIGHT * 16,
    marginLeft: WIDTH * 4,
  },
})
