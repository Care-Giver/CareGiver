import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    width: 175,
    height: 230,

    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 16,

    borderRadius: 13,

    backgroundColor: "white",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8.2,
  },
  star: {
    width: 13,
    height: 12,
  },
  starMargin: {
    marginLeft: 2.9,
  },
  //TODO: desc 가 2줄이면 marginTop 조정해야 함...
  image: {
    width: 142,
    height: 108,
    marginTop: 24,
    borderRadius: 9,
    resizeMode: "cover",
  },
})
