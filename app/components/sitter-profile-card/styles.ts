import { StyleSheet } from "react-native"
import { WIDTH, HEIGHT } from "~/app/theme"

export const styles = StyleSheet.create({
  container: {
    width: WIDTH * 358,
    height: HEIGHT * 110,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileImg: {
    width: WIDTH * 128,
    height: HEIGHT * 110,
    borderRadius: 8,
  },
  infoContainer: {
    width: WIDTH * 214,
    height: HEIGHT * 102,

    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoWrapper: {
    width: WIDTH * 166,
    height: HEIGHT * 102,
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: HEIGHT * 4,
  },
  star: {
    width: WIDTH * 13,
    height: HEIGHT * 12,
  },
  likeBtn: {
    width: WIDTH * 28,
    height: HEIGHT * 28,
    resizeMode: "cover",
  },
})
