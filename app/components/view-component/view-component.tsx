import { View, Text, ViewStyle, FlexStyle } from "react-native"
import React from "react"
import { palette, WIDTH } from "../../theme"
import { Screen } from "../screen/screen"

const BASIC_BACKGROUND_PADDING: FlexStyle = {
  paddingHorizontal: WIDTH * 16,
}

export const BackgroundRootView = (props) => {
  const preset = { props }

  return (
    <Screen
      preset={preset}
      backgroundColor={palette.white}
      style={[BASIC_BACKGROUND_PADDING]}
      {...props}
    />
  )
}

// export const TEST_VIEW = (props) => {
//   const preset = { props }

//   return (
//     <Screen
//       preset={preset}
//       backgroundColor={palette.white}
//       style={[BASIC_BACKGROUND_PADDING]}
//       {...props}
//     />
//   )
// }
