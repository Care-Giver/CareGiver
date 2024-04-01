/* eslint-disable camelcase */
import React, { FC, useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, goBack, navigate } from "#navigators"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  CustomModal,
  PreBol14,
  PreBol16,
  PreBol20,
  PreReg14,
  Screen,
} from "#components"
import { RootStackParamList } from "./navigation.types"
import { FontAwesome } from "@expo/vector-icons"
import { BOTTOM_HEIGHT, DEVICE_SCREEN_WIDTH, GIVER_CASUAL_NAVY } from "#theme"
import { createBooking } from "../_CLIENT/pay-stack/payment/payment-screen.controller"
import { images } from "#images"

function getBoolean(value: string | boolean | undefined) {
  if (typeof value === "boolean") return value
  if (typeof value === "string") return value === "true"
  return undefined
}

type TestIamportPaymentResultScreenProps = StackScreenProps<RootStackParamList, "PaymentResult">

//@ts-ignore
export const TestIamportPaymentResultScreen: FC<
  StackScreenProps<NavigatorParamList, "test-iamport-payment-result-screen">
> = observer(function TestIamportPaymentResultScreen({
  route,
  navigation,
}: TestIamportPaymentResultScreenProps) {
  console.log("🔷 test-iamport-payment-result-screen | route.params", route.params)
  const response = route.params.response.response
  const imp_success = response?.imp_success
  const success = response?.success
  const imp_uid = response?.imp_uid
  const tx_id = response?.txId
  const merchant_uid = response?.merchant_uid
  const payment_id = response?.paymentId
  const error_code = response?.error_code
  const code = response?.code
  const message = response?.message
  const error_msg = response?.error_msg

  // [WARNING: 이해를 돕기 위한 것일 뿐, imp_success 또는 success 파라미터로 결제 성공 여부를 장담할 수 없습니다.]
  // 아임포트 서버로 결제내역 조회(GET /payments/${imp_uid})를 통해 그 응답(status)에 따라 결제 성공 여부를 판단하세요.
  const isSuccess =
    getBoolean(imp_success) ?? getBoolean(success) ?? (error_code == null && code == null)

  // 결제/예약 성공시 모달
  const [successModalVisible, setSuccessModalVisible] = useState(false)

  useEffect(() => {
    if (!isSuccess) return

    //  2-2. 예약 생성 - 케어기버 서버 API
    createBooking({ ...route.params.response.bookingData, setSuccessModalVisible })
  }, [isSuccess, route.params.response.bookingData])

  return (
    <Screen testID="TestIamportPaymentResult">
      <View style={styles.root}>
        {isSuccess ? (
          <FontAwesome name={"check-circle"} size={100} color={"#52c41a"} />
        ) : (
          <FontAwesome name={"warning"} size={100} color={"#f5222d"} />
        )}
        <PreBol20 text={`결제에 ${isSuccess ? "성공" : "실패"}하였습니다`} />
        <View style={{ rowGap: 20, marginTop: 32 }}>
          <View>
            <PreBol14 text="결제번호" />
            <PreReg14 text={imp_uid ?? tx_id} />
          </View>
          {isSuccess ? (
            <View>
              <PreBol14 text="주문번호" />
              <PreReg14 text={merchant_uid ?? payment_id} />
            </View>
          ) : (
            <View>
              <PreBol14 text="에러코드" />
              <PreReg14 text={error_code ?? code} />
              <PreBol14 text="에러메시지" />
              <PreReg14 text={error_msg ?? message} />
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.button} /* @ts-ignore */
          onPress={() =>
            isSuccess
              ? // 성공하면, 처음 화면으로.
                navigation.popToTop()
              : // 실패하면, 이전 화면(payment-screen)으로.
                goBack()
          }
        >
          <PreBol16 text={`${isSuccess ? "처음" : "이전 "} 화면으로 돌아가기`} color="white" />
        </TouchableOpacity>
      </View>

      <CustomModal
        visibleState={successModalVisible}
        title="결제가 완료되었습니다!"
        subtitle={`케어기버가 서비스를 승인할 때까지\n잠시만 기다려주세요`}
        yesBtnText="홈으로 가기"
        noBtnText="예약 내역 확인"
        handleYesPress={() => {
          setSuccessModalVisible(false)
          navigation.popToTop() //! DO NOT REMOVE
        }}
        handleNoPress={() => {
          setSuccessModalVisible(false)
          navigation.popToTop() //! DO NOT REMOVE
          setTimeout(() => {
            //@ts-ignore
            navigate("Bookings")
          }, 1000)
        }}
        image={images.round_blue_check}
        imageWidth={66}
        imageHeight={66}
      />
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: { flex: 1, paddingVertical: BASIC_BACKGROUND_PADDING_WIDTH, alignItems: "center" },
  button: {
    position: "absolute",
    bottom: BOTTOM_HEIGHT,
    width: DEVICE_SCREEN_WIDTH - 2 * BASIC_BACKGROUND_PADDING_WIDTH,
    alignSelf: "center",
    backgroundColor: GIVER_CASUAL_NAVY,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    borderRadius: 10,
  },
})
