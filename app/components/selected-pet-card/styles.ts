import { StyleSheet } from "react-native"

import { CARE_NATURAL_BLUE } from "#theme"

export const styles = StyleSheet.create({
  root: {
    width: 318,
    height: 78,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    // backgroundColor: "red",
  },
  infoContainer: {
    width: "auto",
    height: 72,
    marginLeft: 17,
    // backgroundColor: "yellow",
    justifyContent: "center",
  },
  deleteButton: {
    width: 16,
    height: 16,
  },
  deleteButtonContainer: {
    alignSelf: "center",
    marginLeft: "auto",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    // backgroundColor: CARE_NATURAL_BLUE,
    alignSelf: "center",
  },
})
