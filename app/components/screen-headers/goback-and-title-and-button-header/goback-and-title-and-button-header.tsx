import { View, Text, Pressable, Image } from "react-native"
import React from "react"
import { HEADER_ROOT } from "../common-styles"
import { Row } from "#components/basics/row/row"
import { PreMed16, PreMed18 } from "#components/basics/custom-texts/custom-texts"
import { WIDTH } from "#theme/device-size-constant"
import IMAGES from "#images"
import { styles } from "./styles"
import { DISABLED } from "#theme/palette"

export const GobackAndTitleAndButtonHeader = (props) => {
  const title = props.options.title ? props.options.title : props.route.name
  const buttonText = props.buttonText
  const handlePress = props.handlePress

  return (
    <View
      {...props}
      style={[HEADER_ROOT, { justifyContent: "space-between", paddingHorizontal: WIDTH * 16 }]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* //? 뒤로가기 버튼 */}
        <Pressable
          onPress={() => {
            props.navigation.goBack()
          }}
        >
          <Image style={styles.goBackButton} source={IMAGES.go_back} />
        </Pressable>

        {/* //? 타이틀 */}
        <PreMed18 style={{ marginLeft: WIDTH * 8 }}>{title}</PreMed18>
      </View>

      <Pressable onPress={handlePress}>
        <PreMed16 text={buttonText} color={DISABLED} />
      </Pressable>
    </View>
  )
}
