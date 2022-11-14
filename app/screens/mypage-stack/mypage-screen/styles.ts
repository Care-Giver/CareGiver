import { HEIGHT, WIDTH } from "#theme/device-size-constant"
import { LIGHT_LINE } from "#theme/palette"
import { StyleSheet } from "react-native"
import { BASIC_BACKGROUND_PADDING_WIDTH } from "#components"

export const styles = StyleSheet.create({
  divisionLine: {
    height: HEIGHT * 2,
    marginHorizontal: -2 * BASIC_BACKGROUND_PADDING_WIDTH,
    backgroundColor: LIGHT_LINE,
  },

  profileCard: {
    paddingVertical: HEIGHT * 20,
  },

  loginCard: {
    height: HEIGHT * 112,

    justifyContent: "center",
    alignItems: "center",
  },

  profileImg: {
    width: WIDTH * 72,
    height: HEIGHT * 72,

    borderColor: LIGHT_LINE,
    borderWidth: 2,
    borderRadius: 100,
  },

  profileNameCard: {
    marginLeft: WIDTH * 12,
  },

  petContainer: {
    paddingTop: HEIGHT * 8,
    paddingBottom: HEIGHT * 20,
  },

  petListContainer: {
    height: HEIGHT * 129,
    marginTop: HEIGHT * 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  modeChangeBtn: {
    height: HEIGHT * 48,

    flexDirection: "row",
    alignItems: "center",
  },
})
