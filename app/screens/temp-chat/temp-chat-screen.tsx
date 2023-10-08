import React, { FC } from "react"
import { StyleSheet, View } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { PreReg18, Screen } from "#components"
import { useShowBottomTab } from "../../utils/hooks"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

export const TempChatScreen: FC<
  StackScreenProps<NavigatorParamList, "temp-chat-screen">
> = observer(function TempChatScreen() {
  // MST store 를 가져옵니다.
  // const { someStore, anotherStore } = useStores()

  // 필요시, useNavigation 훅을 사용할 수 있습니다.
  // const navigation = useNavigation()

  useShowBottomTab()

  return (
    <Screen testID="TempChat">
      <View
        style={{
          marginVertical: 200,
          alignSelf: "center",
        }}
      >
        <PreReg18>채팅기능은 곧 추가될 예정입니다 😉</PreReg18>
      </View>
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {},
})
