import React from "react"
import { View, Image } from "react-native"
import { styles } from "./styles"
import { Row } from "../../_BASIC/row/row"
import { PreReg12, PreReg14 } from "../../_BASIC/custom-texts/custom-texts"
import { RatingReviewBox } from "../../rating-review-box/rating-review-box"
import { InProgressBookingProfileProps } from "./in-progress-booking-profile.props"
import { CaregiverTypeButton } from "../../../components"
import { images } from "../../../../assets/images"
import { profileImageUriHandler } from "../../../utils/image-format-validate"

export const InProgressBookingProfile = ({
  caregiverData,
  style,
}: InProgressBookingProfileProps) => {
  // const { petsitterData, style } = props
  const { profileImage } = caregiverData

  return (
    <Row style={style}>
      {/* //* 프로필 사진 */}
      <Image
        // source={require(caregiverData.profileImg)}
        source={profileImageUriHandler(images.default_pet_image_60, "medium", profileImage)}
        style={styles.profileImg}
      />

      {/* //? 케어기버 정보 컨테이너 */}
      <View style={styles.infoRoot}>
        {/* //* 예약 유형 - 방문or위탁 / 펫시터or훈련사 */}
        <Row>
          <CaregiverTypeButton text={caregiverData.visitingId ? "방문" : "위탁"} />
          <CaregiverTypeButton text={"펫시터"} style={{ marginLeft: 4 }} />
        </Row>

        {/* //? 케어기버 정보 박스 - 이름, 별점, 후기, 자기소개 */}
        <View style={styles.infoBox}>
          {/* //* 케어기버 이름 */}
          <PreReg14 text={caregiverData.petSitterName} />
          {/* //* 별점 & 리뷰 박스 */}
          <RatingReviewBox
            rating={caregiverData.ratings}
            review={caregiverData.reviewCount}
            style={{ marginVertical: 8 }}
          />
          {/* //* 케어기버 자기소개 */}
          <PreReg12
            text={caregiverData.desc}
            numberOfLines={1}
            ellipsizeMode="tail"
            // TODO: width(글 길이 제한) 몇으로 할 건지?
          />
        </View>
      </View>
    </Row>
  )
}
