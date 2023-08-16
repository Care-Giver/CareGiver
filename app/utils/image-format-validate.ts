import { images } from "#images"
import { ImageRequireSource, ImageSourcePropType } from "react-native"

const imageFormat = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/

/**
 * 이미지 파일 형식이 올바른지 검사하는 함수
 * @param uri 이미지 형식 검사를 진행할 이미지 uri
 * @returns 이미지 형식이 올바른지 아닌지를 boolean 형태로 반환합니다.
 */
export const imageFormatValidate = (uri: string): boolean => {
  if (new RegExp(imageFormat, "i").test(uri)) return true
  return false
}

/**
 * 프로필 이미지 uri 형식이 올바른지 확인한 뒤,
 * 올바르지 않은 경우 에러 프로필 이미지를 반환하는 함수.
 * imageUri 가 지정되지 않으면, defaultImage 를 반환합니다.
 * @param defaultImage 이미지 uri 가 "없는" 경우에 반환할 이미지 (에러 프로필 이미지보다 우선됩니다)
 * @param size 에러 프로필 이미지의 사이즈를 결정합니다.
 * @param imageUri 이미지 형식 검사를 진행할 이미지 uri
 * @returns ImageSourcePropType
 */
export const profileImageUriHandler = (
  defaultImage: ImageRequireSource,
  size?: "small" | "medium" | "large",
  imageUri?: string | null,
): ImageSourcePropType => {
  if (!imageUri) {
    return defaultImage
  }

  const isValidated = imageFormatValidate(imageUri)
  if (!isValidated) {
    switch (size) {
      case "small":
        return images.error_profile_small
      case "medium":
        return images.error_profile_medium
      case "large":
        return images.error_profile_large

      default:
        return images.error_profile_large
    }
  }

  return { uri: imageUri }
}
