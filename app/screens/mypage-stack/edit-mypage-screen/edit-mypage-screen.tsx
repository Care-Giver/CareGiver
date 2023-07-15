import { View, Image, Pressable, ImageBackground } from "react-native"
import React, { FC, useLayoutEffect, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { navigationRef, NavigatorParamList } from "#navigators"
import { observer } from "mobx-react-lite"
import { BODY, HEAD_LINE, MIDDLE_LINE, DISABLED } from "#theme"
import {
  Screen,
  Row,
  PreMed14,
  PreMed16,
  UserOrPetProfileInfo,
  DivisionLine,
  BASIC_BACKGROUND_PADDING_WIDTH,
  ConditionalButton,
  CustomInputModal,
} from "#components"
import { images } from "#images"
import { styles } from "./styles"
import { Users } from "./dummy-data"
import { UserProps } from "./user.props" //?사용의 의미

export const EditMypageScreen: FC<
  StackScreenProps<NavigatorParamList, "edit-mypage-screen">
> = observer(({ navigation, route }) => {
  //console.log("route @EditMypageScreen", route)

  //* <변수>위주 정리:

  //*route.params 의 editable (header 와 연동 : 연필버튼 누르면 -> editable = true, 수정 화면으로 돌입. 이후 저장하기 버튼 누르면 editable = false, 다시 수정 불가 화면으로 변환)
  const editable = route.params?.editable

  //*현재 유저를 유저 더미데이터(Users)에서 가져옴
  //* 실제상황 -> 로그인한유저 -> 로그인한 유저의 정보를 담고 있는 user 데이터 가 있겠죠.-> MST 에도 있을꺼에요.
  //* 이유: 실제로그인한 유저의 user 데이터는 굉장히 많은 스크린에서 쓰임 -> MST 에 있음.
  const currentUser = Users.find((User) => User.id === 1)
  //*일단 더미데이터의 user id 1 인 user 의 닉네임 가져옴.
  //*user.id === 2 : 닉네임 변경 횟수 잘 작동하는지 확인 가능 (닉네임 옆의 i 눌렀을 때 )
  //*user.id ===3 : 닉네임 변경 횟수 다 썼을때 수정 버튼 누르면 닉네임 부분 disabled 되는거 확인 가능

  //*화면에서 닉네임 부분에 들어갈 데이터
  const [nickname, setNickname] = useState(currentUser.nickname)

  //*닉네임 부분 누르면 모달 창 뜨게 관리하는 변수,함수
  const [nicknameTouched, setNicknameTouched] = useState(false)

  //*화면 닉네임 글자 옆 i 버튼 눌렀는지 여부 체크
  const [infoTouced, setInfoTouched] = useState(false)

  //*<함수>위주 정리 :

  //* 편집버튼(연필)보이기, editable, 즉 수정화면 닫기, 수정불가화면으로 표시
  const showEditButton = () => {
    navigation.setParams({
      editable: false,
    })
  }

  //* 스크린을 렌더링할때 최초실행됩니다.
  useLayoutEffect(() => {
    showEditButton() //* 수정 화면이 아닌 상태, 즉 편집버튼(연필모양 버튼)을 보여주는 상태로 설정합니다.
  }, [])
  // console.log("mainscreen", route.params)

  //*모달창에서 닉네임 변경시 사용 함수
  const handleNicknameInput = (newNickname) => {
    setNickname(newNickname)
  }

  //*모달창에서 모달 창 닫을때 넣어주는 함수
  const handleNicknameModalHide = () => {
    setNicknameTouched(false)
  }

  //*Users 데이터 안에 유저가 새로 입력한 닉네임과 중복되는 닉네임이 있는지
  const isDuplicateNickname = (newNickname: string) => {
    return Users.some((User) => User.id !== currentUser.id && User.nickname === newNickname)
    //*currentUser.id 비교 부분 : 현재 로그인 유저의 정보와 같지 않은 유저들 안에서 nickname 같은지 비교
  }

  return (
    <Screen preset={"fixed"}>
      {/* //*프사 부분 */}
      <ImageBackground
        style={styles.profileImage}
        source={
          currentUser.profileImage
            ? currentUser.profileImage
            : images.default_profile_image_edit_mypage
        }
      >
        {/* //*프사 - 수정 가능 상태일때 */}
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
            {/* //*more info button */}
            <Image source={images.more_info_bigger} style={{ width: 16, height: 16 }} />
          </Pressable>
        </Row>
        {/* //*editable이 true, 즉 수정 가능 상태일때 -> 닉네임 변환 횟수가 3회 이하면 눌러서 수정가능, 3회면 수정 불가 */}
        {editable && currentUser.nicknameChangeCount < 3 ? (
          <Pressable
            onPress={() => {
              setNicknameTouched(true)
            }}
          >
            <PreMed16 color={HEAD_LINE} text={nickname} />
            {/* //*수정 가능 상태인데 3번 안썼을때*/}
          </Pressable>
        ) : (
          <PreMed16
            color={
              editable === true && currentUser.nicknameChangeCount === 3 ? DISABLED : HEAD_LINE
            }
            text={nickname}
          /> //*수정 가능 상태인데 3번 다 썼을때
        )}
        {/*//? marginRight 를 16으로 조절해야하는지? divisionline 을 적용시 디자인보다 오른쪽이 더 길어보임*/}
        <DivisionLine color={MIDDLE_LINE} style={{ marginTop: 4 }} />

        {/* //*i 버튼 클릭시 */}
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

      {/* //*저장하기 버튼 : editable이 true 일때, 즉 수정 가능 화면 일때 화면 하단부 표시  */}
      {editable && (
        <ConditionalButton
          label="저장하기"
          isActivated={true}
          style={{
            marginTop: "auto",
            marginBottom: 0,
          }}
          onPress={() => {
            showEditButton() //* 저장하기를 누르면, 수정 불가 화면 + 편집버튼 (연필) 보이기
            //TODO user data 실제로 변경하는 코드 필요 (변경된 닉네임으로 저장 (process -> 실제로 닉네임이 변경 되었다면 저장 보내서 backend 데이터 건들기 ))
          }}
        />
      )}

      {/* //*새롭게 닉네임 입력하는 모달 창 -> 수정 가능 상태에서 닉네임 눌렀을때 pop up */}
      <CustomInputModal
        visibleState={nicknameTouched}
        handleModalHide={handleNicknameModalHide}
        title="닉네임"
        controlMode="userNickname"
        validateFunction={isDuplicateNickname} //? 인자 뭘로 ?
        handleInput={handleNicknameInput}
        placeholderInput="user"
      />
    </Screen>
  )
})
