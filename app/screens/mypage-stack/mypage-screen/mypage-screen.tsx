import { View, Text, Image, Pressable, FlatList } from "react-native"
import React, { FC, useLayoutEffect, useState } from "react"
import {
  MypageButton,
  PetImageCard,
  PreBol14,
  PreBol16,
  PreBol20,
  PreMed20,
  PreReg16,
  Row,
  ScreenRootView,
} from "#components"
import { styles } from "./styles"
import { user } from "./dummy-data"
import { STRONG_LINE, GIVER_CASUAL_NAVY, SUB_HEAD_LINE, BODY, LIGHT_LINE } from "#theme/palette"
import { HEIGHT, WIDTH } from "#theme/device-size-constant"
import IMAGES from "#images"
import { UserProps } from "./user.props"
import { StackScreenProps } from "@react-navigation/stack"
import { navigate, NavigatorParamList } from "#navigators"
import { observer } from "mobx-react-lite"
import { PetStoreModel } from "../../../models/pet-store/pet-store"
import { FormattedPetData } from "#api/api.types"

const IS_AUTH = true
// const IS_AUTH = false

export const MypageScreen: FC<StackScreenProps<NavigatorParamList, "mypage-screen">> = observer(
  ({ navigation, route }) => {
    const [userInfo, setUserInfo] = useState<UserProps | null>({
      id: 0,
      name: "",
      profileImg: null,
      role: "Client",
      // TODO: 나중에 api 코드 짤 때 최대 3개만 가져와서 저장하기
      pets: [],
    })

    const petStore = PetStoreModel.create()
    const [petsList, setPetsList] = useState<FormattedPetData[]>([])

    useLayoutEffect(() => {
      IS_AUTH ? setUserInfo(user) : setUserInfo(null)

      async function fetchData() {
        await petStore.setMyPets()
        setPetsList(petStore.pets)
      }

      fetchData()
    }, [])

    console.log("== petsList ==")
    console.log(petsList)

    // TODO: 로그인 화면 연결시키기
    // * 비로그인시, "로그인" 버튼 클릭시 실행되는 함수
    const handleLoginPress = () => {
      alert("로그인 화면으로 이동")
    }

    // * 나의 반려동물 -> 전체보기 버튼 클릭할 때 실행되는 함수
    const handleMyPetsPress = () => {
      navigate("all-pets-screen")
    }

    // * 환경설정 버튼 클릭시 실행되는 함수
    const handleSettingPress = () => {
      navigate("setting-screen")
    }

    // * 고객센터 버튼 클릭시 실행되는 함수
    const handleServiceCenterPress = () => {
      navigate("service-center-screen")
    }

    return (
      <ScreenRootView preset="fixed">
        {/* //! 로그인 상태일 때 */}
        {userInfo ? (
          <>
            {/* //* 유저 프로필 카드  */}
            <Row style={styles.profileCard}>
              {/* //? 프로필 사진 */}
              <Image
                source={user.profileImg ? user.profileImg : IMAGES.default_pet_image_60}
                style={styles.profileImg}
                resizeMode="contain"
              />
              {/* //* 프로필 */}
              <View style={styles.profileNameCard}>
                {/* //? 사용자 이름 */}
                <Row>
                  <PreBol20 text={userInfo.name} color={STRONG_LINE} />
                  <PreMed20 text="님" color={STRONG_LINE} style={{ marginLeft: WIDTH * 2 }} />
                </Row>
                {/* //? 내 프로필 관리 버튼 */}
                <Pressable
                  style={{ marginTop: HEIGHT * 8, flexDirection: "row", alignItems: "center" }}
                >
                  <PreBol14 text="내 프로필 관리" color={BODY} />
                  <Image
                    style={{ width: WIDTH * 16, height: HEIGHT * 16 }}
                    source={IMAGES.arrow_left}
                  />
                </Pressable>
              </View>
            </Row>

            {/* //? divider */}
            <View style={[styles.divisionLine]} />

            {/* //* 반려동물 리스트 */}
            <View style={styles.petContainer}>
              {/* //? 제목: 나의 반려동물 + 전체보기 버튼 */}
              <Row style={{ justifyContent: "space-between" }}>
                <PreBol16 text="나의 반려동물" />
                {/* //? 전체보기 버튼 */}
                <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
                  <PreBol14 text="전체보기" color={BODY} onPress={handleMyPetsPress} />
                  <Image
                    style={{ width: WIDTH * 16, height: HEIGHT * 16 }}
                    source={IMAGES.arrow_left}
                  />
                </Pressable>
              </Row>

              {/* //? 반려동물 카드 리스트 */}
              <View style={styles.petListContainer}>
                {petsList.map((item, index) => (
                  <PetImageCard
                    key={index}
                    petImage={item.image ? item.image : IMAGES.default_pet_image_60}
                    name={item.name}
                  />
                ))}
              </View>
            </View>
          </>
        ) : (
          // ! 비로그인 상태일 때
          // * 로그인 이동 버튼 카드
          <Row style={styles.loginCard}>
            {/* //? "로그인 후 이용해주세요" 카드 */}
            <Pressable style={{ flexDirection: "row" }} onPress={handleLoginPress}>
              <PreBol16 text="로그인" color={GIVER_CASUAL_NAVY} />
              <PreReg16
                text="후 이용해주세요."
                color={SUB_HEAD_LINE}
                style={{ marginLeft: WIDTH * 2 }}
              />
            </Pressable>
          </Row>
        )}

        {/* //? divider */}
        <View style={[styles.divisionLine]} />
        {/* //* Care Giver 모드 전환 버튼 */}
        <Pressable style={styles.modeChangeBtn}>
          <PreBol16 text="Care Giver 모드 전환" color={GIVER_CASUAL_NAVY} />
          <Image
            source={IMAGES.arrow_change}
            style={{ marginLeft: WIDTH * 2, width: WIDTH * 28, height: HEIGHT * 28 }}
          />
        </Pressable>

        {/* //? divider */}
        <View style={[styles.divisionLine]} />
        {/* //* 결제 수단 및 쿠폰 버튼 */}
        <MypageButton text="결제 수단 및 쿠폰" />

        {/* //? divider */}
        <View style={[styles.divisionLine]} />
        {/* //* 환경설정 버튼 */}
        <MypageButton text="환경설정" onPress={handleSettingPress} />

        {/* //? divider */}
        <View style={[styles.divisionLine]} />
        {/* //* 자주 묻는 질문 버튼 */}
        <MypageButton text="자주 묻는 질문" />

        {/* //? divider */}
        <View style={[styles.divisionLine]} />
        {/* //* 고객센터 버튼 */}
        <MypageButton text="고객 센터" onPress={handleServiceCenterPress} />

        {/* //? divider */}
        <View style={[styles.divisionLine]} />
      </ScreenRootView>
    )
  },
)
