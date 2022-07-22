import { View, Image, Pressable } from "react-native"
import React from "react"
import { WIDTH } from "../../../theme"
import { PreMed18 } from "../../custom-texts/custom-texts"
import IMAGES from "../../../../assets/common-images"
import { styles } from "./styles"
import { navigate } from "../../../navigators"
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
        <Image style={styles.goBackButton} source={IMAGES.go_back} />
      </Pressable>

      {/* //* 타이틀 */}

      <PreMed18 style={{ marginLeft: WIDTH * 8 }}> 댓글</PreMed18>

      {/* //*  댓글 검색 */}
      <Pressable
        style={{ marginLeft: "auto" }}
        onPress={() => {
          // props.navigation.goBack()
          alert("댓글 검색으로 이동")
        }}
      >
        <Image style={styles.search} source={IMAGES.search} />
      </Pressable>

      {/* //*  댓글 작성 */}
      <Pressable
        style={{ marginLeft: WIDTH * 12, marginRight: WIDTH * 16 }}
        onPress={() => {
          // props.navigation.goBack()
          // alert("댓글 작성으로 이동")
          //TODO: params 값 추가해줘야 함
          navigate("writing-comment-screen", null)
        }}
      >
        <Image style={styles.writeComment} source={IMAGES.write_comment} />
      </Pressable>
    </View>
  )
}
