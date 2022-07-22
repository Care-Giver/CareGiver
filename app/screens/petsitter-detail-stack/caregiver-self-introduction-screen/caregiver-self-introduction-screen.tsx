import React, { FC } from "react"
import { ActivityIndicator } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"

import { NavigatorParamList } from "../../../navigators"
import { PreReg14, ScreenRootView } from "../../../custom-components"
import { SUB_HEAD_LINE } from "../../../theme/palette"
import { HEIGHT } from "../../../theme"

export const CaregiverSelfIntroductionScreen: FC<
  StackScreenProps<NavigatorParamList, "caregiver-self-introduction-screen">
> = observer(({ navigation, route }) => {
  if (!route.params) {
    return <ActivityIndicator />
  }

  return (
    <ScreenRootView testID="CaregiverSelfIntroductionScreen" preset="fixed">
      <PreReg14 text={route.params} color={SUB_HEAD_LINE} style={{ marginTop: HEIGHT * 20 }} />
    </ScreenRootView>
  )
})
