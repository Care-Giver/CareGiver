import React, { FC, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { observer } from "mobx-react-lite"
import {
  CaregiverSetPrice,
  GoBackSaveNext,
  Screen,
  CaregiverSetAdditionalPrice,
  CgRegisterStep,
  AdditionalPrice,
} from "#components"
import { FlatList, View } from "react-native"
import { BOTTOM_HEIGHT } from "#theme"

// 서버로 부터 받아온 지역 평균가 더미데이터
const standardCosts = {
  visit: {
    min: "40,000",
    max: "60,000",
  },

  creche: {
    min: "80,000",
    max: "130,000",
  },
}

/**
 * 케어기버의 기본 서비스 요금을 설정하는 스크린입니다.
 * 영업을 하기로 한 "모든날짜"에 대해, 기본 요금과 크기별 추가 요금을 설정합니다.
 * 위탁/방문의 경우 모두 이 스크린을 사용합니다.
 */
export const CgSetPriceScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-set-price-screen">
> = observer(({ route, navigation }) => {
  const serviceType = route.params?.serviceType

  // FlatList 관련 BEGIN ==================================================================
  const [itemWidth, setItemWidth] = useState<number>(0)
  const [currentStep, setCurrentStep] = useState<number>(1)

  const PAGE_LIST = [
    {
      id: 1,
      page: currentStep,
    },
    {
      id: 2,
      page: currentStep,
    },
  ]
  const onPressGoback = () => {
    currentStep !== 1 && setCurrentStep(currentStep - 1)

    /* 첫번째 스텝인 경우, 이전 스크린으로 돌아갑니다. */
    if (currentStep === 1) {
      navigation.goBack()
    }
  }
  const onPressSaveNext = () => {
    switch (currentStep) {
      case 1:
        // API 호출
        break
      case 2:
        // API 호출
        break
    }

    if (currentStep < PAGE_LIST.length) {
      setCurrentStep(currentStep + 1)
    } else {
      /* 마지막 스텝인 경우, 이전 스크린으로 돌아갑니다. */
      navigation.goBack()
    }
  }
  // FlatList 관련 ENDED ==================================================================

  // 기본 요금
  const [price, setPrice] = useState("")

  // 크기별 추가 요금
  const [additionalPrice, setAdditionalPrice] = useState<AdditionalPrice>({
    small: "",
    medium: "",
    large: "",
  })

  // 이지역 평균가
  let standardPrice = {
    min: "",
    max: "",
  }
  if (serviceType === "creche") {
    standardPrice = {
      min: standardCosts.creche.min,
      max: standardCosts.creche.max,
    }
  } else {
    standardPrice = {
      min: standardCosts.visit.min,
      max: standardCosts.visit.max,
    }
  }

  return (
    <Screen>
      <StepHeader currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <FlatList
        snapToInterval={itemWidth}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: "200%" }}
        data={PAGE_LIST}
        scrollEnabled={false}
        onContentSizeChange={(w) => setItemWidth(w / 2)}
        numColumns={1}
        renderItem={({ item }) => (
          <>
            {item.page === 1 && (
              <CaregiverSetPrice
                style={{ width: itemWidth }}
                price={price}
                setPrice={setPrice}
                serviceType={serviceType}
                standardPrice={standardPrice}
              />
            )}
            {item.page === 2 && (
              <CaregiverSetAdditionalPrice
                style={{ width: itemWidth }}
                additionalPrice={additionalPrice}
                setAdditionalPrice={setAdditionalPrice}
              />
            )}
          </>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* 이전 | 저장 후 다음단계 */}
      <GoBackSaveNext
        onPressGoback={onPressGoback}
        onPressSaveNext={onPressSaveNext}
        isLastStep={currentStep === PAGE_LIST.length}
        style={{ position: "absolute", bottom: BOTTOM_HEIGHT, alignSelf: "center" }}
      />
    </Screen>
  )
})

/**
 * FlatList 상단에 표출되는
 * 현재 Step 을 보여주는 컴포넌트입니다.
 */
const StepHeader = ({ currentStep, setCurrentStep }) => {
  return (
    <View style={{ flexDirection: "row", height: 30 }}>
      <CgRegisterStep
        step={currentStep === 1 ? "progress" : "done"}
        number={1}
        title="기본 요금"
        onPress={() => {
          setCurrentStep(1)
        }}
        style={{ marginRight: 5 }}
      />
      <CgRegisterStep
        step={currentStep === 2 ? "progress" : "done"}
        number={2}
        title="크기별 추가 요금"
        onPress={() => {
          setCurrentStep(2)
        }}
        style={{ marginRight: 5 }}
      />
    </View>
  )
}
