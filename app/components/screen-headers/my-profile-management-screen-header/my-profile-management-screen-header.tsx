import { View, Image, Pressable } from "react-native"
import React from "react"
import { PreMed18 } from "../../basics/custom-texts/custom-texts"
import { images } from "#images"
import { styles } from "./styles"
import { HEADER_ROOT } from "../common-styles"
//import { allowStateReadsStart } from "mobx/dist/internal"

export const MyProfileManangementScreenHeader = (props) => {
  const title = props.options.title ? props.options.title : props.route.name

  return (
    <View {...props} style={HEADER_ROOT}>
      {/* //? 뒤로가기 버튼 */}
      <Pressable
        onPress={() => {
          props.navigation.goBack()
        }}
      >
        <Image style={styles.goBackButton} source={images.go_back} />
      </Pressable>

      {/* //? 타이틀 */}
      <PreMed18 style={{ marginLeft: 8 }}> {title}</PreMed18>

      <Pressable
        onPress={() => {
          alert("수정 기능 구현 예정")
        }}
        style={{
          marginLeft: "auto",
          marginRight: 16,
        }}
      >
        <Image style={styles.managementButton} source={images.pencil} />
      </Pressable>
    </View>
  )
}
