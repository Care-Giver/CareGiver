import { View, Text, Pressable, Image } from "react-native"
import React from "react"
import { HEADER_ROOT } from "../common-styles"
import { Row, PreMed16, PreMed18 } from "#components"
import { DISABLED } from "#theme"
import { images } from "#images"
import { styles } from "./styles"
import { Props } from "./goback-and-title-and-button-header.props"

export const GobackAndTitleAndButtonHeader = (props) => {
  const title = props.options.title ? props.options.title : props.route.name
  const buttonText = props.buttonText
  const handlePress = props.handlePress

  return (
    <View
      {...props}
      style={[HEADER_ROOT, { justifyContent: "space-between", paddingHorizontal: 16 }]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* //? 뒤로가기 버튼 */}
        <Pressable
          onPress={() => {
            props.navigation.goBack()
          }}
        >
          <Image style={styles.goBackButton} source={images.go_back} />
        </Pressable>

        {/* //? 타이틀 */}
        <PreMed18 style={{ marginLeft: 8 }}>{title}</PreMed18>
      </View>

      <Pressable onPress={handlePress}>
        <PreMed16 text={buttonText} color={DISABLED} />
      </Pressable>
    </View>
  )
}
