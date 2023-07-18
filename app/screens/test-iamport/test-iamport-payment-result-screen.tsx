/* eslint-disable camelcase */
import React, { FC } from "react"
import { StyleSheet, Text, View } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { Button, PreReg18, ScreenRootView } from "#components"
import { RootStackParamList } from "./navigation.types"
import { FontAwesome } from "@expo/vector-icons"
import { postPayment } from "../../services/axios/payment"
import { postVisitingBooking } from "../../services/axios/booking"
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
  // [WARNING: 이해를 돕기 위한 것일 뿐, imp_success 또는 success 파라미터로 결제 성공 여부를 장담할 수 없습니다.]
  // 아임포트 서버로 결제내역 조회(GET /payments/${imp_uid})를 통해 그 응답(status)에 따라 결제 성공 여부를 판단하세요.
  const isSuccess =
    getBoolean(imp_success) ?? getBoolean(success) ?? (error_code == null && code == null)
  React.useLayoutEffect(() => {
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
            postVisitingBooking({
              //? dummy
              visitingId: 16,
              userId: 2,
              request: "꼭 준비된 사료를 먹여주세요.",
              services: ["사료 및 물 급여", "실내 놀이", "배변처리 및 환경정리"],
              destination: "경기도 안산시 한양대학로 55",
              startTime: ["2022-09-14T22:00:00"],
              endTime: ["2022-09-14T22:00:00"],
              petIds: [1, 2],
              paymentId: 111,
              petToolsLocInfo: "사료는 주방 싱크대 밑에 있는 장에 있어요.",
              avoidFoodInfo: "우리 아이는 닭고기에 알러지가 있어서 급여를 자제해주세요.",
              bondingTipsInfo:
                "터그놀이를 해주면 금방 친해져요. 다만 흥분했을 때 물리지 않게 주의해주세요!",
            })
          } else if (serviceType == "위탁") {
            //TODO 위탁예약 api의 requestbody 문제 해결되면 추가작업
          }
        }
      })
    }
  }, [])
  return (
    <ScreenRootView testID="TestIamportPaymentResult">
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
    </ScreenRootView>
  )
})

const styles = StyleSheet.create({
  root: {},
})
