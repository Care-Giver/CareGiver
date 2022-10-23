import { HEIGHT, WIDTH } from "#theme/device-size-constant"
import {
  CARE_NATURAL_BLUE,
  GIVER_CASUAL_NAVY,
  HEAD_LINE,
  LIGHT_LINE,
  palette,
} from "#theme/palette"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  root: {
    paddingHorizontal: WIDTH * 16,
    paddingVertical: HEIGHT * 16,

    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",

    borderRadius: 8,
    borderColor: LIGHT_LINE,
    borderWidth: 1,

    backgroundColor: palette.white,

    // TODO: 그림자 부분 코드 정확하게 기입
    shadowColor: GIVER_CASUAL_NAVY,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    // ! 바텀시트 열릴 때 바텀시트 위를 덮음
    elevation: 1,
  },

  profileImg: {
    width: WIDTH * 142,
    height: HEIGHT * 108,

    padding: 8,

    borderRadius: 9,
    backgroundColor: "red",
  },

  typeBtn: {
    backgroundColor: "rgba(17, 17, 17, 0.5)",
  },

  bookingInfo: {
    // width: WIDTH * 164,
    flex: 1,
    marginLeft: WIDTH * 16,
    flexDirection: "column",
    justifyContent: "space-between",

    paddingVertical: HEIGHT * 7.5,
  },

  likeBtn: {
    width: WIDTH * 28,
    height: HEIGHT * 28,

    marginTop: HEIGHT * -8,
  },

  divisionLine: {
    marginHorizontal: WIDTH * 8,
  },
})
