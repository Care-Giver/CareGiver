import React from "react"
import { Image, Pressable, Text, View, ViewProps } from "react-native"
import { styles } from "./styles"
import { RowRoundedBox } from "../boxes/basics/row-rounded-box"
import { PopReg16, PreReg16 } from "../custom-texts/custom-texts"
import RNDateTimePicker from "@react-native-community/datetimepicker"

export const RowRoundedTimeIntervalPicker = (props) => {
  const image = props.image
  const text = props.text
  const textColor = props.textColor
  const textStyle = props.textStyle
  const style = props.style
  const fontType = props.fontType ? props.fontType : "Pretendard"
  const state = props.state
  const setState = props.setState
  const onPress = props.onPress

  const { isTimePickerOpen, setIsTimePickerOpen } = props

  // console.log("fontType", fontType, typeof fontType)

  return (
    <Pressable style={style}>
      <RowRoundedBox preset={"Pressable"} onPress={onPress}>
        <Image source={image} style={styles.image} />

        <PreReg16 text={text} color={textColor} style={[styles.text, textStyle]} />
        {isTimePickerOpen && (
          <RNDateTimePicker
            mode="time"
            value={new Date()}
            style={{ width: 300, height: 40 }}
            renderToHardwareTextureAndroid={true}
          />
        )}

        <PopReg16 text={text} color={textColor} style={[styles.text, textStyle]} />
        {isTimePickerOpen && (
          <RNDateTimePicker
            mode="time"
            value={new Date()}
            style={{ width: 300, height: 40 }}
            renderToHardwareTextureAndroid={true}
          />
        )}
      </RowRoundedBox>
    </Pressable>
  )
}
