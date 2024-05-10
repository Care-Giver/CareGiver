import {
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native"
import React, { FC, useCallback, useMemo, useRef, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, goBack, navigate } from "#navigators"
import { observer } from "mobx-react-lite"
import {
  Comment,
  DivisionLine,
  Screen,
  FilterHeader,
  PreMed18,
  PreMed16,
  BASIC_BACKGROUND_PADDING_WIDTH,
} from "#components"
import { DEVICE_SCREEN_WIDTH, IOS_BOTTOM_HOME_BAR_HEIGHT, LBG } from "#theme"
import { HEADER_ROOT } from "../../../../components/_SCREEN_HEADER/common-styles"
import { images } from "#images"
import { alertModal } from "../../../../utils/alert-modal"
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet"
import _ from "lodash"

export type SelectedComment = {
  commentId: number
  desc: string
  commentatorId: number
}

export const AllCommentsScreen: FC<
  StackScreenProps<NavigatorParamList, "all-comments-screen">
> = observer(({ navigation, route }) => {
  const { comments, visitingId, userId } = route.params
  const [selectedComment, setSelectedComment] = useState<SelectedComment>({
    commentId: null,
    desc: "",
    commentatorId: null,
  })
  const isUserComment = userId === selectedComment.commentatorId

  // 기본 | 추가 서비스 설명 바텀시트모달 - ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // 펫시터 등록하기 바텀시트모달 - snapPoints
  const snapPoints = useMemo(() => ["20%", "20%"], [])

  /** 기본 | 추가 서비스 설명 바텀시트모달 backdrop */
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0} // backdrop이 등장할 때의 snap point -> snap point가 0이면 backdrop 나타남
        disappearsOnIndex={-1} // backdrop이 사라질 때의 snap point -> snap point가 -1이면 backdrop 사라짐
        pressBehavior={"close"}
      />
    ),
    [],
  )
  const onPressCommentOption = () => {
    if (!isUserComment) {
      return alertModal("개발중 🏗️", "답글 기능은 개발 중 입니다.")
    }
    bottomSheetModalRef.current.close()
    navigate("writing-comment-screen", {
      updateOrCreate: "update",
      commentId: selectedComment.commentId,
      defaultComment: selectedComment.desc,
    })
  }

  return (
    <Screen preset={"fixed"}>
      <AllCommentsScreenHeader visitingId={visitingId} />
      <FilterHeader
        title={"전체"}
        number={comments?.length < 1000 ? `${comments?.length}` : "999+"}
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
        // 최신순 정렬
        data={_.sortBy(comments, "createAt").reverse()}
        renderItem={({ item, index }) => (
          <Comment
            commentData={item}
            style={{ marginTop: -1 }}
            onPress={() => {
              setSelectedComment({
                commentId: item.id,
                desc: item?.__commentator__?.desc,
                commentatorId: item?.__commentator__?.id,
              })
              bottomSheetModalRef.current.present()
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: Platform.select({
            ios: 2 + IOS_BOTTOM_HOME_BAR_HEIGHT,
            android: 2,
          }),
        }}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}
      >
        <Pressable
          style={{
            marginTop: 28,
            marginBottom: 16,
            alignItems: "center",
          }}
          onPress={onPressCommentOption}
        >
          <PreMed16 text={isUserComment ? "수정하기" : "답글달기"} />
        </Pressable>
      </BottomSheetModal>
    </Screen>
  )
})

interface AllCommentsScreenHeaderProps {
  visitingId: number
}

export const AllCommentsScreenHeader = (props: AllCommentsScreenHeaderProps) => {
  const { visitingId } = props
  return (
    <View style={HEADER_ROOT}>
      {/* //* 뒤로가기 버튼 */}
      <Pressable
        onPress={() => {
          goBack()
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
      <TouchableOpacity
        style={{ marginLeft: 12, marginRight: 16 }}
        hitSlop={4}
        onPress={() => {
          // props.navigation.goBack()
          // alert("댓글 작성으로 이동")
          navigate("writing-comment-screen", { visitingId, updateOrCreate: "create" })
        }}
      >
        <Image style={styles.writeComment} source={images.write_comment} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  goBackButton: {
    width: 28,
    height: 28,
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
