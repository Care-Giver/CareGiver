import React from "react"
import { StyleProp, ViewStyle, View, StyleSheet, ImageSourcePropType, Animated } from "react-native"
import { observer } from "mobx-react-lite"
import { PreReg10 } from "#components"
import { GIVER_CASUAL_NAVY } from "#theme"

export interface BottomMenuItemProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  image: ImageSourcePropType
  label: string
  isFocused: boolean
  imageHeight: Animated.Value
}

export const BottomMenuItem = observer(function BottomMenuItem(props: BottomMenuItemProps) {
  const { style, image, label, isFocused, imageHeight } = props
  const allStyles = Object.assign({}, styles.root, style)

  return (
    <View style={allStyles}>
      <Animated.Image
        source={image}
        style={{
          width: 28,
          height: imageHeight,
        }}
      />
      <PreReg10 text={label} color={isFocused ? GIVER_CASUAL_NAVY : "transparent"} />
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
})
