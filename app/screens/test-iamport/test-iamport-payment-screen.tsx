import React, { FC } from "react"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import { Loading, Screen } from "#components"
import IMP from "iamport-react-native"
import { getUserCode } from "./utils"
export const TestIamportPaymentScreen: FC<
  StackScreenProps<NavigatorParamList, "test-iamport-payment-screen">
> = observer(function TestIamportPaymentScreen({ navigation, route }) {
  const data = route.params
  console.log("data >>>", data)

  //@ts-ignore
  const params = data?.params
  const tierCode = params?.tierCode
  const userCode = getUserCode(params!.pg, tierCode) // pg 데이터는 필수임

  /* [필수입력] 결제 종료 후, 라우터를 변경하고 결과를 전달합니다. */
  function callback(response) {
    console.log("response >>>", response)
    console.log("params >>>", params.amount, data.serviceType)
    navigation.replace("test-iamport-payment-result-screen", {
      response: response,
      amount: params.amount,
      serviceType: data.serviceType,

      //? 예약 생성 api를 위한 값들
      visitingId: data.visitingId,
      userId: data.userId,
      request: data?.request,
      services: data.services,
      destination: data.destination,
      selectedDate: data.selectedDate,
      startTime: data.startTime,
      endTime: data.endTime,
      petIds: data.petIds,
      petToolsLocInfo: data?.petToolsLocInfo,
      avoidFoodInfo: data?.avoidFoodInfo,
      bondingTipsInfo: data?.bondingTipsInfo,
    })
  }

  return (
    <Screen testID="TestIamportPayment">
      <IMP.Payment
        userCode={userCode}
        tierCode={tierCode}
        loading={<Loading duration={2000} />} // 로딩 컴포넌트
        data={params!}
        callback={callback}
      />
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {},
})
