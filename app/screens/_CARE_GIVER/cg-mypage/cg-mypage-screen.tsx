import React, { FC, useCallback, useMemo, useRef, useState } from "react"
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native"
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
import { useShowBottomTab } from "../../../utils/hooks"
import { BottomSheetBackdrop, BottomSheetFooter, BottomSheetModal } from "@gorhom/bottom-sheet"
import { CgSetServiceType } from "./cg-set-service-type"
import { ratingRound } from "../../../utils/format"
import _ from "lodash"
import { subscribeNotification } from "../../../services/api/notification"

export const CgMypageScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-mypage-screen">
> = observer(function CgMypageScreen({ navigation, route }) {
  useShowBottomTab(navigation)

  const {
    userStore: { switchType, userDetail },
    petsitterStore: { serviceTypeKorean, petsitter, isFirstPetsitter, setDraftPetsitter },
    notificationStore: { addNotification },
  } = useStores()

  // 환경설정 버튼 클릭시 실행되는 함수
  const handleSettingPress = () => {
    navigate("setting-screen")
  }

  // 고객 센터 버튼 클릭시 실행되는 함수
  const handleServiceCenterPress = () => {
    navigate("service-center-screen")
  }

  // "보호자 모드로 전환" 버튼 클릭시 실행되는 함수
  const handleMode = async () => {
    switchType()
  }

  // 처음 펫시터를 등록하는 경우 보여지는 BottomSheetModal BEGIN =======================================================
  // 서비스 타입
  const [serviceType, setServiceType] = useState<ServiceTypeKorean>("방문")

  // 펫시터 등록하기 바텀시트모달 - ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // 펫시터 등록하기 바텀시트모달 - snapPoints
  const snapPoints = useMemo(() => ["40%"], [])

  /** 펫시터 등록하기 바텀시트모달 backdrop */
  // const renderBackdrop = useCallback(
  //   (props) => (
  //     <BottomSheetBackdrop
  //       {...props}
  //       appearsOnIndex={0} // backdrop이 등장할 때의 snap point -> snap point가 0이면 backdrop 나타남
  //       disappearsOnIndex={-1} // backdrop이 사라질 때의 snap point -> snap point가 -1이면 backdrop 사라짐
  //       pressBehavior={"close"}
  //     />
  //   ),
  //   [],
  // )

  /** 펫시터 등록하기 바텀시트모달 Footer - 확인 버튼 렌더링 */
  // const renderFooter = useCallback(
  //   (props) => (
  //     <BottomSheetFooter {...props} bottomInset={BOTTOM_HEIGHT} style={styles.btnContainer}>
  //       <ConditionalButton
  //         label={
  //           !serviceType ? "방문과 위탁 중에서 선택해주세요." : `${serviceType} 펫시터 시작하기`
  //         }
  //         isActivated={!!serviceType}
  //         onPress={() => {
  //           bottomSheetModalRef.current?.close()
  //           setDraftPetsitter({}, serviceType === "방문" ? "visiting" : "creche")
  //           navigate("cg-registration-1-screen")
  //         }}
  //       />
  //     </BottomSheetFooter>
  //   ),
  //   [bottomSheetModalRef, serviceType, setDraftPetsitter],
  // )
  // 처음 펫시터를 등록하는 경우 보여지는 BottomSheetModal ENDED =======================================================

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: BOTTOM_TAB_BAR_HEIGHT }}
      >
        {!isFirstPetsitter ? (
          // 펫시터 프로필이 있는 경우
          <View style={styles.sidePadding}>
            <CaregiverNameStarReview
              style={{ marginTop: 20 }}
              profileImage={userDetail?.profileImage}
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
                <CaregiverTypeButton text={serviceTypeKorean || "작성중.."} />
                <CaregiverTypeButton
                  text={"펫시터"}
                  textColor={GIVER_CASUAL_NAVY}
                  style={styles.petsitterBadge}
                />
                <PreReg14
                  text={_.truncate(petsitter?.title || "", { length: 18 })}
                  color={SUB_HEAD_LINE}
                  ml={8}
                />
              </Row>
            </TouchableOpacity>
          </View>
        ) : (
          // 처음 펫시터를 등록하는 경우 보여지는 BottomSheetModal
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
              style={{ marginTop: 16, marginBottom: 28, alignItems: "center" }}
              onPress={() => {
                // bottomSheetModalRef.current?.present()
                setDraftPetsitter({}, serviceType === "방문" ? "visiting" : "creche")
                navigate("cg-registration-1-screen")
              }}
            >
              <Image
                source={images.register_petsitter}
                style={{
                  height: 107,
                }}
              />
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
        {/* //* 보호자 모드 전환 버튼 */}
        <Pressable style={[styles.modeChangeBtn, styles.sidePadding]} onPress={handleMode}>
          <PreBol16 text="보호자 모드로 전환" color={GIVER_CASUAL_NAVY} />

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

        {/* <MypageButton
          text="알림구독 테스트"
          onPress={() => subscribeNotification(addNotification)}
        /> */}

        {/* <Pressable
          style={{ margin: 20, backgroundColor: "black", width: "auto" }}
          onPress={() => navigation.navigate("cg-request-earning-screen")}
        >
          <Text style={{ fontSize: 25, color: "white" }}>(정산요청스크린)</Text>
        </Pressable> */}
      </ScrollView>

      {/* 펫시터 등록하기 바텀시트모달 - !항상 컴포넌트 최하단에 있을것! */}
      {/* <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        footerComponent={renderFooter}
        style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}
      >
        <CgSetServiceType serviceType={serviceType} setServiceType={setServiceType} />
      </BottomSheetModal> */}
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
