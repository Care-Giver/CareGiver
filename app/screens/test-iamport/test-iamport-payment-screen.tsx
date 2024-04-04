import React, { FC } from "react"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { Loading, Screen } from "#components"
import IMP from "iamport-react-native"
import { getUserCode } from "./utils"
import { CreateBookingProps } from "../_CLIENT/pay-stack/payment/payment-screen.controller"

export interface IamportPaymentResult {
  response: JSON
  bookingData: Omit<CreateBookingProps, "setSuccessModalVisible">
}

export const TestIamportPaymentScreen: FC<
  StackScreenProps<NavigatorParamList, "test-iamport-payment-screen">
> = observer(function TestIamportPaymentScreen({ navigation, route }) {
  console.log("🔷 test-iamport-payment-screen | route.params", route.params)
  const data = route.params
  const params = data?.params
  const tierCode = data?.tierCode
  const userCode = getUserCode(params.pg, tierCode) // pg 데이터는 필수임

  /* [필수입력] 결제 종료 후, 라우터를 변경하고 결과를 전달합니다. */
  function callback(response) {
    console.log("response >>>", response)
    const _data: IamportPaymentResult = {
      response: response,
      // "2-2. 예약 생성" 을 위한 값들
      bookingData: data.bookingData,
    }
    navigation.replace("test-iamport-payment-result-screen", { response: _data })
  }

  return (
    <Screen testID="TestIamportPayment" style={{ paddingHorizontal: 0 }}>
      <IMP.Payment
        userCode={userCode}
        tierCode={tierCode}
        loading={<Loading duration={2000} />} // 로딩 컴포넌트
        data={params}
        callback={callback}
      />
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {},
})
