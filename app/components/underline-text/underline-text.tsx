import React from "react"
import { View, StyleSheet, TextStyle } from "react-native"
import { UnderlineTextProps } from "./underline-text.props"
import { HEAD_LINE } from "#theme"

export const UnderlineText = (props: UnderlineTextProps) => {
  const {
    textColor,
    underlineHeight = 6,
    underlineColor = "rgba(177, 201, 222, 0.6)",
    style,
    children,
  } = props

  const $underline: TextStyle = {
    position: "absolute",
    top: -underlineHeight,
    borderBottomColor: underlineColor,
    borderBottomWidth: underlineHeight,
  }

  return (
    <View style={style}>
      {React.Children.map(children, (child) => {
        return (
          <View style={[styles.root, style]}>
            {/* // ? underline default height: 6 */}
            <View style={$underline}>{React.cloneElement(child, { color: "transparent" })}</View>
            {/* // ? textColor default value: #111111 (HEAD_LINE) */}
            {React.cloneElement(child, { color: textColor || HEAD_LINE })}
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    alignSelf: "flex-start",
    position: "relative",
  },
})
