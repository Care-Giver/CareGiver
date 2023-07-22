import React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { color } from "#theme"

/**
 * KeyboardAvoidingView가 포함된 Screen를 사용
 * 포함되지 않고, View만 사용되는 Screen 사용
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
   * Do you want to include KeyboardAvoidingView or View in Screen ?
   * Defaults to KeyboardAvoidingView.
   */
  type?: Type
}

/**
 * All screen keyboard offsets.
 */
export const offsets = {
  none: 0,
  small: 100,
  large: 500,
}

/**
 * The variations of keyboard offsets.
 */
type KeyboardOffsets = keyof typeof offsets

/**
 * All the variations of screens.
 */
export const presets = {
  /**
   * No scrolling. Suitable for full-screen carousels and components
   * which have built-in scrolling like FlatList.
   */
  fixed: {
    outer: {
      backgroundColor: color.background,
      flex: 1,
      height: "100%",
    } as ViewStyle,
    inner: {
      justifyContent: "flex-start",
      alignItems: "stretch",
      height: "100%",
      width: "100%",
      backgroundColor: "white",
    } as ViewStyle,
  },

  /**
   * Scrolls. Suitable for forms or other things requiring a keyboard.
   *
   * Pick this one if you don't know which one you want yet.
   */
  scroll: {
    outer: {
      backgroundColor: color.background,
      flex: 1,
      height: "100%",
    } as ViewStyle,
    inner: {
      justifyContent: "flex-start",
      alignItems: "stretch",
      height: "100%",
    } as ViewStyle,
  },
}

/**
 * The variations of screens.
 */
type ScreenPresets = keyof typeof presets
