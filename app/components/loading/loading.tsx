import React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { GIVER_CASUAL_NAVY } from "#theme"
import Lottie, { AnimatedLottieViewProps } from "lottie-react-native"
import { lotties } from "../../../assets/lotties"
import { BASIC_BACKGROUND_PADDING_WIDTH } from "../basics/view-component/view-component"
import { PopReg12, PopSem16 } from "../basics/custom-texts/custom-texts"

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
        />
        <PopSem16 style={$text} color={GIVER_CASUAL_NAVY}>
          Loading...
        </PopSem16>
        {text && (
          <PopReg12 style={$sub} color={GIVER_CASUAL_NAVY}>
            {text}
          </PopReg12>
        )}
      </View>
    )
  }

  return (
    <View style={$contentContainerStyle}>
      <Lottie
        source={lotties.loading_dark}
        style={{ width: size, height: size }}
        loop
        autoPlay={true}
      />
      <PopSem16 style={$text} color={GIVER_CASUAL_NAVY}>
        Loading...
      </PopSem16>
      {text && (
        <PopReg12 style={$sub} color={GIVER_CASUAL_NAVY}>
          {text}
        </PopReg12>
      )}
    </View>
  )
})

const $root: ViewStyle = {
  justifyContent: "center",
}

const $contentContainerStyle: ViewStyle = {
  alignSelf: "center",
  flex: 1,
  height: "100%",
  width: "100%",
  backgroundColor: "red",
  paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
  justifyContent: "center",
  alignItems: "center",
}

const $text: TextStyle = {
  marginTop: -20,
}

const $sub: TextStyle = {}
