import * as React from "react"
import { View, Text, Pressable, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { PreBol16, PreReg12 } from "../basics/custom-texts/custom-texts"
import { BODY, SUB_HEAD_LINE, SHADOW_1 } from "#theme"
import {styles} from './styles'
import { images } from "#images"
import { CgServiceChoiceButtonProps } from "./cs-service-choice-button.props"


export const CgServiceChoiceButton = observer(function CgServiceChoiceButton(props: CgServiceChoiceButtonProps) {
  const { title, subtitle, onPress } = props
  return (
    <Pressable style={[styles.container, SHADOW_1, ]} >
      
      {/* image */}
      <Image
        style={styles.image}
        source={
          title === "펫시터 등록하기"
            ? images.service_petsitting
            : title === "훈련사 등록하기"
            ? images.service_training
            : ""
        }
        resizeMode="stretch" //! DO NOT REMOVE THIS
      />
      {/* title */}
      <View style={styles.titleContainer}>
        <PreBol16 text={title} color={SUB_HEAD_LINE} />
        <Pressable onPress={onPress}>
          <Image style={styles.titleImage} source={images.arrow_left} />
        </Pressable>
      </View>

      {/* subtitle */}
      <PreReg12 style={styles.subtitle} color={BODY}>
        {subtitle}
      </PreReg12>
    </Pressable>
  )
})