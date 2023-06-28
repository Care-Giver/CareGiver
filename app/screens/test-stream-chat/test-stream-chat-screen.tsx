import React, { FC, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { Button, PreBol14, PreReg12, ScreenRootView } from "#components"
import { StreamChat, ConnectionOpen } from "stream-chat"
import axios from "axios"
import { GIVER_CASUAL_NAVY } from "#theme"

const API_KEY = "cyt5mvxvratf"
const USER_ID = "test_user_230628_cl"

const sampleData = {
  userId: USER_ID,
}

export const TestStreamChatScreen: FC<
  StackScreenProps<NavigatorParamList, "test-stream-chat-screen">
> = observer(function TestStreamChatScreen() {
  const client = StreamChat.getInstance(API_KEY)

  const [token, setToken] = useState(null)
  const [connectedUser, setConnectedUser] = useState<ConnectionOpen>(null)

  useEffect(() => {
    generateToken(sampleData)
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
      .catch((error) => {
        console.error("generateToken ERROR", error)
      })
  }

  /**
   * 발행된 토큰과 userId 를 사용하여, 유저를 연결함
   * */
  const connectAndSetUSer = async () => {
    // Connect user to chat. This establishes a websocket connection between client and server.
    try {
      const connectUserResponse = await client.connectUser(
        {
          id: USER_ID,
          name: "TEST_USER",
          image: "https://i.imgur.com/fR9Jz14.png",
        },
        token,
      )
      console.log("connectUser Response", connectUserResponse)
      if (connectUserResponse) {
        setConnectedUser(connectUserResponse)
      }
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
    <ScreenRootView testID="TestStreamChat">
      <PreBol14 text="token" mt={100} />
      {token && <PreReg12 text={token} />}
      <PreBol14 text="connected user" mt={10} />
      {connectedUser && <PreReg12 text={JSON.stringify(connectedUser)} />}

      <View style={styles.buttons}>
        <Button
          text="generateToken 테스트"
          onPress={() => {
            generateToken(sampleData)
          }}
        />
        <Button text="connectUser 테스트" onPress={onPress} />
      </View>
    </ScreenRootView>
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
