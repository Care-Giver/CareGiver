import React, { FC, useEffect, useState } from "react"
import { View, Image, Pressable, StyleSheet } from "react-native"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  CgServiceChoiceButton,
  MypageButton,
  PopReg18,
  PreBol16,
  PreBol18,
  PreReg16,
  PreReg18,
  Row,
  Screen,
  ServiceChoiceButton,
  ServiceType,
  ServiceTypeIndicatorHeader,
} from "#components"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { NavigatorParamList, navigate } from "#navigators"
import { GIVER_CASUAL_NAVY, SUB_HEAD_LINE, LIGHT_LINE } from "#theme"
import { images } from "#images"
import { useStores } from "#models"
import { useShowBottomTab } from "../../utils/hooks"

export const CgMypageScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-mypage-screen">
> = observer(function CgMypageScreen({ navigation, route }) {
  useShowBottomTab(navigation)

  const {
    userStore: { switchType, loggedIn, setLoggedIn },
  } = useStores()

  const [serviceType, setServiceType] = useState<ServiceType>("방문") //? 방뮨 or 위탁

  useEffect(() => {
    setLoggedIn(true)
  }, [])

  // * 비로그인시, "로그인" 버튼 클릭시 실행되는 함수
  const handleLoginPress = () => {
    navigate("login-screen")
  }

  // * 환경설정 버튼 클릭시 실행되는 함수
  const handleRegisterCertificatation = () => {
    navigate("cg-set-address-screen")
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

  return (
    <Screen>
      {/* 임시 버튼 - caregiver-set-price-screen 스크린 이동용  */}
      <Row style={styles.loginCard}>
        <Pressable
          style={{ flexDirection: "row" }}
          onPress={() => navigate("caregiver-set-price-screen")}
        >
          <PreBol16 text="caregiver-set-price-screen 으로 이동하기" color={GIVER_CASUAL_NAVY} />
        </Pressable>
      </Row>

      {/* //! 로그인 상태일 때 */}
      {loggedIn ? (
        <>
          {/* //* 유저 프로필 카드  */}
          <Row style={styles.profileCard}>
            <PreReg18 style={{ lineHeight: 30 }}>
              반가워요 <PreBol18>유저</PreBol18>님!
              {"\n"}
              간단하게 <PopReg18>Care Giver</PopReg18>가 되어보세요!
            </PreReg18>
          </Row>

          {/* 펫시터|훈련사 등록하기 버튼 */}
          <Row
            style={{
              marginTop: 28,
              paddingBottom: 18,
              width: "100%",
              justifyContent: "space-between",
              // backgroundColor: "red",
            }}
          >
            <CgServiceChoiceButton
              onPress={() => {
                navigate("cg-set-address-screen")
              }}
              title="펫시터 등록하기"
              subtitle={"산책, 간식 주기 등 펫을\n돌봐주는 서비스입니다."}
            />
            <CgServiceChoiceButton
              onPress={() => {
                navigate("cg-set-address-screen")
              }}
              title="훈련사 등록하기"
              subtitle={"손 주기, 기다려 등의 훈련\n을 시켜주는 서비스입니다."}
              style={{ marginLeft: "auto" }}
            />
          </Row>
        </>
      ) : (
        // ! 비로그인 상태일 때
        // * 로그인 이동 버튼 카드
        <Row style={styles.loginCard}>
          {/* //? "로그인 후 이용해주세요" 카드 */}
          <Pressable style={{ flexDirection: "row" }} onPress={handleLoginPress}>
            <PreBol16 text="로그인" color={GIVER_CASUAL_NAVY} />
            <PreReg16 text="후 이용해주세요." color={SUB_HEAD_LINE} style={{ marginLeft: 2 }} />
          </Pressable>
        </Row>
      )}

      {/* //? divider */}
      <View style={[styles.divisionLine]} />
      {/* //* Care Giver 모드 전환 버튼 */}
      <Pressable style={styles.modeChangeBtn} onPress={handleMode}>
        <PreBol16 text="Client 모드로 전환" color={GIVER_CASUAL_NAVY} />

        <Image source={images.arrow_change} style={{ marginLeft: 2, width: 28, height: 28 }} />
      </Pressable>

      {/* //? divider */}
      <View style={[styles.divisionLine]} />
      {/* //* 결제 수단 및 쿠폰 버튼 */}
      <MypageButton text="자격증 등록" onPress={handleRegisterCertificatation} />

      {/* //? divider */}
      <View style={[styles.divisionLine]} />
      {/* //* 결제 수단 및 쿠폰 버튼 */}
      <MypageButton text="결제 수단 및 쿠폰" opacity={0.2} disabled={true} />

      {/* //? divider */}
      <View style={[styles.divisionLine]} />
      {/* //* 환경설정 버튼 */}
      <MypageButton text="환경설정" onPress={handleSettingPress} />

      {/* //? divider */}
      <View style={[styles.divisionLine]} />
      {/* //* 자주 묻는 질문 버튼 */}
      <MypageButton text="자주 묻는 질문" opacity={0.2} disabled={true} />

      {/* //? divider */}
      <View style={[styles.divisionLine]} />
      {/* //* 고객센터 버튼 */}
      <MypageButton text="고객 센터" onPress={handleServiceCenterPress} />

      {/* //? divider */}
      <View style={[styles.divisionLine]} />
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
})
