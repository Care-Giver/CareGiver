import { Platform, TextStyle } from "react-native"

//! iOS 설정시, font family name 말고,
//! Android 때 처럼 file name 으로 해도 적용 잘 된다 :)

export const PRE_14: TextStyle = {
  fontFamily: Platform.select({
    ios: "Pretendard",
    android: "Pretendard-Regular",
  }),
  fontSize: 14,
  includeFontPadding: false,
}

export const POP_14: TextStyle = {
  fontFamily: Platform.select({
    ios: "Poppins",
    android: "Poppins-Regular",
  }),
  fontSize: 14,
  includeFontPadding: false,
}
