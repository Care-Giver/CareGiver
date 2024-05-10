import React from "react"
import { View, Image, ViewStyle, StyleProp, TouchableOpacity } from "react-native"
import { styles } from "./styles"
import { PreBol14, PreMed16 } from "../_BASIC/custom-texts/custom-texts"
import { DBG, GIVER_CASUAL_NAVY, HEAD_LINE, SUB_HEAD_LINE } from "#theme"
import { Row } from "../_BASIC/row/row"
import { images } from "#images"
import { DivisionLineVertical } from "../_BASIC/division-line-vertical/division-line-vertical"
import { observer } from "mobx-react-lite"
import { profileImageUriHandler } from "../../utils/image-format-validate"
import { ratingRound } from "../../utils/format"

interface CaregiverNameStarReviewProps {
  style?: StyleProp<ViewStyle>
  profileImage?: string
  caregiverData: {
    name: string
    ratings: number
  }
  onPress?: () => void
  text: string
}

export const CaregiverNameStarReview = observer(function CaregiverNameStarReview(
  props: CaregiverNameStarReviewProps,
) {
  const { style: viewStyle, profileImage, caregiverData, onPress, text } = props
  const { name, ratings } = caregiverData

  return (
    <View style={[styles.root, viewStyle]}>
      <Row>
        <Image
          style={styles.profileImage}
          source={profileImageUriHandler(images.default_pet_image_60, "small", profileImage)}
          resizeMode="cover"
        />

        <View
          style={{
            height: "100%",
            justifyContent: "space-evenly",
            marginLeft: 10,
          }}
        >
          <PreMed16 text={name} color={HEAD_LINE} />
          <Row>
            <Image style={styles.star} source={images.rating_star} />
            <PreMed16
              text={`(${ratingRound(ratings)})`}
              color={SUB_HEAD_LINE}
              style={{ marginLeft: 4 }}
            />

            <DivisionLineVertical
              color={DBG}
              width={1}
              height={14}
              style={{ marginLeft: 8, marginRight: 8 }}
            />

            <TouchableOpacity onPress={onPress} hitSlop={4}>
              <Row>
                <PreBol14
                  text={text}
                  color={GIVER_CASUAL_NAVY}
                  // style={{ marginLeft: 4 }}
                />
                <Image source={images.arrow_right_navy} style={styles.rightArrow} />
              </Row>
            </TouchableOpacity>
          </Row>
        </View>
      </Row>

      {/* <PreReg14 color={HEAD_LINE}>{name}</PreReg14> */}
    </View>
  )
})
