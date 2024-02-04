import React from "react"
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { PopSem16, PreMed14, PreReg14 } from "../_BASIC/custom-texts/custom-texts"
import { Row } from "../_BASIC/row/row"
import { BookingType, PaymentType } from "app/screens/cg-request-earning/dummy"
import { BODY, DBG, SUB_HEAD_LINE } from "#theme"
import { settlementDetail } from "#axios"

export interface PaymentListProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  /**
   * 해당하는 날짜의 정산내역
   */
  settlementDetails: settlementDetail[]
}

export const PaymentList = observer(function PaymentList(props: PaymentListProps) {
  const { style } = props
  const { settlementDetails } = props
  const allStyles = Object.assign({}, styles.root, style)

  //TODO api의 resBody가 수정되어야함. 또는 프론트측에서 날짜별로 묶은 뒤 다시 뿌리는 작업이 필요함.
  return (
    <View style={allStyles}>
      {/* //TODO 방문에 대해서만 구현되었습니다. */}

      {settlementDetails.map((item, idx) => {
        const convertedTime =
          item.serviceType === "위탁"
            ? "종일"
            : `${item.start.substring(11, 13)}시-${item.end.substring(11, 13)}시`

        return (
          <Row mb={19} key={idx}>
            <PreReg14 text={item.start.substring(0, 10)} color={BODY} />
            <PreMed14 text={convertedTime} color={SUB_HEAD_LINE} />
            <View style={styles.divider} />
            <PreMed14 text={item.serviceType} color={SUB_HEAD_LINE} />
            <PopSem16 style={styles.fee} text={item.settlementFee.toString() + "원"} />
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
