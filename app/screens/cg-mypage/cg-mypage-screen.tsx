import React, { FC, useEffect } from "react"
import { View, Image, Pressable, StyleSheet } from "react-native"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  MypageButton,
  PreBol16,
  PreReg16,
  PreReg18,
  Row,
  ScreenRootView,
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

  useEffect(() => {
    setLoggedIn(true)
  }, [])

  // TODO: 로그인 화면 연결시키기
  // * 비로그인시, "로그인" 버튼 클릭시 실행되는 함수
  const handleLoginPress = () => {
    alert("로그인 화면으로 이동")
  }

  // * 환경설정 버튼 클릭시 실행되는 함수
  const handleRegisterCertificatation = () => {
    navigate("cg-certificate-registration-screen")
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
    <ScreenRootView>
      {/* //! 로그인 상태일 때 */}
      {loggedIn ? (
        <>
          {/* //* 유저 프로필 카드  */}
          <Row style={styles.profileCard}>
            <PreReg18>
              반가워요 유저님! {"\n"}
              간단하게 Care Giver 가 되어보세요!
            </PreReg18>
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
    </ScreenRootView>
  )
})

const styles = StyleSheet.create({
  divisionLine: {
    height: 2,
    marginHorizontal: -2 * BASIC_BACKGROUND_PADDING_WIDTH,
    backgroundColor: LIGHT_LINE,
  },

  profileCard: {
    paddingVertical: 20,
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
