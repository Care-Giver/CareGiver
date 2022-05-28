import { View, Text, Pressable, Image } from "react-native"
import React from "react"
import { styles } from "./styles"
import { ChoiceButtonProps } from "./service-choice-button.props"
import { PreBol16, PreReg12 } from "../../custom-texts/custom-texts"
import { SHADOW_1 } from "../../../theme"
import { BODY, SUB_HEAD_LINE } from "../../../theme/palette"

export const ServiceChoiceButton = (props: ChoiceButtonProps) => {
  const { title, subtitle, style, onPress } = props
  return (
    <Pressable style={[styles.container, SHADOW_1, style]} onPress={onPress}>
      {/* title */}
      <View style={styles.titleContainer}>
        <PreBol16 text={title} color={SUB_HEAD_LINE} />
        <Image style={styles.titleImage} source={require("../images/left-arrow.png")} />
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
            ? require("../images/service_petsitting.png")
            : title === "훈련"
            ? require("../images/service_training.png")
            : ""
        }
      />
    </Pressable>
  )
}
