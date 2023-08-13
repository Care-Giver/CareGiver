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
