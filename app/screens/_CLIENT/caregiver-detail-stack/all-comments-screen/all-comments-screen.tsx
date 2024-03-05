import { FlatList, Image, Platform, Pressable, StyleSheet, View } from "react-native"
import React, { FC } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import { observer } from "mobx-react-lite"
import { Comment, DivisionLine, Screen, FilterHeader, PreMed18 } from "#components"
import { allComments } from "./dummy-data"
import { DEVICE_SCREEN_WIDTH, IOS_BOTTOM_HOME_BAR_HEIGHT, LBG } from "#theme"
import { HEADER_ROOT } from "../../../../components/_SCREEN_HEADER/common-styles"
import { images } from "#images"
import { alertModal } from "../../../../utils/alert-modal"

export const AllCommentsScreen: FC<
  StackScreenProps<NavigatorParamList, "all-comments-screen">
> = observer(({ navigation, route }) => {
  const allComments = route.params.comments
  console.log("allComments>>>", allComments)
  return (
    <Screen preset={"fixed"}>
      <FilterHeader
        title={"전체"}
        number={allComments?.length < 1000 ? `${allComments?.length}` : "999+"}
        // seletedOption={seletedOption}
      />

      <DivisionLine
        color={LBG}
        style={{
          alignSelf: "center",
          width: DEVICE_SCREEN_WIDTH,
        }}
      />

      {/* //? 댓글 리스트 */}
      <FlatList
        data={allComments}
        renderItem={({ item, index }) => <Comment commentData={item} style={{ marginTop: -1 }} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: Platform.select({
            ios: 2 + IOS_BOTTOM_HOME_BAR_HEIGHT,
            android: 2,
          }),
        }}
      />
    </Screen>
  )
})

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
          alertModal("개발중 🏗️", "댓글 검색으로 이동.")
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

const styles = StyleSheet.create({
  goBackButton: {
    width: 28,
    height: 28,
    marginLeft: 16,
  },
  search: {
    width: 28,
    height: 28,
  },
  writeComment: {
    width: 28,
    height: 28,
  },
})
