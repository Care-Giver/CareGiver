import { GIVER_CASUAL_NAVY, LIGHT_LINE } from "#theme"
import { StyleSheet } from "react-native"
import { BASIC_BACKGROUND_PADDING_WIDTH } from "#components"

export const styles = StyleSheet.create({
  sidePadding: {
    paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
  },

  profileCard: {
    paddingVertical: 20,
  },

  loginCard: {
    height: 112,

    justifyContent: "center",
    alignItems: "center",
  },

  profileImg: {
    width: 72,
    height: 72,

    borderColor: LIGHT_LINE,
    borderWidth: 2,
    borderRadius: 100,
  },

  profileNameCard: {
    marginLeft: 12,
  },

  petContainer: {
    paddingTop: 8,
    paddingBottom: 20,
  },

  petListContainer: {
    width: "100%",
    height: 129,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  addPet: {
    height: 129,
    marginTop: 8,
    backgroundColor: "white",
    borderColor: GIVER_CASUAL_NAVY,
    borderWidth: 2,
  },

  modeChangeBtn: {
    height: 48,

    flexDirection: "row",
    alignItems: "center",
  },
})
