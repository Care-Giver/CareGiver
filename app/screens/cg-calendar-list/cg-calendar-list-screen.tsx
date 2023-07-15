import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import { PreBol20, PreReg18, PressableButton, Screen } from "#components"
import { View } from "react-native"
import { useStores } from "#models"
import { delay } from "../../utils/delay"
import { consoleInfoAsync } from "../../utils/console-async"
import { useShowBottomTab } from "../../utils/hooks"
import { GIVER_CASUAL_NAVY } from "#theme"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const CgCalendarListScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-calendar-list-screen">
> = observer(function CgCalendarListScreen({ navigation }) {
  useShowBottomTab(navigation)

  const {
    userStore: { onSwitchingType, setOnSwitchingTypeFalse },
  } = useStores()

  /**
   * 모드 전환 도중 앱 충돌로 인한 비정상적인 종료시, 재실행하면 무한 로딩에 갇힐 수 있음
   * 이를 방지하기 위해, 시간차이를 두고 검증하여, onSwitchingType 을 false 로 만들어줍니다.
   * */
  const forceOnSwtichingTypeFalse = async () => {
    await delay(3000)
    if (onSwitchingType) {
      setOnSwitchingTypeFalse()
      await consoleInfoAsync("비정상적인 onSwitchingType 초기화 됨 - CgCalendarListScreen", 100)
    }
  }

  useEffect(() => {
    return () => {
      forceOnSwtichingTypeFalse()
    }
  }, [])

  return (
    <Screen testID="CgCalendarList">
      <View
        style={{
          marginVertical: 40,
          alignSelf: "center",
        }}
      >
        <PreReg18>케어기버 달력 스택 메인 스크린</PreReg18>
      </View>

      <PressableButton
        onPress={() => {
          navigate("cg-calendar-screen")
        }}
        style={{
          marginTop: "auto",
          marginBottom: 20,
          alignSelf: "center",
          backgroundColor: GIVER_CASUAL_NAVY,
          padding: 10,
          borderRadius: 8,
        }}
      >
        <PreBol20 text="달력 스크린 바로가기" color="white" />
      </PressableButton>
    </Screen>
  )
})
