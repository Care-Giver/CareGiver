import React, { FC, useEffect } from "react"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { Screen } from "#components"
import { useShowBottomTab } from "../../utils/hooks"
import { ChannelList } from "stream-chat-react-native" // Or stream-chat-expo
import { streamChatClient } from "../../services/axios/stream"
import { useStores } from "#models"

export const ChannelListScreen: FC<
  StackScreenProps<NavigatorParamList, "channel-list-screen">
> = observer(function ChannelListScreen({ navigation }) {
  useShowBottomTab(navigation)
  const {
    userStore: { type, userAuth, userDetail, myStreamUserId, connectToStream },
  } = useStores()

  useEffect(() => {
    // client.connectUser 는 한 번만 실행되도록 한다.
    if (!streamChatClient?.user) {
      connectToStream()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamChatClient?.user])

  const filters = {
    type: "messaging",
    members: { $in: [myStreamUserId] },
  }

  const sort = {
    last_message_at: -1,
  }

  return (
    <Screen testID="ChannelList" style={{ paddingHorizontal: 0 }}>
      <ChannelList
        onSelect={(channel) => {
          navigation.navigate("channel-screen", {
            channel: channel,
          })
        }}
        filters={filters}
      />
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {},
})
