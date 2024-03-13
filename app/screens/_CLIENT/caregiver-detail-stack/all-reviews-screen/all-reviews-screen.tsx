import React, { FC, useEffect, useLayoutEffect, useState } from "react"
import { FlatList, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../../../navigators"
import { observer } from "mobx-react-lite"
import { DivisionLine, Screen, ReviewBox, FilterHeader } from "../../../../components"
import { reviews as _reviews } from "./dummy-data"
import { LBG } from "../../../../theme"
import { alertModal } from "../../../../utils/alert-modal"
import { Review, getVisitingReviews } from "#api"

export const AllReviewsScreen: FC<
  StackScreenProps<NavigatorParamList, "all-reviews-screen">
> = observer(({ navigation, route }) => {
  const visitingId = route.params.visitingId
  // ? 리뷰 리스트
  const [reviews, setReviews] = useState<Review[]>([])
  // ? 선택된 정렬 옵션
  const [seletedOption, setSelectedOption] = useState("최신순")

  useEffect(() => {
    getVisitingReviews(visitingId).then((res) => {
      if (res.isSuccess) setReviews(res.visitingReviews)
    })
  }, [])

  return (
    <Screen preset={"fixed"}>
      {/* //? 필터 헤더 박스 */}
      <FilterHeader
        title={"전체"}
        number={reviews.length < 1000 ? `${reviews.length}` : "999+"}
        seletedOption={seletedOption}
        onPress={() => {
          alertModal("개발중 🏗️", "후기 정렬 기능은 개발 중 입니다.")
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
    </Screen>
  )
})
