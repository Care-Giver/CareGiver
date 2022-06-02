import { StyleSheet } from "react-native"
import { WIDTH, HEIGHT } from "../../theme"
import { CARE_NATURAL_BLUE } from "../../theme/palette"

export const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: HEIGHT * 78,
    backgroundColor: "#FFFFFF",
    // backgroundColor: "red",
    paddingHorizontal: WIDTH * 16,
  },
  infoContainer: {
    width: "auto",
    height: HEIGHT * 72,
    marginLeft: WIDTH * 17,
    // backgroundColor: "yellow",
    justifyContent: "center",
  },
  deleteButton: {
    width: WIDTH * 16,
    height: HEIGHT * 16,
  },
  deleteButtonContainer: {
    alignSelf: "center",
    marginLeft: "auto",
  },
  image: {
    width: WIDTH * 60,
    height: HEIGHT * 60,
    borderRadius: 8,
    // backgroundColor: CARE_NATURAL_BLUE,
    alignSelf: "center",
  },
})
