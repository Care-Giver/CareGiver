import { CARE_NATURAL_BLUE, GIVER_CASUAL_NAVY } from "./palette"
import { Platform, ViewStyle } from "react-native"
/**
 * [파일 설명]
 * 이 파일에서는 앱 UI 내 사용되는 모든 그림자 효과들을 상수로써 정리한 파일입니다.
 *
 * Android 와 iOS 는 그림자 효과 적용에 한계가 있습니다.
 * iOS 는 그림자 커스터마이징이 자유로우며, 다채롭습니다.
 * 반면에, Android 는 기본적으로, 오직 elevation 으로만 그림자 효과를 줄 수 있습니다.
 * 이러한 한계를 이해하고 사용해주시기 바랍니다.
 *
 * [참고자료]
 * - https://reactnative.dev/docs/shadow-props
 * - shadowRadius 는 Blur 에 (그나마..) 대응된다 https://blog.logrocket.com/applying-box-shadows-in-react-native/
 */

/**
 * 그림자효과 1:
 * color #00206C + radius 4pt + opacity 0.16
 */
export const SHADOW_1: ViewStyle = Platform.select({
  android: { elevation: 4, shadowColor: GIVER_CASUAL_NAVY },

  ios: {
    shadowColor: GIVER_CASUAL_NAVY,
    shadowOpacity: 0.16,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
  },
})

/**
 * 그림자효과 2:
 * color #B1C9DE + radius 6pt + opacity 0.2
 */
export const SHADOW_2: ViewStyle = Platform.select({
  android: { elevation: 6, shadowColor: CARE_NATURAL_BLUE },

  ios: {
    shadowColor: CARE_NATURAL_BLUE,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 6,
  },
})
