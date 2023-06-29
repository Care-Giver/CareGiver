import * as React from "react"
import { KeyboardAvoidingView, Platform, StatusBar, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ScreenProps } from "./screen.props"
import { offsets, presets } from "./screen.presets"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

const isIos = Platform.OS === "ios"

function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets()
  const preset = presets.fixed
  const style = props.style || {}
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

  return (
    <KeyboardAwareScrollView style={preset.outer}>
      <StatusBar barStyle={props.statusBar || "light-content"} />
      <View style={[preset.inner, style, insetStyle]}>{props.children}</View>
    </KeyboardAwareScrollView>
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
