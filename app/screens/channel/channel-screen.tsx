import React, { FC } from "react"
import { StyleSheet, View } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { Screen } from "#components"
import {
  Chat,
  OverlayProvider,
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
  Thread,
} from "stream-chat-react-native" // Or stream-chat-expo
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const ChannelScreen: FC<StackScreenProps<NavigatorParamList, "channel-screen">> = observer(
  function ChannelScreen({ route }) {
    // MST store 를 가져옵니다.
    // const { someStore, anotherStore } = useStores()

    // 필요시, useNavigation 훅을 사용할 수 있습니다.
    // const navigation = useNavigation()
    const channel = route.params.channel

    return (
      <Screen testID="Channel" style={{ top: -33 }}>
        <Channel channel={channel}>
          <MessageList />
          <MessageInput />
        </Channel>
      </Screen>
    )
  },
)

const styles = StyleSheet.create({
  root: {},
})
