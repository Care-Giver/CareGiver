import { View, Text, Pressable, Image } from "react-native"
import React from "react"
import { MypageButtonProps } from "./mypage-button.props"
import { styles } from "./styles"
import { PreMed16 } from "../basics/custom-texts/custom-texts"
import { STRONG_LINE } from "#theme"
import { images } from "#images"

export const MypageButton = (props: MypageButtonProps) => {
  const { text, style, onPress } = props
  return (
    <Pressable style={[styles.root, style]} onPress={onPress} disabled={props.disabled}>
      <PreMed16 text={text} color={STRONG_LINE} style={{ opacity: props.opacity }} />
      <Image source={images.arrow_right} style={styles.arrow} />
    </Pressable>
  )
}
