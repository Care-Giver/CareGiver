import { View, Image } from "react-native"
import React from "react"
import { Row } from "../../basics/row/row"
import { PreBol14, PreReg12 } from "../../basics/custom-texts/custom-texts"
import { images } from "#images"
import { styles } from "./styles"
import { HEIGHT } from "#theme"

const setStartDateText = (startDateTime: Date, serviceType: string): string => {
  const startMonth = startDateTime.getMonth() + 1
  const startDay = startDateTime.getDate()

  if (serviceType === "creche") {
    return `${startMonth}월 ${startDay}일`
  } else {
    const startHours = startDateTime.getHours()
    const startMinutes = startDateTime.getMinutes() === 0 ? "00" : startDateTime.getMinutes()
    return `${startMonth}월 ${startDay}일 ${startHours}:${startMinutes}`
  }
}

const setEndDateText = (endDateTime: Date, serviceType: string): string => {
  const endMonth = endDateTime.getMonth() + 1
  const endDay = endDateTime.getDate()

  if (serviceType === "creche") {
    return `${endMonth}월 ${endDay}일`
  } else {
    const endHours = endDateTime.getHours()
    const endMinutes = endDateTime.getMinutes() === 0 ? "00" : endDateTime.getMinutes()
    return `${endMonth}월 ${endDay}일 ${endHours}:${endMinutes}`
  }
}

export const ReserveDateBox = ({
  startDateTime,
  endDateTime,
  serviceType,
  style,
}: {
  startDateTime: Date
  endDateTime: Date
  serviceType: string
  style?: Object
}) => {
  let startDateText = setStartDateText(startDateTime, serviceType)
  let endDateText = setEndDateText(endDateTime, serviceType)

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
        <PreBol14 text={startDateText} style={{ marginTop: HEIGHT * 4 }} />
      </View>
      {/* //* 화살표(->) */}
      <Image source={images.right_arrow_grey} style={styles.arrow} />
      {/* //* 끝나는 날짜 컨테이너 */}
      <View style={styles.dateBox}>
        <PreReg12 text="체크아웃" />
        <PreBol14 text={endDateText} style={{ marginTop: HEIGHT * 4 }} />
      </View>
    </Row>
  )
}
