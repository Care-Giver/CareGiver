import { View, Text, Image } from "react-native"
import React from "react"
import { Row } from "../../boxes/basics/row"
import { PreBol14, PreReg12 } from "../../custom-texts/custom-texts"
import IMAGES from "~/assets/images"
import { styles } from "./styles"
import { HEIGHT } from "~/app/theme"

export const ReserveDateBox = ({
  startDateTime,
  endDateTime,
  style,
}: {
  startDateTime: Date
  endDateTime: Date
  style?: Object
}) => {
  const startMonth = startDateTime.getMonth() + 1
  const startDay = startDateTime.getDate()
  const startHours = startDateTime.getHours()
  const startMinutes = startDateTime.getMinutes() === 0 ? "00" : startDateTime.getMinutes()

  const endMonth = endDateTime.getMonth() + 1
  const endDay = endDateTime.getDate()
  const endHours = endDateTime.getHours()
  const endMinutes = endDateTime.getMinutes() === 0 ? "00" : endDateTime.getMinutes()

  return (
    <Row
      style={[
        {
          alignItems: "flex-start",
          justifyContent: "center",
        },
        style,
      ]}
    >
      {/* //* 시작 날짜 컨테이너 */}
      <View style={styles.dateBox}>
        <PreReg12 text="체크인" />
        <PreBol14
          text={`${startMonth}월 ${startDay}일 ${startHours}:${startMinutes}`}
          style={{ marginTop: HEIGHT * 4 }}
        />
      </View>
      {/* //* 화살표(->) */}
      <Image source={IMAGES.right_arrow_grey} style={styles.arrow} />
      {/* //* 끝나는 날짜 컨테이너 */}
      <View style={styles.dateBox}>
        <PreReg12 text="체크아웃" />
        <PreBol14
          text={`${endMonth}월 ${endDay}일 ${endHours}:${endMinutes}`}
          style={{ marginTop: HEIGHT * 4 }}
        />
      </View>
    </Row>
  )
}
