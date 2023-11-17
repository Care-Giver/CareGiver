import React, { FC, useLayoutEffect, useMemo } from "react"
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
  PreBol18,
  PreBol16,
} from "#components"
import { BODY, LIGHT_LINE } from "#theme"
import { useStores } from "#models"
import { price as priceFormatter } from "../../../utils/format"
import _ from "lodash"

export const CgEditProfileScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-edit-profile-screen">
> = observer(function CgEditProfileScreen({ navigation, route }) {
  const {
    petsitterStore: {
      serviceTypeKorean,
      petsitter,
      draftServiceTypeKorean,
      hasDraftPetsitterProfile,
      regState,
    },
  } = useStores()
  console.log("regState ♦️", regState)

  // ? 헤더 타이틀 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      //@ts-ignore
      title: hasDraftPetsitterProfile
        ? `${draftServiceTypeKorean} 펫시터 [등록중]`
        : `${serviceTypeKorean} 펫시터`,
    })
  }, [navigation, serviceTypeKorean, draftServiceTypeKorean, hasDraftPetsitterProfile])

  const 반려동물 = useMemo(() => {
    if (petsitter?.catMaxUnit !== 0 && petsitter?.dogMaxUnit !== 0) return "강아지, 고양이"
    else if (petsitter?.catMaxUnit !== 0) return "고양이"
    else if (petsitter?.dogMaxUnit !== 0) return "강아지"
  }, [petsitter?.catMaxUnit, petsitter?.dogMaxUnit])

  return (
    <Screen testID="CgEditProfile" style={{ paddingHorizontal: 0 }}>
      <DivisionLine color={LIGHT_LINE} />
      {/* //* 1. (구) 펫시터 정보 설정 */}
      <View style={styles.sidePadding}>
        <PreBol16 text="1 단계" mt={14} />
        <MypageButton
          text={
            (serviceTypeKorean === "방문" ? "방문 지역" : "위탁 지역 / 사진") + ", 서비스, 편의사항"
          }
          onPress={() => {
            navigate("cg-registration-1-screen")
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
      {/* //* 2. (구) 펫시터 정보 설정 */}
      <View style={styles.sidePadding}>
        <PreBol16 text="2 단계" mt={14} />
        <MypageButton
          text={"기본요금, 케어할 반려동물 정보, 크기별 추가 요금"}
          onPress={() => {
            navigate("cg-registration-2-screen")
          }}
        />

        <View style={{ position: "absolute", right: 44, top: 14 }}>
          <PreReg10
            text={`${priceFormatter(String(petsitter?.defaultFee)) || "-"}원 | ${반려동물}`}
            style={{ textAlign: "right" }}
            color={BODY}
          />
        </View>
      </View>

      <DivisionLine color={LIGHT_LINE} />
      {/* //* 3. (구) 가격 및 특이사항 설정 */}
      <View style={styles.sidePadding}>
        <PreBol16 text="3 단계" mt={14} />
        <MypageButton
          // text={"자기소개, 자격증"}
          text={"자기소개"}
          onPress={() => {
            navigate("cg-registration-3-screen")
          }}
        />

        <View style={{ position: "absolute", right: 44, top: 14 }}>
          <PreReg10
            text={`${(petsitter?.title ?? "").slice(0, 10)}...`}
            style={{ textAlign: "right" }}
            color={BODY}
          />
          <PreReg10
            text={`${(petsitter?.desc ?? "").slice(0, 10)}...`}
            style={{ textAlign: "right" }}
            color={BODY}
          />
        </View>
      </View>

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
