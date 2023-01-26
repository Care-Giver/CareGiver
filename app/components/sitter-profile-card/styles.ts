import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    width: 358,
    height: 110,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileImg: {
    width: 128,
    height: 110,
    borderRadius: 8,
  },
  infoContainer: {
    width: 214,
    height: 102,

    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoWrapper: {
    width: 166,
    height: 102,
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
  likeBtn: {
    width: 28,
    height: 28,
    resizeMode: "cover",
  },
})
