import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { navigate, NavigatorParamList } from "#navigators"
import { Screen, PreMed14 } from "#components"

import Postcode from "@actbase/react-daum-postcode"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const CgSearchAddressScreen: FC<
  StackScreenProps<NavigatorParamList, "legacy_cg-search-address-screen">
> = observer(function CgSearchAddressScreen() {
  // MST store 를 가져옵니다.
  // const { someStore, anotherStore } = useStores()

  const PostCodeView = () => (
    <Postcode
      style={{ width: 320, height: 400, marginLeft: 20, marginTop: 20 }}
      jsOptions={{ animation: true }}
      onSelected={(data) => alert(JSON.stringify(data))}
    ></Postcode>
  )
  // 필요시, useNavigation 훅을 사용할 수 있습니다.
  // const navigation = useNavigation()
  return (
    <Screen testID="CgSearchAddress">
      {/*PostCodeView()*/}
      <Postcode
        style={{ width: 320, height: 400, marginLeft: 20, marginTop: 20 }}
        jsOptions={{ animation: true }}
        //onSelected={(data) => alert(JSON.stringify(data))}
        onSelected={(data) => {
          //alert(JSON.stringify(data))
          navigate("cg-set-address-screen", { data })
        }}
        //onSelected={alert("test")}
      ></Postcode>
      {/*<PreMed14 text={"상세 주소"} color={"#767676"} />*/}
    </Screen>
  )
})
