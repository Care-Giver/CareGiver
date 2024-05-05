import { View, Text, Modal, Image, Pressable, Platform, Alert, Linking } from "react-native"
import React, { FC, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, goBack } from "#navigators"
import { observer } from "mobx-react-lite"
import { MypageButton, PreMed16, PreReg14, Screen, CustomModal } from "#components"
import { HEAD_LINE, BODY, HEIGHT } from "#theme"
import { styles } from "./styles"
import TEST_BUILD_VERSION from "./test-build-version"
import { images } from "#images"
import { useStores } from "#models"
import { request, PERMISSIONS, check, RESULTS } from "react-native-permissions"
import { alertModal } from "../../../utils/alert-modal"

export const SettingScreen: FC<StackScreenProps<NavigatorParamList, "setting-screen">> = observer(
  ({ navigation, route }) => {
    const {
      userStore: { logoutHandler },
      petsitterStore: { reset: resetPetsitterStore },
    } = useStores()

    // ? 로그아웃 | 회원탈퇴 모달창 visible
    const [logoutModalVisible, setLogoutModalVisible] = useState(false)
    const [withdrawModalVisible, setWithdrawModalVisible] = useState(false)

    // ? 로그아웃 메뉴 클릭시 동작하는 함수 - 모달창 띄우기
    const handleLogoutMenuPress = () => {
      setLogoutModalVisible(true)
    }

    // ? 모달창 - 로그아웃 버튼 클릭시 동작하는 함수
    const handleLogoutPress = () => {
      setLogoutModalVisible(false)
      resetPetsitterStore()
      logoutHandler()
    }

    // ? 회원탈퇴 메뉴 클릭시 동작하는 함수 - 모달창 띄우기
    const handleWithdrawMenuPress = () => {
      setWithdrawModalVisible(true)
    }

    // ? 모달창 - 회원 탈퇴 버튼 클릭시 동작하는 함수
    const handleWithdrawPress = () => {
      Alert.alert(
        "회원 탈퇴",
        "케어기버 공식 이메일 dev@caregiver.pet 으로 탈퇴 문의를 주시면, 회원 정보 삭제를 위해 7 영업일 내에 이메일로 연락 드리겠습니다.",
        [
          {
            text: "닫기",
          },
          {
            text: "문의하기",
            //@ts-ignore
            onPress: () => {
              Linking.openURL("mailto: dev@caregiver.pet")
              setWithdrawModalVisible(false)
            },
          },
        ],
        { cancelable: true },
      )
      // TODO
      //~ 1. unlink kakaotalk && logut
      //~ 2. 회원탈퇴를 위한 1:1 Q&A 연결
    }

    return (
      <Screen>
        {/* //* 버전 정보 */}
        <View style={styles.versionBox}>
          <PreMed16 text="버전 정보" color={HEAD_LINE} />
          <PreReg14 text={TEST_BUILD_VERSION} color={BODY} style={{ marginTop: 8 }} />
        </View>
        {/* //? division line */}
        <View style={styles.divisionLine} />

        {/* //* 위치권한 */}
        <MypageButton
          text="위치 권한 요청"
          onPress={() => {
            // 위치권한 확인
            check(
              Platform.select({
                ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
                android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
              }),
            ).then((result) => {
              console.log("❗️", result)
              // 없다면 요청
              if (result !== RESULTS.GRANTED) {
                request(
                  Platform.select({
                    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
                    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                  }),
                ).then((result) => {
                  console.log("❗️❗️", result)
                  if (result === RESULTS.UNAVAILABLE && Platform.OS === "ios") {
                    alertModal("권한 요청", "iOS > 설정 > 앱 에서 위치 권한을 허용해주세요.")
                  }
                })
              }
              // 이미 있으면 모달
              else {
                alertModal("권한 확인", "이미 위치 권한을 승인 받았습니다.")
              }
            })
          }}
        />
        {/* //? division line */}
        <View style={styles.divisionLine} />

        {/* //* 로그아웃 */}
        <MypageButton text="로그아웃" onPress={handleLogoutMenuPress} />
        {/* //? division line */}
        <View style={styles.divisionLine} />

        {/* //* 회원 탈퇴 */}
        <MypageButton text="회원 탈퇴" onPress={handleWithdrawMenuPress} />
        {/* //? division line */}
        <View style={styles.divisionLine} />

        {/* //! 모달 창 - 로그아웃, 회원탈퇴 */}
        {/* //* 로그아웃 모달 창 */}
        <CustomModal
          visibleState={logoutModalVisible}
          title="로그아웃 하시겠어요?"
          yesBtnText="로그아웃 하기"
          noBtnText="취소"
          handleYesPress={handleLogoutPress}
          handleNoPress={() => setLogoutModalVisible(false)}
          image={images.dog_illustration}
          imageWidth={151}
          imageHeight={156}
        />

        {/* //* 회원 탈퇴 모달 창 */}
        <CustomModal
          visibleState={withdrawModalVisible}
          title="정말 탈퇴 하시겠어요?"
          subtitle="탈퇴하면 지금까지 등록된 모든 정보가 사라집니다."
          yesBtnText="탈퇴할래요"
          noBtnText="다시 생각해볼게요"
          handleYesPress={handleWithdrawPress}
          handleNoPress={() => setWithdrawModalVisible(false)}
          image={images.dog_illustration}
          imageWidth={151}
          imageHeight={156}
        />
      </Screen>
    )
  },
)
