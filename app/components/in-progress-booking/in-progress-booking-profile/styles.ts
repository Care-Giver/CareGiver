import { WIDTH } from "#theme"
import { StyleSheet } from "react-native"

const PROFILE_IMG_WIDTH = 142 * WIDTH

export const styles = StyleSheet.create({
  //   root: {
  //     flexDirection: "row",
  //   },
  profileImg: {
    width: PROFILE_IMG_WIDTH,
    height: 108,
    borderRadius: 9,
    backgroundColor: "black",
  },
  infoRoot: {
    marginLeft: 18 * WIDTH,
    flex: 1,
  },
  infoBox: {
    marginTop: 10,
  },
})
