import { FlatList, View } from "react-native"
import React, { FC, useLayoutEffect, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "~/app/navigators"
import { observer } from "mobx-react-lite"
import { DivisionLine, ScreenRootView } from "~/app/components"
import { reviews as _reviews } from "./dummy-data"
import { ReviewBox } from "~/app/components/review-box/review-box"
import { FilterHeader } from "~/app/components/filter-header/filter-header"
import IMAGES from "~/assets/images"
import { HEIGHT } from "~/app/theme"
import { LBG } from "~/app/theme/palette"

export const AllReviewsScreen: FC<
  StackScreenProps<NavigatorParamList, "all-reviews-screen">
> = observer(({ navigation, route }) => {
  // ? 리뷰 리스트
  const [reviews, setReviews] = useState([])
  // ? 선택된 정렬 옵션
  const [seletedOption, setSelectedOption] = useState("최신순")

  useLayoutEffect(() => {
    setReviews(_reviews)
  }, [])

  // ? 헤더 타이틀 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "리뷰",
    })
  }, [])
  return (
    <ScreenRootView preset={"fixed"} showsVerticalScrollIndicator={false}>
      {/* //? 필터 헤더 박스 */}
      <FilterHeader
        title={"전체"}
        number={reviews.length < 1000 ? `${reviews.length}` : "999+"}
        seletedOption={seletedOption}
      />

      <DivisionLine color={LBG} />

      {/* //? 리뷰 리스트 */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={reviews}
        renderItem={({ item, index }) => (
          <>
            <ReviewBox
              style={{
                marginTop: HEIGHT * 12,
              }}
              key={index}
              reviewData={item}
            />
            <DivisionLine
              color={LBG}
              style={{
                marginTop: HEIGHT * 32,
                // ? 마지막 구분 선에는 marginBottom 값 존재
                marginBottom: index === reviews.length - 1 ? HEIGHT * 21 : 0,
              }}
            />
          </>
        )}
      />
    </ScreenRootView>
  )
})
