import { View, Text, Pressable, Image } from "react-native"
import React from "react"
import { styles } from "./styles"
import { PreBol14, PreMed16 } from "../basics/custom-texts/custom-texts"
import { DBG, GIVER_CASUAL_NAVY, HEAD_LINE, SUB_HEAD_LINE } from "#theme"
import { Row } from "../basics/row/row"
import { images } from "#images"
import { DivisionLineVertical } from "../division-line-vertical/division-line-vertical"
import { navigate } from "#navigators"
import { ratingRound } from "../../utils/format"

export const CaregiverNameStarReview = (props) => {
  const { style: viewStyle, caregiverData } = props
  const { name, ratings, numberOfReviews } = caregiverData
  const roundedRating = ratingRound(ratings)

  return (
    <View style={[styles.root, viewStyle]}>
      <Row>
        <Image style={styles.profileImage} source={images.default_pet_image_60} />

        <View
          style={{
            height: "100%",
            justifyContent: "space-evenly",
            marginLeft: 10,
          }}
        >
          <PreMed16 text={name} color={HEAD_LINE} style={{ marginLeft: 4 }} />
          <Row>
            <Image style={styles.star} source={images.rating_star} />
            <PreMed16 text={`(${roundedRating})`} color={SUB_HEAD_LINE} style={{ marginLeft: 4 }} />

            <DivisionLineVertical
              color={DBG}
              width={1}
              height={14}
              style={{ marginLeft: 8, marginRight: 8 }}
            />

            <Pressable
              onPress={() => {
                //? 리뷰 전체보기 화면으로 이동
                //TODO: params 값 추가해줘야 함
                navigate("all-reviews-screen", null)
              }}
            >
              <Row>
                <PreBol14
                  text={`리뷰 ${numberOfReviews}개`}
                  color={GIVER_CASUAL_NAVY}
                  // style={{ marginLeft: 4 }}
                />
                <Image source={images.arrow_right_navy} style={styles.rightArrow} />
              </Row>
            </Pressable>
          </Row>
        </View>
      </Row>

      {/* <PreReg14 color={HEAD_LINE}>{name}</PreReg14> */}
    </View>
  )
}
