import { View, Text } from "react-native"
import React from "react"
import { styles } from "./styles"
import { PreBol12 } from "../../custom-texts/custom-texts"
import { palette } from "~/app/theme"

const CaregiverTypeButton = ({ text, style }: { text: string; style?: Object }) => {
  return (
    <View style={[styles.typeBtn, style]}>
      <PreBol12 text={text} color={palette.white} />
    </View>
  )
}

export default CaregiverTypeButton
