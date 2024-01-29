import React from "react"
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { PopSem16, PreMed14, PreReg14 } from "../_BASIC/custom-texts/custom-texts"
import { Row } from "../_BASIC/row/row"
import { BookingType, PaymentType } from "app/screens/cg-request-earning/dummy"
import { BODY, DBG, SUB_HEAD_LINE } from "#theme"

export interface PaymentListProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  /**
   * 해당하는 날짜 yyyy-mm-dd
   */
  date: string

  /**
   * 해당하는 날짜의 정산내역
   */
  payments: BookingType[]
}

export const PaymentList = observer(function PaymentList(props: PaymentListProps) {
  const { style } = props
  const { date, payments } = props
  const allStyles = Object.assign({}, styles.root, style)

  return (
    <View style={allStyles}>
      <PreReg14 mb={17} text={date} color={BODY} />

      {payments.map((item, idx) => {
        const convertedTime =
          item.visOrCre === "위탁"
            ? "종일"
            : `${item.startTime.substring(11, 13)}시-${item.endTime.substring(11, 13)}시`

        return (
          <Row mb={19} key={idx}>
            <PreMed14 text={convertedTime} color={SUB_HEAD_LINE} />
            <View style={styles.divider} />
            <PreMed14 text={item.visOrCre} color={SUB_HEAD_LINE} />
            <PopSem16 style={styles.fee} text={item.fee.toString() + "원"} />
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
