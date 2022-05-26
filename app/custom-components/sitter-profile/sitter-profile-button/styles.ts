import { StyleSheet } from "react-native"
import { WIDTH, HEIGHT } from "../../../theme"

export const styles = StyleSheet.create({
  container: {
    width: WIDTH * 175,
    height: HEIGHT * 230,

    paddingHorizontal: WIDTH * 16,
    paddingTop: HEIGHT * 18,
    paddingBottom: HEIGHT * 16,

    borderRadius: 13,

    backgroundColor: "white",
  },
  ratingsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: HEIGHT * 8.2,
  },
  star: {
    width: WIDTH * 13.65,
    height: HEIGHT * 12,
  },
  starMargin: {
    marginLeft: WIDTH * 2.9,
  },
  image: {
    marginTop: HEIGHT * 24,

    resizeMode: "contain",
  },
})
