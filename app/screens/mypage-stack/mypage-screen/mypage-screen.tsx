import { View, Image, TouchableOpacity, ScrollView } from "react-native"
import React, { FC, useEffect, useMemo } from "react"
import {
  BOTTOM_TAB_BAR_HEIGHT,
  ConditionalButton,
  DivisionLine,
  MypageButton,
  PetImageCard,
  PreBol14,
  PreBol16,
  PreBol20,
  PreMed20,
  Row,
  Screen,
} from "#components"
import { styles } from "./styles"
import { STRONG_LINE, GIVER_CASUAL_NAVY, BODY, LIGHT_LINE } from "#theme"
import { images } from "#images"
import { StackScreenProps } from "@react-navigation/stack"
import { navigate, NavigatorParamList } from "#navigators"
import { observer } from "mobx-react-lite"
import { useStores } from "#models"
import { useShowBottomTab } from "../../../utils/hooks"
import { profileImageUriHandler } from "../../../utils/image-format-validate"

export const MypageScreen: FC<StackScreenProps<NavigatorParamList, "mypage-screen">> = observer(
  function MypageScreen({ navigation, route }) {
    useShowBottomTab(navigation)
    const {
      userStore: { switchType, userDetailHandler, userAuth, loggedIn, userDetail },
      petStore: { pets, petsHandler, hasPets },
    } = useStores()

    /** 반려동물 리스트를 불러옵니다. */
    useEffect(() => {
      petsHandler()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // * 나의 반려동물 -> 전체보기 버튼 클릭할 때 실행되는 함수
    const handleMyPetsPress = () => {
      navigate("all-pets-screen", { pets })
    }

    // * 환경설정 버튼 클릭시 실행되는 함수
    const handleSettingPress = () => {
      navigate("setting-screen")
    }

    // * 고객 센터 버튼 클릭시 실행되는 함수
    const handleServiceCenterPress = () => {
      navigate("service-center-screen")
    }

    const handleMode = async () => {
      switchType()
    }

    const isActivated = !hasPets

    const petListContainerJustfyContent = useMemo(() => {
      if (pets.length === 1) {
        return "flex-start"
      } else if (pets.length === 2) {
        return "space-evenly"
      } else {
        return "space-between"
      }
    }, [pets.length])

    return (
      <Screen style={{ paddingHorizontal: 0 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: BOTTOM_TAB_BAR_HEIGHT }}
        >
          <View style={styles.sidePadding}>
            {/* //* 유저 프로필 카드  */}
            <Row style={styles.profileCard}>
              {/* //? 프로필 사진 */}
              <Image
                source={profileImageUriHandler(
                  images.default_pet_image_60,
                  "small",
                  userDetail?.profileImage,
                )}
                style={styles.profileImg}
                resizeMode="cover"
              />
              {/* //* 프로필 */}
              <View style={styles.profileNameCard}>
                {/* //? 사용자 이름 */}
                <Row>
                  <PreBol20 text={userDetail?.nickname} color={STRONG_LINE} />
                  <PreMed20 text="님" color={STRONG_LINE} style={{ marginLeft: 2 }} />
                </Row>
                {/* //? 내 프로필 관리 버튼 */}
                <TouchableOpacity
                  style={{ marginTop: 8, flexDirection: "row", alignItems: "center" }}
                  onPress={() => {
                    navigate("edit-mypage-screen")
                  }}
                >
                  <PreBol14 text="내 프로필 관리" color={BODY} />
                  <Image style={{ width: 16, height: 16 }} source={images.arrow_right} />
                </TouchableOpacity>
              </View>
            </Row>

            <DivisionLine color={LIGHT_LINE} />
            {/* //* 반려동물 리스트 */}
            <View style={styles.petContainer}>
              {/* //? 제목: 나의 반려동물 + 전체보기 버튼 */}
              <Row style={{ justifyContent: "space-between" }}>
                <PreBol16 text="나의 반려동물" />
                {/* //? 전체보기 버튼 */}
                {hasPets && (
                  <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
                    <PreBol14 text="전체보기" color={BODY} onPress={handleMyPetsPress} />
                    <Image style={{ width: 16, height: 16 }} source={images.arrow_right} />
                  </TouchableOpacity>
                )}
              </Row>

              {/* //? 반려동물 카드 리스트 */}
              {hasPets ? (
                <View
                  style={[
                    styles.petListContainer,
                    { justifyContent: petListContainerJustfyContent },
                  ]}
                >
                  {/* 마이페이지에서는 3마리 까지만 표출 */}
                  {pets.slice(0, 3).map((item, index) => (
                    <PetImageCard
                      key={index}
                      petImageUri={item?.images ? item.images[0] : null}
                      name={item.name}
                    />
                  ))}
                </View>
              ) : (
                <ConditionalButton
                  style={styles.addPet}
                  label={"+ 반려동물 등록하기"}
                  labelTextColor={GIVER_CASUAL_NAVY}
                  isActivated={isActivated}
                  onPress={() => {
                    navigation.navigate("add-pet-screen")
                  }}
                />
              )}
            </View>
          </View>

          <DivisionLine color={LIGHT_LINE} />
          {/* //* Care Giver 모드 전환 버튼 */}
          <TouchableOpacity style={[styles.modeChangeBtn, styles.sidePadding]} onPress={handleMode}>
            <PreBol16 text="Care Giver 모드로 전환" color={GIVER_CASUAL_NAVY} />

            <Image source={images.arrow_change} style={{ marginLeft: 2, width: 28, height: 28 }} />
          </TouchableOpacity>

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
      </Screen>
    )
  },
)
