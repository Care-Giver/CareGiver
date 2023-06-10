import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { ScreenRootView } from "#components"
import { Button, Pressable, Text, StyleSheet, View } from "react-native"
import {
  login,
  logout,
  unlink,
  getProfile,
  getAccessToken,
  KakaoOAuthToken,
} from "@react-native-seoul/kakao-login"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const KakaoLoginTestScreen: FC<
  StackScreenProps<NavigatorParamList, "kakao-login-test-screen">
> = observer(function KakaoLoginTestScreen() {
  // MST store 를 가져옵니다.
  // const { someStore, anotherStore } = useStores()

  // 필요시, useNavigation 훅을 사용할 수 있습니다.
  // const navigation = useNavigation()

  const [result, setResult] = useState<string>("")

  //? 하단의 코드와 그 밑의 코드의 차이점?

  // const signInWithKakao = async (): Promise<void> => {
  //   const token: KakaoOAuthToken = await login();

  //   setResult(JSON.stringify(token));
  // };

  // const signOutWithKakao = async (): Promise<void> => {
  //   const message = await logout();

  //   setResult(message);
  // };

  // const getKakaoProfile = async (): Promise<void> => {
  //   const profile: KakaoProfile = await getProfile();

  //   setResult(JSON.stringify(profile));
  // };

  // const unlinkKakao = async (): Promise<void> => {
  //   const message = await unlink();

  //   setResult(message);
  // };

  //!
  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await login()
      setResult(JSON.stringify(token))
    } catch (err) {
      console.error("login err", err)
    }
  }

  const signOutWithKakao = async (): Promise<void> => {
    try {
      const message = await logout()

      setResult(message)
    } catch (err) {
      console.error("signOut error", err)
    }
  }

  const getKProfile = async (): Promise<void> => {
    try {
      const profile = await getProfile()

      setResult(JSON.stringify(profile))
    } catch (err) {
      console.error("signOut error", err)
    }
  }

  const unlinkKakao = async (): Promise<void> => {
    try {
      const message = await unlink()

      setResult(message)
    } catch (err) {
      console.error("signOut error", err)
    }
  }

  return (
    <ScreenRootView testID="KakaoLoginTest">
      <View style={{ height: 100, width: "100%" }}>
        <Text>{result}</Text>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => {
          signInWithKakao()
        }}
      >
        <Text>로그인</Text>
      </Pressable>
    </ScreenRootView>
  )
})

const styles = StyleSheet.create({
  button: {
    height: 100,
    width: 100,
    paddingBottom: 50,
    backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "flex-end",
  },
})
