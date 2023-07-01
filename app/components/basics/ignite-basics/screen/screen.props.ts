import React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { KeyboardOffsets, ScreenPresets } from "./screen.presets"

/**
 * KeyboardAvoidingView가 포함된 ScreenRootView를 사용
 * 포함되지 않고, View만 사용되는 ScreenRootView 사용
 */
type Type = "KeyboardAvoidingView" | "View"

export interface ScreenProps {
  /**
   * Children components.
   */
  children?: React.ReactNode

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  /**
   * One of the different types of presets.
   */
  preset?: ScreenPresets

  /**
   * An optional background color
   */
  backgroundColor?: string

  /**
   * An optional status bar setting. Defaults to light-content.
   */
  statusBar?: "light-content" | "dark-content"

  /**
   * Should we not wrap in SafeAreaView? Defaults to false.
   */
  unsafe?: boolean

  /**
   * By how much should we offset the keyboard? Defaults to none.
   */
  keyboardOffset?: KeyboardOffsets

  /**
   * Should keyboard persist on screen tap. Defaults to handled.
   * Only applies to scroll preset.
   */
  keyboardShouldPersistTaps?: "handled" | "always" | "never"
  /**
   * Do you want to include KeyboardAvoidingView or View in ScreenRootView ?
   * Defaults to KeyboardAvoidingView.
   */
  type?: Type
}
