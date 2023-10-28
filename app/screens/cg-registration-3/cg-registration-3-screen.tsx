import React, { FC, useEffect, useState } from "react"
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
import { alertModal } from "../../utils/alert-modal"
import { updateVisiting, updateCreche, uploadURIS } from "#axios"
import _ from "lodash"
import { CgSetSelfIntro } from "./cg-set-self-intro"
import { CgSetCertificate } from "./cg-set-certificate"
import { useKeyboardShown } from "../../utils/hooks/use-keyboard-shown"

export const CgRegistration3Screen: FC<
  StackScreenProps<NavigatorParamList, "cg-registration-3-screen">
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

  const [title, setTitle] = useState("") // 제목
  const [desc, setDesc] = useState("") // 자기소개
  // 이미 기존에 DB 에 저장한 이미지.
  const serverImages = petsitter?.images // TODO: "자격증" 이미지로 바꿔야 한다
    ? petsitter.images.map((image) => ({
        uri: image,
        type: "image", // 임시값. 수정필요
        name: "image", // 임시값. 수정필요
      }))
    : []

  console.log("petsitter?.images", petsitter?.images)
  const [selectedImages, setSelectedImages] = useState<PickerImage[]>(serverImages) // 펫시터 이미지

  // FlatList 관련 BEGIN ==================================================================
  const data = Array.from({ length: 2 })
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
      state: "done",
      title: "펫시터 서비스 설정",
      onPress: () => {
        //
      },
    },
    {
      number: 3,
      state: "progress",
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
      case 2: // 마지막 스텝
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
    }
  }
  // FlatList 관련 ENDED ==================================================================

  // 자기소개
  const step1 = () => {
    if (!title) {
      alertModal("제목", "제목을 입력해주세요.")
      return
    }

    if (!desc) {
      alertModal("자기소개", "자기소개를 입력해주세요.")
      return
    }

    setCurrentStep(currentStep + 1)
  }

  // 자격증 설정 && 마지막 단계
  const step2 = async () => {
    const apiCaller = serviceTypeKorean === "방문" ? updateVisiting : updateCreche
    const mstSetter = serviceTypeKorean === "방문" ? setVistingPetsitter : setCrechePetsitter

    //! 마지막단계 - 펫시팅 정보 UPDATE
    const addedImages = selectedImages.filter((image) => !serverImages.includes(image)) // 로컬에서 추가한 이미지만 필터링
    const imageUriList = await uploadURIS(addedImages)
    apiCaller(petsitter.id, {
      title,
      desc,
      images: [
        ...selectedImages.filter((image) => !addedImages.includes(image)).map((image) => image.uri), // 로컬에서 선택한 이미지를 제외한 (삭제유무가 포함된) 서버 이미지
        ...imageUriList, // 로컬에서 추가한 이미지를 URI 로 변환한 문자열 배열
      ],
      //! 🏗️디버깅중 - 이상하게 services 랑 amenities 도 넣어줘야 PUT 성공함 (@yeseong33) 님이 발견해 줌.
      services: petsitter.serviceVisiting.map((item) => item.id),
      amenities: petsitter.visitingAmenities.map((item) => item.id),
    }).then(({ isSuccess, visiting, creche }) => {
      if (isSuccess) {
        const updatedData = serviceTypeKorean === "방문" ? visiting : creche
        mstSetter(updatedData)

        /* 마지막 스텝이므로, 이전 스크린으로 돌아갑니다. */
        navigation.replace("cg-edit-profile-screen")
      } else {
        alertModal(
          `${serviceTypeKorean} 서비스 업데이트 실패`,
          `${serviceTypeKorean} 서비스 수정에 실패했습니다. 잠시 후 다시 시도해주세요.`,
        )
      }
    })
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
              <CgSetSelfIntro
                style={{ width: itemWidth }}
                title={title}
                setTitle={setTitle}
                desc={desc}
                setDesc={setDesc}
              />
            )}
            {currentStep === 2 && (
              <CgSetCertificate
                style={{ width: itemWidth }}
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
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
