import React, { FC, useState } from "react"
import { FlatList, Pressable, View, Image, StyleSheet } from "react-native"
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
  PreMed16,
} from "#components"
import { BOTTOM_HEIGHT, DISABLED } from "#theme"
import { HEADER_ROOT } from "../../components/screen-headers/common-styles"
import { images } from "#images"

// 서버로 부터 받아온 지역 평균가 더미데이터
// TODO: 서버에서 받아온 지역 평균가를 사용하도록 수정해야 합니다.
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

  const onPressSaveExit = () => {
    // TODO: 현재까지 내역 업데이트하는 API 호출

    /* 이전 스크린으로 돌아갑니다. */
    navigation.goBack()
  }

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
      <ScreenHeader navigation={navigation} onPressSaveExit={onPressSaveExit} />
      <StepHeader
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        style={{ marginTop: 10 }}
      />
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
 * 리액트 네비게이션 스크린 헤더 대신 사용하는 컴포넌트입니다.
 * 상단에 뒤로가기 버튼과 "저장 후 나가기" 버튼을 렌더링 합니다.
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
 * 현재 Step 을 보여주는 컴포넌트입니다.
 */
const StepHeader = ({ currentStep, setCurrentStep, style }) => {
  return (
    <View style={[{ flexDirection: "row", height: 30 }, style]}>
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

const styles = StyleSheet.create({
  goBackButton: {
    width: 28,
    height: 28,
  },
})
