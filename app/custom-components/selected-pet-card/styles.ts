import { StyleSheet } from "react-native"
import { WIDTH, HEIGHT } from "../../theme"

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
    // backgroundColor: "yellow",
    justifyContent: "center",
  },
  image: {
    width: WIDTH * 16,
    height: HEIGHT * 16,
  },
  imageContainer: {
    alignSelf: "center",
    marginLeft: "auto",
  },
})
