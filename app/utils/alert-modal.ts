import { Alert } from "react-native"

/**
 * 네이티브 Alert 모달을 표출합니다.
 *  @param title 모달의 제목
 *  @param message 모달의 설명
 */
export const alertModal = (title: string, message: string): void => {
  Alert.alert(title, message)
}
