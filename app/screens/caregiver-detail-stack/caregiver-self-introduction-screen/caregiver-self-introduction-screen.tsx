import React, { FC } from "react"
import { ActivityIndicator } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"

import { NavigatorParamList } from "#navigators"
import { PreReg14, Screen } from "#components"
import { SUB_HEAD_LINE } from "#theme"

export const CaregiverSelfIntroductionScreen: FC<
  StackScreenProps<NavigatorParamList, "caregiver-self-introduction-screen">
> = observer(({ navigation, route }) => {
  if (!route.params) {
    return <ActivityIndicator />
  }

  return (
    <Screen testID="CaregiverSelfIntroductionScreen" preset="fixed">
      <PreReg14 text={route.params} color={SUB_HEAD_LINE} style={{ marginTop: 20 }} />
    </Screen>
  )
})
