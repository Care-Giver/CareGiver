import React, { FC, useMemo, useState } from "react"
import { FlatList, View } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import {
  CgRegisterStateProps,
  GoBackSaveNext,
  PreBol20,
  Screen,
  TextSaveNextString,
} from "#components"
import { useStores } from "#models"
import { BOTTOM_HEIGHT, GIVER_CASUAL_NAVY, GIVER_CASUAL_NAVY_20, palette } from "#theme"
import { alertModal } from "../../../utils/alert-modal"
import { updateVisiting, updateCreche } from "#axios"
import { AdditionalPrice, CgSetAdditionalPrice } from "./cg-set-additional-price"
import { CgSetPrice } from "./cg-set-price"
import { CgSetFamilyType } from "./cg-set-pet-family-type"
import { HandleType } from "../../../services/axios/types/creches.visitings.common.types"
import { useKeyboardShown } from "../../../utils/hooks/use-keyboard-shown"
import { LinearGradient } from "expo-linear-gradient"
import { price as priceFormatter } from "../../../utils/format"
import { ScreenHeader, StateHeader } from "../cg-registration-1/cg-registration-1-screen"
import { useFetchAvgPrice } from "./use-fetch-avg-price"

export type FamilyTypeNumber = {
  DOG: number
  CAT: number
}

export const CgRegistration2Screen: FC<
  StackScreenProps<NavigatorParamList, "cg-registration-2-screen">
