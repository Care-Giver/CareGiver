import React, { ReactNode } from "react"
import { Pressable, View, ViewStyle } from "react-native"
// import { styles } from "../common-styles"
import { palette, LIGHT_LINE } from "#theme"

interface RowRoundedBoxProps {
  preset?: "Pressable" | "View"
  style?: ViewStyle
  onPress?: () => void
  children: ReactNode
}

/**
 * 모서리가 둥근 박스 컴포넌트 입니다.
 * preset props 를 통해, Pressable 로 사용하면 버튼으로 사용할 수 있고,
 * View 로 사용하면 단순한 박스 View 로도 사용할 수 있습니다.
 */
export const RowRoundedBox = (props: RowRoundedBoxProps) => {
  const preset = props.preset || "View"
  const isPressable = preset === "Pressable"

  if (isPressable) {
    return (
      <Pressable style={[ROW_ROUNDED_BOX_PRESET, props?.style]} onPress={props.onPress}>
        {props.children}
      </Pressable>
    )
  } else {
    return <View style={[ROW_ROUNDED_BOX_PRESET, props?.style]}>{props.children}</View>
  }
}

const ROW_ROUNDED_BOX_PRESET: ViewStyle = {
  width: "100%",
  height: 48,
  backgroundColor: palette.white,
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 2,
  borderRadius: 8,
  borderColor: LIGHT_LINE,
}
