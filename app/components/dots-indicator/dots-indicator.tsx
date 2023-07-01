import { StyleProp, View, ViewStyle } from "react-native"
import React from "react"
import { styles } from "./styles"
import { LinearGradient } from "expo-linear-gradient"
interface DotsIndicatorProps {
  items: undefined
  activeIndex: number
  style?: StyleProp<ViewStyle>
}

export const DotsIndicator = (props: DotsIndicatorProps) => {
  const { items, activeIndex, style: viewStyle } = props

  return (
    //? https://docs.expo.dev/versions/latest/sdk/linear-gradient/#locations
    <LinearGradient
      style={[styles.root, viewStyle]}
      colors={["rgba(256,256,256,0)", "rgba(256,256,256,1)"]} //! transparent 와 rgba(256,256,256,0) 는 다르다!
      locations={[0.05, 1]}
    >
      <View style={styles.dotsContainer}>
        {items.map((item, index) => (
          <View
            key={index} //? Key Warning 에러 해결.
            style={index === activeIndex ? styles.activeDot : styles.dot}
          />
        ))}
      </View>
    </LinearGradient>
  )
}
