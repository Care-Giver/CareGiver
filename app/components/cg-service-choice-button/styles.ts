import { DEVICE_SCREEN_WIDTH, WIDTH } from "#theme"
import { WIDTH_INTERVAL } from "app/screens/registration-stack/style-const"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    width: 171,
    height: 199,

    borderRadius: 8,

    backgroundColor: "white",
  },
  image: {
    height: 99,
    width: 171,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 16,
  },
  titleImage: {
    width: 16,
    height: 16,
  },
  subtitle: {
    marginLeft: 20,
    marginTop: 8,
    lineHeight: 18,
  },
})
