import { StyleSheet } from "react-native"

import { LBG } from "#theme"

export const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 4,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: LBG,
    // borderColor: "red",
    // paddingHorizontal: 10,
  },

  dropdownTitle: {
    flexDirection: "row",
    alignItems: "center",
  },

  dropdownLogo: {
    width: 16,
    height: 16,
    marginLeft: 4,
  },
})
