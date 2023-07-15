import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { CgServiceChoiceButton, Screen, Row, CustomModal, PreReg12 } from "#components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const TempScreen: FC<StackScreenProps<NavigatorParamList, "temp-screen">> = observer(
  ({ navigation, route }) => {
    // MST store 를 가져옵니다.
    // const { someStore, anotherStore } = useStores()

    // 필요시, useNavigation 훅을 사용할 수 있습니다.
    // const navigation = useNavigation()
    const onPress = () => {
      alert("클릭됨")
    }
    return (
      <Screen testID="TempScreen">
        <CgServiceChoiceButton
          title="펫시터 등록하기"
          subtitle={`산책, 간식 주기 등 펫을\n돌봐주는 서비스입니다.`}
          onPress={onPress}
        />
        <CgServiceChoiceButton
          title="훈련사 등록하기"
          subtitle={`손 주기, 기다려 등의 훈련\n을 시켜주는 서비스입니다.`}
          onPress={onPress}
        />
      </Screen>
    )
  },
)
