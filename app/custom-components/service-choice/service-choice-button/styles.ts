import { StyleSheet } from "react-native"
import { WIDTH, HEIGHT } from "../../../theme"

export const styles = StyleSheet.create({
  container: {
    width: WIDTH * 175,
    height: HEIGHT * 205,

    paddingHorizontal: WIDTH * 16,
    paddingTop: HEIGHT * 20,
    paddingBottom: HEIGHT * 16,

    borderRadius: 8,

    backgroundColor: "white",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleImage: {
    width: WIDTH * 16,
    height: HEIGHT * 16,
  },
  subtitle: {
    marginTop: HEIGHT * 8,
  },
  image: {
    width: WIDTH * 142,
    height: HEIGHT * 88,
    marginTop: HEIGHT * 20,
  },
})
