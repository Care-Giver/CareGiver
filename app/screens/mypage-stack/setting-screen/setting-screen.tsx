import { View, Text } from "react-native"
import React, { FC } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { observer } from "mobx-react-lite"
import { MypageButton, PreMed16, PreReg14, ScreenRootView } from "#components"
import { HEAD_LINE, BODY } from "#theme"
import { styles } from "./styles"
import { HEIGHT } from "#theme"

export const SettingScreen: FC<StackScreenProps<NavigatorParamList, "setting-screen">> = observer(
  ({ navigation, route }) => {
    const handleLogoutPress = () => {
      alert("로그아웃 화면으로 이동")
    }

    const handleWithdrawPress = () => {
      alert("회원 탈퇴 화면으로 이동")
    }

    return (
      <ScreenRootView>
        {/* //* 버전 정보 */}
        <View style={styles.versionBox}>
          <PreMed16 text="버전 정보" color={HEAD_LINE} />
          <PreReg14 text="No. 1 beta version" color={BODY} style={{ marginTop: HEIGHT * 8 }} />
        </View>
        {/* //? division line */}
        <View style={styles.divisionLine} />

        {/* //* 로그아웃 */}
        <MypageButton text="로그아웃" onPress={handleLogoutPress} />
        {/* //? division line */}
        <View style={styles.divisionLine} />

        {/* //* 회원 탈퇴 */}
        <MypageButton text="회원 탈퇴" onPress={handleWithdrawPress} />
        {/* //? division line */}
        <View style={styles.divisionLine} />
      </ScreenRootView>
    )
  },
)
