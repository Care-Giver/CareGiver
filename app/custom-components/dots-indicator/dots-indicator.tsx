import { View } from "react-native"
import React from "react"
import { styles } from "./styles"

export const DotsIndicator = (props) => {
  const { items, activeIndex, style: viewStyle } = props

  return (
    <View style={[styles.dotsContainer, viewStyle]}>
      {items.map((item, index) => (
        <View
          key={index} //? Key Warning 에러 해결.
          style={index === activeIndex ? styles.activeDot : styles.dot}
        />
      ))}
    </View>
  )
}
