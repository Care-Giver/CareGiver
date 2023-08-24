import React, { FC, useState } from "react"
import { Image, StyleSheet, View } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import { ConditionalButton, PreBol20, PreReg14, Screen } from "#components"
import { images } from "#images"
import { BODY, BOTTOM_HEIGHT } from "#theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const RegisterSuccessScreen: FC<
  StackScreenProps<NavigatorParamList, "register-success-screen">
> = observer(function RegisterSuccessScreen() {
  // MST store 를 가져옵니다.
  // const { someStore, anotherStore } = useStores()

  // 필요시, useNavigation 훅을 사용할 수 있습니다.
  // const navigation = useNavigation()

  return (
    <Screen testID="RegisterSuccess">
      <View style={{ alignItems: "center" }}>
        <Image
          source={images.dog_illustration}
          style={{ width: 156, height: 120, marginTop: 138 }}
        />
        <PreBol20 text="케어기버에 오신 것을 환영합니다!" style={{ marginTop: 18 }} />
        <PreReg14
          text="케어기버의 다양한 서비스를 구경해보세요!"
          color={BODY}
          style={{ marginTop: 8 }}
        />
      </View>
      <ConditionalButton
        label="다음"
        isActivated={true}
        style={{ position: "absolute", bottom: BOTTOM_HEIGHT, alignSelf: "center" }}
        //TODO navigation추가 필요
        onPress={() => {
          navigate("mypage-screen")
        }}
      />
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {},
})
