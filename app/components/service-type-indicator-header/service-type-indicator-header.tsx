import { Pressable, StyleProp, ViewStyle } from "react-native"
import React from "react"
import { styles } from "./styles"
import { DivisionLine } from "../division-line/division-line"
import { color, DISABLED, GIVER_CASUAL_NAVY } from "#theme"
import { PreBol18, PreReg18 } from "../basics/custom-texts/custom-texts"

export type ServiceType = "방문" | "위탁" | "펫시터" | "훈련사"

interface ServiceTypeIndicatorHeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  label: ServiceType
  state: string
  onPress: () => void
}

export const ServiceTypeIndicatorHeader = (props: ServiceTypeIndicatorHeaderProps) => {
  const { label, state, onPress, style } = props
  const isActivated = label === state

  const _styles = Object.assign({}, styles.root, style)

  return (
    <Pressable style={_styles} onPress={onPress}>
      {isActivated ? (
        <PreBol18 text={label} color={GIVER_CASUAL_NAVY} style={{ alignSelf: "center" }} />
      ) : (
        <PreReg18 text={label} color={DISABLED} style={{ alignSelf: "center" }} />
      )}
      {isActivated ? (
        <DivisionLine
          color={GIVER_CASUAL_NAVY}
          height={8}
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
          height={8}
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
