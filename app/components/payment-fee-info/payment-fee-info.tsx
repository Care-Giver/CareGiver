import { View, StyleProp, ViewStyle, StyleSheet, Image } from "react-native"
import React from "react"
import { observer } from "mobx-react-lite"
import { BODY, HEAD_LINE, LIGHT_LINE, SUB_HEAD_LINE } from "#theme"
import { PreBol16, PreBol18, PreReg14, PreReg16 } from "../_BASIC/custom-texts/custom-texts"
import { PetTypeExtraFee } from "#api"
import { DivisionLine } from "../_BASIC/division-line/division-line"
import { images } from "#images"
import { ServiceType } from "#models"
import _ from "lodash"
import { price } from "../../utils/format"

type PetExtraFee = Omit<PetTypeExtraFee, "petName">

type SizeFee = {
  Small: {
    number: number // 소형 개체 수
    fee: number // 소형 추가 가격
  }
  Medium: {
    number: number // 중형 개체 수
    fee: number // 중형 추가 가격
  }
  Large: {
    number: number // 대형 개체 수
    fee: number // 대형 추가 가격
  }
}

interface PaymentFeeInfoProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  /**
   * 위탁 | 방문 서비스 구분
   */
  serviceType: ServiceType

  /**
   * 서비스 이용료
   */
  serviceFee: number

  /**
   * 서비스 이용 시간
   */
  duration: number

  /**
   * 시급
   */
  wage: number

  /**
   * 총 결제 금액
   */
  totalFee: number

  /**
   * 반려동물 추가금액 총합. (서비스 시간 값이 곱해진 값.)
   */
  petTypeExtraFeeSumByTime: number

  /**
   * 반려동물 추가요금 배열
   */
  petTypeExtraFee: PetExtraFee[]
}

// TODO: 할인쿠폰 추가
// TODO: 반려동물 추가금액 시간 표시
export const PaymentFeeInfo = observer(function PaymentFeeInfo(props: PaymentFeeInfoProps) {
  const {
    style,
    serviceType,
    serviceFee,
    duration,
    wage,
    totalFee,
    petTypeExtraFeeSumByTime,
    petTypeExtraFee,
  } = props

  const _style = Object.assign({}, styles.root, style)

  /**
   * 위탁 | 방문 서비스에 따라 단위 표시가 달라진다.
   *
   * ex. 위탁 - "일", 방문 - "시간"
   */
  const durationUnit = serviceType === "creche" ? "일" : "시간"

  // const totalPetExtraFee = petTypeExtraFee.reduce((prev, current) => prev + current.extraFee, 0)

  /**
   * 크기별 추가 금액 및 개체수 정보
   */
  const sizeFee: SizeFee = _.reduce(
    petTypeExtraFee,
    (res, current) => {
      const petType = current.petType

      res[petType].number++
      res[petType].fee = current.extraFee
      return res
    },
    {
      Small: { number: 0, fee: 0 },
      Medium: { number: 0, fee: 0 },
      Large: { number: 0, fee: 0 },
    },
  )

  return (
    <View style={_style}>
      {/* //* 서비스 이용료 */}
      <View style={styles.feeRow}>
        <PreReg14 text="서비스 이용료" color={SUB_HEAD_LINE} />
        <PreReg16 text={`${price(`${serviceFee}`)}원`} color={SUB_HEAD_LINE} />
      </View>
      {/* //? 서비스 이용료 상세내역 */}
      <View style={styles.feeDetailContainer}>
        <View style={styles.feeDetailRow}>
          <View style={styles.feeDetailCalculate}>
            <Image source={images.indent_icon} style={styles.indentIcon} />
            <PreReg14 text={`${price(`${wage}`)}원 X ${duration}${durationUnit}`} color={BODY} />
          </View>
          <PreReg14 text={`${price(`${serviceFee}`)}원`} color={BODY} />
        </View>
      </View>

      {/* //* 반려동물 추가요금 */}
      <View style={styles.feeRow}>
        <PreReg14 text="반려동물 추가요금" color={SUB_HEAD_LINE} />
        <PreReg16 text={`+${price(`${petTypeExtraFeeSumByTime}`)}원`} color={SUB_HEAD_LINE} />
      </View>
      {/* //? 반려동물 추가요금 상세내역 */}
      <View style={styles.feeDetailContainer}>
        {/* 소형견 */}
        {sizeFee.Small.number > 0 && (
          <View style={styles.feeDetailRow}>
            <View style={styles.feeDetailCalculate}>
              <Image source={images.indent_icon} style={styles.indentIcon} />
              <PreReg14 text={`소형견 X ${sizeFee.Small.number}마리`} color={BODY} />
            </View>
            <PreReg14
              text={`${price(`${sizeFee.Small.fee * sizeFee.Small.number}`)}원`}
              color={BODY}
            />
          </View>
        )}
        {/* 중형견 */}
        {sizeFee.Medium.number > 0 && (
          <View style={styles.feeDetailRow}>
            <View style={styles.feeDetailCalculate}>
              {sizeFee.Small.number === 0 ? (
                <Image source={images.indent_icon} style={styles.indentIcon} />
              ) : (
                <View style={styles.indentBox} />
              )}
              <PreReg14 text={`중형견 X ${sizeFee.Medium.number}마리`} color={BODY} />
            </View>
            <PreReg14
              text={`${price(`${sizeFee.Medium.fee * sizeFee.Medium.number}`)}원`}
              color={BODY}
            />
          </View>
        )}
        {/* 대형견 */}
        {sizeFee.Large.number > 0 && (
          <View style={styles.feeDetailRow}>
            <View style={styles.feeDetailCalculate}>
              {sizeFee.Small.number === 0 && sizeFee.Medium.number === 0 ? (
                <Image source={images.indent_icon} style={styles.indentIcon} />
              ) : (
                <View style={styles.indentBox} />
              )}
              <PreReg14 text={`대형견 X ${sizeFee.Large.number}마리`} color={BODY} />
            </View>
            <PreReg14
              text={`${price(`${sizeFee.Large.fee * sizeFee.Large.number}`)}원`}
              color={BODY}
            />
          </View>
        )}
      </View>

      {/* //* 수수료 */}
      <View style={styles.feeRow}>
        <PreReg14 text="수수료" color={SUB_HEAD_LINE} />
        <PreReg16
          text={`+${price(`${totalFee - serviceFee - petTypeExtraFeeSumByTime}`)}원`}
          color={SUB_HEAD_LINE}
        />
      </View>

      <DivisionLine style={{ marginVertical: 12 }} />

      {/* //* 총 결제금액 */}
      <View style={styles.feeRow}>
        <PreBol16 text="총 결제 금액" color={HEAD_LINE} />
        <PreBol18 text={`${price(`${totalFee}`)}원`} color={HEAD_LINE} />
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    padding: 16,

    borderColor: LIGHT_LINE,
    borderWidth: 2,
  },

  feeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  feeDetailContainer: {
    marginBottom: 16,
  },
  feeDetailRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  feeDetailCalculate: {
    flexDirection: "row",
    alignItems: "center",
  },
  indentIcon: {
    marginRight: 4,
  },
  indentBox: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
})
