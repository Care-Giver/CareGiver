import { useEffect, useState } from "react"
import { Keyboard, Platform } from "react-native"

/**
 * 소프트웨어 키보드가 열렸는지 여부를 나타내는 불리언 값을 반환합니다.
 * useKeyboard() 훅보다 훨씬 나음.
 * @returns boolean 열렸을 경우 true, 아니면 false
 */
export function useKeyboardShown() {
  // * 키보드 open 여부
  const [isKeyboardShown, setIsKeyboardShown] = useState<boolean>(null)

  // * keyboard 노출시 프로필, 별점, 사진 입력 숨기기
  useEffect(() => {
    const showInputs = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow", // android는 keyboardWillShow를 지원하지 않는다.
      () => {
        setIsKeyboardShown(true)
      },
    )

    const hideInputs = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide", // android는 keyboardWillHide를 지원하지 않는다.
      () => {
        setIsKeyboardShown(false)
      },
    )

    return () => {
      showInputs.remove()
      hideInputs.remove()
    }
  }, [])

  return isKeyboardShown
}
