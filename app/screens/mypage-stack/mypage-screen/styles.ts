import { LIGHT_LINE } from "#theme"
import { StyleSheet } from "react-native"
import { BASIC_BACKGROUND_PADDING_WIDTH } from "#components"

export const styles = StyleSheet.create({
  divisionLine: {
    height: 2,
    marginHorizontal: -2 * BASIC_BACKGROUND_PADDING_WIDTH,
    backgroundColor: LIGHT_LINE,
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
    height: 129,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  modeChangeBtn: {
    height: 48,

    flexDirection: "row",
    alignItems: "center",
  },
})
