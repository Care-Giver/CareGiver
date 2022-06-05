import { View, Animated } from "react-native"
import React from "react"
import { Row } from "caregiver/app/custom-components"
import { RowRoundedButton } from "caregiver/app/custom-components/buttons/row-rounded-button/row-rounded-button"
import { HEAD_LINE } from "caregiver/app/theme/palette"
import { HEIGHT, WIDTH } from "caregiver/app/theme"
import IMAGES from "caregiver/assets/common-images"

// ? 검색 필터(날짜, 시간, 장소 선택 필터) "컨테이너" 높이
const HEADER_HEIGHT = HEIGHT * 105

const HEADER_MARGIN_TOP = HEIGHT * 20
const HEADER_MARGIN_BOTTOM = HEIGHT * 22

// ? 검색 필터 "영역" 높이
// ? -> 영역에 해당 영역 높이 만큼의 음수 top 마진 값을 주면, 영역 높이만큼 위쪽으로 이동하게 됨
// ?    이를 이용하여, 스크롤을 어느정도 올리다보면 검색필터 영역이 위로 올라가면서 사라지는 효과를 줄 수 있다
const HEADER_AREA = HEADER_HEIGHT + HEADER_MARGIN_TOP + HEADER_MARGIN_BOTTOM

// ? 검색필터 영역의 최소 선명도 (%)
const OPACITY_MIN = 10

export const AnimatedHeader = ({ animatedValue }) => {
  const headerOpacity = animatedValue.interpolate({
    inputRange: [OPACITY_MIN, 100],
    outputRange: [1, OPACITY_MIN * 0.01],
    extrapolate: "clamp",
  })

  const headerMarginTop = animatedValue.interpolate({
    inputRange: [HEADER_MARGIN_TOP, HEADER_AREA],
    outputRange: [HEADER_MARGIN_TOP, -1 * HEADER_AREA],
    extrapolate: "clamp",
  })

  return (
    // ? Animated.View: 애니메이션 효과를 넣을 범위 -> 검색 필터 영역
    <Animated.View
      style={{
        marginTop: headerMarginTop,
        marginBottom: HEADER_MARGIN_BOTTOM,
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