> = observer(function CgSetAddressTempScreen({ navigation, route }) {
  // MST store 를 가져옵니다.
  const {
    petsitterStore: {
      petsitter,
      serviceTypeKorean,
      serviceType,
      setVistingPetsitter,
      setCrechePetsitter,
      hasDraftPetsitterProfile,
      draftPetsitter,
      setDraftPetsitter,
      draftServiceType,
      방문펫시터,
      regState,
    },
  } = useStores()
  // console.log("petsitter 🔷", petsitter)
  const isKeyboardShown = useKeyboardShown()

  // 이 지역 평균 기본 요금
  const avgPriceData = useFetchAvgPrice(serviceTypeKorean)
  // 기본 요금
  const [price, setPrice] = useState(draftPetsitter?.defaultFee || petsitter?.defaultFee || 0)
  // 종 (고양이 OR 강아지) 과 마리 수
  const [familyTypeNumber, setFamilyTypeNumber] = useState<FamilyTypeNumber>({
    DOG: draftPetsitter?.dogMaxUnit || petsitter?.dogMaxUnit || 0,
    CAT: draftPetsitter?.catMaxUnit || petsitter?.catMaxUnit || 0,
  })

  const hasDogs = familyTypeNumber.DOG > 0
  // (강아지 일 경우) 크기
  const [handleType, setHandleType] = useState<HandleType[]>(
    draftPetsitter?.handleType || petsitter?.handleType || [],
  )
  // (강아지 일 경우) 크기별 추가 요금
  const [additionalPrice, setAdditionalPrice] = useState<AdditionalPrice>({
    Small: draftPetsitter?.extraSizeFee?.Small || petsitter?.extraSizeFee?.Small || 0,
    Medium: draftPetsitter?.extraSizeFee?.Medium || petsitter?.extraSizeFee?.Medium || 0,
    Large: draftPetsitter?.extraSizeFee?.Large || petsitter?.extraSizeFee?.Large || 0,
  })

  // FlatList 관련 BEGIN ==================================================================
  const dataFlatList = Array.from({ length: 3 })
  const [itemWidth, setItemWidth] = useState<number>(0)
  const [currentStep, setCurrentStep] = useState<number>(1)

  // 상단 헤더 내 "저장 후 나가기"
  const onPressSaveExit = async () => {
    navigation.goBack() //! goBack 을 사용할 것. replace ㄴㄴ
    // TODO: 현재까지 내역 업데이트하는 API 호출
  }

  // 상단 헤더 state 정보
  const stateList: Omit<CgRegisterStateProps, "style">[] = [
    {
      number: 1,
      state: regState.state1,
      title: "펫시터 정보 설정",
      onPress: () => {
        navigate("cg-registration-1-screen")
      },
    },
    {
      number: 2,
      state: "progress",
      title: "펫시터 서비스 설정",
      onPress: () => {
        // 아무것도 하지 않는다.
      },
    },
    {
      number: 3,
      state: regState.state3,
      title: "가격 및 특이사항 설정",
      onPress: () => {
        navigate("cg-registration-3-screen")
      },
    },
  ]

  // 이전
  const onPressGoback = () => {
    switch (currentStep) {
      case 1: // 첫번째 스텝인 경우, 이전 스크린으로 돌아갑니다.
        navigation.goBack()
        break
      case 2:
        setCurrentStep(currentStep - 1)
        break
      case 3: // 마지막 스텝
        setCurrentStep(currentStep - 1)
        break
    }
  }

  // 저장 후 다음단계
  const onPressSaveNext = () => {
    switch (currentStep) {
      case 1:
        step1()
        break
      case 2:
        step2()
        break
      case 3:
        step3()
        break
    }
  }

  const textSaveNext: TextSaveNextString = useMemo(() => {
    const isLastStep = currentStep === dataFlatList.length
    if (isLastStep) {
      return hasDraftPetsitterProfile ? "저장 후 다음단계" : "수정하기"
    } else {
      return "저장 후 다음단계"
    }
  }, [hasDraftPetsitterProfile, currentStep, dataFlatList])
  // FlatList 관련 ENDED ==================================================================

  // 기본 요금
  const step1 = () => {
    if (!price) {
      alertModal("기본 요금", "기본 예약 요금을 입력해주세요.")
      return
    }
    setCurrentStep(currentStep + 1)
  }

  // 맡을 반려동물 종류
  const step2 = async () => {
    if (familyTypeNumber.DOG === 0 && familyTypeNumber.CAT === 0) {
      alertModal("반려동물 종류", "반려동물의 종류를 하나 이상 선택해주세요.")
      return
    }

    if (hasDogs && handleType.length === 0) {
      alertModal("반려동물 크기", "강아지의 크기를 선택해주세요.")
      return
    }

    setCurrentStep(currentStep + 1)
  }

  // 추가요금 설정 && 마지막 단계
  const step3 = async () => {
    const data = {
      defaultFee: price,
      dogMaxUnit: familyTypeNumber.DOG,
      catMaxUnit: familyTypeNumber.CAT,
      handleType,
      extraSizeFee: additionalPrice,
    }

    if (hasDraftPetsitterProfile) {
      setDraftPetsitter({ ...draftPetsitter, ...data }, 방문펫시터 ? "visiting" : "creche")
      navigate("cg-registration-3-screen")
      return
    }

    const updater = 방문펫시터 ? updateVisiting : updateCreche
    const mstSetter = 방문펫시터 ? setVistingPetsitter : setCrechePetsitter
    //! 마지막단계 - 방문 펫시팅 정보 UPDATE
    updater(petsitter.id, data).then(({ isSuccess, visiting, creche }) => {
      if (isSuccess) {
        const updatedData = 방문펫시터 ? visiting : creche
        // MST 업데이트
        mstSetter(updatedData)
        /* 마지막 스텝이므로, 이전 스크린으로 돌아갑니다. */
        navigation.replace("cg-edit-profile-screen")
      } else {
        alertModal(
          `${serviceTypeKorean} 장소 업데이트 실패`,
          `${serviceTypeKorean} 장소 수정 실패했습니다. 잠시 후 다시 시도해주세요.`,
        )
      }
    })
  }

  return (
    <Screen>
      <ScreenHeader
        route={route}
        onPressSaveExit={onPressSaveExit}
        hasDraftPetsitterProfile={hasDraftPetsitterProfile}
      />
      <StateHeader stateList={stateList} style={{ marginTop: 10 }} />
      <FlatList
        snapToInterval={itemWidth}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: "200%" }}
        data={dataFlatList}
        scrollEnabled={false}
        onContentSizeChange={(w) => setItemWidth(w / 2)}
        numColumns={1}
        renderItem={({ item }) => (
          <>
            {currentStep === 1 && (
              <CgSetPrice
                style={{ width: itemWidth }}
                price={price}
                setPrice={setPrice}
                serviceType={serviceType || draftServiceType}
                standardPrice={
                  avgPriceData && {
                    min: priceFormatter(avgPriceData.minAvgPrice.toString()),
                    max: priceFormatter(avgPriceData.maxAvgPrice.toString()),
                  }
                }
              />
            )}
            {currentStep === 2 && (
              <CgSetFamilyType
                style={{ width: itemWidth }}
                serviceType={serviceType || draftServiceType}
                familyTypeNumber={familyTypeNumber}
                setFamilyTypeNumber={setFamilyTypeNumber}
                handleType={handleType}
                setHandleType={setHandleType}
              />
            )}
            {currentStep === 3 && (
              <>
                {!hasDogs && (
                  <>
                    <LinearGradient
                      colors={[GIVER_CASUAL_NAVY_20, GIVER_CASUAL_NAVY]}
                      style={{
                        position: "absolute",
                        zIndex: 2,
                        width: itemWidth,
                        height: "80%",
                        flex: 1,
                        opacity: 0.72,
                        borderRadius: 20,
                      }}
                    />
                    <View
                      style={{
                        position: "absolute",
                        zIndex: 3,
                        width: itemWidth,
                        alignSelf: "center",
                        alignItems: "center",
                        bottom: BOTTOM_HEIGHT + 200,
                      }}
                    >
                      <PreBol20 text="고양이만 케어하시는 경우" color={palette.white} />
                      <PreBol20 text="설정하지 않으셔도 됩니다." color={palette.white} mt={8} />
                    </View>
                  </>
                )}
                <CgSetAdditionalPrice
                  style={{ width: itemWidth }}
                  additionalPrice={additionalPrice}
                  setAdditionalPrice={setAdditionalPrice}
                  handleType={handleType}
                />
              </>
            )}
          </>
        )}
      />

      {/* 이전 |  다음단계 */}
      {!isKeyboardShown && (
        <GoBackSaveNext
          onPressGoback={onPressGoback}
          onPressSaveNext={onPressSaveNext}
          style={{ position: "absolute", bottom: BOTTOM_HEIGHT, alignSelf: "center" }}
          textSaveNext={textSaveNext}
        />
      )}
    </Screen>
  )
})
