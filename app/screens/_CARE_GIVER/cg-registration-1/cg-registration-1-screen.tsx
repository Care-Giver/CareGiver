import React, { FC, useCallback, useMemo, useState } from "react"
import { FlatList, Pressable, StyleSheet, View, Image, StyleProp, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, goBack, navigate } from "#navigators"
import {
  CgRegisterState,
  CgRegisterStateProps,
  GoBackSaveNext,
  PickerImage,
  Screen,
  TextSaveNextString,
} from "#components"
import { useStores } from "#models"
import { BOTTOM_HEIGHT } from "#theme"
import { HEADER_ROOT } from "../../../components/_SCREEN_HEADER/common-styles"
import { images } from "#images"
import { CgSearchAddress } from "./cg-search-address"
import { OnCompleteParams } from "@actbase/react-daum-postcode/lib/types"
import { CgConfirmAddress } from "./cg-confirm-address"
import { alertModal } from "../../../utils/alert-modal"
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
import { CgSetService } from "./cg-set-service"
import { CgSetAmenity } from "./cg-set-amenity"
import { useKeyboardShown } from "../../../utils/hooks"

export const CgRegistration1Screen: FC<
  StackScreenProps<NavigatorParamList, "cg-registration-1-screen">
> = observer(function CgSetAddressTempScreen({ navigation, route }) {
  const isKeyboardShown = useKeyboardShown()

  // MST store 를 가져옵니다.
  const {
    petsitterStore: {
      petsitter,
      serviceTypeKorean,
      setVistingPetsitter,
      setCrechePetsitter,
      hasDraftPetsitterProfile,
      draftPetsitter,
      setDraftPetsitter,
      draftServiceTypeKorean,
      방문펫시터,
      위탁펫시터,
      regState,
    },
    etcStore: { service, amenity },
  } = useStores()
  const previousAddress = draftPetsitter?.address || petsitter?.address
  const allServices = 방문펫시터 ? service.visitingServices : service.crecheServices || []
  const defaultServices = allServices.slice(0, 3)
  const additionalServices = allServices.slice(3, allServices.length)
  const targetService = 방문펫시터 ? "serviceVisiting" : "serviceCreche"
  const targetAmenity = 방문펫시터 ? "visitingAmenities" : "crecheAmenities"
  const previousAdditionalServices = hasDraftPetsitterProfile
    ? draftPetsitter?.[targetService]
      ? draftPetsitter?.[targetService].filter(
          (item) => !defaultServices.map((dItem) => dItem.id).includes(item.id),
        )
      : []
    : petsitter?.[targetService]?.filter(
        (item) => !defaultServices.map((dItem) => dItem.id).includes(item.id),
      )
  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState<
    Array<VisitingService | CrecheService>
    // @ts-ignore
  >(previousAdditionalServices || [])
  const amenities = amenity[targetAmenity] || []
  const previousAmenities = hasDraftPetsitterProfile
    ? draftPetsitter[targetAmenity]
    : petsitter[targetAmenity]
  const [selectedAmenities, setSelectedAmenities] = useState<
    Array<VisitingAmenity | CrecheAmenity>
    // @ts-ignore
  >(previousAmenities || [])

  // const submitText = useMemo(() => `총 ${setselectedAdditionalServices.length}개 등록`, [selectedOptions.length])

  // 기본주소
  const [address, setAddress] = useState<OnCompleteParams>(null)
  // console.log("address 🔷", address)

  // 상세주소
  const [detailAddress, setDetailAddress] = useState<string>(null)

  // 이미 기존에 DB 에 저장했거나, draftPetsitter 객체에 임시 저장된 이미지
  const imageStringList = draftPetsitter?.images || petsitter?.images || []
  const previousImages = imageStringList.map((image) => ({
    uri: image,
    type: "image", // 임시값. 수정필요
    name: "image", // 임시값. 수정필요
  }))
  // 위탁 장소 사진
  const [selectedImages, setSelectedImages] = useState<PickerImage[]>(previousImages)

  // FlatList 관련 BEGIN ==================================================================
  const dataFlatList = Array.from({ length: 5 })
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
        // 아무것도 하지 않는다.
      },
    },
    {
      number: 2,
      state: regState.state2,
      title: "펫시터 서비스 설정",
      onPress: () => {
        navigate("cg-registration-2-screen")
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
      case 3: // 위탁 전용 스텝
        setSelectedImages(previousImages)
        setCurrentStep(currentStep - 1)
        break
      case 4:
        setCurrentStep(방문펫시터 ? currentStep - 2 : currentStep - 1)
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

  const textSaveNext: TextSaveNextString = useMemo(() => {
    const isLastStep = currentStep === dataFlatList.length
    if (isLastStep) {
      return hasDraftPetsitterProfile ? "저장 후 다음단계" : "수정하기"
    } else {
      return "저장 후 다음단계"
    }
  }, [hasDraftPetsitterProfile, currentStep, dataFlatList])
  // FlatList 관련 ENDED ==================================================================
  const step1 = () => {
    if (!address) {
      alertModal("주소를 입력후 선택해주세요.", "주소를 입력후 선택해주세요.")
      return
    }
    setCurrentStep(currentStep + 1)
  }

  const step2 = async () => {
    if (위탁펫시터 && !detailAddress) {
      alertModal("상세주소 입력", "상세주소를 입력해주세요.")
      return
    }

    // 방문이면, 서비스 설정 단계로 이동
    // 위탁인경우 다음단계(사진 업로드)로 이동
    setCurrentStep(방문펫시터 ? currentStep + 2 : currentStep + 1)
  }

  // 위탁인 경우에만 실행됨 - 위탁장소 사진 업로드
  const step3 = async () => {
    if (위탁펫시터 && selectedImages.length === 0) {
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
    let data = {}
    //! 마지막단계 - 방문 펫시팅 정보 UPDATE
    if (방문펫시터) {
      data = {
        address: _address,
        services: serviceIds,
        amenities: amenityIds,
      }

      if (hasDraftPetsitterProfile) {
        setDraftPetsitter(
          {
            ...draftPetsitter,
            address: _address,
            serviceVisiting: selectedAdditionalServices,
            visitingAmenities: selectedAmenities,
          },
          "visiting",
        )
        navigate("cg-registration-2-screen")
        return
      }

      updateVisiting(petsitter.id, data).then(({ isSuccess, visiting }) => {
        if (isSuccess) {
          // MST 업데이트
          setVistingPetsitter(visiting)
          /* 마지막 스텝이므로, 이전 스크린으로 돌아갑니다. */
          navigation.goBack()
        } else {
          alertModal(
            "방문 장소 업데이트 실패",
            "방문 장소 수정 실패했습니다. 잠시 후 다시 시도해주세요.",
          )
        }
      })
    }
    //! 마지막단계 - 위탁 펫시팅 정보 UPDATE
    else {
      const addedImages = selectedImages.filter((image) => !previousImages.includes(image)) // 로컬에서 추가한 이미지만 필터링
      const imageUriList = await uploadURIS(addedImages)
      data = {
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
      }

      if (hasDraftPetsitterProfile) {
        setDraftPetsitter(
          {
            ...draftPetsitter,
            address: _address,
            serviceCreche: selectedAdditionalServices,
            crecheAmenities: selectedAmenities,
          },
          "creche",
        )
        navigate("cg-registration-2-screen")
        return
      }

      updateCreche(petsitter.id, data).then(({ isSuccess, creche }) => {
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

  const handleOptionPressService = useCallback(
    (option) => {
      if (selectedAdditionalServices.map((item) => item.id).includes(option?.id)) return
      setSelectedAdditionalServices((prev) => [...prev, option])
    },
    [selectedAdditionalServices],
  )

  const handleXPressService = useCallback((option) => {
    setSelectedAdditionalServices((prev) => prev.filter((value) => value.id !== option.id))
  }, [])

  const handleOptionPressAmenity = useCallback(
    (option) => {
      if (selectedAmenities.map((item) => item.id).includes(option?.id)) return
      setSelectedAmenities((prev) => [...prev, option])
    },
    [selectedAmenities],
  )
  const handleXPressAmenity = useCallback((option) => {
    setSelectedAmenities((prev) => prev.filter((value) => value.id !== option.id))
  }, [])

  return (
    <Screen>
      <ScreenHeader
      // navigation={navigation}
      // onPressSaveExit={onPressSaveExit}
      // hasDraftPetsitterProfile={hasDraftPetsitterProfile}
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
              <CgSearchAddress
                style={{ width: itemWidth }}
                onSelected={(data: OnCompleteParams) => {
                  setAddress(data)
                  setCurrentStep(currentStep + 1)
                }}
                previousAddress={previousAddress}
              />
            )}
            {currentStep === 2 && (
              <CgConfirmAddress
                style={{ width: itemWidth }}
                address={address}
                setDetailAddress={setDetailAddress}
                detailAddress={detailAddress}
                serviceTypeKorean={serviceTypeKorean || draftServiceTypeKorean}
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

/**
 * 리액트 네비게이션 스크린 헤더 대신 사용하는 컴포넌트입니다.
 * 상단에 뒤로가기 이미지 버튼과 "저장 후 나가기" 버튼을 렌더링 합니다.
 */
export const ScreenHeader = (props) => {
  // const { route, onPressSaveExit, hasDraftPetsitterProfile }= props
  return (
    <View style={[HEADER_ROOT, { justifyContent: "space-between" }]}>
      {/* 뒤로가기 버튼 */}
      <Pressable
        onPress={() => {
          // TODO: 되돌아갈 스크린에서, route.params 가 필요하다면, 되돌아갈때 그 정보들도 같이 가져가야 함
          // TODO: 로직이 매우 복잡해지므로, 일단 주석처리 함.
          // if (route?.params?.from) {
          //   navigate(route.params.from)
          //   return
          // }

          goBack()
        }}
      >
        <Image style={styles.goBackButton} source={images.go_back} />
      </Pressable>

      {/* 저장 후 나가기 */}
      {/* //TODO: 저장 후 나가기는 어떤 UX 를 위한 UI 인가? */}
      {/* {hasDraftPetsitterProfile && (
        <TouchableOpacity onPress={onPressSaveExit}>
          <PreMed16 text="저장 후 나가기" color={DISABLED} />
        </TouchableOpacity>
      )} */}
    </View>
  )
}

interface StateHeaderProps {
  stateList: Omit<CgRegisterStateProps, "style">[]
  style: StyleProp<ViewStyle>
}
/**
 * FlatList 상단에 표출되는
 * 현재 state 을 보여주는 컴포넌트입니다.
 */
export const StateHeader = (props: StateHeaderProps) => {
  const { stateList, style } = props
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
