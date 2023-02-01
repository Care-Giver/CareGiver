import { CARE_NATURAL_BLUE, GIVER_CASUAL_NAVY } from "./palette"
import { Platform, ShadowStyleIOS } from "react-native"

// * Shadows
//? shadowRadius 는 Blur 에 (그나마..) 대응된다 https://blog.logrocket.com/applying-box-shadows-in-react-native/
export const SHADOW_1: ShadowStyleIOS = Platform.select({
  android: { elevation: 4 },

  ios: {
    shadowColor: GIVER_CASUAL_NAVY,
    shadowOpacity: 0.16,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
  },

  web: {
    shadowColor: GIVER_CASUAL_NAVY,
    shadowOpacity: 0.16,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 4,
  },
})

export const SHADOW_2: ShadowStyleIOS = Platform.select({
  android: { elevation: 6 },

  ios: {
    shadowColor: CARE_NATURAL_BLUE,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 6,
  },

  web: {
    shadowColor: CARE_NATURAL_BLUE,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 6,
  },
})
