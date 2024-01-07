import React from "react"
import { View, ViewStyle, StyleProp, StyleSheet } from "react-native"
import { PreBol12 } from "../../_BASIC/custom-texts/custom-texts"
import { GIVER_CASUAL_NAVY, palette } from "#theme"

interface CaregiverTypeButtonPros {
  text: "방문" | "위탁" | "펫시터"
  textColor?: string
  style?: StyleProp<ViewStyle>
}

export const CaregiverTypeButton = ({ text, textColor, style }: CaregiverTypeButtonPros) => {
  const allStyles = Object.assign({}, styles.root, text === "펫시터" && styles.petsitter, style)
  return (
    <View style={allStyles}>
      <PreBol12
        text={text}
        color={textColor || (text === "펫시터" && GIVER_CASUAL_NAVY) || palette.white}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 8,
    paddingVertical: 3,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 4,
    backgroundColor: GIVER_CASUAL_NAVY,
  },

  petsitter: {
    backgroundColor: palette.white,
    borderColor: GIVER_CASUAL_NAVY,
    borderWidth: 2,
    paddingVertical: 3 - 2,
    paddingHorizontal: 8 - 2,
  },
})
