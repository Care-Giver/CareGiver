import React from "react"
import { Image, Pressable, Text, View, ViewProps } from "react-native"
import { styles } from "./styles"
import { RowRoundedBox } from "../../boxes/basics/row-rounded-box"
import { PreReg16 } from "../../custom-texts/custom-texts"

export const RowRoundedButton = (props: ViewProps) => {
  const image = props.image
  const text = props.text
  const textColor = props.textColor
  const textStyle = props.textStyle
  const style = props.style
  const state = props.state
  const setState = props.setState
  const onPress = props.onPress

  return (
    <Pressable style={style}>
      <RowRoundedBox preset={"Pressable"} onPress={onPress}>
        <Image source={image} style={styles.image} />
        <PreReg16 text={text} color={textColor} style={textStyle} />
      </RowRoundedBox>
    </Pressable>
  )
}
