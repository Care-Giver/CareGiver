import React, { FC, useEffect, useState } from "react"
import { FlatList, Pressable, StyleSheet, View, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  CgRegisterState,
  CgRegisterStateProps,
  GoBackSaveNext,
  PreBol20,
  PreMed16,
  Screen,
} from "#components"
import { useStores } from "#models"
import { BOTTOM_HEIGHT, DISABLED, GIVER_CASUAL_NAVY, GIVER_CASUAL_NAVY_20, palette } from "#theme"
import { HEADER_ROOT } from "../../components/screen-headers/common-styles"
import { images } from "#images"
import { alertModal } from "../../utils/alert-modal"
import { updateVisiting, updateCreche, getVisitingAvgPrice, getCrecheAvgPrice } from "#axios"
import _ from "lodash"
import { AdditionalPrice, CgSetAdditionalPrice } from "./cg-set-additional-price"
import { CgSetPrice } from "./cg-set-price"
import { CgSetFamilyType } from "./cg-set-pet-family-type"
import { HandleType } from "../../services/axios/types/creches.visitings.common.types"
import { useKeyboardShown } from "../../utils/hooks/use-keyboard-shown"
import { LinearGradient } from "expo-linear-gradient"
import { getDevicePermission } from "../search-stack/search-screen/getDevicePermission"
import Geolocation from "react-native-geolocation-service"
import { price as priceFormatter } from "../../utils/format"

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
    },
  } = useStores()
  console.log("petsitter 🔷", petsitter)

  const isKeyboardShown = useKeyboardShown()

  const [prices, setPrices] = useState<{
    minAvgPrice: number
    avgPrice: number
    maxAvgPrice: number
  }>(null)

  useEffect(() => {
    const ERROR_PRICES = {
      minAvgPrice: 0,
      avgPrice: 0,
      maxAvgPrice: 0,
    }
    const DEFAULT_PRICES = {
      minAvgPrice: serviceTypeKorean === "방문" ? 10000 : 50000,
      avgPrice: serviceTypeKorean === "방문" ? 10000 : 50000,
      maxAvgPrice: serviceTypeKorean === "방문" ? 10000 : 50000,
    }

    // 현재 위치좌표를 얻어내고, 평균가 API 를 호출한다
    const avgPriceHandler = async () => {
      // 위치 권한 요청
      getDevicePermission(
        "location",
        // 성공시, 현 위치를 좌표로 설정
        () => {
          Geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords
              const getAvgPrice =
                serviceTypeKorean === "방문" ? getVisitingAvgPrice : getCrecheAvgPrice
              getAvgPrice({
                lat: latitude,
                lng: longitude,
              }).then(({ isSuccess, prices, reason }) => {
                if (isSuccess) {
                  setPrices(prices)
                } else {
                  alertModal("API 호출 실패", "평균 기본 요금 정보를 요청하는 것에 실패하였습니다.")
                  setPrices(ERROR_PRICES)
                }
              })
            },
            (error) => {
              console.log("error", error)
              alertModal("위치 정보 수집 실패", error.message)
              setPrices(ERROR_PRICES)
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          )
        },
        // 권한 요청 실패시,
        () => {
          setPrices(DEFAULT_PRICES)
          alertModal(
            "위치 권한 없음",
            "내 주변 평균 기본 요금를 표시하기 위해 위치 권한이 필요합니다.",
          )
        },
      )
    }

    avgPriceHandler()
  }, [serviceTypeKorean])

  // 기본 요금
  const [price, setPrice] = useState(0)

  // 종 (고양이 OR 강아지) 과 마리 수
  const [familyTypeNumber, setFamilyTypeNumber] = useState<FamilyTypeNumber>({
    DOG: 0,
    CAT: 0,
  })
  const hasDogs = familyTypeNumber.DOG > 0

  // (강아지 일 경우) 크기
  const [handleType, setHandleType] = useState<HandleType[]>([]) // 크기

  // (강아지 일 경우) 크기별 추가 요금
  const [additionalPrice, setAdditionalPrice] = useState<AdditionalPrice>({
    Small: 0,
    Medium: 0,
    Large: 0,
  })

  // FlatList 관련 BEGIN ==================================================================
  const data = Array.from({ length: 3 })
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
      state: "done",
      title: "펫시터 정보 설정",
      onPress: () => {
        //
      },
    },
    {
      number: 2,
      state: "progress",
      title: "펫시터 서비스 설정",
      onPress: () => {
        //
      },
    },
    {
      number: 3,
      state: "todo",
      title: "가격 및 특이사항 설정",
      onPress: () => {
        //
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
    if (hasDogs) {
      const hasZero = !!handleType.find((value) => additionalPrice[value] === 0)
      console.log("hasZero", hasZero)
      if (hasZero) {
        alertModal("추가요금 설정", "강아지의 크기별 추가 요금을 입력해주세요.")
        return
      }
    }

    if (serviceTypeKorean === "방문") {
      //! 마지막단계 - 방문 펫시팅 정보 UPDATE
      updateVisiting(petsitter.id, {
        defaultFee: price,
        dogMaxUnit: familyTypeNumber.DOG,
        catMaxUnit: familyTypeNumber.CAT,
        handleType: [...handleType],
        extraSizeFee: additionalPrice,
      }).then(({ isSuccess, visiting }) => {
        if (isSuccess) {
          // MST 업데이트
          setVistingPetsitter(visiting)
          /* 마지막 스텝이므로, 이전 스크린으로 돌아갑니다. */
          navigation.replace("cg-edit-profile-screen")
        } else {
          alertModal(
            "방문 장소 업데이트 실패",
            "방문 장소 수정 실패했습니다. 잠시 후 다시 시도해주세요.",
          )
        }
      })
    } else {
      //! 마지막단계 - 위탁 펫시팅 정보 UPDATE
      updateCreche(petsitter.id, {
        defaultFee: price,
        dogMaxUnit: familyTypeNumber.DOG,
        catMaxUnit: familyTypeNumber.CAT,
        handleType,
        extraSizeFee: additionalPrice,
        //! 🏗️디버깅중 - 이상하게 services 랑 amenities 도 넣어줘야 PUT 성공함 (@yeseong33) 님이 발견해 줌.
        services: petsitter.serviceCreche.map((item) => item.id),
        amenities: petsitter.crecheAmenities.map((item) => item.id),
      }).then(({ isSuccess, creche }) => {
        if (isSuccess) {
          // MST 업데이트
          console.log("BEFORE INTO setCrechePetsitter", creche)
          setCrechePetsitter(creche)
          /* 마지막 스텝이므로, 이전 스크린으로 돌아갑니다. */
          navigation.replace("cg-edit-profile-screen")
        } else {
          alertModal(
            "위탁 장소 업데이트 실패",
            "위탁 장소 수정 및 사진 업로드에 실패했습니다. 잠시 후 다시 시도해주세요.",
          )
        }
      })
    }
  }

  return (
    <Screen>
      <ScreenHeader navigation={navigation} onPressSaveExit={onPressSaveExit} />
      <StateHeader stateList={stateList} style={{ marginTop: 10 }} />
      <FlatList
        snapToInterval={itemWidth}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: "200%" }}
        data={data}
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
                serviceType={serviceType}
                standardPrice={
                  prices && {
                    min: priceFormatter(prices.minAvgPrice.toString()),
                    max: priceFormatter(prices.maxAvgPrice.toString()),
                  }
                }
              />
            )}
            {currentStep === 2 && (
              <CgSetFamilyType
                style={{ width: itemWidth }}
                serviceType={serviceType}
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
          isLastStep={currentStep === data.length}
          style={{ position: "absolute", bottom: BOTTOM_HEIGHT, alignSelf: "center" }}
        />
      )}
    </Screen>
  )
})

