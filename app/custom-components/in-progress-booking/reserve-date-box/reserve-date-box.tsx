import { View, Text, Image } from "react-native"
import React from "react"
import { Row } from "../../boxes/basics/row"
import { PreBol14, PreReg12 } from "../../custom-texts/custom-texts"
import IMAGES from "../../../../assets/common-images"
import { styles } from "./styles"
import { HEIGHT } from "../../../theme"

export const ReserveDateBox = ({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
  const startMonth = startDate.getMonth() + 1
  const startDay = startDate.getDate()
  const startHours = startDate.getHours()
  const startMinutes = startDate.getMinutes() === 0 ? "00" : startDate.getMinutes()

  const endMonth = endDate.getMonth() + 1
  const endDay = endDate.getDate()
  const endHours = endDate.getHours()
  const endMinutes = endDate.getMinutes() === 0 ? "00" : endDate.getMinutes()

  return (
    <Row
      style={{
        alignItems: "flex-start",
      }}
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
