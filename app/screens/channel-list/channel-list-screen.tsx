import React, { FC, useEffect } from "react"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { Screen } from "#components"
import { useShowBottomTab } from "../../utils/hooks"
import { ChannelList } from "stream-chat-react-native" // Or stream-chat-expo
import { getStreamToken, streamChatClient } from "../../services/axios/stream"
import { useStores } from "#models"

export const ChannelListScreen: FC<
  StackScreenProps<NavigatorParamList, "channel-list-screen">
> = observer(function ChannelListScreen({ navigation }) {
  useShowBottomTab(navigation)
  const {
    userStore: { type, userAuth, userDetail },
  } = useStores()

  const myStreamUserId =
    String(userDetail.id) + userAuth.email.toLowerCase().replace(/[^a-z0-9@_]/g, "_") // a-z, 0-9, @, _를 제외한 모든 문자를 _로 대체

  // 채널 리스트 만들기 및 불러오기
  const createChannels = async () => {
    const me = myStreamUserId
    const other = "ky7939" //TODO: 예약 수락후, 매칭된 상대의 값으로 교체하기

    const channel = streamChatClient.channel("messaging", {
      members: [me, other],
      // name: parsedEmail,
      // userType: type,
    })
    channel.create()
  }

  /**
   * 발행된 토큰과 userId 를 사용하여, 유저를 연결함
   * */
  const connectAndSetUser = async () => {
    // Connect user to chat. This establishes a websocket connection between client and server.
    try {
      let streamToken = userDetail?.clientStreamToken

      // 만약 clientStreamToken 값이 없다면 새로 발행한다.
      if (!streamToken) {
        const { streamToken: newStreamToken } = await getStreamToken()
        streamToken = newStreamToken
      }

      const connectUserResponse = await streamChatClient.connectUser(
        {
          id: myStreamUserId,
          name: userDetail.nickname,
          image: userDetail?.profileImage || "",
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
    // client.connectUser 는 한 번만 실행되도록 한다.
    if (!streamChatClient?.user) {
      connectAndSetUser()
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
