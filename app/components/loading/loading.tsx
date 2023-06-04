import React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { GIVER_CASUAL_NAVY } from "#theme"
import Lottie, { AnimatedLottieViewProps } from "lottie-react-native"
import { lotties } from "../../../assets/lotties"
import { PopReg12, PopSem16, PreReg12 } from "../basics/custom-texts/custom-texts"

export interface LoadingProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  size?: number
  iconOnly?: boolean
  text?: string
}

/**
 * Describe your component here
 */
export const Loading = observer(function Loading(props: LoadingProps) {
  const { style, size = 100, iconOnly = false, text } = props
  const $styles = Object.assign({}, $root, style)

  if (iconOnly) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Lottie
          source={lotties.loading_dark}
          style={{ width: size, height: size, alignSelf: "center" }}
          loop
          autoPlay={true}
          duration={500}
        />
        <PopSem16 style={$title} color={GIVER_CASUAL_NAVY} text={"Loading"} />
        {text && <PreReg12 style={$sub} color={GIVER_CASUAL_NAVY} text={text} />}
      </View>
    )
  }

  return (
    <View style={$backdrop}>
      <Lottie
        source={lotties.loading_dark}
        style={{ width: size, height: size }}
        loop
        autoPlay={true}
        duration={500}
      />

      <PopSem16 style={$title} color={GIVER_CASUAL_NAVY} text={"Loading"} />
      {text && <PreReg12 style={$sub} color={GIVER_CASUAL_NAVY} text={text} />}
    </View>
  )
})

const $root: ViewStyle = {
  justifyContent: "center",
}

const $backdrop: ViewStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  alignSelf: "center",
  flex: 1,
  width: "100%",
  height: "100%",
  zIndex: 2,
}

const $title: TextStyle = {
  marginTop: -20,
}

const $sub: TextStyle = {
  marginTop: 2,
}
