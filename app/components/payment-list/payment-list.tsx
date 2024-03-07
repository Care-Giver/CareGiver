import React from "react"
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { PopSem16, PreMed14, PreReg14 } from "../_BASIC/custom-texts/custom-texts"
import { Row } from "../_BASIC/row/row"
import { BookingType, PaymentType } from "app/screens/cg-request-earning/dummy"
import { BODY, DBG, SUB_HEAD_LINE } from "#theme"
import { settlementDetail } from "#api"

export interface PaymentListProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  /**
   * 해당 날짜
   */
  date: string

  /**
   * 해당하는 날짜의 정산내역
   */
  settlementDetails: settlementDetail[]
}

export const PaymentList = observer(function PaymentList(props: PaymentListProps) {
  const { style } = props
  const { date, settlementDetails } = props
  const allStyles = Object.assign({}, styles.root, style)

  console.log("settlementDetails >>>", settlementDetails)
  //TODO api의 resBody가 수정되어야함. 또는 프론트측에서 날짜별로 묶은 뒤 다시 뿌리는 작업이 필요함.
  return (
    <View style={allStyles}>
      <PreReg14 mb={17} text={date.substring(0, 10)} color={BODY} />

      {settlementDetails.map((item, idx) => {
        console.log("item >>>", item)
        const convertedTime =
          item.serviceType === "visiting"
            ? `${item.start.substring(11, 13)}시-${item.end.substring(11, 13)}시`
            : "종일"
        const convertedServiceType = item.serviceType === "visiting" ? "방문 펫시팅" : "위탁 펫시팅"
        return (
          <Row mb={settlementDetails.length - 1 === idx ? 0 : 19} key={item.end}>
            <PreMed14 text={convertedTime} color={SUB_HEAD_LINE} />
            <View style={styles.divider} />
            <PreMed14 text={convertedServiceType} color={SUB_HEAD_LINE} />
            <PopSem16 style={styles.fee} text={item.settlementFee.toString() + "원"} color={BODY} />
          </Row>
        )
      })}
    </View>
  )
})

const styles = StyleSheet.create({
  root: { marginBottom: 50 },

  divider: {
    height: 17,
    width: 1,
    backgroundColor: DBG,
    marginLeft: 3,
    marginRight: 7,
  },
  fee: {
    marginLeft: "auto",
  },
})
