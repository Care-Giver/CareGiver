import { View, Image, Pressable, Alert } from "react-native"
import React, { FC, useEffect, useLayoutEffect, useState } from "react"
import {
  MypageButton,
  PetImageCard,
  PreBol14,
  PreBol16,
  PreBol20,
  PreMed20,
  PreReg16,
  Row,
  Screen,
} from "#components"
import { styles } from "./styles"
import { user } from "./dummy-data"
import { STRONG_LINE, GIVER_CASUAL_NAVY, SUB_HEAD_LINE, BODY } from "#theme"
import { images } from "#images"
import { UserProps } from "./user.props"
import { StackScreenProps } from "@react-navigation/stack"
import { navigate, NavigatorParamList } from "#navigators"
import { observer } from "mobx-react-lite"
import { Pet, PetStoreModel } from "../../../models/pet-store/pet-store"
import { Api } from "#api"
import { Type, useStores } from "#models"
import { delay } from "../../../utils/delay"
import { useShowBottomTab } from "../../../utils/hooks"

const IS_AUTH = true

// Dummy data
const pets = [
  {
    name: "초코",
    petType: "중형견",
    species: "푸들",
    age: 7,
    sex: "여",
  },
  {
    name: "구름이",
    petType: "소형",
    species: "고양이",
    age: 15,
    sex: "남",
  },
  {
    name: "자두",
    petType: "소형",
    species: "고양이",
    age: 3,
    sex: "남",
  },
]

export const MypageScreen: FC<StackScreenProps<NavigatorParamList, "mypage-screen">> = observer(
  function MypageScreen({ navigation, route }) {
    useShowBottomTab(navigation)

    const {
      userStore: { switchType, loggedIn, setLoggedIn },
    } = useStores()

    // ? 유저 프로필 정보
    const [userInfo, setUserInfo] = useState<UserProps | null>(user)

    // ? 펫 store
    const petStore = PetStoreModel.create()
    // ? 유저의 펫 리스트
    const [petsList, setPetsList] = useState<Pet[]>(pets)

    const { speciesStoreModel } = useStores()
    // speciesStoreModel.setSpecies()
    speciesStoreModel.getSpecies

    // useLayoutEffect(() => {
    //   // ? 로그인 상태일 때 -> 유저 정보 state에 저장 + 펫 리스트 state 업데이트
    //   if (IS_AUTH) {
    //     setUserInfo(user)

    //     async function fetchData() {
    //       await petStore.setMyPets()
    //       setPetsList(petStore.pets)
    //     }

    //     fetchData()
    //   } else {
    //     setUserInfo(null)
    //   }
    // }, [])

    // * 비로그인시, "로그인" 버튼 클릭시 실행되는 함수
    const handleLoginPress = () => {
      navigate("login-screen")
    }

    // * 나의 반려동물 -> 전체보기 버튼 클릭할 때 실행되는 함수
    const handleMyPetsPress = () => {
      navigate("all-pets-screen", { pets })
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
      <Screen preset="fixed">
        {/* //! 로그인 상태일 때 */}
        {loggedIn ? (
          <>
            {/* //* 유저 프로필 카드  */}
            <Row style={styles.profileCard}>
              {/* //? 프로필 사진 */}
              <Image
                source={user.profileImg ? user.profileImg : images.default_pet_image_60}
                style={styles.profileImg}
                resizeMode="contain"
              />
              {/* //* 프로필 */}
              <View style={styles.profileNameCard}>
                {/* //? 사용자 이름 */}
                <Row>
                  <PreBol20 text={userInfo.name} color={STRONG_LINE} />
                  <PreMed20 text="님" color={STRONG_LINE} style={{ marginLeft: 2 }} />
                </Row>
                {/* //? 내 프로필 관리 버튼 */}
                <Pressable
                  style={{ marginTop: 8, flexDirection: "row", alignItems: "center" }}
                  onPress={() => {
                    navigate("edit-mypage-screen")
                  }}
                >
                  <PreBol14 text="내 프로필 관리" color={BODY} />
                  <Image style={{ width: 16, height: 16 }} source={images.arrow_right} />
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
                  <Image style={{ width: 16, height: 16 }} source={images.arrow_right} />
                </Pressable>
              </Row>

              {/* //? 반려동물 카드 리스트 */}
              <View style={styles.petListContainer}>
                {petsList.map((item, index) => {
                  // ! 마이페이지 메인에는 세 마리만 노출
                  if (index < 3) {
                    return (
                      <PetImageCard
                        key={index}
                        petImage={item.image ? item.image : images.default_pet_image_60}
                        name={item.name}
                      />
                    )
                  }
                })}
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
              <PreReg16 text="후 이용해주세요." color={SUB_HEAD_LINE} style={{ marginLeft: 2 }} />
            </Pressable>
          </Row>
        )}

        {/* //? divider */}
        <View style={[styles.divisionLine]} />
        {/* //* Care Giver 모드 전환 버튼 */}
        <Pressable style={styles.modeChangeBtn} onPress={handleMode}>
          <PreBol16 text="Care Giver 모드로 전환" color={GIVER_CASUAL_NAVY} />

          <Image source={images.arrow_change} style={{ marginLeft: 2, width: 28, height: 28 }} />
        </Pressable>

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
  },
)
