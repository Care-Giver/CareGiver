import { View, Text } from "react-native"
import React from "react"
import { FC } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators/app-navigator"
import { observer } from "mobx-react-lite"

export const ServiceRegistrationScreen: FC<
  StackScreenProps<NavigatorParamList, "service-registration-screen">
> = observer(() => {
  return (
    <View>
      <Text>ServiceRegistrationScreen</Text>
    </View>
  )
})
