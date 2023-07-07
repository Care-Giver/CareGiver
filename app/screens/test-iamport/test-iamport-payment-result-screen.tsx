/* eslint-disable camelcase */
import React, { FC } from "react"
import { StyleSheet, Text, View } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { Button, PreReg18, ScreenRootView } from "#components"
import { RootStackParamList } from "./navigation.types"
import { FontAwesome } from "@expo/vector-icons"
import { useStores } from "#models"
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
  const imp_success = route.params?.imp_success
  const success = route.params?.success
  const imp_uid = route.params?.imp_uid
  const tx_id = route.params?.txId
  const merchant_uid = route.params?.merchant_uid
  const payment_id = route.params?.paymentId
  const error_code = route.params?.error_code
  const code = route.params?.code
  const message = route.params?.message
  const error_msg = route.params?.error_msg

  // [WARNING: 이해를 돕기 위한 것일 뿐, imp_success 또는 success 파라미터로 결제 성공 여부를 장담할 수 없습니다.]
  // 아임포트 서버로 결제내역 조회(GET /payments/${imp_uid})를 통해 그 응답(status)에 따라 결제 성공 여부를 판단하세요.
  const isSuccess =
    getBoolean(imp_success) ?? getBoolean(success) ?? (error_code == null && code == null)

  const {
    PaymentModel: { setPayment },
  } = useStores()

  React.useLayoutEffect(() => {
    if (isSuccess) {
      setPayment({
        imp_uid: imp_uid,
        merchant_uid: merchant_uid,
        imp_success: imp_success,
        isRefunded: true,
        //TODO 백엔드측에서 totalFee 관련 api 생성한다고 합니다. 현재는 예시로 10000원 설정.
        totalFee: 10000,
        //route.params.amount,
      })
      //TODO 결제가 완료되었으니 예약생성도 해야합니다. 어제 일어났던 model관련 이슈로 아직 예약생성 model이 완성되지 못했습니다,,
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
