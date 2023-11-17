import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { Screen } from "#components"
import { WebView } from "react-native-webview"
import { Api } from "#api"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

export const TestWebViewScreen: FC<
  StackScreenProps<NavigatorParamList, "test-web-view-screen">
> = observer(function TestWebViewScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const [html, setHtml] = useState(null)

  const api = new Api()
  useEffect(() => {
    const set = async () => {
      api.setup()
      const data = await api.getAuthGoogle()
      setHtml(data)
    }

    set()
  }, [])

  console.log("html", html)

  // const url = "https://reactnative.dev/"
  const url =
    "https://accounts.kakao.com/login/?continue=https%3A%2F%2Faccounts.kakao.com%2Fweblogin%2Faccount%2Finfo#login"
  return (
    <Screen testID="TestWebView" preset="fixed">
      {/* //* Kakao 로그인 웹페이지 -> Worked! */}
      <WebView
        source={{
          uri:
            "https://accounts.kakao.com/login/?continue=https%3A%2F%2Faccounts.kakao.com%2Fweblogin%2Faccount%2Finfo#login",
        }}
      />

      {/* //* Google 로그인 html -> Worked */}
      {/* {html && (
          <WebView
            source={{
              html: html,
            }}
          />
        )} */}
    </Screen>
  )
})
