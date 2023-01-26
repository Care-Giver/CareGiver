import { View, Image, Pressable } from "react-native"
import React from "react"

import { PreMed20, PreBol16 } from "../../basics/custom-texts/custom-texts"
import { images } from "#images"
import { styles } from "./styles"
import { DISABLED, GIVER_CASUAL_NAVY } from "#theme"
import { HEADER_ROOT } from "../common-styles"

export const WritingCommentScreenHeader = (props) => {
  const title = props.options.title ? props.options.title : props.route.name
  const ableToRegister = props.options.wordsCount ? props.options.wordsCount : 0

  return (
    <View {...props} style={HEADER_ROOT}>
      {/* //* 뒤로가기 버튼 */}
      <Pressable
        onPress={() => {
          props.navigation.goBack()
        }}
      >
        <Image style={styles.goBackButton} source={images.go_back} />
      </Pressable>

      {/* //* 타이틀 */}
      <PreMed20 style={{ marginLeft: 8 }}> {title}</PreMed20>
      {/*//* 등록 버튼 (사용자 입력 댓글 글자 수 하나 이상이면 등록 색 바뀜) */}
      <Pressable
        onPress={() => {
          alert("댓글이 등록되었습니다!")
        }}
        style={{
          marginLeft: "auto",
          marginRight: 16,
        }}
      >
        <PreBol16 color={ableToRegister > 0 ? GIVER_CASUAL_NAVY : DISABLED} text={"등록"} />
      </Pressable>
    </View>
  )
}
