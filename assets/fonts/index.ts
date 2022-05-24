import { Platform, TextStyle } from "react-native"

//! iOS 설정시, font family name 말고,
//! Android 때 처럼 file name 으로 해도 적용 잘 된다 :)

export const PRETENDARD_REGULAR: string = Platform.select({
  ios: "Pretendard-Regular",
  android: "Pretendard-Regular",
})

export const PRETENDARD_BOLD: string = Platform.select({
  ios: "Pretendard-Bold",
  android: "Pretendard-Bold",
})

export const PRETENDARD_MEDIUM: string = Platform.select({
  ios: "Pretendard-Medium",
  android: "Pretendard-Medium",
})

export const POPPINS_REGULAR: string = Platform.select({
  ios: "Poppins-Regular",
  android: "Poppins-Regular",
})

export const POPPINS_SEMIBOLD: string = Platform.select({
  ios: "Poppins-SemiBold",
  android: "Poppins-SemiBold",
})
