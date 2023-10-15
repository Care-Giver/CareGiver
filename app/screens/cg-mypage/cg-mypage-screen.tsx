import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { View, Image, Pressable, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  BOTTOM_TAB_BAR_HEIGHT,
  Button,
  CaregiverNameStarReview,
  CaregiverTypeButton,
  CgServiceChoiceButton,
  ConditionalButton,
  MypageButton,
  PopReg18,
  PreBol16,
  PreBol18,
  PreReg14,
  PreReg16,
  PreReg18,
  Row,
  Screen,
} from "#components"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { NavigatorParamList, navigate } from "#navigators"
import {
  GIVER_CASUAL_NAVY,
  SUB_HEAD_LINE,
  LIGHT_LINE,
  BOTTOM_HEIGHT,
  LBG,
  palette,
  BOTTOM_TAB_NAVIGATOR,
} from "#theme"
import { images } from "#images"
import { useStores } from "#models"
import { useShowBottomTab } from "../../utils/hooks"
import { BottomSheetBackdrop, BottomSheetFooter, BottomSheetModal } from "@gorhom/bottom-sheet"
import { CgSetServiceType } from "../cg-set-address-temp/cg-set-service-type"
import { ServiceTypeKorean } from "../cg-set-address-temp/cg-set-address-temp-screen"
import {
  VistingPetsitter,
  createVisiting,
  getVisitingCareGiver,
} from "../../services/axios/visiting"
import { ratingRound } from "../../utils/format"

