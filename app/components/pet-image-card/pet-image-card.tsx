import { View, Text, Image } from "react-native"
import React from "react"
import { PetImageCardProps } from "./pet-image-card.props"
import { styles } from "./styles"
import { PreMed14 } from "../basics/custom-texts/custom-texts"
import { STRONG_LINE } from "#theme"
import { images } from "#images"

export const PetImageCard = (props: PetImageCardProps) => {
  const { petImageUri, name, style } = props
  return (
    <View style={[styles.root, style]}>
      <Image
        source={petImageUri ? { uri: petImageUri } : images.default_pet_image_60}
        style={styles.image}
      />
      <PreMed14 text={name} color={STRONG_LINE} style={styles.name} />
    </View>
  )
}
