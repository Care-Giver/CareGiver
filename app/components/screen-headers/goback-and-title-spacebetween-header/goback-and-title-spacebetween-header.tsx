import { View, Text, Pressable, Image } from "react-native"
import React from "react"
import { HEADER_ROOT } from "../common-styles"
import { styles } from "./styles"
import IMAGES from "#images"
import { PreMed18 } from "#components"
import { WIDTH } from "#theme/device-size-constant"

export const GobackAndTitleSpacebetweenHeader = (props) => {
  const title = props.options.title ? props.options.title : props.route.name

  return (
    <View
      {...props}
      style={[HEADER_ROOT, { justifyContent: "space-between", paddingHorizontal: WIDTH * 16 }]}
    >
      <Pressable
        onPress={() => {
          props.navigation.goBack()
        }}
      >
        <Image style={styles.goBackButton} source={IMAGES.go_back} />
      </Pressable>

      <PreMed18>{title}</PreMed18>
    </View>
  )
}
