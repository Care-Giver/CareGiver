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
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: HEIGHT * 8.2,
  },
  star: {
    width: WIDTH * 13,
    height: HEIGHT * 12,
  },
  starMargin: {
    marginLeft: WIDTH * 2.9,
  },
  //TODO: desc 가 2줄이면 marginTop 조정해야 함...
  image: {
    width: WIDTH * 142,
    height: HEIGHT * 108,
    marginTop: HEIGHT * 24,
    borderRadius: 9,
    resizeMode: "cover",
  },
})
