import { GIVER_CASUAL_NAVY, CARE_NATURAL_BLUE } from "../../theme/palette"
import { StyleSheet } from "react-native"
import { WIDTH, HEIGHT } from "../../theme"
import { BASIC_BACKGROUND_PADDING_WIDTH } from "../view-component/view-component"

export const styles = StyleSheet.create({
  root: {
    width: WIDTH * 358,
    height: HEIGHT * 121,
    // backgroundColor: "pink",
  },
  profileImage: {
    width: WIDTH * 28,
    height: HEIGHT * 28,
  },
  threeDots: {
    width: WIDTH * 3,
    height: HEIGHT * 14,
  },
  desc: {
    marginTop: HEIGHT * 10,
    // backgroundColor: "yellow",
    // maxWidth: WIDTH * 342,
    marginRight: WIDTH * 13,
  },
})
