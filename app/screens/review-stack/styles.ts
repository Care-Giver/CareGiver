import { StyleSheet } from "react-native"
import { GIVER_CASUAL_NAVY, LIGHT_LINE, palette } from "../../theme"

export const reviewStyles = StyleSheet.create({
  profileCard: {
    width: 358,
    borderRadius: 8,
    borderColor: LIGHT_LINE,
    borderStyle: "solid",
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 16,
  },

  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  profileInfo: {
    flexDirection: "column",
  },

  name: {
    flexDirection: "row",
    marginBottom: 8,
  },

  petsitterTypeBtn: {
    borderColor: GIVER_CASUAL_NAVY,
    borderWidth: 2,
    backgroundColor: palette.white,
  },

  customRaitingBar: {
    flexDirection: "row",
    marginTop: 36,
    // paddingHorizontal: 16,
  },

  starImg: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    marginRight: 10,
  },
})
