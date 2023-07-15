import React, { FC } from "react"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { Button, Screen } from "#components"
import { getTestJsonPlaceHolder } from "./axios-test-api"
import { getFavorites } from "../../services/axios/favorite"
import { getCreche } from "#axios"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

export const TestNetworkErrorScreen: FC<
  StackScreenProps<NavigatorParamList, "test-network-error-screen">
> = observer(function TestNetworkErrorScreen() {
  // MST store 를 가져옵니다.
  // const { someStore, anotherStore } = useStores()

  return (
    <Screen>
      <Button text="getTestJsonPlaceHolder" onPress={getTestJsonPlaceHolder} />

      <Button text="getCreche" onPress={() => getCreche(1)} />
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {},
})
