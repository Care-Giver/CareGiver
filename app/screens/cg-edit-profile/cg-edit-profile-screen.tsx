import React, { FC, useLayoutEffect } from "react"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import { Screen, MypageButton, DivisionLine, BASIC_BACKGROUND_PADDING_WIDTH } from "#components"
import { LIGHT_LINE } from "#theme"
import { useStores } from "#models"

export const CgEditProfileScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-edit-profile-screen">
> = observer(function CgEditProfileScreen({ navigation, route }) {
  const serviceType = route.params?.serviceType

  // ? 헤더 타이틀 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      //@ts-ignore
      title: `${serviceType} 펫시터`,
    })
  }, [navigation, serviceType])

  return (
    <Screen testID="CgEditProfile" style={{ paddingHorizontal: 0 }}>
      <DivisionLine color={LIGHT_LINE} />
      {/* //* 방문 지역 || 위탁 지역 / 사진 */}
      <MypageButton
        text={serviceType === "방문" ? "방문 지역" : "위탁 지역 / 사진"}
        onPress={() => {
          navigate("cg-set-address-temp-screen", { serviceType })
        }}
        style={styles.sidePadding}
      />
      <DivisionLine color={LIGHT_LINE} />

      {/* //* 서비스 / 편의사항 / 기본요금 */}
      <MypageButton
        text="서비스 / 편의사항 / 기본요금"
        onPress={() => {}}
        style={styles.sidePadding}
      />
      <DivisionLine color={LIGHT_LINE} />

      {/* //* 반려동물 / 추가요금 */}
      <MypageButton text="반려동물 / 추가요금" onPress={() => {}} style={styles.sidePadding} />
      <DivisionLine color={LIGHT_LINE} />

      {/* //* 자기소개 / 자격증 */}
      <MypageButton text="자기소개 / 자격증" onPress={() => {}} style={styles.sidePadding} />
      <DivisionLine color={LIGHT_LINE} />
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {},
  sidePadding: {
    paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
  },
})
