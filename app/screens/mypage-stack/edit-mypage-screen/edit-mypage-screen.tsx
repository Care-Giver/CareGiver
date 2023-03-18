import {
  Keyboard,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
  View,
  Image,
  Pressable,
  Modal,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native"
import React, { FC, useLayoutEffect, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { navigationRef, NavigatorParamList } from "#navigators"
import { observer } from "mobx-react-lite"
import {
  BODY,
  HEAD_LINE,
  MIDDLE_LINE,
  ERROR_RED,
  SUCCESS_BLUE,
  DEVICE_SCREEN_WIDTH,
  DISABLED,
} from "#theme"
import {
  ScreenRootView,
  Row,
  PreMed14,
  PreMed16,
  UserOrPetProfileInfo,
  DivisionLine,
  BASIC_BACKGROUND_PADDING_WIDTH,
  ConditionalButton,
  PreBol18,
  PreReg12,
  CustomInputModal,
} from "#components"
import { useKeyboard } from "@react-native-community/hooks"
import { images } from "#images"
import { styles } from "./styles"
import { Users } from "./dummy-data"
import { UserProps } from "./user.props" //?사용의 의미?
import { useForm, Controller } from "react-hook-form"

// type NicknameForm = {
//   nickname: string
// }

export const EditMypageScreen: FC<
  StackScreenProps<NavigatorParamList, "edit-mypage-screen">
> = observer(({ navigation, route }) => {
  //*console.log("route @EditMypageScreen", route)

  const [nicknameTouched, setNicknameTouched] = useState(false)
  const handleNicknameModalHide = () => {
    setNicknameTouched(false)
  }

  //* 스크린을 렌더링할때 최초실행됩니다.
  useLayoutEffect(() => {
    showEditButton() //* 편집버튼을 보여주는 상태로 설정합니다.
  }, [])
  // console.log("mainscreen", route.params)

  const editable = route.params?.editable

  //* 지금은 user 더미네이터에서 가져옴.
  //* 실제상황 -> 로그인한유저 -> 로그인한 유저의 정보를 담고 있는 user 데이터 가 있겠죠.-> MST 에도 있을꺼에요.
  //* 이유: 실제로그인한 유저의 user 데이터는 굉장히 많은 스크린에서 쓰임 -> MST 에 있음.

  const currentUser = Users.find((User) => User.id === 1)
  //*일단 더미데이터의 user id 1 인 user 의 닉네임 가져옴.
  //*user.id === 2 : 닉네임 변경 횟수 잘 작동하는지 확인 가능 (닉네임 옆의 i 눌렀을 때 )
  //*user.id ===3 : 닉네임 변경 횟수 다 썼을때 수정 버튼 누르면 닉네임 부분 disabled 되는거 확인 가능
  const [nickname, setNickname] = useState(currentUser.nickname)
  const handleNicknameInput = (nickname) => {
    setNickname(nickname)
  }
  const [infoTouced, setInfoTouched] = useState(false) //*화면 닉네임 글자 옆 i 버튼 누르는것 체크

  //* 편집버튼 보이기
  const showEditButton = () => {
    navigation.setParams({
      editable: false,
    })
  }

  const isDuplicateNickname = (newNickname: string) => {
    return Users.some((User) => User.id !== currentUser.id && User.nickname === newNickname)
    //*현재 로그인 유저의 정보와 같지 않은 유저들 안에서 nickname 같은지 비교
  }

  return (
    <ScreenRootView preset={"fixed"}>
      <ImageBackground
        style={styles.profileImage}
        source={
          currentUser.profileImage
            ? currentUser.profileImage
            : images.default_profile_image_edit_mypage
        }
      >
        {editable && (
          <Pressable
            onPress={() => {
              alert("이미지 등록 준비중입니다.")
            }}
            style={{ position: "absolute", right: 0, bottom: 0 }}
          >
            <Image source={images.camera} style={{ width: 42, height: 42 }} />
          </Pressable>
        )}
      </ImageBackground>

      {/* //*닉네임 부분. 닉네임 옆의 more info 버튼으로 인해 컴포넌트로 이용하지 않음. 밑의 다른 info 들은 컴포넌트로 뺌.*/}
      <View
        style={{
          paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
          marginTop: 20,
        }}
      >
        <Row style={{ marginBottom: 10 }}>
          <PreMed14 color={BODY} text={`닉네임`} style={{ marginRight: 4 }} />
          <Pressable
            onPress={() => {
              setInfoTouched(true)
            }}
          >
            <Image source={images.more_info_bigger} style={{ width: 16, height: 16 }} />
          </Pressable>
        </Row>
        {editable && currentUser.nicknameChangeCount < 3 ? (
          <Pressable
            onPress={() => {
              setNicknameTouched(true)
            }}
          >
            <PreMed16 color={HEAD_LINE} text={nickname} />
            {/* //*저장하기 버튼도 보이고 3번 안썼을때*/}
          </Pressable>
        ) : (
          <PreMed16
            color={
              editable === true && currentUser.nicknameChangeCount === 3 ? DISABLED : HEAD_LINE
            }
            text={nickname}
          /> //*저장하기 버튼이 보이는데 3번 다 썼을때
        )}
        {/*//? marginRight 를 16으로 조절해야하는지? divisionline 을 적용시 디자인보다 오른쪽이 더 길어보임*/}
        <DivisionLine color={MIDDLE_LINE} style={{ marginTop: 4 }} />
        {infoTouced && (
          <ImageBackground source={images.speech_bubble} style={styles.speechBubble}>
            <PreMed14
              text={`이번 달 수정 가능 횟수 ${3 - currentUser.nicknameChangeCount}회`}
              style={{ paddingTop: 20 }}
            />
            <Pressable
              onPress={() => {
                setInfoTouched(false)
              }}
              style={{ position: "absolute", top: 3.5, right: -6 }}
            >
              <Image source={images.x_in_circle} style={{ width: 15, height: 15 }} />
            </Pressable>
          </ImageBackground>
        )}
      </View>

      {/* //* 생년월일 */}
      <UserOrPetProfileInfo
        title={"생년월일"}
        profileInfo={currentUser.birthday}
        showOption={editable}
      />

      {/*//*이전 코드 -> 혹시 모름에 따라 남겨둠. 후에 수정 필요시 
      editable ? (
        <UserOrPetProfileInfo title={"생년월일"} profileInfo={"99.12.28"} showOption={DISABLED} />
      ) : (
        <UserOrPetProfileInfo title={"생년월일"} profileInfo={"99.12.28"} showOption={HEAD_LINE} />
      ) */}
      {/* //* 성별 */}
      <UserOrPetProfileInfo title={"성별"} profileInfo={currentUser.sex} showOption={editable} />
      {/* //* 이메일 */}
      <UserOrPetProfileInfo
        title={"이메일"}
        profileInfo={currentUser.email}
        showOption={editable}
      />
      {/* //* 전화번호우 */}
      {editable ? (
        <Pressable onPress={() => alert("전화번호 등록 플로우 준비중")}>
          <UserOrPetProfileInfo title={"전화번호"} profileInfo={currentUser.phoneNumber} />
        </Pressable>
      ) : (
        <UserOrPetProfileInfo title={"전화번호"} profileInfo={currentUser.phoneNumber} />
      )}

      {editable && (
        <ConditionalButton
          label="저장하기"
          isActivated={true}
          style={{
            marginTop: "auto",
            marginBottom: 0,
          }}
          onPress={() => {
            showEditButton() //* 저장하기를 누르면, 편집버튼이 보여야 합니다
            //TODO user data 실제로 변경하는 코드 필요 (변경된 닉네임으로 저장 (process -> 실제로 닉네임이 변경 되었다면 저장 보내서 backend 데이터 건들기 ))
          }}
        />
      )}
      <CustomInputModal
        visibleState={nicknameTouched}
        handleModalHide={handleNicknameModalHide}
        title="닉네임"
        controlMode="userNickname"
        validateFunction={isDuplicateNickname} //? 인자 뭘로 ?
        handleInput={handleNicknameInput}
      />
    </ScreenRootView>
  )
})
