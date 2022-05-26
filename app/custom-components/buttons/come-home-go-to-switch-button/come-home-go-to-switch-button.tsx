import React from "react"
import { ViewStyle, View } from "react-native"
import { color, WIDTH, HEIGHT, palette } from "../../../theme"
import { DISABLED, GIVER_CASUAL_NAVY } from "../../../theme/palette"
import { PreBol12 } from "../../custom-texts/custom-texts"
import { PressableButton } from "../pressable-button/pressable-button"

const ROOT: ViewStyle = {
  width: WIDTH * 72,
  height: HEIGHT * 21,
  borderRadius: 4,
  backgroundColor: "#F1F1F4",
  // backgroundColor: "red",
  flexDirection: "row",
}

const DEFAULT_VIEW_STYLE: ViewStyle = {
  width: WIDTH * 36,
  height: HEIGHT * 21,
  borderRadius: 4,
  backgroundColor: "#F1F1F4",
  justifyContent: "center",
  alignItems: "center",
}

const PRESSED_VIEW_STYLE: ViewStyle = {
  width: WIDTH * 36,
  height: HEIGHT * 21,
  borderRadius: 4,
  backgroundColor: GIVER_CASUAL_NAVY,
  justifyContent: "center",
  alignItems: "center",
}

export const ComeHomeGoToSwitchButton = ({ state: isComeHome, setState: setIsComeHome, style }) => {
  return (
    <View style={[ROOT, style]}>
      {/*//? 방문 버튼 */}
      <PressableButton
        defaultViewStyle={DEFAULT_VIEW_STYLE}
        pressedViewStyle={PRESSED_VIEW_STYLE}
        children={() => <PreBol12 color={isComeHome ? palette.white : DISABLED} text="방문" />}
        isPressed={isComeHome}
        onPress={() => {
          setIsComeHome(true)
        }}
      />

      {/*//? 위탁 버튼 */}
      <PressableButton
        defaultViewStyle={DEFAULT_VIEW_STYLE}
        pressedViewStyle={PRESSED_VIEW_STYLE}
        children={() => <PreBol12 color={!isComeHome ? palette.white : DISABLED} text="위탁" />}
        isPressed={!isComeHome}
        onPress={() => {
          setIsComeHome(false)
        }}
      />
    </View>
  )
}
