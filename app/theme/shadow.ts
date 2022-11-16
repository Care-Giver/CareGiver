import { CARE_NATURAL_BLUE, GIVER_CASUAL_NAVY } from "./palette"
import { Platform, ShadowStyleIOS } from "react-native"
import { WIDTH, HEIGHT } from "./device-size-constant"

// * Shadows
//? shadowRadius 는 Blur 에 (그나마..) 대응된다 https://blog.logrocket.com/applying-box-shadows-in-react-native/
export const SHADOW_1: ShadowStyleIOS = Platform.select({
  ios: {
    shadowColor: GIVER_CASUAL_NAVY,
    shadowOpacity: 0.16,
    shadowOffset: {
      width: WIDTH * 0,
      height: HEIGHT * 0,
    },
    shadowRadius: 4,
  },
  android: { elevation: 4 },
})

export const SHADOW_2: ShadowStyleIOS = Platform.select({
  ios: {
    shadowColor: CARE_NATURAL_BLUE,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: WIDTH * 0,
      height: HEIGHT * 0,
    },
    shadowRadius: 6,
  },
  android: { elevation: 6 },
})
