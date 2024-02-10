import { WIDTH } from "#theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: 110,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileImg: {
    width: 128,
    height: 110,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  infoWrapper: {
    marginLeft: 16 * WIDTH,
    height: "100%",
    flex: 1,
    paddingTop: 8,
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  star: {
    width: 13,
    height: 12,
  },
  likeContainer: {
    position: "absolute",
    top: 4,
    right: 4,
  },
  likeBtn: {
    width: 28,
    height: 28,
    resizeMode: "cover",
  },
})
