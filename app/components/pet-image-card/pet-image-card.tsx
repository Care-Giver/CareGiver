import { View, Text, Image } from "react-native"
import React from "react"
import { PetImageCardProps } from "./pet-image-card.props"
import { styles } from "./styles"
import { PreMed14 } from "../basics/custom-texts/custom-texts"
import { STRONG_LINE } from "#theme"

export const PetImageCard = (props: PetImageCardProps) => {
  const { petImage, name, style } = props
  return (
    <View style={[styles.root, style]}>
      <Image source={petImage} style={styles.image} resizeMode="contain" />
      <PreMed14 text={name} color={STRONG_LINE} style={styles.name} />
    </View>
  )
}