/**
 * 리액트 네비게이션 스크린 헤더 대신 사용하는 컴포넌트입니다.
 * 상단에 뒤로가기 이미지 버튼과 "저장 후 나가기" 버튼을 렌더링 합니다.
 */
const ScreenHeader = ({ navigation, onPressSaveExit }) => {
  return (
    <View style={[HEADER_ROOT, { justifyContent: "space-between" }]}>
      {/* 뒤로가기 버튼 */}
      <Pressable
        onPress={() => {
          navigation.goBack()
        }}
      >
        <Image style={styles.goBackButton} source={images.go_back} />
      </Pressable>

      {/* 저장 후 나가기 */}
      <Pressable onPress={onPressSaveExit}>
        <PreMed16 text="저장 후 나가기" color={DISABLED} />
      </Pressable>
    </View>
  )
}

/**
 * FlatList 상단에 표출되는
 * 현재 state 을 보여주는 컴포넌트입니다.
 */
const StateHeader = ({ stateList, style }) => {
  return (
    <View style={[{ flexDirection: "row", height: 30 }, style]}>
      {stateList.map((i) => (
        <CgRegisterState
          key={i.number}
          state={i.state}
          number={i.number}
          title={i.title}
          onPress={i.onPress}
          style={{ marginRight: 5 }}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  goBackButton: {
    width: 28,
    height: 28,
  },
})
