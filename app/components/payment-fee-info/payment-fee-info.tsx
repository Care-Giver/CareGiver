import { View, StyleProp, ViewStyle, StyleSheet, Image } from "react-native"
import React from "react"
import { observer } from "mobx-react-lite"
import { BODY, HEAD_LINE, LIGHT_LINE, SUB_HEAD_LINE } from "#theme"
import { PreBol16, PreBol18, PreReg14, PreReg16 } from "../_BASIC/custom-texts/custom-texts"
import { PetTypeExtraFee } from "#axios"
import { DivisionLine } from "../_BASIC/division-line/division-line"
import { images } from "#images"
import { ServiceType } from "#models"

type PetExtraFee = Omit<PetTypeExtraFee, "petName">

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
   * 반려동물 추가금액 총합
   */
  totalExtraFee: number

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
    totalExtraFee,
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

  //! 더 좋은 방법 없을까? - 굳이 똑같은 값을 배열로 여러개씩 저장하는 방식이 비효율적으로 보임
  /**
   * 소형견 추가 금액
   */
  const smallFees = petTypeExtraFee
    .filter((value) => value.petType === "Small")
    .map((value) => value.extraFee)
  /**
   * 중형견 추가 금액
   */
  const mediumFees = petTypeExtraFee
    .filter((value) => value.petType === "Medium")
    .map((value) => value.extraFee)
  /**
   * 대형견 추가 금액
   */
  const largeFees = petTypeExtraFee
    .filter((value) => value.petType === "Large")
    .map((value) => value.extraFee)

  return (
    <View style={_style}>
      {/* //* 서비스 이용료 */}
      <View style={styles.feeRow}>
        <PreReg14 text="서비스 이용료" color={SUB_HEAD_LINE} />
        <PreReg16 text={`${serviceFee.toLocaleString()}원`} color={SUB_HEAD_LINE} />
      </View>
      {/* //? 서비스 이용료 상세내역 */}
      <View style={styles.feeDetailContainer}>
        <View style={styles.feeDetailRow}>
          <View style={styles.feeDetailCalculate}>
            <Image source={images.indent_icon} style={styles.indentIcon} />
            <PreReg14
              text={`${wage.toLocaleString()}원 X ${duration}${durationUnit}`}
              color={BODY}
            />
          </View>
          <PreReg14 text={`${serviceFee.toLocaleString()}원`} color={BODY} />
        </View>
      </View>

      {/* //* 반려동물 추가요금 */}
      <View style={styles.feeRow}>
        <PreReg14 text="반려동물 추가요금" color={SUB_HEAD_LINE} />
        <PreReg16 text={`+${totalExtraFee.toLocaleString()}원`} color={SUB_HEAD_LINE} />
      </View>
      {/* //? 반려동물 추가요금 상세내역 */}
      <View style={styles.feeDetailContainer}>
        {/* 소형견 */}
        {smallFees.length > 0 && (
          <View style={styles.feeDetailRow}>
            <View style={styles.feeDetailCalculate}>
              <Image source={images.indent_icon} style={styles.indentIcon} />
              <PreReg14 text={`소형견 X ${smallFees.length}마리`} color={BODY} />
            </View>
            <PreReg14
              text={`${(smallFees[0] * smallFees.length).toLocaleString()}원`}
              color={BODY}
            />
          </View>
        )}
        {/* 중형견 */}
        {mediumFees.length > 0 && (
          <View style={styles.feeDetailRow}>
            <View style={styles.feeDetailCalculate}>
              {smallFees.length === 0 ? (
                <Image source={images.indent_icon} style={styles.indentIcon} />
              ) : (
                <View style={styles.indentBox} />
              )}
              <PreReg14 text={`중형견 X ${mediumFees.length}마리`} color={BODY} />
            </View>
            <PreReg14
              text={`${(mediumFees[0] * mediumFees.length).toLocaleString()}원`}
              color={BODY}
            />
          </View>
        )}
        {/* 대형견 */}
        {largeFees.length > 0 && (
          <View style={styles.feeDetailRow}>
            <View style={styles.feeDetailCalculate}>
              {smallFees.length === 0 && mediumFees.length === 0 ? (
                <Image source={images.indent_icon} style={styles.indentIcon} />
              ) : (
                <View style={styles.indentBox} />
              )}
              <PreReg14 text={`대형견 X ${largeFees.length}마리`} color={BODY} />
            </View>
            <PreReg14
              text={`${(largeFees[0] * largeFees.length).toLocaleString()}원`}
              color={BODY}
            />
          </View>
        )}
      </View>

      {/* //* 수수료 */}
      <View style={styles.feeRow}>
        <PreReg14 text="수수료" color={SUB_HEAD_LINE} />
        <PreReg16
          text={`+${(totalFee - serviceFee - totalExtraFee).toLocaleString()}원`}
          color={SUB_HEAD_LINE}
        />
      </View>

      <DivisionLine style={{ marginVertical: 12 }} />

      {/* //* 총 결제금액 */}
      <View style={styles.feeRow}>
        <PreBol16 text="총 결제 금액" color={HEAD_LINE} />
        <PreBol18 text={`${totalFee.toLocaleString()}원`} color={HEAD_LINE} />
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
