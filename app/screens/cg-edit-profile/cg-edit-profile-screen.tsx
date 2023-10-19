import React, { FC, useLayoutEffect } from "react"
import { StyleSheet, View } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import {
  Screen,
  MypageButton,
  DivisionLine,
  BASIC_BACKGROUND_PADDING_WIDTH,
  PreReg10,
} from "#components"
import { BODY, LIGHT_LINE } from "#theme"
import { useStores } from "#models"

export const CgEditProfileScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-edit-profile-screen">
> = observer(function CgEditProfileScreen({ navigation, route }) {
  const {
    petsitterStore: { serviceTypeKorean, petsitter },
  } = useStores()

  // ? 헤더 타이틀 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      //@ts-ignore
      title: `${serviceTypeKorean} 펫시터`,
    })
  }, [navigation, serviceTypeKorean])

  return (
    <Screen testID="CgEditProfile" style={{ paddingHorizontal: 0 }}>
      <DivisionLine color={LIGHT_LINE} />
      {/* //* 방문 지역 || 위탁 지역 / 사진 */}
      <View style={styles.sidePadding}>
        <MypageButton
          text={serviceTypeKorean === "방문" ? "방문 지역" : "위탁 지역 / 사진"}
          onPress={() => {
            navigate("cg-set-address-screen")
          }}
        />

        <View style={{ position: "absolute", right: 44, top: 14 }}>
          <PreReg10
            text={`${petsitter?.address || ""} ${petsitter?.detailAddress || ""}`}
            style={{ textAlign: "right" }}
            color={BODY}
          />
          {serviceTypeKorean === "위탁" && (
            <PreReg10
              text={`사진 ${petsitter?.images?.length || 0}장`}
              style={{ textAlign: "right" }}
              color={BODY}
            />
          )}
        </View>
      </View>
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
