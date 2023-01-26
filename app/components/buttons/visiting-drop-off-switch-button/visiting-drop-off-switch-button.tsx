import React from "react"
import { ViewStyle, View } from "react-native"
import { DISABLED, GIVER_CASUAL_NAVY, palette } from "#theme"
import { PreBol12 } from "../../basics/custom-texts/custom-texts"
import { PressableButton } from "../pressable-button/pressable-button"

const ROOT: ViewStyle = {
  width: 72,
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

//! 방문 = Visiting
//! 위탁 = DropOff
export const VisitingDropOffSwitchButton = ({
  state: isVisiting,
  setState: setIsVisiting,
  style,
}) => {
  return (
    <View style={[ROOT, style]}>
      {/*//? 방문 버튼 */}
      <PressableButton
        defaultViewStyle={DEFAULT_VIEW_STYLE}
        pressedViewStyle={PRESSED_VIEW_STYLE}
        children={() => <PreBol12 color={isVisiting ? palette.white : DISABLED} text="방문" />}
        isPressed={isVisiting}
        onPress={() => {
          setIsVisiting(true)
        }}
      />

      {/*//? 위탁 버튼 */}
      <PressableButton
        defaultViewStyle={DEFAULT_VIEW_STYLE}
        pressedViewStyle={PRESSED_VIEW_STYLE}
        children={() => <PreBol12 color={!isVisiting ? palette.white : DISABLED} text="위탁" />}
        isPressed={!isVisiting}
        onPress={() => {
          setIsVisiting(false)
        }}
      />
    </View>
  )
}
