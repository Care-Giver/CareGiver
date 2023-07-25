/* eslint-disable camelcase */
import React, { FC, useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { Button, PreReg18, Screen } from "#components"
import { RootStackParamList } from "./navigation.types"
import { FontAwesome } from "@expo/vector-icons"
import { postPayment } from "../../services/axios/payment"
import { postCrecheBooking, postVisitingBooking } from "../../services/axios/booking"

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
  const response = route.params.response
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
  const amount = route.params.amount
  const serviceType = route.params.serviceType

  //? 예약 생성 api를 위한 값들
  const visitingId = route.params.visitingId
  const userId = route.params.userId
  const request = route.params.request
  const services = route.params.services
  const destination = route.params.destination
  const selectedDate = route.params.selectedDate
  const startTime = route.params.startTime
  const endTime = route.params.endTime
  const petIds = route.params.petIds
  const petToolsLocInfo = route.params.petToolsLocInfo
  const avoidFoodInfo = route.params.avoidFoodInfo
  const bondingTipsInfo = route.params.bondingTipsInfo
  // [WARNING: 이해를 돕기 위한 것일 뿐, imp_success 또는 success 파라미터로 결제 성공 여부를 장담할 수 없습니다.]
  // 아임포트 서버로 결제내역 조회(GET /payments/${imp_uid})를 통해 그 응답(status)에 따라 결제 성공 여부를 판단하세요.
  const isSuccess =
    getBoolean(imp_success) ?? getBoolean(success) ?? (error_code == null && code == null)

  useEffect(() => {
    if (!isSuccess) {
      postPayment({
        imp_uid: imp_uid,
        merchant_uid: merchant_uid,
        imp_success: imp_success,
        isRefunded: true,
        totalFee: amount,

        //route.params.amount,
      }).then((res) => {
        if (res.ok) {
          //? 결제생성 api가 정상적으로 작동했다면 "방문" or "위탁"에따른 예약생성
          if (serviceType == "방문") {
            console.log(
              userId,
              startTime,
              endTime,
              destination,
              request,
              petToolsLocInfo,
              avoidFoodInfo,
              bondingTipsInfo,
            )
            postVisitingBooking({
              //? dummy
              visitingId: 2,
              userId: userId,
              request: request,
              services: services,
              destination: "경기도 안산시 한양대학로 55", //destination, //? admin상 null로 되어있어서 잠깐 testdata
              startTime: startTime,
              endTime: endTime,
              petIds: petIds,
              paymentId: res.paymentId,
              petToolsLocInfo: petToolsLocInfo,
              avoidFoodInfo: avoidFoodInfo,
              bondingTipsInfo: bondingTipsInfo,
            })
          } else if (serviceType == "위탁") {
            postCrecheBooking({
              crecheId: 2,
              userId: userId,
              request: request,
              services: services,
              startDate: selectedDate.dateString,
              endDate: selectedDate.dateString,
              petIds: petIds,
              paymentId: res.paymentId,
              avoidFoodInfo: avoidFoodInfo,
              bondingTipsInfo: bondingTipsInfo,
              //TODO 백엔드측에서 해당 값 제거한다면 제거해야할 값(totalFee, defalutFee)
              totalFee: 10000,
              defalutFee: 5000,
            })
          }
        }
      })
    }
  }, [])
  return (
    <Screen testID="TestIamportPaymentResult">
      {isSuccess ? (
        <FontAwesome name={"check-circle"} size={20} color={"#52c41a"} />
      ) : (
        <FontAwesome name={"warning"} size={20} color={"#f5222d"} />
      )}
      <Text>{`결제에 ${isSuccess ? "성공" : "실패"}하였습니다`}</Text>
      <View>
        <View>
          <Text>아임포트 번호</Text>
          <Text>{imp_uid ?? tx_id}</Text>
        </View>
        {isSuccess ? (
          <View>
            <Text>주문번호</Text>
            <Text>{merchant_uid ?? payment_id}</Text>
          </View>
        ) : (
          <View>
            <Text>에러코드</Text>
            <Text>{error_code ?? code}</Text>
            <Text>에러메시지</Text>
            <Text>{error_msg ?? message}</Text>
          </View>
        )}
      </View>
      <Button
        /* @ts-ignore */
        onPress={() => navigation.navigate("test-iamport-screen")}
      >
        <PreReg18 text="결제하기" />
      </Button>
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {},
})
