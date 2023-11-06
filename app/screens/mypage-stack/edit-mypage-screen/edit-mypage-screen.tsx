import React, { FC, useEffect, useState } from "react"
import { View, Image, TouchableOpacity, ImageBackground, Platform } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { observer } from "mobx-react-lite"
import { BODY, HEAD_LINE, MIDDLE_LINE, DISABLED, BOTTOM_HEIGHT, ERROR_RED } from "#theme"
import {
  Screen,
  Row,
  PreMed14,
  PreMed16,
  UserOrPetProfileInfo,
  DivisionLine,
  ConditionalButton,
  CustomInputModal,
  PickerImage,
  SignUpTextInput,
  PreReg10,
} from "#components"
import { images } from "#images"
import { styles } from "./styles"
import { Users } from "./dummy-data"
import { useStores } from "#models"
import { profileImageUriHandler } from "../../../utils/image-format-validate"
import { updateUser, uploadURIS } from "#axios"
import { ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker"
import dayjs from "dayjs"
import { useTimer } from "react-timer-hook"
import { alertModal } from "../../../utils/alert-modal"

export const EditMypageScreen: FC<
  StackScreenProps<NavigatorParamList, "edit-mypage-screen">
> = observer(({ navigation, route }) => {
  //console.log("route @EditMypageScreen", route)

  const {
    userStore: { userAuth, userDetail, userDetailHandler, sexInKorean },
  } = useStores()

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

  //*화면에서 프로필사진에 들어갈 데이터
  const [profileImage, setProfileImage] = useState<string>(userDetail?.profileImage)

  //*화면에서 닉네임 부분에 들어갈 데이터
  const [nickname, setNickname] = useState(userDetail.nickname)

  //*닉네임 수정 가능 여부(월 1회)
  const [editableNickname, setEditableNickname] = useState<boolean>(true)

  //*닉네임 부분 누르면 모달 창 뜨게 관리하는 변수,함수
  const [nicknameTouched, setNicknameTouched] = useState(false)

  //*화면에서 전화번호 부분에 들어갈 데이터
  const [phoneNumber, setPhoneNumber] = useState(userDetail.phoneNumber)

  //* 전화번호 수정 및 인증번호 관련
  const TIMER_DURATION = 60
  // 인증번호
  const [certification, setCertification] = useState<string>("")
  // 인증번호 검증 여부
  const [isVerified, setIsVerified] = useState(false)
  const [isSendingSMS, setIsSendingSMS] = useState(false)
  // 인증번호 발송버튼 재요청 타이머
  const [expiryTimestamp, _] = useState(dayjs().add(TIMER_DURATION, "second").toDate())
  const { totalSeconds, pause, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      // console.warn("onExpire called")
      setIsSendingSMS(false)
      setCertification("")
    },
  })

  //*<함수>위주 정리 :

  // 스크린을 렌더링할때 최초실행됩니다.
  useEffect(() => {
    showEditButton() //* 수정 화면이 아닌 상태, 즉 편집버튼(연필모양 버튼)을 보여주는 상태로 설정합니다.

    //* 닉네임 최근 수정 달과 현재 달이 같은지 판단하는 부분
    // 아직 한 번도 닉네임을 수정하지 않은 사용자
    if (userDetail.nicknameLastUpdated === null) return

    const nicknameLastUpdated = new Date(userDetail.nicknameLastUpdated)
    const current = new Date()
    const isEqualMonth =
      nicknameLastUpdated.getFullYear() === current.getFullYear() &&
      nicknameLastUpdated.getMonth() === current.getMonth()
    if (isEqualMonth) setEditableNickname(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 수정버튼 클릭시 닉네임 수정 불가능하다면 alert!
  useEffect(() => {
    if (editable && !editableNickname)
      alertModal("닉네임 수정 불가능", "이번 달에 닉네임을 수정하셨습니다.")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editable])

  //* 프로필 사진을 수정하기위해 갤러리를 여는 함수 (customTimePicker > openGallery 참고)
  const openGallery = () => {
    const options: ImageLibraryOptions = {
      mediaType: "photo",
      maxHeight: 130,
      maxWidth: 130,
      // includeBase64: true, // ? -> 큰 이미지 피함
      selectionLimit: 1, // 최대 등록할 수 있는 이미지 개수 - myPage는 1개로 제한
    }

    launchImageLibrary(options, (response) => {
      if (!response.didCancel) {
        // 갤러리에서 선택한 이미지
        const newImage: PickerImage[] = response.assets.map((current) => {
          return {
            name: current.fileName,
            type: current.type,
            // ? iOS의 경우 uri 맨 앞에 'file://' 붙음 -> 제거
            uri: Platform.OS === "android" ? current.uri : current.uri.replace("file://", ""),
          }
        })
        // 갤러리에서 선택한 이미지 uri String만 받아와서 state에 저장
        uploadURIS(newImage).then((imageUri) => setProfileImage(imageUri[0]))
      } else if (response.errorCode) {
        console.error(
          "[custom-image-picker.ts] Image Picker Error",
          response.errorCode,
          response.errorMessage,
        )
      }
    })
  }

  //* 편집버튼(연필)보이기, editable, 즉 수정화면 닫기, 수정불가화면으로 표시
  const showEditButton = () => {
    navigation.setParams({
      editable: false,
    })
  }

  //*모달창에서 닉네임 변경시 사용 함수
  const handleNicknameInput = (newNickname) => {
    setNickname(newNickname)
  }

  //*모달창에서 모달 창 닫을때 넣어주는 함수
  const handleNicknameModalHide = () => {
    setNicknameTouched(false)
  }

  //*Users 데이터 안에 유저가 새로 입력한 닉네임과 중복되는 닉네임이 있는지
  // TODO: API 로 대체해야 함
  const isDuplicateNickname = (newNickname: string) => {
    return Users.some((User) => User.id !== currentUser.id && User.nickname === newNickname)
    //*currentUser.id 비교 부분 : 현재 로그인 유저의 정보와 같지 않은 유저들 안에서 nickname 같은지 비교
  }

  return (
    <Screen preset={"fixed"}>
      {/* //*프사 부분 */}
      <View style={{ width: 130, alignSelf: "center" }}>
        <Image
          style={styles.profileImage}
          source={profileImageUriHandler(
            images.default_profile_image_edit_mypage,
            "medium",
            profileImage,
          )}
        ></Image>
        {/* //*프사 - 수정 가능 상태일때 */}
        {editable && (
          <TouchableOpacity
            onPress={() => {
              openGallery()
            }}
            style={{ position: "absolute", right: 0, bottom: 0 }}
          >
            <Image source={images.camera} style={{ width: 42, height: 42 }} />
          </TouchableOpacity>
        )}
      </View>

      {/* //*닉네임 부분. 닉네임 옆의 more info 버튼으로 인해 컴포넌트로 이용하지 않음. 밑의 다른 info 들은 컴포넌트로 뺌.*/}
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Row style={{ marginBottom: 10 }}>
          <PreMed14 color={BODY} text={`닉네임`} style={{ marginRight: 4 }} />
        </Row>
        {/* //*editable이 true, 즉 수정 가능 상태일때 -> 닉네임 변환 횟수가 3회 이하면 눌러서 수정가능, 3회면 수정 불가 */}
        {/* // TODO: API 로 대체해야 함 */}
        {editable && editableNickname ? (
          //* 수정중이면서 닉네임 수정 가능 기간(월 1회 조건)일 때
          <TouchableOpacity
            onPress={() => {
              setNicknameTouched(true)
            }}
          >
            <PreMed16 color={HEAD_LINE} text={nickname} />
          </TouchableOpacity>
        ) : (
          //* 수정중 또는 닉네임 수정 불가능 둘 중 한 조건이라도 해당한다면 클릭 불가능해야함
          <PreMed16
            color={
              editable === true && currentUser.nicknameChangeCount === 3 ? DISABLED : HEAD_LINE
            }
            text={nickname}
          />
        )}
        {/*//? marginRight 를 16으로 조절해야하는지? divisionline 을 적용시 디자인보다 오른쪽이 더 길어보임*/}
        <DivisionLine color={MIDDLE_LINE} style={{ marginTop: 4 }} />
        {editable && editableNickname && (
          <PreReg10 color={ERROR_RED} text="닉네임은 월1회 수정 가능합니다" />
        )}
      </View>

      {/* //* 생년월일 */}
      <UserOrPetProfileInfo
        title={"생년월일"}
        profileInfo={userDetail.birthday}
        showOption={editable}
      />

      {/* //* 성별 */}
      <UserOrPetProfileInfo title={"성별"} profileInfo={sexInKorean} showOption={editable} />

      {/* //* 이메일 */}
      <UserOrPetProfileInfo
        title={"이메일"}
        profileInfo={userAuth.email}
        showOption={editable}
        additionalMargin={20}
      />

      {/* //* 전화번호 */}
      {editable ? (
        // <TouchableOpacity onPress={() => alert("전화번호 수정 플로우 준비중")}>
        //   <UserOrPetProfileInfo title={"전화번호"} profileInfo={phoneNumber} />
        // </TouchableOpacity>
        <SignUpTextInput
          placeholder="휴대폰 번호 (숫자만 입력해주세요.)"
          title="휴대폰 번호"
          value={phoneNumber}
          setValue={setPhoneNumber}
          isSendingSMS={isSendingSMS}
          setIsSendingSMS={setIsSendingSMS}
          isVerified={isVerified}
          setIsVerified={setIsVerified}
          leftTime={totalSeconds}
          keyboardType="number-pad"
          marginBottom={20}
        />
      ) : (
        <UserOrPetProfileInfo title={"전화번호"} profileInfo={phoneNumber} additionalPadding={0} />
      )}

      {/* //* 인증번호 */}
      {editable && isSendingSMS && (
        <SignUpTextInput
          placeholder="문자로 전송된 6자리 인증번호를 입력해주세요."
          title="인증번호"
          phoneNumber={phoneNumber}
          value={certification}
          setValue={setCertification}
          isVerified={isVerified}
          setIsVerified={setIsVerified}
          keyboardType="number-pad"
          marginBottom={20}
        />
      )}

      {/* //*저장하기 버튼 : editable이 true 일때, 즉 수정 가능 화면 일때 화면 하단부 표시  
          //* 전화번호도 바꾼다면 인증이 되었을 때 저장하기 버튼이 활성화되도록 로직 추가
      */}
      {editable ? (
        isSendingSMS && !isVerified ? null : (
          <ConditionalButton
            label="저장하기"
            isActivated={true}
            style={{
              marginTop: "auto",
              marginBottom: BOTTOM_HEIGHT,
            }}
            onPress={() => {
              showEditButton() //* 저장하기를 누르면, 수정 불가 화면 + 편집버튼 (연필) 보이기
              updateUser({
                email: userAuth.email,
                password: null,
                nickname: nickname,
                sex: userDetail.sex,
                birthday: userDetail.birthday,
                desc: null,
                profileImage: profileImage,
                phoneNumber: userDetail.phoneNumber,
              })
              userDetailHandler(userAuth.token)
            }}
          />
        )
      ) : null}

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