export const CgMypageScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-mypage-screen">
> = observer(function CgMypageScreen({ navigation, route }) {
  useShowBottomTab(navigation)

  const {
    userStore: { switchType, loggedIn, userDetail },
  } = useStores()
  const [careGiver, setCareGiver] = useState<{
    hasCareGiverProfile: boolean
    serviceType: ServiceTypeKorean
    // petsitter?: VistingPetsitter & CrechePetsitter // TODO:
    petsitter?: VistingPetsitter
  }>(null)

  useEffect(() => {
    const fetchCareGiver = async () => {
      const { isSuccess, visiting } = await getVisitingCareGiver()
      // const creche = await getCrecheCareGiver()
      const creche = false
      setCareGiver({
        hasCareGiverProfile: !!visiting || !!creche,
        serviceType: visiting ? "방문" : "위탁",
        petsitter: visiting || creche,
      })
    }
    fetchCareGiver()
  }, [])

  console.log("userDetail.id", userDetail.id)
  // * 자격증 등록
  const handleRegisterCertificatation = () => {
    alert("자격증 등록")
  }
  // * 환경설정 버튼 클릭시 실행되는 함수
  const handleSettingPress = () => {
    navigate("setting-screen")
  }

  // * 고객센터 버튼 클릭시 실행되는 함수
  const handleServiceCenterPress = () => {
    navigate("service-center-screen")
  }

  const handleMode = async () => {
    switchType()
  }

  // 펫시터 등록하기 버튼 클릭시 실행되는 함수
  // 1. 이전에 등록한 내역이 없을경우, cg-set-address-temp-screen 으로 이동
  // 2. 있을 경우, 가장 마지막에 수정한 screen 으로 이동
  // 3. 모든 등록과정을 마쳤을 경우, cg-edit-profile-screen 으로 이동
  const onPress = () => {
    // bottomSheetModalRef.current?.present()
  }

  // =======================================================
  // 서비스 타입
  const [serviceType, setServiceType] = useState<ServiceTypeKorean>(null)

  // 펫시터 등록하기 바텀시트모달 - ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // 펫시터 등록하기 바텀시트모달 - snapPoints
  const snapPoints = useMemo(() => ["40%"], [])

  /** 펫시터 등록하기 바텀시트모달 backdrop */
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0} // backdrop이 등장할 때의 snap point -> snap point가 0이면 backdrop 나타남
        disappearsOnIndex={-1} // backdrop이 사라질 때의 snap point -> snap point가 -1이면 backdrop 사라짐
        pressBehavior={"close"}
      />
    ),
    [],
  )

  /** 펫시터 등록하기 바텀시트모달 Footer - 확인 버튼 렌더링 */
  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={BOTTOM_HEIGHT} style={styles.btnContainer}>
        <ConditionalButton
          label={
            !serviceType ? "방문과 위탁 중에서 선택해주세요." : `${serviceType} 펫시터 시작하기`
          }
          isActivated
          onPress={() => {
            bottomSheetModalRef.current?.close()
            switch (serviceType) {
              case "방문":
                createVisiting({
                  userId: userDetail.id,
                  title: "",
                  desc: "",
                  address: "경기도 안산시 사동 한양대학로 55",
                  detailAddress: "",
                  maxUnit: 1,
                  handleType: [],
                  images: [],
                  services: [1],
                  amenities: [1],
                  defaultFee: 10000,
                  extraSizeFee: {
                    Small: 0,
                    Medium: 0,
                    Large: 0,
                  },
                  promoted: false,
                })
                break
              case "위탁":
                // createCreche({
                //   userId: userDetail.id,
                // })
                break
              default:
                break
            }

            // navigate("cg-set-address-temp-screen", { serviceType })
          }}
        />
      </BottomSheetFooter>
    ),
    [bottomSheetModalRef, serviceType, userDetail.id],
  )
  // =======================================================

  console.log("careGiver", careGiver)
  if (!careGiver) {
    return null
  }

  return (
    <Screen>
      <Button
        text="테스트"
        onPress={() => {
          // deleteVisiting(5)
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: BOTTOM_TAB_BAR_HEIGHT }}
      >
        {/* 임시 버튼 - cg-set-price-screen 스크린 이동용  */}
        <Pressable style={{ flexDirection: "row" }} onPress={() => navigate("cg-set-price-screen")}>
          <PreBol16 text="cg-set-price-screen ➡️" color={GIVER_CASUAL_NAVY} />
        </Pressable>

        {/* 임시 버튼 - cg-search-address-screen 스크린 이동용  */}
        <Pressable
          style={{ backgroundColor: "red" }}
          onPress={() => {
            navigate("cg-set-address-temp-screen")
          }}
        >
          <PreBol16 text="cg-set-address-temp-screen ➡️" color={GIVER_CASUAL_NAVY} />
        </Pressable>

        {careGiver.hasCareGiverProfile ? (
          // 1. 이전에 등록한 펫시터 프로필이 있는 경우
          <>
            <CaregiverNameStarReview
              style={{ marginTop: 20 }}
              caregiverData={{
                name: userDetail.nickname,
                ratings: ratingRound(careGiver.petsitter?.star),
              }}
              onPress={() => {
                alert("edit-mypage-screen 으로 이동")
                //TODO: 기본 프로필 정보 수정 화면으로 이동 - edit-mypage-screen
              }}
              text={"기본 정보 관리"}
            />

            {/* 케어기버 프로필 관리 */}
            <TouchableOpacity
              style={styles.manageCgProfile}
              onPress={() => {
                //TODO: 케어기버 프로필 관리 화면으로 이동 - cg-edit-profile-screen
              }}
            >
              <Row>
                <PreBol16 text="케어기버 프로필 관리" />
                <Image source={images.arrow_right} style={{ width: 16, height: 16 }} />
              </Row>

              <Row>
                <CaregiverTypeButton text={careGiver.serviceType} />
                <CaregiverTypeButton
                  text={"펫시터"}
                  textColor={GIVER_CASUAL_NAVY}
                  style={styles.petsitterBadge}
                />
                <PreReg14 text={careGiver.petsitter?.desc || ""} color={SUB_HEAD_LINE} ml={8} />
              </Row>
            </TouchableOpacity>
          </>
        ) : (
          // 2. "" 없는 경우
          <>
            {/* 유저 프로필 카드  */}
            <Row style={styles.profileCard}>
              <PreReg18 style={{ lineHeight: 30 }}>
                반가워요 <PreBol18>{userDetail.nickname}</PreBol18>님!
                {"\n"}
                간단하게 <PopReg18>Care Giver</PopReg18>가 되어보세요!
              </PreReg18>
            </Row>

            {/* 펫시터 등록하기 버튼 */}
            <TouchableOpacity
              style={{ marginTop: 16, marginBottom: 28 }}
              onPress={() => {
                bottomSheetModalRef.current?.present()
              }}
            >
              <Image source={images.register_petsitter} style={{ width: "100%", height: 95 }} />
            </TouchableOpacity>
          </>
        )}

        {/* (구) 펫시터|훈련사 등록하기 버튼 */}
        {/* <Row
              style={{
                marginTop: 28,
                paddingBottom: 18,
                width: "100%",
                // justifyContent: "space-between",
                justifyContent: "center",
                // backgroundColor: "red",
              }}
            >
              <CgServiceChoiceButton
                onPress={() => {
                  alert("펫시터 등록하기")
                }}
                title="펫시터 등록하기"
                subtitle={"산책, 간식 주기 등 펫을\n돌봐주는 서비스입니다."}
              />
              <CgServiceChoiceButton
                onPress={() => {
                  alert("훈련사 등록하기")
                }}
                title="훈련사 등록하기"
                subtitle={"손 주기, 기다려 등의 훈련\n을 시켜주는 서비스입니다."}
                style={{ marginLeft: "auto" }}
              />
            </Row> */}

        {/* //? divider */}
        <View style={styles.divisionLine} />
        {/* //* Care Giver 모드 전환 버튼 */}
        <Pressable style={styles.modeChangeBtn} onPress={handleMode}>
          <PreBol16 text="Client 모드로 전환" color={GIVER_CASUAL_NAVY} />

          <Image source={images.arrow_change} style={{ marginLeft: 2, width: 28, height: 28 }} />
        </Pressable>

        {/* //? divider */}
        <View style={styles.divisionLine} />
        {/* //* 결제 수단 및 쿠폰 버튼 */}
        <MypageButton text="자격증 등록" onPress={handleRegisterCertificatation} />

        {/* //? divider */}
        <View style={styles.divisionLine} />
        {/* //* 결제 수단 및 쿠폰 버튼 */}
        <MypageButton text="결제 수단 및 쿠폰" opacity={0.2} disabled={true} />

        {/* //? divider */}
        <View style={styles.divisionLine} />
        {/* //* 환경설정 버튼 */}
        <MypageButton text="환경설정" onPress={handleSettingPress} />

        {/* //? divider */}
        <View style={styles.divisionLine} />
        {/* //* 자주 묻는 질문 버튼 */}
        <MypageButton text="자주 묻는 질문" opacity={0.2} disabled={true} />

        {/* //? divider */}
        <View style={styles.divisionLine} />
        {/* //* 고객센터 버튼 */}
        <MypageButton text="고객 센터" onPress={handleServiceCenterPress} />

        {/* //? divider */}
        <View style={styles.divisionLine} />
      </ScrollView>

      {/* 펫시터 등록하기 바텀시트모달 - !항상 컴포넌트 최하단에 있을것! */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        footerComponent={renderFooter}
        style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}
      >
        <CgSetServiceType serviceType={serviceType} setServiceType={setServiceType} />
      </BottomSheetModal>
    </Screen>
  )
})

