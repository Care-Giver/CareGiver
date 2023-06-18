import { View, Text, Pressable, Image } from "react-native"
import React from "react"
import { styles } from "./styles"
import { ServiceChoiceButtonProps } from "./service-choice-button.props"
import { PreBol16, PreReg12 } from "../../basics/custom-texts/custom-texts"
import { BODY, SUB_HEAD_LINE, SHADOW_1 } from "#theme"
import { images } from "#images"

export const ServiceChoiceButton = (props: ServiceChoiceButtonProps) => {
  const { title, subtitle, style, onPress } = props
  return (
    <Pressable style={[styles.container, SHADOW_1, style]} onPress={onPress}>
      {/* title */}
      <View style={styles.titleContainer}>
        <PreBol16 text={title} color={SUB_HEAD_LINE} />
        <Image style={styles.titleImage} source={images.arrow_right} />
      </View>

      {/* subtitle */}
      <PreReg12 style={styles.subtitle} color={BODY}>
        {subtitle}
      </PreReg12>

      {/* image */}
      <Image
        style={styles.image}
        source={
          title === "펫시팅"
            ? images.service_petsitting
            : title === "훈련"
            ? images.service_training
            : ""
        }
        resizeMode="stretch" //! DO NOT REMOVE THIS
      />
    </Pressable>
  )
}
