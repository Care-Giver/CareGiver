import { ViewStyle, FlexStyle, Platform } from "react-native"
import React from "react"
import { CARE_NATURAL_BLUE, CARE_SOFT_YELLOW, isWeb, palette, STANDARD_WIDTH, WIDTH } from "#theme"
import { Screen } from "../ignite-basics/screen/screen"
import { isNonScrolling } from "../ignite-basics/screen/screen.presets"

export const BASIC_BACKGROUND_PADDING_WIDTH = WIDTH * 16

const FULL: ViewStyle = isWeb
  ? {
      alignSelf: "center",
      flex: 1,
      height: "100%",
      width: STANDARD_WIDTH,
      backgroundColor: "white",
    }
  : { flex: 1 }

const FULL_WITH_SCROLLING: ViewStyle = isWeb
  ? {
      alignSelf: "center",
      flex: 1,
      height: "100%",
      width: STANDARD_WIDTH,
      backgroundColor: "white",
    }
  : { width: "100%", height: "auto" }

const BASIC_BACKGROUND_PADDING: FlexStyle = {
  paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
}

export const ScreenRootView = (props) => {
  return (
    <Screen
      preset={props.preset}
      style={
        isNonScrolling(props.preset)
          ? [FULL, BASIC_BACKGROUND_PADDING]
          : [FULL_WITH_SCROLLING, BASIC_BACKGROUND_PADDING]
      }
      //! custom-header 를 header prop 에 적용시킬때, iOS statusbar 가 흰색에 뭍혀 버린다. 이를 보완하기 위해 추가함
      statusBar={Platform.select({
        ios: "dark-content",
        android: "light-content",
      })}
      //! headerShown: true 로 하게되면 iOS 는 스크린과 헤더사이 여백이 생긴다. 이를 보완하기 위해 추가함
      unsafe={true}
      {...props}
    />
  )
}
