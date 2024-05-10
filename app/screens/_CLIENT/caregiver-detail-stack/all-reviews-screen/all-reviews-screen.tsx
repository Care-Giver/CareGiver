import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { FlatList, Pressable, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../../../navigators"
import { observer } from "mobx-react-lite"
import {
  DivisionLine,
  Screen,
  ReviewBox,
  FilterHeader,
  BASIC_BACKGROUND_PADDING_WIDTH,
  PreMed16,
} from "../../../../components"
import { LBG } from "../../../../theme"
import { VisitingReview } from "../../../../services/api"
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet"
import _ from "lodash"

type OptionType = "최신순" | "별점많은순"

export const AllReviewsScreen: FC<
  StackScreenProps<NavigatorParamList, "all-reviews-screen">
> = observer(({ navigation, route }) => {
  const [reviews, setReviews] = useState<VisitingReview[]>(route.params?.reviews ?? [])

  // ? 선택된 정렬 옵션
  const [seletedOption, setSelectedOption] = useState<OptionType>("최신순")

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

  return (
    <Screen preset={"fixed"}>
      {/* //? 필터 헤더 박스 */}
      <FilterHeader
        title={"전체"}
        number={reviews.length < 1000 ? `${reviews.length}` : "999+"}
        seletedOption={seletedOption}
        onPress={() => {
          bottomSheetModalRef.current.present()
        }}
      />

      <DivisionLine color={LBG} />

      {/* //? 리뷰 리스트 */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={reviews}
        renderItem={({ item, index }) => (
          <View key={Math.random()}>
            <ReviewBox
              style={{
                marginTop: 12,
              }}
              reviewData={item}
            />
            <DivisionLine
              color={LBG}
              style={{
                marginTop: 32,
                // ? 마지막 구분 선에는 marginBottom 값 존재
                marginBottom: index === reviews.length - 1 ? 21 : 0,
              }}
            />
          </View>
        )}
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
          onPress={() => {
            setSelectedOption("최신순")
            bottomSheetModalRef.current?.close()
            setReviews(_.sortBy(reviews, "createAt").reverse())
          }}
        >
          <PreMed16 text={"최신순"} />
        </Pressable>
        <Pressable
          style={{
            marginTop: 28,
            marginBottom: 16,
            alignItems: "center",
          }}
          onPress={() => {
            setSelectedOption("별점많은순")
            bottomSheetModalRef.current?.close()
            setReviews(_.sortBy(reviews, "star").reverse())
          }}
        >
          <PreMed16 text={"별점많은순"} />
        </Pressable>
      </BottomSheetModal>
    </Screen>
  )
})
