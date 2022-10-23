import { View, Text, Pressable, Image, ImageBackground } from "react-native"
import React from "react"
import { styles } from "./styles"
import { Row } from "../basics/row/row"
import CaregiverTypeButton from "../buttons/caregiver-type-button/caregiver-type-button"
import { HEIGHT, WIDTH } from "#theme/device-size-constant"
import { PreMed14, PreReg10, PreReg12, PreReg14 } from "../basics/custom-texts/custom-texts"
import IMAGES from "#images"
import { DISABLED, HEAD_LINE, MIDDLE_LINE } from "#theme/palette"
import { DivisionLineVertical } from "../division-line-vertical/division-line-vertical"

const ONPRESS_LIKED_BTN = () => {
  alert("준비중인 서비스입니다.")
}

export const PastBooking = (props) => {
  const { style } = props
  return (
    <Pressable style={[styles.root, style]}>
      {/* //* 케어기버 프로필 사진 */}
      <ImageBackground source={require("")} style={styles.profileImg}>
        <Row style={{ backgroundColor: null }}>
          <CaregiverTypeButton text={"방문"} style={styles.typeBtn} />
          <CaregiverTypeButton
            text={"펫시터"}
            style={[styles.typeBtn, { marginLeft: WIDTH * 6 }]}
          />
        </Row>
      </ImageBackground>

      {/* //* 예약 정보 */}
      <View style={styles.bookingInfo}>
        {/* //? 케어기버 이름 (*** 펫시터) */}
        <Row style={{ justifyContent: "space-between" }}>
          <PreReg14 text="유혜린 펫시터" color={DISABLED} />
          {/* //? 찜 버튼 */}
          <Pressable onPress={ONPRESS_LIKED_BTN}>
            <Image style={styles.likeBtn} source={IMAGES.empty_heart} />
          </Pressable>
        </Row>

        {/* //* 체크인, 체크아웃 */}
        <Row style={{ alignItems: "baseline" }}>
          {/* //? 체크인 */}
          <View>
            <PreReg10 text={"체크인"} color={DISABLED} />
            <PreReg12 text={"12월 14일 10:00"} color={DISABLED} style={{ marginTop: HEIGHT * 4 }} />
          </View>

          {/* //? division line */}
          <PreReg12
            text={"|"}
            color={MIDDLE_LINE}
            style={{ marginLeft: WIDTH * 3, marginRight: WIDTH * 8 }}
          />

          {/* //? 체크아웃 */}
          <View>
            <PreReg10 text={"체크아웃"} color={DISABLED} />
            <PreReg12 text={"12월 14일 18:00"} color={DISABLED} style={{ marginTop: HEIGHT * 4 }} />
          </View>
        </Row>

        {/* //* 다시 예약하기 | 후기 작성하기 */}
        <Row style={{}}>
          {/* //? 다시 예약하기 버튼 */}
          <Pressable>
            <PreMed14 text={"다시 예약하기"} color={HEAD_LINE} />
          </Pressable>

          {/* //? division line */}
          <PreReg12 text={"|"} color={MIDDLE_LINE} style={styles.divisionLine} />

          {/* //? 후기 작성하기 버튼 */}
          <Pressable>
            <PreMed14 text={"후기 작성하기"} color={DISABLED} />
          </Pressable>
        </Row>
      </View>
    </Pressable>
  )
}
