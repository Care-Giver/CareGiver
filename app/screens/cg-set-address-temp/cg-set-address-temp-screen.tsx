import React, { FC, useState } from "react"
import { FlatList, Pressable, StyleSheet, View, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { CgRegisterStep, GoBackSaveNext, PreMed16, Screen } from "#components"
import { useStores } from "#models"
import { BOTTOM_HEIGHT, DISABLED } from "#theme"
import { HEADER_ROOT } from "../../components/screen-headers/common-styles"
import { images } from "#images"
import { CgSetServiceType } from "./cg-set-service-type"
import { CgSearchAddress } from "./cg-search-address"
import { OnCompleteParams } from "@actbase/react-daum-postcode/lib/types"
import { CgConfirmAddress } from "./cg-confirm-address"
import { alertModal } from "../../utils/alert-modal"

export type ServiceTypeKorean = "방문" | "위탁"

export const CgSetAddressTempScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-set-address-temp-screen">
> = observer(function CgSetAddressTempScreen({ navigation }) {
  // MST store 를 가져옵니다.
  const { userStore } = useStores()

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
    {
      id: 3,
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
        step1handler()
        //TODO: MST 저장 및 API 호출
        break
      case 2:
        step2handler()
        //TODO: MST 저장 및 API 호출
        break
      case 3:
        step3handler()
        //TODO: MST 저장 및 API 호출
        break
    }

    // if (currentStep < PAGE_LIST.length) {
    //   setCurrentStep(currentStep + 1)
    // } else {
    //   /* 마지막 스텝인 경우, 이전 스크린으로 돌아갑니다. */
    //   navigation.goBack()
    // }
  }
  // FlatList 관련 ENDED ==================================================================

  const step1handler = () => {
    if (!serviceType) {
      alertModal("서비스 종류를 선택해주세요.", "방문 또는 위탁 중 하나를 선택해주세요.")
      return
    }
    setCurrentStep(currentStep + 1)
  }

  const step2handler = () => {
    if (!address) {
      alertModal("주소를 입력후 선택해주세요.", "주소를 입력후 선택해주세요.")
      return
    }
    setCurrentStep(currentStep + 1)
  }

  const step3handler = () => {
    if (serviceType === "위탁" && !detailAddress) {
      alertModal("상세주소를 입력해주세요.", "상세주소를 입력해주세요.")
      return
    }
    /* 마지막 스텝이므로, 이전 스크린으로 돌아갑니다. */
    navigation.goBack()
  }

  const onPressSaveExit = () => {
    // TODO: 현재까지 내역 업데이트하는 API 호출

    /* 이전 스크린으로 돌아갑니다. */
    navigation.goBack()
  }

  // 서비스 타입
  const [serviceType, setServiceType] = useState<ServiceTypeKorean>(null)

  // 기본주소
  const [address, setAddress] = useState<OnCompleteParams>(null)
  // console.log("address 🔷", address)

  // 상세주소
  const [detailAddress, setDetailAddress] = useState<string>(null)

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
              <CgSetServiceType
                style={{ width: itemWidth }}
                serviceType={serviceType}
                setServiceType={setServiceType}
              />
            )}
            {item.page === 2 && (
              <CgSearchAddress
                style={{ width: itemWidth }}
                onSelected={(data: OnCompleteParams) => {
                  setAddress(data)
                  setCurrentStep(currentStep + 1)
                }}
              />
            )}
            {item.page === 3 && (
              <CgConfirmAddress
                style={{ width: itemWidth }}
                address={address}
                setDetailAddress={setDetailAddress}
                detailAddress={detailAddress}
                serviceType={serviceType}
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
        title="서비스 종류 선택"
        onPress={() => {
          setCurrentStep(1)
        }}
        style={{ marginRight: 5 }}
      />
      <CgRegisterStep
        step={currentStep === 2 ? "progress" : "done"}
        number={2}
        title="서비스 지역 선택"
        onPress={() => {
          setCurrentStep(2)
        }}
        style={{ marginRight: 5 }}
      />
      <CgRegisterStep
        step={currentStep === 3 ? "progress" : "done"}
        // step={"todo"}
        number={3}
        title="주소 확인"
        onPress={() => {
          setCurrentStep(3)
        }}
        style={{ marginRight: 5 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {},
  goBackButton: {
    width: 28,
    height: 28,
  },
})
