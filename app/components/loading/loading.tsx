import React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { CARE_SOFT_YELLOW, GIVER_CASUAL_NAVY } from "#theme"
import Lottie, { AnimatedLottieViewProps } from "lottie-react-native"
import { lotties } from "../../../assets/lotties"
import { PopSem16, PreReg12 } from "../basics/custom-texts/custom-texts"

export interface LoadingProps {
  /**
   * 위치조정을 위한 추가 스타일링 (iconOnly={true} 일 경우에만 적용 됨)
   */
  style?: StyleProp<ViewStyle>

  /**
   * 로딩 애니메이션 사이즈
   */
  size?: number

  /**
   * 로딩 표출 방식설정
   * iconOnly={true} 이면, 배경이 없고, 로딩 애니메이션만 렌더링 됨
   * 기본값 flase
   */
  iconOnly?: boolean

  /**
   * 로딩 애니메이션 하단에 표출할 텍스트
   */

  text?: string

  /**
   * 로딩 애니메이션 지속 시간 (ms)
   * 기본값 500
   */
  duration?: number
}

/**
 * Describe your component here
 */
export const Loading = observer(function Loading(props: LoadingProps) {
  const { style, size = 100, iconOnly = false, text, duration = 500 } = props
  const $allStyles = Object.assign({}, $root, style)

  if (iconOnly) {
    return (
      <View style={$allStyles}>
        <Lottie
          source={lotties.loading_dark}
          style={{ width: size, height: size, alignSelf: "center" }}
          loop
          autoPlay={true}
          duration={duration}
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
        duration={duration}
      />

      <PopSem16 style={$title} color={GIVER_CASUAL_NAVY} text={"Loading"} />
      {text && <PreReg12 style={$sub} color={GIVER_CASUAL_NAVY} text={text} />}
    </View>
  )
})

const $root: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
}

const $backdrop: ViewStyle = {
  // backgroundColor: "rgba(0, 0, 0, 0.4)",
  backgroundColor: CARE_SOFT_YELLOW,
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
