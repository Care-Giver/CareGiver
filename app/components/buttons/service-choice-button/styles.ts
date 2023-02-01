import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    width: 175,
    height: 205,

    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,

    borderRadius: 8,

    backgroundColor: "white",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleImage: {
    width: 16,
    height: 16,
  },
  subtitle: {
    marginTop: 8,
    lineHeight: 18,
  },
  image: {
    width: 142,
    height: 88,
    marginTop: 20,
  },
})
