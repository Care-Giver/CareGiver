import { View, Animated } from "react-native"
import React from "react"
import { Row } from "caregiver/app/custom-components"
import { RowRoundedButton } from "caregiver/app/custom-components/buttons/row-rounded-button/row-rounded-button"
import { HEAD_LINE } from "caregiver/app/theme/palette"
import { HEIGHT, WIDTH } from "caregiver/app/theme"
import IMAGES from "caregiver/assets/common-images"

// ? 검색 필터(날짜, 시간, 장소 선택 필터) 컨테이너 높이
const HEADER_HEIGHT = HEIGHT * 105

const HEADER_MARGIN_TOP = HEIGHT * 20
const HEADER_MARGIN_BOTTOM = HEIGHT * 20

// ? 검색 필터 ~ "검색결과" 텍스트 사이 간격
const HEADER_TITLE_INTERVAL = HEIGHT * 36

const HEADER_AREA =
  HEIGHT * (HEADER_HEIGHT + HEADER_MARGIN_TOP + (HEADER_TITLE_INTERVAL - HEADER_MARGIN_BOTTOM))

const OPACITY_MAX = 100

export const AnimatedHeader = ({ animatedValue }) => {
  const headerOpacity = animatedValue.interpolate({
    inputRange: [0, OPACITY_MAX],
    outputRange: [OPACITY_MAX * 0.01, 0.1],
    extrapolate: "clamp",
  })

  const headerMarginTop = animatedValue.interpolate({
    inputRange: [HEADER_MARGIN_TOP, HEADER_AREA],
    outputRange: [HEADER_MARGIN_TOP, HEIGHT * -1 * HEADER_AREA],
    extrapolate: "clamp",
  })

  return (
    //? Animated.View: 애니메이션 효과를 넣을 범위 -> 검색 필터 박스
    <Animated.View
      style={{
        marginTop: headerMarginTop,
        height: HEADER_HEIGHT,
        opacity: headerOpacity,
      }}
    >
      <View>
        <Row
          style={{
            justifyContent: "space-between",
          }}
        >
          {/*//? 날짜 선택 */}
          <RowRoundedButton
            onPress={() => {
              alert("dd")
            }}
            image={IMAGES.calendar}
            text={"2022.03.20"}
            textColor={HEAD_LINE}
            style={{ width: WIDTH * 174 }}
          />

          {/* //? 시간 선택 */}
          <RowRoundedButton
            onPress={() => {
              alert("time clicked")
            }}
            image={IMAGES.timer}
            text={"08:00-12:00"}
            textColor={HEAD_LINE}
            style={{ width: WIDTH * 174 }}
          />
        </Row>

        {/*//? 주소 선택 */}
        <RowRoundedButton
          onPress={() => {
            alert("dd")
          }}
          image={IMAGES.location}
          text={"경기도 안산시 상록구 한양대학로 55"}
          textColor={HEAD_LINE}
          style={{ marginTop: HEIGHT * 12 }}
        />
      </View>
    </Animated.View>
  )
}
