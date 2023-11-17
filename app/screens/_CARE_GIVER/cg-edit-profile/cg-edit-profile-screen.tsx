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
  PreBol16,
} from "#components"
import { BODY, DISABLED, LIGHT_LINE, SUCCESS_BLUE, palette } from "#theme"
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
      draftPetsitter,
      regState,
      방문펫시터,
    },
  } = useStores()

  // ? 헤더 타이틀 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      //@ts-ignore
      title: hasDraftPetsitterProfile
        ? `${draftServiceTypeKorean} 펫시터 [등록중]`
        : `${serviceTypeKorean} 펫시터`,
    })
  }, [navigation, serviceTypeKorean, draftServiceTypeKorean, hasDraftPetsitterProfile])

  const _petsitter = hasDraftPetsitterProfile ? draftPetsitter : petsitter
  const 서비스장소주소 = useMemo(() => {
    if (_petsitter === null) return "-"
    if (_petsitter?.address === undefined) return "주소를 입력해주세요."
    return `${_petsitter?.address || ""} ${_petsitter?.detailAddress || ""}`
  }, [_petsitter])

  const 서비스개수 = useMemo(() => {
    const target = 방문펫시터 ? "serviceVisiting" : "serviceCreche"
    if (hasDraftPetsitterProfile) {
      if (draftPetsitter[target]?.length === 0) return 3 //! 기본서비스 3개
      return draftPetsitter[target]?.length + 3 || 3
    } else {
      return petsitter[target]?.length
    }
  }, [petsitter, draftPetsitter, hasDraftPetsitterProfile, 방문펫시터])

  const 편의사항개수 = useMemo(() => {
    const target = 방문펫시터 ? "visitingAmenities" : "crecheAmenities"
    if (hasDraftPetsitterProfile) {
      return draftPetsitter[target]?.length || 0
    } else {
      return petsitter[target]?.length
    }
  }, [petsitter, draftPetsitter, hasDraftPetsitterProfile, 방문펫시터])

  const 서비스장소사진개수 = useMemo(() => {
    if (_petsitter === null) return 0
    return _petsitter?.images?.length || 0
  }, [_petsitter])

  const 기본요금텍스트 = useMemo(() => {
    if (_petsitter === null) return "-"
    if (_petsitter?.defaultFee === undefined) return "기본요금을 설정해주세요."
    return `${priceFormatter(String(_petsitter?.defaultFee)) || "-"} 원`
  }, [_petsitter])

  const 추가요금텍스트 = useMemo(() => {
    if (_petsitter === null) return "-"
    if (!_petsitter.extraSizeFee) return "-"
    return `소형 +${priceFormatter(
      String(_petsitter?.extraSizeFee.Small),
    )}원 | 중형 +${priceFormatter(
      String(_petsitter?.extraSizeFee.Medium),
    )}원 | 대형 +${priceFormatter(String(_petsitter?.extraSizeFee.Large))}원`
  }, [_petsitter])

  const 반려동물 = useMemo(() => {
    if (_petsitter === null) return "-"
    else if (_petsitter?.catMaxUnit === undefined && _petsitter?.dogMaxUnit === undefined)
      return `맡으실 반려동물을 설정해주세요.`
    else if (_petsitter?.catMaxUnit !== 0 && _petsitter?.dogMaxUnit === undefined)
      return `고양이 최대 ${_petsitter?.catMaxUnit} 마리`
    else if (_petsitter?.dogMaxUnit !== 0 && _petsitter?.catMaxUnit === undefined)
      return `강아지 최대 ${_petsitter?.dogMaxUnit} 마리`
    else if (_petsitter?.catMaxUnit !== 0 && _petsitter?.dogMaxUnit !== 0)
      return `강아지 최대 ${_petsitter?.dogMaxUnit} 마리, 고양이 최대 ${_petsitter?.catMaxUnit} 마리`
  }, [_petsitter])

  const 자기소개제목 = useMemo(() => {
    if (_petsitter === null) return ""
    if (_petsitter?.title === undefined) return "자기소개 제목을 설정해주세요."
    return _petsitter?.title ?? ""
  }, [_petsitter])

  const 자기소개내용 = useMemo(() => {
    if (_petsitter === null) return ""
    if (_petsitter?.desc === undefined) return "자기소개 내용을 설정해주세요."
    return _petsitter?.desc ?? ""
  }, [_petsitter])

  const 등록단계별진행도표기색상 = useMemo(() => {
    if (hasDraftPetsitterProfile) {
      let state1Color = DISABLED
      let state2Color = DISABLED
      let state3Color = DISABLED
      switch (regState.state1) {
        case "done":
          state1Color = SUCCESS_BLUE
          break
        case "progress":
          state1Color = palette.orangeDarker
          break
        case "todo":
          state1Color = DISABLED
          break
      }
      switch (regState.state2) {
        case "done":
          state2Color = SUCCESS_BLUE
          break
        case "progress":
          state2Color = palette.orangeDarker
          break
        case "todo":
          state2Color = DISABLED
          break
      }
      switch (regState.state3) {
        case "done":
          state3Color = SUCCESS_BLUE
          break
        case "progress":
          state3Color = palette.orangeDarker
          break
        case "todo":
          state3Color = DISABLED
          break
      }
      return [state1Color, state2Color, state3Color]
    } else {
      return [SUCCESS_BLUE, SUCCESS_BLUE, SUCCESS_BLUE]
    }
  }, [regState, hasDraftPetsitterProfile])

  const targetServiceTypeKorean = draftServiceTypeKorean || serviceTypeKorean
  return (
    <Screen testID="CgEditProfile" style={{ paddingHorizontal: 0 }}>
      <DivisionLine color={LIGHT_LINE} />
      {/* //* 1. (구) 펫시터 정보 설정 */}
      <View style={styles.sidePadding}>
        <View
          style={[styles.regStateIndicator, { backgroundColor: 등록단계별진행도표기색상[0] }]}
        />
        <PreBol16 text="1 단계" mt={14} />
        <MypageButton
          text={
            (targetServiceTypeKorean === "방문" ? "방문 지역" : "위탁 지역 / 사진") +
            ", 서비스, 편의사항"
          }
          onPress={() => {
            navigate("cg-registration-1-screen")
          }}
        />

        <View style={{ position: "absolute", right: 44, top: 14 }}>
          <PreReg10 text={서비스장소주소} style={{ textAlign: "right" }} color={BODY} />
          <PreReg10
            text={`서비스 ${서비스개수}개, 편의사항 ${편의사항개수}개`}
            style={{ textAlign: "right" }}
            color={BODY}
          />
          {targetServiceTypeKorean === "위탁" && (
            <PreReg10
              text={`사진 ${서비스장소사진개수}장`}
              style={{ textAlign: "right" }}
              color={BODY}
            />
          )}
        </View>
      </View>

      <DivisionLine color={LIGHT_LINE} />
      {/* //* 2. (구) 펫시터 정보 설정 */}
      <View style={styles.sidePadding}>
        <View
          style={[styles.regStateIndicator, { backgroundColor: 등록단계별진행도표기색상[1] }]}
        />
        <PreBol16 text="2 단계" mt={14} />
        <MypageButton
          text={"기본요금, 케어할 반려동물 정보, 크기별 추가 요금"}
          onPress={() => {
            navigate("cg-registration-2-screen")
          }}
        />

        <View style={{ position: "absolute", right: 44, top: 14 }}>
          <PreReg10
            text={`${기본요금텍스트} | ${반려동물}`}
            style={{ textAlign: "right" }}
            color={BODY}
          />
          <PreReg10 text={추가요금텍스트} style={{ textAlign: "right" }} color={BODY} />
        </View>
      </View>

      <DivisionLine color={LIGHT_LINE} />
      {/* //* 3. (구) 가격 및 특이사항 설정 */}
      <View style={styles.sidePadding}>
        <View
          style={[styles.regStateIndicator, { backgroundColor: 등록단계별진행도표기색상[2] }]}
        />
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
            text={_.truncate(자기소개제목, { length: 20 })}
            style={{ textAlign: "right" }}
            color={BODY}
          />
          <PreReg10
            text={_.truncate(자기소개내용, { length: 30 })}
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
  regStateIndicator: {
    width: 5,
    height: 5,
    borderRadius: 5,
    position: "absolute",
    top: BASIC_BACKGROUND_PADDING_WIDTH / 2,
    left: BASIC_BACKGROUND_PADDING_WIDTH / 2,
    backgroundColor: "black",
  },
})
