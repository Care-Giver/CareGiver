import * as React from "react"
import { KeyboardAvoidingView, Platform, StatusBar, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ScreenProps } from "./screen.props"
import { offsets, presets } from "./screen.presets"

const isIos = Platform.OS === "ios"

function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets()
  const preset = presets.fixed
  const style = props.style || {}
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }
  const type = props?.type || "KeyboardAvoidingView"

  // 기본값 - KeyboardAvoidingView
  if (type === "KeyboardAvoidingView")
    return (
      <KeyboardAvoidingView
        style={preset.outer}
        behavior={isIos ? "padding" : undefined}
        keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
      >
        <StatusBar barStyle={props.statusBar || "light-content"} />
        <View style={[preset.inner, style, insetStyle]}>{props.children}</View>
      </KeyboardAvoidingView>
    )
  // View 사용 시
  else if (type === "View")
    return (
      <View style={preset.outer}>
        <StatusBar barStyle={props.statusBar || "light-content"} />
        <View style={[preset.inner, style, insetStyle]}>{props.children}</View>
      </View>
    )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  return <ScreenWithoutScrolling {...props} />
}
