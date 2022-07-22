import { View, Animated } from "react-native"
import React from "react"
import { Row } from "~/app/custom-components"
import { RowRoundedButton } from "~/app/custom-components/buttons/row-rounded-button/row-rounded-button"
import { HEAD_LINE } from "~/app/theme/palette"
import { HEIGHT, WIDTH } from "~/app/theme"
import IMAGES from "~/assets/common-images"
import { HEADER_HEIGHT, HEADER_AREA, OPACITY_MIN } from "./header-property"
import { DISABLED } from "../../../../../theme/palette"

export const AnimatedHeader = ({ animatedValue }) => {
  const headerOpacity = animatedValue.interpolate({
    inputRange: [OPACITY_MIN, 100],
    outputRange: [1, OPACITY_MIN * 0.01],
    extrapolate: "clamp",
  })

  const headerTranslateY = animatedValue.interpolate({
    inputRange: [0, HEADER_AREA],
    outputRange: [0, -1 * HEADER_AREA],
    extrapolate: "clamp",
  })

  return (
    // ? Animated.View: 애니메이션 효과를 넣을 범위 -> 검색 필터 영역
    <Animated.View
      style={{
        height: HEADER_HEIGHT,
        opacity: headerOpacity,
        transform: [{ translateY: headerTranslateY }],
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
            image={IMAGES.calender_disabled}
            text={"2022.03.20"}
            textColor={DISABLED}
            style={{ width: WIDTH * 174 }}
          />

          {/* //? 시간 선택 */}
          <RowRoundedButton
            image={IMAGES.timer_disabled}
            text={"08:00-12:00"}
            textColor={DISABLED}
            style={{ width: WIDTH * 174 }}
          />
        </Row>

        {/*//? 주소 선택 */}
        <RowRoundedButton
          image={IMAGES.location_disabled}
          text={"경기도 안산시 상록구 한양대학로 55"}
          textColor={DISABLED}
          style={{ marginTop: HEIGHT * 12 }}
        />
      </View>
    </Animated.View>
  )
}
