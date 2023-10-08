import { View, Animated } from "react-native"
import React from "react"
import { Row, RowRoundedButton } from "#components"

import { images } from "#images"
import { HEADER_HEIGHT, HEADER_AREA, OPACITY_MIN } from "./header-property"
import { DISABLED } from "#theme"

interface AnimatedHeaderProps {
  animatedValue: Animated.Value

  // 방문
  startTime?: string
  endTime?: string

  //  위탁
  startDate?: string
  endDate?: string
}

export const AnimatedHeader = (props: AnimatedHeaderProps) => {
  const { animatedValue, startTime, endTime, startDate, endDate } = props

  const 방문검색 = !!startTime && !!endTime
  const 위탁검색 = !!startDate && !!endDate

  let 방문날짜, 방문시간, 위탁시작날짜, 위탁종료날짜

  if (방문검색) {
    방문날짜 = startTime.substring(0, 10).replace(/-/g, ".")
    방문시간 = `${startTime.substring(11, 16)} ~ ${endTime.substring(11, 16)}`
  }

  if (위탁검색) {
    위탁시작날짜 = startDate.substring(0, 10).replace(/-/g, ".")
    위탁종료날짜 = endDate.substring(0, 10).replace(/-/g, ".")
  }

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
          {방문검색 && (
            <>
              {/*//? 날짜 */}
              <RowRoundedButton
                image={images.calender_disabled}
                text={방문날짜}
                textColor={DISABLED}
                style={{ width: "48%" }}
              />

              {/* //? 방문 시간 */}
              <RowRoundedButton
                image={images.timer_disabled}
                text={방문시간}
                textColor={DISABLED}
                style={{ width: "48%" }}
              />
            </>
          )}

          {위탁검색 && (
            <>
              {/*//? 시작 날짜 */}
              <RowRoundedButton
                image={images.calender_disabled}
                text={`${위탁시작날짜} ~ ${위탁종료날짜}`}
                textColor={DISABLED}
                style={{ width: "100%" }}
              />
            </>
          )}
        </Row>

        {/*//? 주소 선택 */}
        <RowRoundedButton
          image={images.location_disabled}
          text={"경기도 안산시 상록구 한양대학로 55"}
          textColor={DISABLED}
          style={{ marginTop: 12 }}
        />
      </View>
    </Animated.View>
  )
}
