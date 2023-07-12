import { View, Image } from "react-native"
import React from "react"
import { Row } from "../../basics/row/row"
import { PreBol14, PreReg12 } from "../../basics/custom-texts/custom-texts"
import { images } from "#images"
import { styles } from "./styles"

type ServiceType = "creche" | "visiting"

const setDateText = (dateTime: Date, serviceType: ServiceType): string => {
  const month = dateTime.getMonth() + 1
  const day = dateTime.getDate()

  if (serviceType === "creche") {
    return `${month}월 ${day}일`
  } else {
    const hours = dateTime.getHours()
    const minutes = dateTime.getMinutes() === 0 ? "00" : dateTime.getMinutes()
    return `${month}월 ${day}일 ${hours}:${minutes}`
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
  serviceType: "creche" | "visiting"
  style?: Object
}) => {
  const startDateText = setDateText(startDateTime, serviceType)
  const endDateText = setDateText(endDateTime, serviceType)

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
        <PreBol14 text={startDateText} style={{ marginTop: 4 }} />
      </View>
      {/* //* 화살표(->) */}
      <Image source={images.right_arrow_grey} style={styles.arrow} />
      {/* //* 끝나는 날짜 컨테이너 */}
      <View style={styles.dateBox}>
        <PreReg12 text="체크아웃" />
        <PreBol14 text={endDateText} style={{ marginTop: 4 }} />
      </View>
    </Row>
  )
}
