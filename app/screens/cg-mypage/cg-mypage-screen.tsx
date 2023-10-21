import React, { FC, useCallback, useMemo, useRef, useState } from "react"
import { View, Image, Pressable, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  BOTTOM_TAB_BAR_HEIGHT,
  CaregiverNameStarReview,
  CaregiverTypeButton,
  ConditionalButton,
  DivisionLine,
  MypageButton,
  PopReg18,
  PreBol16,
  PreBol18,
  PreReg14,
  PreReg18,
  Row,
  Screen,
} from "#components"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { NavigatorParamList, navigate } from "#navigators"
import { GIVER_CASUAL_NAVY, SUB_HEAD_LINE, LIGHT_LINE, BOTTOM_HEIGHT, palette } from "#theme"
import { images } from "#images"
import { ServiceTypeKorean, useStores } from "#models"
import { useShowBottomTab } from "../../utils/hooks"
import { BottomSheetBackdrop, BottomSheetFooter, BottomSheetModal } from "@gorhom/bottom-sheet"
import { CgSetServiceType } from "./cg-set-service-type"
import { createVisiting } from "../../services/axios/visiting"
import { ratingRound } from "../../utils/format"
import { createCreche } from "#axios"
import { alertModal } from "../../utils/alert-modal"

export const CgMypageScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-mypage-screen">
> = observer(function CgMypageScreen({ navigation, route }) {
  useShowBottomTab(navigation)

  const {
    userStore: { switchType, userDetail },
    petsitterStore: { serviceTypeKorean, hasPetsitterProfile, petsitter, fetchPetsitter },
  } = useStores()
  console.log("userDetail.id", userDetail.id)
  console.log("CgMypageScreen", petsitter)

  // * 환경설정 버튼 클릭시 실행되는 함수
  const handleSettingPress = () => {
    navigate("setting-screen")
  }

  // * 고객 센터 버튼 클릭시 실행되는 함수
  const handleServiceCenterPress = () => {
    navigate("service-center-screen")
  }

  // * "Client 모드로 전환" 버튼 클릭시 실행되는 함수
  const handleMode = async () => {
    switchType()
  }

  // 펫시터 등록하기 버튼 클릭시 실행되는 함수
  // 1. 이전에 등록한 내역이 없을경우, cg-set-address-screen 으로 이동
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
                  // detailAddress: "",
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
                }).then((res) => {
                  if (res.isSuccess) {
                    fetchPetsitter().then((result) => {
                      result === true && navigate("cg-registration-1-screen")
                    })
                  } else {
                    alertModal(
                      "등록 실패",
                      "방문 펫시터 등록에 실패했습니다. 잠시 후 다시 시도해주세요.",
                    )
                  }
                })
                break

              case "위탁":
                createCreche({
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
                }).then((res) => {
                  if (res.isSuccess) {
                    fetchPetsitter().then((result) => {
                      result === true && navigate("cg-registration-1-screen")
                    })
                  } else {
                    alertModal(
                      "등록 실패",
                      "위탁 펫시터 등록에 실패했습니다. 잠시 후 다시 시도해주세요.",
                    )
                  }
                })
                break

              default:
                break
            }
          }}
        />
      </BottomSheetFooter>
    ),
    [bottomSheetModalRef, serviceType, userDetail.id, fetchPetsitter],
  )
  // =======================================================

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: BOTTOM_TAB_BAR_HEIGHT }}
      >
        {/* 임시 버튼 - cg-set-price-screen 스크린 이동용  */}
        {/* <Pressable style={{ flexDirection: "row" }} onPress={() => navigate("cg-set-price-screen")}>
          <PreBol16 text="cg-set-price-screen ➡️" color={GIVER_CASUAL_NAVY} />
        </Pressable> */}

        {hasPetsitterProfile ? (
          // 1. 이전에 등록한 펫시터 프로필이 있는 경우
          <View style={styles.sidePadding}>
            <CaregiverNameStarReview
              style={{ marginTop: 20 }}
              caregiverData={{
                name: userDetail.nickname,
                ratings: ratingRound(petsitter?.star),
              }}
              onPress={() => {
                navigate("edit-mypage-screen")
              }}
              text={"기본 정보 관리"}
            />

            {/* 케어기버 프로필 관리 */}
            <TouchableOpacity
              style={styles.manageCgProfile}
              onPress={() => {
                navigate("cg-edit-profile-screen")
              }}
            >
              <Row>
                <PreBol16 text="케어기버 프로필 관리" />
                <Image source={images.arrow_right} style={{ width: 16, height: 16 }} />
              </Row>

              <Row>
                <CaregiverTypeButton text={serviceTypeKorean} />
                <CaregiverTypeButton
                  text={"펫시터"}
                  textColor={GIVER_CASUAL_NAVY}
                  style={styles.petsitterBadge}
                />
                <PreReg14 text={petsitter?.desc || ""} color={SUB_HEAD_LINE} ml={8} />
              </Row>
            </TouchableOpacity>
          </View>
        ) : (
          // 2. "" 없는 경우
          <View style={styles.sidePadding}>
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
          </View>
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

        <DivisionLine color={LIGHT_LINE} />
        {/* //* Care Giver 모드 전환 버튼 */}
        <Pressable style={[styles.modeChangeBtn, styles.sidePadding]} onPress={handleMode}>
          <PreBol16 text="Client 모드로 전환" color={GIVER_CASUAL_NAVY} />

          <Image source={images.arrow_change} style={{ marginLeft: 2, width: 28, height: 28 }} />
        </Pressable>

        <DivisionLine color={LIGHT_LINE} />
        {/* //* 고객 센터 버튼 */}
        <MypageButton
          text="고객 센터"
          onPress={handleServiceCenterPress}
          style={styles.sidePadding}
        />

        <DivisionLine color={LIGHT_LINE} />
        {/* //* 결제 수단 및 쿠폰 버튼 */}
        <MypageButton
          text="결제 수단 및 쿠폰"
          opacity={0.2}
          disabled={true}
          style={styles.sidePadding}
        />

        <DivisionLine color={LIGHT_LINE} />
        {/* //* 환경설정 버튼 */}
        <MypageButton text="환경설정" onPress={handleSettingPress} style={styles.sidePadding} />

        <DivisionLine color={LIGHT_LINE} />
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
  sidePadding: {
    paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
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
