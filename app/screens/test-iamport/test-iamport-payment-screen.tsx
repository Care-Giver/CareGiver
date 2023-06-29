import React, { FC } from "react"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { ScreenRootView } from "#components"
import { useNavigation } from "@react-navigation/native"

export const TestIamportPaymentScreen: FC<
  StackScreenProps<NavigatorParamList, "test-iamport-payment-screen">
> = observer(function TestIamportPaymentScreen({ route }) {
  const navigation = useNavigation()

  /* [필수입력] 결제 종료 후, 라우터를 변경하고 결과를 전달합니다. */
  function callback(response) {
    // navigation.replace('test-iamport-payment-result-screen', response);
    console.log("response >>>", response)
  }

  /* [필수입력] 결제에 필요한 데이터를 입력합니다. */
  const data = route.params.data

  /*   const data = {
    pg: "html5_inicis",
    pay_method: "card",
    name: "아임포트 결제데이터 분석",
    merchant_uid: `mid_${new Date().getTime()}`,
    amount: "39000",
    buyer_name: "홍길동",
    buyer_tel: "01012345678",
    buyer_email: "example@naver.com",
    buyer_addr: "서울시 강남구 신사동 661-16",
    buyer_postcode: "06018",
    app_scheme: "example",
    // [Deprecated v1.0.3]: m_redirect_url
  } */

  return (
    <ScreenRootView testID="TestIamportPayment">
      <IMP.Payment
        userCode={"iamport"} // 가맹점 식별코드
        tierCode={"AAA"} // 티어 코드: agency 기능 사용자에 한함
        loading={<Loading duration={2000} />} // 로딩 컴포넌트
        data={data} // 결제 데이터
        callback={callback} // 결제 종료 후 콜백
      />
    </ScreenRootView>
  )
})

const styles = StyleSheet.create({
  root: {},
})
