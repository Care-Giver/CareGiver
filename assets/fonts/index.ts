import { Platform, TextStyle } from "react-native"

//! iOS 설정시, font family name 말고,
//! Android 때 처럼 file name 으로 해도 적용 잘 된다 :)

export const PRE_14: TextStyle = {
  fontFamily: Platform.select({
    ios: "Pretendard-Regular",
    android: "Pretendard-Regular",
  }),
  fontSize: 14,
  includeFontPadding: false,
}

export const PRE_B_14: TextStyle = {
  fontFamily: Platform.select({
    ios: "Pretendard-Bold",
    android: "Pretendard-Bold",
  }),
  fontSize: 14,
  includeFontPadding: false,
}

export const PRE_M_14: TextStyle = {
  fontFamily: Platform.select({
    ios: "Pretendard-Medium",
    android: "Pretendard-Medium",
  }),
  fontSize: 14,
  includeFontPadding: false,
}

export const POP_14: TextStyle = {
  fontFamily: Platform.select({
    ios: "Poppins-Regular",
    android: "Poppins-Regular",
  }),
  fontSize: 14,
  includeFontPadding: false,
}

export const POP_SB_14: TextStyle = {
  fontFamily: Platform.select({
    ios: "Poppins-SemiBold",
    android: "Poppins-SemiBold",
  }),
  fontSize: 14,
  includeFontPadding: false,
}
