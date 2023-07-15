import React, { FC, useLayoutEffect, useState } from "react"
import { ScrollView, StyleSheet, View, FlatList, Image, Platform } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "../../../navigators"
import {
  CaregiverTypeButton,
  PreMed18,
  PreReg14,
  RegisterSubmitButton,
  Row,
  Screen,
} from "../../../components"
import { Review, getCrecheReview, getVisitingReview } from "../../../services/axios/review"
import { reviewStyles } from "../styles"
import { images } from "../../../../assets/images"
import { GIVER_CASUAL_NAVY, HEAD_LINE, IOS_BOTTOM_HOME_BAR_HEIGHT, LBG } from "../../../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

const editButtonBottom = Platform.OS === "ios" ? 8 + IOS_BOTTOM_HOME_BAR_HEIGHT : 8

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const ViewReviewScreen: FC<
  StackScreenProps<NavigatorParamList, "view-review-screen">
> = observer(function ViewReviewScreen({ route, navigation }) {
  const { serviceType, bookingId, profileImage, petsitterName, desc } = route.params

  console.log("service Type:", serviceType)
  console.log("bookingId:", bookingId)

  const [review, setReview] = useState<Review | null>(null)
  console.log("review >>>", review)

  useLayoutEffect(() => {
    async function fetchData() {
      switch (serviceType) {
        case "creche":
          getCrecheReview(bookingId)
            .then((res) => {
              if (!res) {
                alert("잘못된 접근입니다.\n원인: 작성된 후기가 존재하지 않음")
                navigation.goBack()
              } else {
                setReview({ ...res })
              }
            })
            .catch((error) => {
              console.error(route.name, error)
              alert("정보를 불러오는 과정에서 문제가 발생했습니다.")
              navigation.goBack()
            })
          break
        case "visiting":
          getVisitingReview(bookingId)
            .then((res) => {
              if (!res) {
                alert("잘못된 접근입니다.\n원인: 작성된 후기가 존재하지 않음")
                navigation.goBack()
              } else {
                setReview({ ...res })
              }
            })
            .catch((error) => {
              console.error(route.name, error)
              alert("정보를 불러오는 과정에서 문제가 발생했습니다.")
              navigation.goBack()
            })
          break
        default:
          console.error("잘못된 serviceType(creche | visiting)")
          break
      }
    }
    fetchData()
  }, [])

  console.log("bottom:", editButtonBottom)

  return (
    <Screen testID="ViewReview">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* // * 펫시터 프로필 */}
        <View style={reviewStyles.profileCard}>
          <Image
            source={profileImage ? profileImage : images.profile_default}
            style={reviewStyles.profileImage}
          />
          <View style={reviewStyles.profileInfo}>
            <View style={reviewStyles.name}>
              <PreMed18 text={petsitterName} mr={8} />
              <CaregiverTypeButton
                text={serviceType === "creche" ? "위탁" : "방문"}
                style={{ marginRight: 4 }}
              />
              <CaregiverTypeButton
                text="펫시터"
                textColor={GIVER_CASUAL_NAVY}
                style={reviewStyles.petsitterTypeBtn}
              />
            </View>

            <PreReg14 text={desc} />
          </View>
        </View>

        {/* //* 별점 */}
        <Row style={{ marginTop: 36 }}>
          {new Array(5).fill(0).map((item, index) => (
            <Image
              key={index}
              style={reviewStyles.starImg}
              source={review && index < review.star ? images.star_filled : images.star_empty}
            />
          ))}
        </Row>

        {/* //* 사진 */}
        <FlatList
          style={{ marginTop: 20 }}
          horizontal
          data={review?.images}
          renderItem={({ item, index }) => (
            <Image key={index} source={{ uri: item }} style={styles.uploadedImg} />
          )}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        />

        {/* //* 리뷰 텍스트 */}
        <View style={styles.descriptionBox}>
          <PreReg14 text={review?.desc} color={HEAD_LINE} />
        </View>
      </ScrollView>
      {/* //* 수정 버튼 */}
      <RegisterSubmitButton
        text="확인"
        style={{ position: "absolute", bottom: editButtonBottom }}
        onPress={() => navigation.goBack()}
      />
    </Screen>
  )
})

const styles = StyleSheet.create({
  descriptionBox: {
    marginTop: 20,
    padding: 20,

    minHeight: 277,

    borderRadius: 8,
    backgroundColor: LBG,
  },

  uploadedImg: {
    width: 128,
    height: 128,
    borderRadius: 8,
  },
})
