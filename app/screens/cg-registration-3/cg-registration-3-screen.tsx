import React, { FC, useMemo, useState } from "react"
import { FlatList } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import { CgRegisterStateProps, GoBackSaveNext, Screen, TextSaveNextString } from "#components"
import { useStores } from "#models"
import { BOTTOM_HEIGHT } from "#theme"
import { alertModal } from "../../utils/alert-modal"
import { updateVisiting, updateCreche, createVisiting, createCreche } from "#axios"
import _ from "lodash"
import { CgSetSelfIntro } from "./cg-set-self-intro"
// import { CgSetCertificate } from "./cg-set-certificate"
import { useKeyboardShown } from "../../utils/hooks/use-keyboard-shown"
import { ScreenHeader, StateHeader } from "../cg-registration-1/cg-registration-1-screen"
import { delay } from "../../utils/delay"

export const CgRegistration3Screen: FC<
  StackScreenProps<NavigatorParamList, "cg-registration-3-screen">
> = observer(function CgSetAddressTempScreen({ navigation, route }) {
  // MST store 를 가져옵니다.
  const {
    userStore: { userDetail },
    petsitterStore: {
      petsitter,
      serviceTypeKorean,
      setVistingPetsitter,
      setCrechePetsitter,
      hasDraftPetsitterProfile,
      draftPetsitter,
      draftServiceTypeKorean,
      setDraftPetsitter,
      방문펫시터,
      fetchPetsitter,
      regState,
      resetDraftPetsitter,
    },
  } = useStores()
  console.log("petsitter 🔷", petsitter)

  const isKeyboardShown = useKeyboardShown()

  const [title, setTitle] = useState(draftPetsitter?.title || petsitter?.title || "") // 제목
  const [desc, setDesc] = useState(draftPetsitter?.desc || petsitter?.desc || "") // 자기소개
  // TODO: MVP 에서는 자격증을 등록하는 기능이 없다. 따라서, 아래 코드는 주석처리한다.
  // // 이미 기존에 DB 에 저장한 이미지.
  // const serverImages = petsitter?.images // TODO: "자격증" 이미지로 바꿔야 한다
  //   ? petsitter.images.map((image) => ({
  //       uri: image,
  //       type: "image", // 임시값. 수정필요
  //       name: "image", // 임시값. 수정필요
  //     }))
  //   : []

  // console.log("petsitter?.images", petsitter?.images)
  // const [selectedImages, setSelectedImages] = useState<PickerImage[]>(serverImages) // 펫시터 이미지

  // FlatList 관련 BEGIN ==================================================================
  const dataFlatList = Array.from({ length: 1 })
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
      state: regState.state2,
      title: "펫시터 서비스 설정",
      onPress: () => {
        navigate("cg-registration-2-screen")
      },
    },
    {
      number: 3,
      state: "progress",
      title: "가격 및 특이사항 설정",
      onPress: () => {
        // 아무것도 하지 않는다.
      },
    },
  ]

  // 이전
  const onPressGoback = () => {
    switch (currentStep) {
      case 1: // 첫번째 스텝인 경우, 이전 스크린으로 돌아갑니다.
        navigation.goBack()
        break
      // case 2: // 마지막 스텝
      //   setCurrentStep(currentStep - 1)
      //   break
    }
  }

  // 저장 후 다음단계
  const onPressSaveNext = () => {
    switch (currentStep) {
      case 1:
        step1()
        break
      // case 2:
      //   step2()
      //   break
    }
  }

  const textSaveNext: TextSaveNextString = useMemo(() => {
    const isLastStep = currentStep === dataFlatList.length
    if (isLastStep) {
      return hasDraftPetsitterProfile ? "이대로 등록하기" : "수정하기"
    } else {
      return "저장 후 다음단계"
    }
  }, [hasDraftPetsitterProfile, currentStep, dataFlatList])
  // FlatList 관련 ENDED ==================================================================

  // 자기소개
  const step1 = async () => {
    if (!title) {
      alertModal("제목", "제목을 입력해주세요.")
      return
    }

    if (!desc) {
      alertModal("자기소개", "자기소개를 입력해주세요.")
      return
    }

    const data = {
      title,
      desc,
    }

    if (hasDraftPetsitterProfile) {
      if (_.includes(regState, "todo", undefined)) {
        alertModal("등록 거절", "모든  단계를 작성해주세요.")
        return
      }

      const creator = 방문펫시터 ? createVisiting : createCreche

      // @ts-ignore
      creator({ ...draftPetsitter, ...data, timeWithPet: 0, userId: userDetail.id }).then(
        ({ isSuccess }) => {
          if (isSuccess) {
            // TODO: fetchPetsitter() 대신, 수정된 API 의 리턴값 - "생성된 펫시터 객체" 을 사용하여 setServiceType, setCrechePetsitter 에 할당한다.
            fetchPetsitter().then((result) => {
              if (result === true) {
                // navigate("cg-registration-1-screen")
                navigation.replace("cg-mypage-screen")
                resetDraftPetsitter() // draftPetsitter 초기화
              } else {
                alertModal("등록 실패", "fetchPetsitter 실패")
              }
            })
          } else {
            alertModal(
              "등록 실패",
              `${draftServiceTypeKorean} 펫시터 등록에 실패했습니다. 잠시 후 다시 시도해주세요.`,
            )
          }
        },
      )
      return
    }

    const updater = 방문펫시터 ? updateVisiting : updateCreche
    const mstSetter = 방문펫시터 ? setVistingPetsitter : setCrechePetsitter
    //! 마지막단계 - 펫시팅 정보 UPDATE
    updater(petsitter.id, data).then(({ isSuccess, visiting, creche }) => {
      if (isSuccess) {
        const updatedData = 방문펫시터 ? visiting : creche
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

  //TODO: MVP 에서는 자격증을 등록하는 기능이 없다. 따라서, 아래 코드는 주석처리한다.
  // // 자격증 설정 && 마지막 단계
  // const step2 = async () => {
  //   const apiCaller = 방문펫시터 ? updateVisiting : updateCreche
  //   const mstSetter = 방문펫시터 ? setVistingPetsitter : setCrechePetsitter

  //   //! 마지막단계 - 펫시팅 정보 UPDATE
  //   const addedImages = selectedImages.filter((image) => !serverImages.includes(image)) // 로컬에서 추가한 이미지만 필터링
  //   const imageUriList = await uploadURIS(addedImages)
  //   apiCaller(petsitter.id, {
  //     title,
  //     desc,
  //     images: [
  //       ...selectedImages.filter((image) => !addedImages.includes(image)).map((image) => image.uri), // 로컬에서 선택한 이미지를 제외한 (삭제유무가 포함된) 서버 이미지
  //       ...imageUriList, // 로컬에서 추가한 이미지를 URI 로 변환한 문자열 배열
  //     ],
  //   }).then(({ isSuccess, visiting, creche }) => {
  //     if (isSuccess) {
  //       const updatedData = 방문펫시터 ? visiting : creche
  //       mstSetter(updatedData)

  //       /* 마지막 스텝이므로, 이전 스크린으로 돌아갑니다. */
  //       navigation.replace("cg-edit-profile-screen")
  //     } else {
  //       alertModal(
  //         `${serviceTypeKorean} 서비스 업데이트 실패`,
  //         `${serviceTypeKorean} 서비스 수정에 실패했습니다. 잠시 후 다시 시도해주세요.`,
  //       )
  //     }
  //   })
  // }

  return (
    <Screen>
      <ScreenHeader
        navigation={navigation}
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
              <CgSetSelfIntro
                style={{ width: itemWidth }}
                title={title}
                setTitle={setTitle}
                desc={desc}
                setDesc={setDesc}
              />
            )}
            {/* {currentStep === 2 && (
              <CgSetCertificate
                style={{ width: itemWidth }}
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
              />
            )} */}
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
