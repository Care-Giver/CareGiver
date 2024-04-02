import { GIVER_CASUAL_NAVY, LIGHT_LINE, palette } from "#theme"
import { StyleProp, StyleSheet, ViewStyle } from "react-native"

// * 버튼이 비활성화 상태일 때 적용되는 스타일
export const inactiveStyle: StyleProp<ViewStyle> = {
  borderColor: LIGHT_LINE,
  borderWidth: 2,
  backgroundColor: palette.white,
}

// * 버튼이 활성화 상태일 때 적용되는 스타일
export const activeStyle: StyleProp<ViewStyle> = {
  ...inactiveStyle,
  borderColor: GIVER_CASUAL_NAVY,
}

// * 버튼이 활성화 상태일 때 적용되는 스타일
export const alwaysActiveStyle: StyleProp<ViewStyle> = {
  ...inactiveStyle,
  borderColor: GIVER_CASUAL_NAVY,
  backgroundColor: GIVER_CASUAL_NAVY,
}

export const styles = StyleSheet.create({
  root: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  x_container: {
    height: "100%",
    paddingRight: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  x_img: {
    width: 10,
    height: 10,
  },
})
