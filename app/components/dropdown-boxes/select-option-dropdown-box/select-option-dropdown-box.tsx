import { View, Image, Pressable } from "react-native"
import React from "react"
import { Row } from "../../basics/row/row"
import { PreReg12 } from "../../basics/custom-texts/custom-texts"
import { FlatList } from "react-native-gesture-handler"

export const SelectOptionDropdownBox = (props) => {
  const onPress = props.onPress
  const style = props.style
  const isOpen = props.isOpen
  const logoSrc = props.logoSrc
  const logoStyle = props.logoStyle
  const labels = props.labels
  const handlePress = props.handlePress
  const currentOption = props.currentOption

  return (
    <Pressable style={[style]} onPress={onPress}>
      <Row
        style={{
          alignItems: "center",
        }}
      >
        <PreReg12 text={currentOption} />
        <Image source={logoSrc} style={[logoStyle]} />
      </Row>
      {isOpen && (
        <FlatList
          data={labels}
          renderItem={({ item, index }) => (
            <Pressable
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffffff",
              }}
              onPress={() => handlePress(item)}
            >
              <PreReg12 text={item} />
            </Pressable>
          )}
        />
      )}
    </Pressable>
  )
}
