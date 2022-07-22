import { View, Text, Pressable, Image } from "react-native"
import React from "react"
import { styles } from "./styles"
import { WIDTH, HEIGHT } from "~/app/theme"
import { PreBol14, PreMed16 } from "../custom-texts/custom-texts"
import { DBG, GIVER_CASUAL_NAVY, HEAD_LINE, SUB_HEAD_LINE } from "~/app/theme/palette"
import { Row } from "../boxes/basics/row"
import IMAGES from "~/assets/images"
import { DivisionLineVertical } from "../division-line-vertical/division-line-vertical"
import { navigate } from "~/app/navigators"

export const CaregiverNameStarReview = (props) => {
  const { style: viewStyle, caregiverData } = props
  const { name, ratings, numberOfReviews } = caregiverData

  return (
    <View style={[styles.root, viewStyle]}>
      <Row>
        <Image style={styles.profileImage} source={IMAGES.default_pet_image_60} />

        <View
          style={{
            height: "100%",
            justifyContent: "space-evenly",
            marginLeft: WIDTH * 10,
          }}
        >
          <PreMed16 text={name} color={HEAD_LINE} style={{ marginLeft: WIDTH * 4 }} />
          <Row>
            <Image style={styles.star} source={IMAGES.rating_star} />
            <PreMed16
              text={`(${ratings})`}
              color={SUB_HEAD_LINE}
              style={{ marginLeft: WIDTH * 4 }}
            />

            <DivisionLineVertical
              color={DBG}
              width={WIDTH * 1}
              height={HEIGHT * 14}
              style={{ marginLeft: WIDTH * 8, marginRight: WIDTH * 8 }}
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
                  // style={{ marginLeft: WIDTH * 4 }}
                />
                <Image source={IMAGES.right_arrow_navy} style={styles.rightArrow} />
              </Row>
            </Pressable>
          </Row>
        </View>
      </Row>

      {/* <PreReg14 color={HEAD_LINE}>{name}</PreReg14> */}
    </View>
  )
}
