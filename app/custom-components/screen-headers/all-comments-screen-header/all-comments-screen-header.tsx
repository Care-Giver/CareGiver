import { View, Image, Platform, Pressable } from "react-native"
import React from "react"
import { WIDTH, HEIGHT, HEADER_HEIGHT, IOS_NOTCH_STATUS_BAR_HEIGHT } from "../../../theme"
import { PreMed18 } from "../../custom-texts/custom-texts"
import IMAGES from "../../../../assets/common-images"
import { styles } from "./styles"

const HEADER_ROOT = {
  backgroundColor: "white",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  height: Platform.select({
    ios: HEADER_HEIGHT + IOS_NOTCH_STATUS_BAR_HEIGHT,
    android: HEADER_HEIGHT,
  }),

  //! iOS 헤더 스타일링 개선: Status Bar 영역까지 헤더 컴포넌트가 있어야 함!
  paddingTop: Platform.select({
    ios: IOS_NOTCH_STATUS_BAR_HEIGHT,
    android: 0,
  }),
}

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
          alert("댓글 작성으로 이동")
        }}
      >
        <Image style={styles.writeComment} source={IMAGES.write_comment} />
      </Pressable>
    </View>
  )
}
