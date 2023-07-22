import React from "react"
import { ViewStyle, FlexStyle, Platform, KeyboardAvoidingView, StatusBar, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ScreenProps, offsets, presets } from "./screen.props"

export const BASIC_BACKGROUND_PADDING_WIDTH = 16

export const FULL: ViewStyle = { flex: 1 }

export const BASIC_BACKGROUND_PADDING: FlexStyle = {
  paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
}

interface ScreenPropsExtended extends ScreenProps {
  testID?: string
}

/**
 * Screen 는 기본적으로 side edge padding 16px 이 적용되어있습니다 :)
 * 모든 screen 컴포넌트는 해당 컴포넌트가 최상위에 위치해야 합니다.
 * 본 컴포넌트는 scrolling 이 없는 고정된 컴포넌트입니다.
 * scroll 필요시, 자식 컴포넌트로써 ScrollView 를 추가하세요.
 * @param props 추후 type 업데이트 예정
 */
export const Screen = (props: ScreenPropsExtended) => {
  const { unsafe = true, type = "KeyboardAvoidingView", style } = props

  const innerStyle = [FULL, BASIC_BACKGROUND_PADDING, style]
  const preset = presets.fixed
  //! headerShown: true 로 하게되면 iOS 는 스크린과 헤더사이 여백이 생긴다. 이를 보완하기 위해 추가함
  const insets = useSafeAreaInsets()
  const insetStyle = { paddingTop: unsafe ? 0 : insets.top }
  //! custom-header 를 header prop 에 적용시킬때, iOS statusbar 가 흰색에 뭍혀 버린다. 이를 보완하기 위해 추가함
  const statusBar: "dark-content" | "light-content" = Platform.select({
    ios: "dark-content",
    android: "light-content",
  })

  // 기본값 - KeyboardAvoidingView
  if (type === "KeyboardAvoidingView")
    return (
      <KeyboardAvoidingView
        style={preset.outer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
      >
        <StatusBar barStyle={statusBar} />
        <View style={[preset.inner, innerStyle, insetStyle]}>{props.children}</View>
      </KeyboardAvoidingView>
    )
  // View 사용 시
  else {
    return (
      <View style={preset.outer}>
        <StatusBar barStyle={statusBar} />
        <View style={[preset.inner, innerStyle, insetStyle]}>{props.children}</View>
      </View>
    )
  }
}
