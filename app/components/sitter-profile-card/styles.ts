import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 358,
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
    // width: 214,
    height: 102,

    flexDirection: "row",
    alignItems: "center",
  },
  infoWrapper: {
    marginLeft: 16,

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
  likeContainer: {
    height: 102,
  },
  likeBtn: {
    width: 28,
    height: 28,
    resizeMode: "cover",
  },
})
