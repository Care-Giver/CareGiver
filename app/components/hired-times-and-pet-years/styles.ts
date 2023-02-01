import { LIGHT_LINE } from "#theme"
import { StyleSheet } from "react-native"
import { palette } from "#theme"

export const styles = StyleSheet.create({
  //* 전체가 담기는 큰 컴포넌트 박스
  root: {
    width: 358, //"100%",
    height: 80,
    backgroundColor: palette.white,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: LIGHT_LINE,
    justifyContent: "space-evenly",
  },

  //* 세로 두 줄의 텍스트를 묶는 스타일
  textAlignment: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },

  //* 중간 세로선 divider 스타일
  verticalDivider: {
    width: 2,
    height: 44,
    backgroundColor: LIGHT_LINE,
  },
})
