import { LBG } from "#theme"
import { StyleSheet } from "react-native"

export const commonStyles = StyleSheet.create({
  titleContainer: {
    marginTop: 16,
  },

  secondTitleContainer: {
    marginTop: 6,
    display: "flex",
    flexDirection: "row",
    overflow: "visible",
  },

  textInput: {
    marginTop: 6,
    paddingVertical: 4,
  },

  descriptionContainer: {
    marginTop: 16,

    paddingVertical: 12,
    paddingHorizontal: 16,

    backgroundColor: LBG,

    borderRadius: 4,
  },
})
