import React from "react"
import { Image, Pressable, ViewStyle, TextStyle } from "react-native"
import { PopReg16, PreReg16 } from "../../basics/custom-texts/custom-texts" //! 건드리지 말것! (cycle warning 메시지)
import { RowRoundedBox } from "../../basics/row-rounded-box/row-rounded-box" //! 건드리지 말것! (cycle warning 메시지)

interface RowRoundedButtonProps {
  image?: undefined
  text?: string
  textColor?: string
  textStyle?: TextStyle
  style?: ViewStyle
  fontType?: "Pretendard" | "Poppins"
  onPress?: () => void
}

export const RowRoundedButton = (props: RowRoundedButtonProps) => {
  const { text, image, textColor, textStyle, style, fontType = "Pretendard", onPress } = props

  const $textColor = textColor
  const $textStyle = Object.assign({}, { marginLeft: 8 }, textStyle)

  return (
    <Pressable style={style}>
      <RowRoundedBox preset={"Pressable"} onPress={onPress}>
        <Image
          source={image}
          style={{
            width: 28,
            height: 28,
            marginLeft: 16,
          }}
        />
        {fontType === "Pretendard" ? (
          <PreReg16 text={text} color={$textColor} style={$textStyle} />
        ) : (
          <PopReg16 text={text} color={$textColor} style={$textStyle} />
        )}
      </RowRoundedBox>
    </Pressable>
  )
}
