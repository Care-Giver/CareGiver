import { View, Text } from "react-native"
import React, { FC } from "react"
import { ScreenRootView } from "../../../custom-components"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../../navigators"
import { observer } from "mobx-react-lite"

export const PetsitterDetailInformationScreen: FC<
  StackScreenProps<NavigatorParamList, "petsitter-detail-information-screen">
> = observer(({ navigation, route }) => {
  return (
    <ScreenRootView testID="SearchScreen" preset="scroll">
      <Text>PetsitterDetailInformationScreen</Text>
    </ScreenRootView>
  )
})
