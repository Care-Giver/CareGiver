import React, { FC, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { Button, PreBol14, PreReg12, Screen } from "#components"
import { StreamChat, ConnectionOpen } from "stream-chat"
import axios from "axios"
import { GIVER_CASUAL_NAVY } from "#theme"

import {
  Chat,
  OverlayProvider,
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
  Thread,
} from "stream-chat-react-native"
import { getStreamToken } from "../../services/api"
import { useStores } from "#models"
import Config from "react-native-config"

const API_KEY = Config.STREAM_CHAT_API_KEY
const USER_ID = "test_user_230628_cl"

const sampleData = {
  userId: USER_ID,
}

export const TestStreamChatScreen: FC<
  StackScreenProps<NavigatorParamList, "test-stream-chat-screen">
> = observer(function TestStreamChatScreen({ navigation }) {
  const {
    userStore: { type, userAuth },
  } = useStores()

  const client = StreamChat.getInstance(API_KEY)

  const [token, setToken] = useState(null)
  const [connectedUser, setConnectedUser] = useState<ConnectionOpen>(null)

  useEffect(() => {
    //console.log(generateToken({ userId: USER_ID }))
    getStreamToken().then((response) => setToken(response.streamToken))
  }, [])

  /**
   * 채널 유저 토큰 발행
   * userId 는 유일한 값이어야 함
   * */
  const generateToken = (data: { userId: string }) => {
    // 테스트를 위해 express 로 로컬서버를 만들었음 (참고: https://github.com/Care-Giver/stream-chat-server-simple-express)
    axios
      .post("http://localhost:3000/generate-token", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("generateToken response.data", response.data)
        setToken(response.data?.token)
      })
  }
  const parsedEmail = userAuth.email.substring(0, userAuth.email.indexOf("@"))

  // 채널 리스트 만들기 및 불러오기
  const createChannels = async () => {
    const chatClient = await StreamChat.getInstance(API_KEY)

    const channel = chatClient.channel("messaging", parsedEmail, {
      members: ["example", "ky7939"],
      name: parsedEmail,
      userType: type,
    })
    channel.create()

    const channels = chatClient.queryChannels({ watch: true, state: true })
    console.log("channels >>>", channels)
  }

  /**
   * 발행된 토큰과 userId 를 사용하여, 유저를 연결함
   * response 정보 (ConnectionOpen) 속에 채팅에 필요한 유저정보가 담겨있음
   * */
  const connectAndSetUSer = async () => {
    console.log("email >>>", userAuth.email)
    // Connect user to chat. This establishes a websocket connection between client and server.
    try {
      console.log("token>>>", token)
      const connectUserResponse = await client.connectUser(
        {
          id: parsedEmail,
          name: "TEST_USER",
          image: "https://i.imgur.com/fR9Jz14.png",
        },
        token,
      )
      console.log("connectUser Response", connectUserResponse)
      if (connectUserResponse) {
        setConnectedUser(connectUserResponse)
      }
      await createChannels()
      navigation.navigate("channel-list-screen", { parsedEmail: parsedEmail })
    } catch (error) {
      console.error("connectUser ERROR", error)
    }

    // To disconnect a user
    // await client.disconnect()
  }

  const onPress = () => {
    token ? connectAndSetUSer() : alert("토큰이 발행되지 않았습니다.")
  }

  return (
    <Screen testID="TestStreamChat">
      <PreBol14 text="token" mt={100} />
      {token && <PreReg12 text={token} />}
      <PreBol14 text="connected user" mt={10} />
      {connectedUser && <PreReg12 text={JSON.stringify(connectedUser)} />}

      <View style={styles.buttons}>
        <Button
          text="generateToken 테스트"
          onPress={() => {
            getStreamToken().then((response) => setToken(response.streamToken))
          }}
        />
        <Button text="connectUser 테스트" onPress={onPress} />
      </View>
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {},

  buttons: {
    marginTop: "auto",
    marginBottom: 40,
    height: 100,
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: GIVER_CASUAL_NAVY,
  },
})
