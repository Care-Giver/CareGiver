import React, { FC, useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { Screen } from "#components"
import { useShowBottomTab } from "../../utils/hooks"

import { ChannelList } from "stream-chat-react-native" // Or stream-chat-expo
import { StreamChat, ConnectionOpen } from "stream-chat"
import { getStreamToken } from "../../services/axios/stream"
import { useStores } from "#models"

const API_KEY = "cyt5mvxvratf"

export const ChannelListScreen: FC<
  StackScreenProps<NavigatorParamList, "channel-list-screen">
> = observer(function ChannelListScreen({ navigation }) {
  useShowBottomTab(navigation)

  const {
    userStore: { type, userAuth },
  } = useStores()

  const parsedEmail = userAuth.email.substring(0, userAuth.email.indexOf("@"))
  const client = StreamChat.getInstance(API_KEY)

  // 채널 리스트 만들기 및 불러오기
  const createChannels = async () => {
    const channel = client.channel("messaging", parsedEmail, {
      members: ["example", "ky7939"],
      name: parsedEmail,
      userType: type,
    })
    channel.create()
  }

  /**
   * 발행된 토큰과 userId 를 사용하여, 유저를 연결함
   * */
  const connectAndSetUser = async () => {
    // Connect user to chat. This establishes a websocket connection between client and server.
    try {
      const streamToken = await getStreamToken().then((response) => response.streamToken)
      const connectUserResponse = await client.connectUser(
        {
          id: parsedEmail,
          name: "TEST_USER",
          image: "https://i.imgur.com/fR9Jz14.png",
        },
        streamToken,
      )
      if (connectUserResponse) {
        await createChannels()
      }
    } catch (error) {
      console.error("connectUser ERROR", error)
    }

    // To disconnect a user
    // await client.disconnect()
  }

  useEffect(() => {
    connectAndSetUser()
  }, [])

  const filters = {
    type: "messaging",
    members: { $in: [parsedEmail] },
    userType: "CLIENT",
  }

  const sort = {
    last_message_at: -1,
  }

  return (
    <Screen testID="ChannelList">
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
