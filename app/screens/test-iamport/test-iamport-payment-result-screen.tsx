import React, { FC } from "react"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { ScreenRootView } from "#components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

export const TestIamportPaymentResultScreen: FC<
  StackScreenProps<NavigatorParamList, "test-iamport-payment-result-screen">
> = observer(function TestIamportPaymentResultScreen() {
  // MST store 를 가져옵니다.
  // const { someStore, anotherStore } = useStores()

  // 필요시, useNavigation 훅을 사용할 수 있습니다.
  // const navigation = useNavigation()
  return <ScreenRootView testID="TestIamportPaymentResult">{/* 해피코딩^^ */}</ScreenRootView>
})

const styles = StyleSheet.create({
  root: {},
})
