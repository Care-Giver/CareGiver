import { View, Text, TextInput } from "react-native"
import React from "react"
import { UserTextInputProps } from "./user-text-input.props"
import { styles } from "./styles"

export const UserTextInput = (props: UserTextInputProps) => {
  const { placeholder, placeholderColor, value, handleChange, style } = props
  return (
    <View style={[styles.root, style]}>
      <TextInput
        // style={[styles.root, style]}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        onChangeText={handleChange}
        value={value}
        multiline
        scrollEnabled
      />
    </View>
  )
}
