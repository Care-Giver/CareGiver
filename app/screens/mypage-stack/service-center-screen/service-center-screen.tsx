import React, { FC } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { observer } from "mobx-react-lite"
import { Screen } from "#components"
import WebView from "react-native-webview"
import { 외부링크 } from "../../../services/external-web-link"
import { palette } from "#theme"

export const ServiceCenterScreen: FC<
  StackScreenProps<NavigatorParamList, "service-center-screen">
> = observer(({ navigation, route }) => {
  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <WebView
        source={{ uri: 외부링크.고객_센터 }}
        style={{
          flex: 1,
          backgroundColor: palette.white,
          alignItems: "center",
          justifyContent: "center",
        }}
        showsVerticalScrollIndicator={false}
        allowsBackForwardNavigationGestures
      />
    </Screen>
  )
})
