import { useEffect, useState } from "react"
import { KeyboardEvents } from "react-native-keyboard-controller"

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
    const show = KeyboardEvents.addListener("keyboardWillShow", (e) => {
      // place your code here
      setIsKeyboardShown(true)
    })

    const hide = KeyboardEvents.addListener("keyboardWillHide", (e) => {
      setIsKeyboardShown(false)
    })

    return () => {
      show.remove()
      hide.remove()
    }
  }, [])

  return isKeyboardShown
}
