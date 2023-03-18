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
} from "#components"
import { useKeyboard } from "@react-native-community/hooks"
import { images } from "#images"
import {} from "react-native-gesture-handler"
import { styles } from "./styles"
import { Users } from "./dummy-data"
import { UserProps } from "./user.props" //?사용의 의미?
import { useForm, Controller } from "react-hook-form"
import { values } from "mobx"

type NicknameForm = {
  nickname: string
}

export const EditMypageScreen: FC<
  StackScreenProps<NavigatorParamList, "edit-mypage-screen">
> = observer(({ navigation, route }) => {
  //*console.log("route @EditMypageScreen", route)

  const [touched, setTouched] = useState(false)

  //* 스크린을 렌더링할때 최초실행됩니다.
  useLayoutEffect(() => {
    showEditButton() //* 편집버튼을 보여주는 상태로 설정합니다.
  }, [])
  console.log("mainscreen", route.params)

  const editable = route.params?.editable

  //* 지금은 user 더미네이터에서 가져옴.
  //* 실제상황 -> 로그인한유저 -> 로그인한 유저의 정보를 담고 있는 user 데이터 가 있겠죠.-> MST 에도 있을꺼에요.
  //* 이유: 실제로그인한 유저의 user 데이터는 굉장히 많은 스크린에서 쓰임 -> MST 에 있음.

  const currentUser = Users.find((User) => User.id === 1)
  //*일단 더미데이터의 user id 1 인 user 의 닉네임 가져옴.
  const [nickname, setNickname] = useState(currentUser.nickname)

  const [infoTouced, setInfoTouched] = useState(false) //*화면 닉네임 글자 옆 i 버튼 누르는것 체크

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty, dirtyFields },
    reset,
  } = useForm<NicknameForm>({
    mode: "onChange",
    defaultValues: {
      nickname: "",
    },
  })

  const onSubmit = (data: NicknameForm) => {
    //*user data 실제로 변경하는 코드 필요
    setNickname(data.nickname)
    console.log("data!!", data.nickname)
    alert("saved")
    setTouched(false)
    reset()
  }

  //* 편집버튼 보이기
  const showEditButton = () => {
    navigation.setParams({
      editable: false,
    })
  }
  //*키보드 관련
  const [keyboardStatus, setKeyboardStatus] = useState(undefined)
  const keyboard = useKeyboard()

  if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }

  useLayoutEffect(() => {
    const keyboardUp = Keyboard.addListener("keyboardWillShow", () => {
      setKeyboardStatus("Keyboard will Show")
    })
    const keyboardDown = Keyboard.addListener("keyboardWillHide", () => {
      // LayoutAnimation.configureNext(LayoutAnimation.create(100000, "keyboard", "opacity"))
      setKeyboardStatus("Keyboard hidden")
    })

    return () => {
      keyboardUp.remove()
      keyboardDown.remove()
    }
  }, [])

  const handlePosition = () => {
    let position = ""

    switch (Platform.OS) {
      case "android":
        LayoutAnimation.configureNext(LayoutAnimation.create(1, "easeInEaseOut", "scaleY"))
        //*안드로이드에선 layoutanitmation 과 모달창의 종료가 충돌하는 일은 없음. 다만 에니메이션을 준 효과가 나지 않게 갱장히 버벅거림.
        //*그래도 다행히 실제 기기에서 테스트시에는 그렇게 버벅거리지 않음.
        //? ios 와 안드로이드 둘다 화면 움직임을 고려하여 키보드 띄워져 있을때 굳이 모달창을 키보드 가깝게 붙이는 이 코드를 추가로 고집 하는 것이 득이될지 실이될지 따지기 필요

        //*android 에선 keyboardWillShow 사용 못함
        if (keyboard.keyboardShown) {
          position = "flex-end"
          console.log("position", position)
          return position
        } else {
          position = "center"
          console.log("position", position)
          return position
        }

      case "ios":
        if (keyboardStatus === "Keyboard will Show") {
          //!LayoutAnimation.configureNext(LayoutAnimation.create(0, "easeIn", "scaleY"))
          //!화면 전환을 부드럽게 시도해 봤지만 모달창이 닫혔을 때에도 다시 열리는 문제가 있음. 찾아보니 2018년에 동일한 문제가 발견되었는데 해결책은 아직 나오지 않은듯하고 2022년까지 issue 였던듯 함.
          //!https://github.com/facebook/react-native/issues/33733
          position = "flex-end"
          console.log("position", position)
          return position
        } else {
          position = "center"
          console.log("position", position)
          return position
        }
    }
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
              setTouched(true)
            }}
          >
            <PreMed16 color={HEAD_LINE} text={nickname} />
            {/* //*저장하기 버튼도 보이고 3번 안썼을때*/}
          </Pressable>
        ) : editable === true && currentUser.nicknameChangeCount === 3 ? (
          <PreMed16 color={DISABLED} text={nickname} /> //*저장하기 버튼이 보이는데 3번 다 썼을때
        ) : (
          <PreMed16 color={HEAD_LINE} text={nickname} /> //* editable이 아닐때. 즉 저장하기 버튼이 안보일때
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
          }}
        />
      )}

      {/*//*modal 창 따로 뺌. -> 모달이 스크린 전체를 parent 로 삼는다면 -> 여기선 keyboardavoidigView flex : 1 이 그걸 해줌? 모달이 컴포넌트 내에서 어디 있어도 상관없음 */}
      <Modal animationType="fade" transparent={true} visible={touched}>
        {/* //* Modal Backgound View */}
        {/* //*모달 바깥쪽 터치시 사용 */}

        <Pressable
          style={{ flex: 1 }}
          onPress={() => {
            setTouched(false)
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"} //* iOS 에서 키보드에 모달 안 가리게 하기 ref: https://stackoverflow.com/questions/64961683/in-react-native-how-can-i-use-keyboardavoidingview-with-a-modal-in-ios
            //TODO *react 문서 예시대로 해봄. 안드로이드 behavior 를 셋 중 뭘로 바꿔도 키보드가 등장할 시 밑의 저장 버튼이 올라오는 문제 발생
            style={{
              width: DEVICE_SCREEN_WIDTH,
              flex: 1,

              marginTop: "auto",
              alignItems: "center",
              justifyContent: handlePosition(),
              backgroundColor: "rgba(0,0,0,0.25)",
            }}
          >
            {/*//? modal 따로 빼고 싶은데 여러 함수 + 재사용이 가능할지에 대한 의문 때문에 따로 빼는게 맞는지 모르겠음
            //? 만약 따로 뺀다면 다른 펫 설정 스크린에서의 몸무게,  이름 화면 등에서 재사용이 가능? -> 각자 사용이 다른 error 함수 등과, 서로 다른 submit 조건 등 맞출 수 있나? */}
            <View style={styles.modalName}>
              <View
                style={{
                  paddingHorizontal: 10,
                }}
              >
                <PreBol18 color={HEAD_LINE} text={"닉네임"} />
                <Controller
                  name="nickname"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={{
                        paddingTop: 43,
                      }}
                      placeholder={"닉네임을 입력해주세요. (최대 10자)"}
                      onChangeText={onChange}
                      value={value}
                      autoCapitalize="none"
                      maxLength={10}
                    />
                  )}
                  rules={{
                    required: true,
                    pattern: {
                      value: /[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|_]+$/,
                      message: "* 언더바 제외, 특수문자, 이모티콘, 공백은 사용할 수 없습니다.",
                    },
                    validate: {
                      duplicatSearch: (value) =>
                        isDuplicateNickname(value) ? "중복된 닉네임입니다." : true,
                      //*validation rule to true to indicate that the field is valid and has no error.
                    },
                  }}
                />
                {console.log("errors! ", errors.nickname)}
                {errors.nickname ? (
                  <View>
                    <DivisionLine
                      color={errors.nickname.type === "required" ? MIDDLE_LINE : ERROR_RED}
                      style={{ marginTop: 4 }}
                    />
                    <PreReg12
                      text={
                        errors.nickname.type === "pattern"
                          ? errors.nickname.message
                          : errors.nickname.message
                      }
                      color={ERROR_RED}
                    />
                  </View>
                ) : (
                  <View>
                    <DivisionLine
                      color={dirtyFields.nickname ? SUCCESS_BLUE : MIDDLE_LINE}
                      style={{ marginTop: 4 }}
                    />
                    {dirtyFields.nickname && (
                      <PreReg12 text={"* 사용가능한 이름입니다!"} color={SUCCESS_BLUE} />
                    )}
                  </View>
                )}
              </View>

              <ConditionalButton
                label="확인"
                isActivated={isValid}
                style={{
                  marginTop: "auto",
                }}
                onPress={
                  handleSubmit(onSubmit)

                  // updateUserNickname() //* server 로 통신하는 함수. API call 을 통해서 server DB 에있는 유저 data 속 닉네임을 바꾸는 함수
                }
              />
            </View>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
    </ScreenRootView>
  )
})
