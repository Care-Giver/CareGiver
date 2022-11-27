import { View, Text, Pressable, Image, ImageBackground } from "react-native"
import React from "react"
import { styles } from "./styles"
import { Row } from "../basics/row/row"
import { HEIGHT, WIDTH } from "#theme"
import { PreMed14, PreReg10, PreReg12, PreReg14 } from "../basics/custom-texts/custom-texts"
import { images } from "#images"
import { DISABLED, GIVER_CASUAL_NAVY, HEAD_LINE, MIDDLE_LINE } from "#theme"
import { DivisionLineVertical } from "../division-line-vertical/division-line-vertical"
import { pastBooking } from "./dummy-data"
import { CaregiverTypeButton } from "#components"

const ONPRESS_LIKED_BTN = () => {
  alert("준비중인 서비스입니다.")
}

const handleAgainPress = () => {
  console.log("다시 예약하기 클릭")
}

const handleReviewPress = () => {
  console.log("후기 작성하기 클릭")
}

const handlePress = () => {
  alert("아직 개발중인 기능입니다 😉")
}

export const PastBooking = (props) => {
  const { style } = props
  return (
    <Pressable style={[styles.root, style]} onPress={handlePress}>
      {/* //* 케어기버 프로필 사진 */}
      <ImageBackground
        source={{
          uri:
            "https://mblogthumb-phinf.pstatic.net/MjAxOTA4MjJfMjE3/MDAxNTY2NDY1NjQ0Njc3.HlKJUXi4rPFNs92rbdwegwH7JAzyM-6kWfy_UZDBxfEg.I6Jy9AhcKKWmNr6ZeKKotQSdq3pLX6v4nYH8XXqmlh8g.PNG.misomktblog/%EB%8C%80%EC%A7%80_1.png?type=w800",
        }}
        style={styles.profileImg}
      >
        <Row style={{ backgroundColor: null }}>
          <CaregiverTypeButton text={pastBooking.serviceType} style={styles.typeBtn} />
          <CaregiverTypeButton
            text={pastBooking.caregiverType}
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
            <Image style={styles.likeBtn} source={images.empty_heart} />
          </Pressable>
        </Row>

        {/* //* 체크인, 체크아웃 */}
        <Row style={{ alignItems: "baseline" }}>
          {/* //? 체크인 */}
          <View>
            <PreReg10 text={"체크인"} color={DISABLED} />
            <PreReg12
              text={pastBooking.checkIn}
              color={DISABLED}
              style={{ marginTop: HEIGHT * 4 }}
            />
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
            <PreReg12
              text={pastBooking.checkOut}
              color={DISABLED}
              style={{ marginTop: HEIGHT * 4 }}
            />
          </View>
        </Row>

        {/* //* 다시 예약하기 | 후기 작성하기 */}
        <Row style={{}}>
          {/* //? 다시 예약하기 버튼 */}
          <Pressable onPress={handleAgainPress}>
            <PreMed14 text={"다시 예약하기"} color={HEAD_LINE} />
          </Pressable>

          {/* //? division line */}
          <PreReg12 text={"|"} color={MIDDLE_LINE} style={styles.divisionLine} />

          {/* //? 후기 작성하기 버튼 */}
          {pastBooking.reviewStatus === "Possible" ? (
            <Pressable onPress={handleReviewPress}>
              <PreMed14 text={"후기 작성하기"} color={GIVER_CASUAL_NAVY} />
            </Pressable>
          ) : (
            <Pressable disabled>
              <PreMed14 text={"후기 작성하기"} color={DISABLED} />
            </Pressable>
          )}
        </Row>
      </View>
    </Pressable>
  )
}
