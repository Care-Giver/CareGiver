import { View, Text, StyleProp, ViewProps } from "react-native"
import React from "react"
import { styles } from "./styles"
import { UnderlineTextProps } from "./underline-text.props"
import { HEAD_LINE } from "#theme"

export const UnderlineText = (props: UnderlineTextProps) => {
  const { text, textColor, underlineHeight, underlineColor, style } = props

  const $underline: TextStyle = {
    position: "absolute",
    top: -underlineHeight || -6,
    borderBottomColor: underlineColor || "rgba(177, 201, 222, 0.6)",
    borderBottomWidth: underlineHeight || 6,
    // backgroundColor: "pink",
  }

  return (
    <View style={[styles.root, style]}>
      {/* // ? underline default height: 6 */}
      <View style={$underline}>
        <PreBol18 color="transparent" text={text} />
      </View>
      {/* // ? textColor default value: #111111 (HEAD_LINE) */}
      <PreBol18 color={textColor || HEAD_LINE} text={text} />
    </View>
  )
}
