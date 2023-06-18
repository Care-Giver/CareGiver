import React from "react"
import { View, StyleSheet, Pressable, Image, StyleProp, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { PreBol16, PreReg12 } from "../basics/custom-texts/custom-texts"
import { BODY, SUB_HEAD_LINE, SHADOW_1, WIDTH } from "#theme"
import { images } from "#images"

interface CgServiceChoiceButtonProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  title: "펫시터 등록하기" | "훈련사 등록하기"
  subtitle: string
  onPress: () => void
}

export const CgServiceChoiceButton = observer(function CgServiceChoiceButton(
  props: CgServiceChoiceButtonProps,
) {
  const { style, title, subtitle, onPress } = props
  const allStyles = Object.assign({}, styles.container, SHADOW_1, style)

  const imageSelector = () => {
    if (title === "펫시터 등록하기") return images.service_petsitting
    if (title === "훈련사 등록하기") return images.service_training
    return ""
  }

  return (
    <Pressable style={allStyles} onPress={onPress}>
      {/* image */}
      <Image style={styles.image} source={imageSelector()} resizeMode="stretch" />
      {/* title */}
      <View style={styles.titleContainer}>
        <PreBol16 text={title} color={SUB_HEAD_LINE} />
        <Image style={styles.titleImage} source={images.arrow_right} />
      </View>

      {/* subtitle */}
      <PreReg12 style={styles.subtitle} color={BODY}>
        {subtitle}
      </PreReg12>
    </Pressable>
  )
})

const styles = StyleSheet.create({
  container: {
    width: WIDTH * 171,
    height: 199,
    borderRadius: 8,
    backgroundColor: "white",
  },
  image: {
    height: 99,
    width: 171,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 16,
  },
  titleImage: {
    width: 16,
    height: 16,
  },
  subtitle: {
    marginLeft: 20,
    marginTop: 8,
    lineHeight: 18,
  },
})
