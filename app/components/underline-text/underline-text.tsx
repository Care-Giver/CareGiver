import { View, Text, StyleProp, ViewProps } from "react-native"
import React from "react"
import { styles } from "./styles"
import { UnderlineTextProps } from "./underline-text.props"
import { HEAD_LINE } from "#theme"
import { PreBol18 } from "../basics/custom-texts/custom-texts"

export const UnderlineText = (props: UnderlineTextProps) => {
  const { text, textColor, underlineHeight, style } = props

  return (
    <View style={[styles.root, style]}>
      {/* // ? underline default height: 6 */}
      <View
        style={{
          height: "110%",
          borderBottomColor: `rgba(177, 201, 222, 0.6)`,
          borderBottomWidth: underlineHeight ? underlineHeight : 6,
        }}
      >
        <PreBol18 color="transparent" text={text} />
      </View>
      {/* // ? textColor default value: #111111 (HEAD_LINE) */}
      <PreBol18 style={styles.text} color={textColor ? textColor : HEAD_LINE} text={text} />
    </View>
  )
}
