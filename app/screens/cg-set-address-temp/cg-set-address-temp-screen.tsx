import React, { FC, useCallback, useMemo, useRef, useState } from "react"
import { FlatList, Pressable, StyleSheet, View, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import {
  CgRegisterStep,
  ConditionalButton,
  GoBackSaveNext,
  PickerImage,
  PreMed16,
  Screen,
} from "#components"
import { useStores } from "#models"
import { BOTTOM_HEIGHT, DISABLED } from "#theme"
import { HEADER_ROOT } from "../../components/screen-headers/common-styles"
import { images } from "#images"
import { CgSearchAddress } from "./cg-search-address"
import { OnCompleteParams } from "@actbase/react-daum-postcode/lib/types"
import { CgConfirmAddress } from "./cg-confirm-address"
import { alertModal } from "../../utils/alert-modal"
import { CgSelectCrechePhoto } from "./cg-select-creche-photo"
import { updateVisiting } from "../../services/axios/visiting"

const crecheImages = []

export const CgSetAddressTempScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-set-address-temp-screen">
> = observer(function CgSetAddressTempScreen({ navigation, route }) {
  // MST store 를 가져옵니다.
  const {
    userStore: { userDetail },
    petsitterStore: { petsitter, serviceTypeKorean },
  } = useStores()
  console.log("petsitter.id", petsitter.id)
  console.log("serviceTypeKorean", serviceTypeKorean)

  // FlatList 관련 BEGIN ==================================================================
  const [itemWidth, setItemWidth] = useState<number>(0)
  const [currentStep, setCurrentStep] = useState<number>(1)

  // 이전
  const onPressGoback = () => {
    currentStep !== 1 && setCurrentStep(currentStep - 1)

    /* 첫번째 스텝인 경우, 이전 스크린으로 돌아갑니다. */
    if (currentStep === 1) {
      navigation.goBack()
    }
  }

  // 저장 후 다음단계
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
  }
  // FlatList 관련 ENDED ==================================================================
  const step1handler = () => {
    if (!address) {
      alertModal("주소를 입력후 선택해주세요.", "주소를 입력후 선택해주세요.")
      return
    }
    setCurrentStep(currentStep + 1)
  }

  const step2handler = async () => {
    if (serviceTypeKorean === "위탁" && !detailAddress) {
      alertModal("상세주소를 입력", "상세주소를 입력해주세요.")
      return
    }
    /* 방문이면, 마지막 스텝 - update 후 돌아감 */
    if (serviceTypeKorean === "방문") {
      // navigation.goBack()
      const { isSuccess } = await updateVisiting(petsitter.id, {
        address: address?.address,
        detailAddress: "",
      })
      if (!isSuccess) {
        alertModal(
          "서비스 지역 저장 실패",
          "서비스 지역 저장에 실패했습니다. 잠시 후 다시 시도해주세요.",
        )
        return
      }
      navigate("cg-edit-profile-screen")
    }
    // 위탁인경우 다음단계(사진 업로드)로 이동
    else {
      setCurrentStep(currentStep + 1)
    }
  }

  // 위탁인 경우에만 실행됨 - 위탁장소 사진 업로드
  const step3handler = () => {
    if (serviceTypeKorean === "위탁" && selectedImages.length === 0) {
      alertModal("위탁 장소 사진", "사진을 추가해주세요.")
      return
    }
    /* 마지막 스텝이므로, 이전 스크린으로 돌아갑니다. */
    navigate("cg-edit-profile-screen")
  }

  // 상단 헤더 내 "저징 후 나가기"
  const onPressSaveExit = () => {
    // TODO: 현재까지 내역 업데이트하는 API 호출

    /* 이전 스크린으로 돌아갑니다. */
    navigation.goBack()
  }

  const PAGE_LIST = useMemo(() => {
    const stepList = [
      {
        step: 1,
        title: "서비스 지역 선택",
        onPress: () => {
          //
        },
      },
      {
        step: 2,
        title: "주소 확인",
        onPress: () => {
          //
        },
      },
      {
        step: 3,
        title: "위탁장소 사진 업로드",
        onPress: () => {
          //
        },
      },
    ]

    return serviceTypeKorean === "방문" ? stepList.filter((i) => i.step !== 3) : stepList
  }, [serviceTypeKorean])
  // console.log("PAGE_LIST", PAGE_LIST)

  // 기본주소
  const [address, setAddress] = useState<OnCompleteParams>(null)
  // console.log("address 🔷", address)

  // 상세주소
  const [detailAddress, setDetailAddress] = useState<string>(null)

  // 위탁 장소 사진
  const [selectedImages, setSelectedImages] = useState<PickerImage[]>(crecheImages || [])

  return (
    <Screen>
      <ScreenHeader navigation={navigation} onPressSaveExit={onPressSaveExit} />
      <StepHeader PAGE_LIST={PAGE_LIST} currentStep={currentStep} style={{ marginTop: 10 }} />
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
        keyExtractor={(item) => item.step.toString()}
        renderItem={({ item }) => (
          <>
            {currentStep === 1 && (
              <CgSearchAddress
                style={{ width: itemWidth }}
                onSelected={(data: OnCompleteParams) => {
                  setAddress(data)
                  setCurrentStep(currentStep + 1)
                }}
              />
            )}
            {currentStep === 2 && (
              <CgConfirmAddress
                style={{ width: itemWidth }}
                address={address}
                setDetailAddress={setDetailAddress}
                detailAddress={detailAddress}
                serviceType={serviceTypeKorean}
              />
            )}
            {currentStep === 3 && (
              <CgSelectCrechePhoto
                style={{ width: itemWidth }}
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
              />
            )}
          </>
        )}
      />

      {/* 이전 |  다음단계 */}
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
const StepHeader = ({ PAGE_LIST, currentStep, style }) => {
  return (
    <View style={[{ flexDirection: "row", height: 30 }, style]}>
      {PAGE_LIST.map((i) => (
        <CgRegisterStep
          key={i.step}
          step={currentStep === i.step ? "progress" : "done"}
          number={i.step}
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
