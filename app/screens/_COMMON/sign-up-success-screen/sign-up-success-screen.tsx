import React, { FC, useState } from "react"
import { Image, StyleSheet, View } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import { ConditionalButton, PreBol20, PreReg14, Screen } from "#components"
import { images } from "#images"
import { BODY, BOTTOM_HEIGHT } from "#theme"
import { useStores } from "#models"

export const SignUpSuccessScreen: FC<
  StackScreenProps<NavigatorParamList, "sign-up-success-screen">
> = observer(function SignUpSuccessScreen({ navigation }) {
  const {
    userStore: { isLoggedIn, setLoggedIn },
  } = useStores()

  return (
    <Screen testID="RegisterSuccess">
      <View style={{ alignItems: "center" }}>
        <Image source={images.cat_with_heart} style={{ width: 158, height: 122, marginTop: 138 }} />
        <PreBol20 text="케어기버에 오신 것을 환영합니다!" style={{ marginTop: 18 }} />
        <PreReg14
          text="케어기버의 다양한 서비스를 구경해보세요!"
          color={BODY}
          style={{ marginTop: 8 }}
        />
      </View>
      <ConditionalButton
        label="홈화면으로 이동하기"
        isActivated={true}
        style={{ position: "absolute", bottom: BOTTOM_HEIGHT, alignSelf: "center" }}
        onPress={() => {
          // // 시작 스크린으로 이동 - "search-screen"
          // navigation.navigate("search-screen")

          // // 마이페이지 스택, 최초화면으로 변경
          // navigation.replace("mypage-screen")

          if (!isLoggedIn) {
            setLoggedIn(true)
          }
        }}
      />
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {},
})
