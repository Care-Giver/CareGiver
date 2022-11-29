import React, { FC } from "react"
import { ActivityIndicator } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { NavigatorParamList } from "#navigators"
import { PreReg14, ScreenRootView } from "#components"
import { SUB_HEAD_LINE, HEIGHT } from "#theme"

export const CaregiverSelfIntroductionScreen: FC<
  StackScreenProps<NavigatorParamList, "caregiver-self-introduction-screen">
> = observer(({ navigation, route }) => {
  if (!route.params) {
    return <ActivityIndicator />
  }

  console.log("route.params", route.params)
  const desc = route.params?.desc

  return (
    <ScreenRootView preset="fixed">
      <PreReg14 text={desc} color={SUB_HEAD_LINE} style={{ marginTop: HEIGHT * 20 }} />
    </ScreenRootView>
  )
})
