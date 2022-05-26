import React, { useState, useEffect, useMemo } from "react"
import { ViewStyle, Animated, Easing, TouchableWithoutFeedback, Text, View } from "react-native"
import { color, WIDTH, HEIGHT, palette } from "../../../theme"
import { GIVER_CASUAL_NAVY } from "../../../theme/palette"
import { SwitchProps } from "./come-home-go-to-switch.props"

// dimensions
const ROOT_WIDTH = WIDTH * 72
const ROOT_HEIGHT = HEIGHT * 21
const MOVING_BLCOK_WIDTH = WIDTH * 36
const MARGIN = 2
const OFF_POSITION = -0.5
const ON_POSITION = ROOT_WIDTH - MOVING_BLCOK_WIDTH - MARGIN
const BORDER_RADIUS = 4

// colors
const ON_COLOR = "#F1F1F4"
const OFF_COLOR = "#F1F1F4"
const BORDER_ON_COLOR = GIVER_CASUAL_NAVY
const BORDER_OFF_COLOR = "rgba(0, 0, 0, 0.1)"

// animation
const DURATION = 250

// the track always has these props
const TRACK = {
  height: ROOT_HEIGHT + MARGIN,
  width: ROOT_WIDTH,
  borderRadius: BORDER_RADIUS,
  borderWidth: MARGIN / 2,
  backgroundColor: color.background,
}

// the movingBlock always has these props
const MOVING_BLCOK: ViewStyle = {
  position: "absolute",
  width: MOVING_BLCOK_WIDTH,
  height: ROOT_HEIGHT,
  borderRadius: 4,
  borderWidth: MARGIN / 2,
  backgroundColor: GIVER_CASUAL_NAVY,
}

const makeAnimatedValue = (switchOn) => new Animated.Value(switchOn ? 1 : 0)

export const ComeHomeGoToSwitch = (props: SwitchProps) => {
  const [timer] = useState<Animated.Value>(makeAnimatedValue(props.value))
  const startAnimation = useMemo(
    () => (newValue: boolean) => {
      const toValue = newValue ? 1 : 0
      const easing = Easing.out(Easing.circle)
      Animated.timing(timer, {
        toValue,
        duration: DURATION,
        easing,
        useNativeDriver: true,
      }).start()
    },
    [timer],
  )

  const [previousValue, setPreviousValue] = useState<boolean>(props.value)
  useEffect(() => {
    if (props.value !== previousValue) {
      startAnimation(props.value)
      setPreviousValue(props.value)
    }
  }, [props.value])

  const handlePress = useMemo(() => () => props.onToggle && props.onToggle(!props.value), [
    props.onToggle,
    props.value,
  ])

  if (!timer) {
    return null
  }

  const translateX = timer.interpolate({
    inputRange: [0, 1],
    outputRange: [OFF_POSITION, ON_POSITION],
  })

  const style = props.style

  const trackStyle = [
    TRACK,
    {
      backgroundColor: props.value ? ON_COLOR : OFF_COLOR,
      borderColor: props.value ? BORDER_ON_COLOR : BORDER_OFF_COLOR,
    },
    props.value ? props.trackOnStyle : props.trackOffStyle,
  ]

  const movingBlockStyle = [
    MOVING_BLCOK,
    {
      transform: [{ translateX }],
      //   zIndex: 2,
    },
    props.value ? props.movingBlockOnStyle : props.movingBlockOffStyle,
  ]

  return (
    <TouchableWithoutFeedback onPress={handlePress} style={style}>
      <Animated.View style={trackStyle}>
        <Animated.View style={movingBlockStyle} />
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}
