import { StyleSheet } from "react-native"
import { WIDTH, HEIGHT } from "#theme"
import { CARE_NATURAL_BLUE } from "#theme"

export const styles = StyleSheet.create({
  root: {
    width: WIDTH * 318,
    height: HEIGHT * 78,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    // backgroundColor: "red",
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
