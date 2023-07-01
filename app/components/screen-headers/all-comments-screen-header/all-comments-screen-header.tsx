import { View, Image, Pressable } from "react-native"
import React from "react"

import { PreMed18 } from "../../basics/custom-texts/custom-texts"
import { images } from "#images"
import { styles } from "./styles"
import { navigate } from "#navigators"
import { HEADER_ROOT } from "../common-styles"

export const AllCommentsScreenHeader = (props) => {
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

      <PreMed18 style={{ marginLeft: 8 }}> 댓글</PreMed18>

      {/* //*  댓글 검색 */}
      <Pressable
        style={{ marginLeft: "auto" }}
        onPress={() => {
          // props.navigation.goBack()
          alert("댓글 검색으로 이동")
        }}
      >
        <Image style={styles.search} source={images.search} />
      </Pressable>

      {/* //*  댓글 작성 */}
      <Pressable
        style={{ marginLeft: 12, marginRight: 16 }}
        onPress={() => {
          // props.navigation.goBack()
          // alert("댓글 작성으로 이동")
          //TODO: params 값 추가해줘야 함
          navigate("writing-comment-screen", null)
        }}
      >
        <Image style={styles.writeComment} source={images.write_comment} />
      </Pressable>
    </View>
  )
}
