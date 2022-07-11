import { View, Text, StyleProp, FlexStyle } from "react-native"
import React from "react"
import { PreMed14, PreBol16, PopSem14, PopReg14 } from "../custom-texts/custom-texts"
import { BODY, STRONG_LINE } from "../../theme/palette"
//import { styles } from "./styles"
import { HEIGHT, WIDTH } from "../../theme"

export const WordsCounter = (props) => {
  const { wordCount, wordMax } = props

  return (
    <View>
      <PopSem14 color={BODY} text={`${wordCount}`} style={{ marginRight: WIDTH * 2 }} />
      <PopReg14 color={BODY} text={`${wordMax}`} />
    </View>
  )
}
