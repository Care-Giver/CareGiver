import { View, Text, Pressable, Image } from "react-native"
import React from "react"
import { MypageButtonProps } from "./mypage-button.props"
import { styles } from "./styles"
import { PreMed16 } from "../basics/custom-texts/custom-texts"
import { STRONG_LINE } from "#theme/palette"
import IMAGES from "#images"
import { HEIGHT, WIDTH } from "#theme/device-size-constant"

export const MypageButton = (props: MypageButtonProps) => {
  const { text, style, onPress } = props
  return (
    <Pressable style={[styles.root, style]} onPress={onPress}>
      <PreMed16 text={text} color={STRONG_LINE} />
      <Image source={IMAGES.arrow_left} style={styles.arrow} />
    </Pressable>
  )
}
