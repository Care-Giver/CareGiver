import { View, Text, Pressable } from "react-native"
import React from "react"
import { styles } from "./styles"
import { DivisionLine } from "../division-line"
import { color, HEIGHT, palette } from "../../theme"
import { PreBol18, PreReg18 } from "../custom-texts/custom-texts"
import { DISABLED, GIVER_CASUAL_NAVY } from "../../theme/palette"

export const ServiceTypeIndicatorHeader = ({ label, state, onPress, style }) => {
  const isActivated = label === state

  return (
    <Pressable style={[styles.root, style]} onPress={onPress}>
      {isActivated ? (
        <PreBol18 text={label} color={GIVER_CASUAL_NAVY} style={{ alignSelf: "center" }} />
      ) : (
        <PreReg18 text={label} color={DISABLED} style={{ alignSelf: "center" }} />
      )}
      {isActivated ? (
        <DivisionLine
          color={GIVER_CASUAL_NAVY}
          height={HEIGHT * 8}
          style={{
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            marginTop: "auto",
            marginBottom: 0,
          }}
        />
      ) : (
        <DivisionLine
          color={color.transparent}
          height={HEIGHT * 8}
          style={{
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            marginTop: "auto",
            marginBottom: 0,
          }}
        />
      )}
    </Pressable>
  )
}