const styles = StyleSheet.create({
  divisionLine: {
    height: 2,
    marginHorizontal: -2 * BASIC_BACKGROUND_PADDING_WIDTH,
    backgroundColor: LIGHT_LINE,
  },

  profileCard: {
    marginTop: 28,
  },

  loginCard: {
    height: 112,

    justifyContent: "center",
    alignItems: "center",
  },

  profileImg: {
    width: 72,
    height: 72,

    borderColor: LIGHT_LINE,
    borderWidth: 2,
    borderRadius: 100,
  },

  profileNameCard: {
    marginLeft: 12,
  },

  petContainer: {
    paddingTop: 8,
    paddingBottom: 20,
  },

  petListContainer: {
    height: 129,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  modeChangeBtn: {
    height: 48,

    flexDirection: "row",
    alignItems: "center",
  },

  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
  },

  manageCgProfile: {
    width: "100%",
    height: 88,
    borderWidth: 2,
    borderColor: LIGHT_LINE,
    borderRadius: 8,
    justifyContent: "space-between",
    padding: 16,
    marginVertical: 20,
  },

  petsitterBadge: {
    marginLeft: 4,
    backgroundColor: palette.white,
    borderColor: GIVER_CASUAL_NAVY,
    borderWidth: 2,
    paddingVertical: 3 - 2,
    paddingHorizontal: 8 - 2,
  },
})
