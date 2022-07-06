import { LIGHT_LINE } from "../../theme/palette"
import { StyleSheet } from "react-native"
import { WIDTH, HEIGHT, palette } from "../../theme"

export const styles = StyleSheet.create({
  //*전체가 담기는 큰 컴포넌트 박스
  ROW_ROUNDED_LARGE_BOX: {
    width: WIDTH * 358, //"100%",
    height: HEIGHT * 80,
    backgroundColor: palette.white,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: LIGHT_LINE,
    justifyContent: "space-evenly",
  },

  //* 세로 두 줄의 텍스트를 묶는 스타일

  TEXT_ALIGNMENT: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },

  //* 중간 세로선 divider 스타일

  VERTICAL_DIVIDER: {
    width: WIDTH * 2,
    height: HEIGHT * 44,
    backgroundColor: LIGHT_LINE,
  },
})
