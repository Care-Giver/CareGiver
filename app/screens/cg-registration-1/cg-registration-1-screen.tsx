import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { FlatList, Pressable, StyleSheet, View, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  CgRegisterState,
  CgRegisterStateProps,
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
import {
  updateVisiting,
  updateCreche,
  uploadURIS,
  VisitingService,
  CrecheService,
  VisitingAmenity,
  CrecheAmenity,
} from "#axios"
import _ from "lodash"
import { CgSetService } from "./cg-set-service"
import { CgSetAmenity } from "./cg-set-amenity"

export const CgRegistration1Screen: FC<
  StackScreenProps<NavigatorParamList, "cg-registration-1-screen">
> = observer(function CgSetAddressTempScreen({ navigation, route }) {
  // MST store 를 가져옵니다.
  const {
    petsitterStore: { petsitter, serviceTypeKorean, setVistingPetsitter, setCrechePetsitter },
    etcStore: { service, amenity },
  } = useStores()

  const services =
    serviceTypeKorean === "방문" ? service.visitingServices : service.crecheServices || []
  const defaultServices = services.slice(0, 3)
  const additionalServices = services.slice(3, services.length)
  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState<
    Array<VisitingService | CrecheService>
  >([])
  // const submitText = useMemo(() => `총 ${setselectedAdditionalServices.length}개 등록`, [selectedOptions.length])
  const amenities =
    serviceTypeKorean === "방문" ? amenity.visitingAmenities : amenity.crecheAmenities || []
  const [selectedAmenities, setSelectedAmenities] = useState<
    Array<VisitingAmenity | CrecheAmenity>
  >([])

  // FlatList 관련 BEGIN ==================================================================
  const data = Array.from({ length: 5 })
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
      state: "progress",
      title: "펫시터 정보 설정",
      onPress: () => {
        //
      },
    },
    {
      number: 2,
      state: "todo",
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
      case 3: // 위탁 전용 스텝
        setSelectedImages(serverImages)
        setCurrentStep(currentStep - 1)
        break
      case 4:
        setCurrentStep(serviceTypeKorean === "방문" ? currentStep - 2 : currentStep - 1)
        break
      case 5:
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
      case 4:
        step4()
        break
      case 5:
        step5()
        break
    }
  }
  // FlatList 관련 ENDED ==================================================================

  const step1 = () => {
    if (!address) {
      alertModal("주소를 입력후 선택해주세요.", "주소를 입력후 선택해주세요.")
      return
    }
    setCurrentStep(currentStep + 1)
  }

  const step2 = async () => {
    if (serviceTypeKorean === "위탁" && !detailAddress) {
      alertModal("상세주소 입력", "상세주소를 입력해주세요.")
      return
    }

    // 방문이면, 서비스 설정 단계로 이동
    // 위탁인경우 다음단계(사진 업로드)로 이동
    setCurrentStep(serviceTypeKorean === "방문" ? currentStep + 2 : currentStep + 1)
  }

  // 위탁인 경우에만 실행됨 - 위탁장소 사진 업로드
  const step3 = async () => {
    if (serviceTypeKorean === "위탁" && selectedImages.length === 0) {
      alertModal("위탁 장소 사진", "사진을 추가해주세요.")
      return
    }

    setCurrentStep(currentStep + 1)
  }

  const step4 = async () => {
    setCurrentStep(currentStep + 1)
  }

  const step5 = async () => {
    const _address = address?.address?.trim()
    const serviceIds = [
      ...defaultServices.map((service) => service.id),
      ...selectedAdditionalServices.map((service) => service.id),
    ]
    const amenityIds = selectedAmenities.map((amenity) => amenity.id)

    if (serviceTypeKorean === "방문") {
      //! 마지막단계 - 방문 펫시팅 정보 UPDATE
      updateVisiting(petsitter.id, {
        address: _address,
        services: serviceIds,
        amenities: amenityIds,
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
      const addedImages = selectedImages.filter((image) => !serverImages.includes(image)) // 로컬에서 추가한 이미지만 필터링
      const imageUriList = await uploadURIS(addedImages)
      updateCreche(petsitter.id, {
        address: _address,
        detailAddress: detailAddress.trim(),
        images: [
          ...selectedImages
            .filter((image) => !addedImages.includes(image))
            .map((image) => image.uri), // 로컬에서 선택한 이미지를 제외한 (삭제유무가 포함된) 서버 이미지
          ...imageUriList, // 로컬에서 추가한 이미지를 URI 로 변환한 문자열 배열
        ],
        services: serviceIds,
        amenities: amenityIds,
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

  // 기본주소
  const [address, setAddress] = useState<OnCompleteParams>(null)
  // console.log("address 🔷", address)

  // 상세주소
  const [detailAddress, setDetailAddress] = useState<string>(null)

  // 이미 기존에 DB 에 저장한 이미지.
  const serverImages = petsitter?.images
    ? petsitter.images.map((image) => ({
        uri: image,
        type: "image", // 임시값. 수정필요
        name: "image", // 임시값. 수정필요
      }))
    : []
  // 위탁 장소 사진
  const [selectedImages, setSelectedImages] = useState<PickerImage[]>(serverImages)

  const handleOptionPressService = useCallback((option) => {
    setSelectedAdditionalServices((prev) => [...prev, option])
  }, [])

  const handleXPressService = useCallback((option) => {
    setSelectedAdditionalServices((prev) => prev.filter((value) => value !== option))
  }, [])

  const handleOptionPressAmenity = useCallback((option) => {
    setSelectedAmenities((prev) => [...prev, option])
  }, [])
  const handleXPressAmenity = useCallback((option) => {
    setSelectedAmenities((prev) => prev.filter((value) => value !== option))
  }, [])

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
            {currentStep === 4 && (
              <CgSetService
                style={{ width: itemWidth }}
                defaultServices={defaultServices}
                additionalServices={additionalServices}
                selectedOptions={selectedAdditionalServices}
                handleOptionPress={handleOptionPressService}
                handleXPress={handleXPressService}
              />
            )}
            {currentStep === 5 && (
              <CgSetAmenity
                style={{ width: itemWidth }}
                amenities={amenities}
                selectedAmenities={selectedAmenities}
                handleOptionPress={handleOptionPressAmenity}
                handleXPress={handleXPressAmenity}
              />
            )}
          </>
        )}
      />

      {/* 이전 |  다음단계 */}
      <GoBackSaveNext
        onPressGoback={onPressGoback}
        onPressSaveNext={onPressSaveNext}
        isLastStep={currentStep === data.length}
        style={{ position: "absolute", bottom: BOTTOM_HEIGHT, alignSelf: "center" }}
      />
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
