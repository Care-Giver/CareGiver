import { CARE_NATURAL_BLUE } from "#theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 16,
  },

  secondTitleContainer: {
    height: 21,
    marginTop: 6,
    display: "flex",
    flexDirection: "row",
    overflow: "visible",
  },

  underline: {
    borderBottomColor: CARE_NATURAL_BLUE,
    borderBottomWidth: 6,
  },

  priceContainer: {
    marginTop: 24,
  },

  testUnderline: {
    height: "100%",
    borderBottomColor: `rgba(177, 201, 222, 0.6)`,
    borderBottomWidth: 6,
  },

  testColor: {
    color: "transparent",
  },
})
