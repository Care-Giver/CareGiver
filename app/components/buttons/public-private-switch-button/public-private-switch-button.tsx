import React from "react"
import { ViewStyle, View } from "react-native"
import { palette } from "#theme"
import { DISABLED, GIVER_CASUAL_NAVY } from "#theme"
import { PreBol12 } from "../../basics/custom-texts/custom-texts"
import { PressableButton } from "../pressable-button/pressable-button"

const ROOT: ViewStyle = {
  width: 82,
  height: 21,
  borderRadius: 4,
  backgroundColor: "#F1F1F4",
  // backgroundColor: "red",
  flexDirection: "row",
}

const DEFAULT_VIEW_STYLE: ViewStyle = {
  width: 36,
  height: 21,
  borderRadius: 4,
  backgroundColor: "#F1F1F4",
  justifyContent: "center",
  alignItems: "center",
}

const PRESSED_VIEW_STYLE: ViewStyle = {
  width: 36,
  height: 21,
  borderRadius: 4,
  backgroundColor: GIVER_CASUAL_NAVY,
  justifyContent: "center",
  alignItems: "center",
}

export const PublicPrivateSwitchButton = ({ state: isPublic, setState: setIsPublic, style }) => {
  return (
    <View style={[ROOT, style]}>
      {/*//* 공개 버튼 */}
      <PressableButton
        defaultViewStyle={DEFAULT_VIEW_STYLE}
        pressedViewStyle={PRESSED_VIEW_STYLE}
        children={() => <PreBol12 color={isPublic ? palette.white : DISABLED} text="공개" />}
        isPressed={isPublic}
        onPress={() => {
          setIsPublic(true)
        }}
      />

      {/*//* 비공개 버튼 (디자인에 따라 width 는 override ) */}
      <PressableButton
        defaultViewStyle={[DEFAULT_VIEW_STYLE, { width: 46 }]}
        pressedViewStyle={[PRESSED_VIEW_STYLE, { width: 46 }]}
        children={() => <PreBol12 color={!isPublic ? palette.white : DISABLED} text="비공개" />}
        isPressed={!isPublic}
        onPress={() => {
          setIsPublic(false)
        }}
      />
    </View>
  )
}
