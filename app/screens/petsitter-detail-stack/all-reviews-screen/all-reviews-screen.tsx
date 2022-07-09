import { FlatList, View } from "react-native"
import React, { FC, useLayoutEffect, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../../navigators"
import { observer } from "mobx-react-lite"
import { DivisionLine, ScreenRootView } from "../../../custom-components"
import { reviews as _reviews } from "./dummy-data"
import { ReviewBox } from "../../../custom-components/review-box/review-box"
import { FilterHeader } from "../../../custom-components/filter-header/filter-header"
import IMAGES from "../../../../assets/common-images"
import { HEIGHT } from "../../../theme"
import { LBG } from "../../../theme/palette"

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
    <ScreenRootView preset={"scroll"} showsVerticalScrollIndicator={false}>
      {/* //? 필터 헤더 박스 */}
      <FilterHeader
        title={"전체"}
        number={reviews.length < 1000 ? `${reviews.length}` : "999+"}
        seletedOption={seletedOption}
      />

      <DivisionLine color={LBG} />

      {/* //? 리뷰 리스트 */}
      <FlatList
        data={reviews}
        renderItem={({ item, index }) => (
          <>
            <ReviewBox
              style={{
                marginTop: HEIGHT * 12,
              }}
              key={index}
              // profileImg={item.user.profileImg ? item.user.profileImg : IMAGES.profile_default}
              // userName={item.user.name}
              // ratings={item.ratings}
              // createdAt={item.createdAt}
              // images={item.images ? item.images : []}
              // review={item.review}
              // pets={item.pets}
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
