import { View, Text } from "react-native"
import React, { FC } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { observer } from "mobx-react-lite"
import { MypageButton, Screen } from "#components"
import { styles } from "./styles"

export const ServiceCenterScreen: FC<
  StackScreenProps<NavigatorParamList, "service-center-screen">
> = observer(({ navigation, route }) => {
  const handlePress = () => {
    alert("준비중인 서비스입니다.")
  }
  return (
    <Screen>
      {/* //* 채팅 문의 버튼 */}
      <MypageButton text="채팅 문의" onPress={handlePress} />
      {/* //? division line */}
      <View style={styles.divisionLine} />

      {/* //* 전화 문의 버튼 */}
      <MypageButton text="전화 문의" onPress={handlePress} />
      {/* //? division line */}
      <View style={styles.divisionLine} />
    </Screen>
  )
})
