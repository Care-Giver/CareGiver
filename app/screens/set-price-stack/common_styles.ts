import { LBG } from "#theme"
import { StyleSheet } from "react-native"

export const common_styles = StyleSheet.create({
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

  priceContainer: {
    marginTop: 24,
  },

  textInput: {
    marginTop: 6,
    paddingVertical: 4,
  },

  descriptionContainer: {
    marginTop: 24,

    paddingVertical: 12,
    paddingHorizontal: 16,

    backgroundColor: LBG,

    borderRadius: 4,
  },
})
