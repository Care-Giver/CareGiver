import { GIVER_CASUAL_NAVY, LIGHT_LINE, WIDTH, palette } from "../../theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  root: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 16,

    flexDirection: "row",
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
    // width: 12 * WIDTH,
    // width: "auto",
    height: 108,
    flex: 1,
    padding: 8,
  },

  typeBtn: {
    backgroundColor: "rgba(17, 17, 17, 0.5)",
    borderWidth: 0,
  },

  bookingInfo: {
    width: "auto",
    flex: 2,
    marginLeft: 16 * WIDTH,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 7.5,
  },

  likeBtn: {
    width: 28,
    height: 28,

    marginTop: -8,
  },

  divisionLine: {
    marginHorizontal: 8,
  },
})
