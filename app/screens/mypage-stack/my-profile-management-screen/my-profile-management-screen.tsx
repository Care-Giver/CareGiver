import {
  Keyboard,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
  Text,
  View,
  Image,
  ImageStore,
  Pressable,
  Button,
  Modal,
  useWindowDimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
} from "react-native"
import React, { FC, useLayoutEffect, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { navigationRef, NavigatorParamList } from "#navigators"
import { observer } from "mobx-react-lite"
import {
  BODY,
  LBG,
  CARE_NATURAL_BLUE,
  HEAD_LINE,
  MIDDLE_LINE,
  DEVICE_SCREEN_HEIGHT,
  HEADER_HEIGHT,
  ADNROID_STATUS_BAR_HEIGHT,
  ADNROID_BOTTOM_NAVIGATION_HEIGHT,
  isWeb,
  STANDARD_WIDTH,
  palette,
  ERROR_RED,
  SUCCESS_BLUE,
  DEVICE_SCREEN_WIDTH,
  DISABLED,
} from "#theme"
import {
  PublicPrivateSwitchButton,
  ScreenRootView,
  PopSem14,
  PopReg14,
  Row,
  PreMed14,
  styles,
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

export const MyProfileManagementScreen: FC<
  StackScreenProps<NavigatorParamList, "my-profile-management-screen">
> = observer(({ navigation, route }) => {
  //*console.log("route @MyProfileManagementScreen", route)

  const [touched, setTouched] = useState(false)
  //!const windowWidth = useWindowDimensions().width
  //!const modalWidth = isWeb ? STANDARD_WIDTH : windowWidth

  //* 스크린을 렌더링할때 최초실행됩니다.
  useLayoutEffect(() => {
    showEditButton() //* 편집버튼을 보여주는 상태로 설정합니다.
  }, [])
  console.log("mainscreen", route.params)

  const editable = route.params?.editable 
  //? params 에 있는 visible 을 delete 했고 editable로 다시 만들었는데 (변수명을 수정하기 위해 이렇게 함) console.log에는 잘 뜨고 가상머신에서 작동도 잘 되는데 코드에서만 editable을 찾을수 없다고 밑줄이 그어지고 params. 자동완성으로 아직 visible이 뜸 why? 
  //*console.log("visible screen", visible)
  //TODO 변수명 바꾸기
  const [nicknameInput, setNicknmaeInput] = useState("") //*닉네임 + 전화번호 인풋 (전화번호는 따로 빼기?)
  const [nicknameCount, setNicknameCount] = useState(2) //*닉네임 변경 횟수
  const [nicknameWarningMessage, setNicknameWarningMessage] = useState("") //*닉네임 입력이 조건에 안맞으면 띄우는 경고 메세지
  const [warningColor, setWarnigColor] = useState(MIDDLE_LINE) //*입력된 닉네임 조건 부합 여부에 따라 바뀌는 input 창 아래 border
  const [abletoSave, setAlbeToSave] = useState(false) //*입력된 닉네임 / 전화번호 모달창에서 저장버튼 누를수 있는지 없는지
  const [infoTouced, setInfoTouched] = useState(false) //*화면 닉네임 글자 옆 i 버튼 누르는것 체크
  const [phoneNumTouched, setPhoneNumTouched] = useState(false) //*전화번호 부분 눌렸는지 아닌지 체크
  const [phoneNum, setPhoneNum] = useState("") //* 전화번호 인풋
  //![^A-Za-z0-9_] ,[^\w_] 도 가능 . 필요에 따라 이걸로 교환도 가능. 차이점이 있다면..
  const checkNickname = (input) => {
    setNicknmaeInput(input)
    if (input.length === 0) {
      setNicknameWarningMessage("")
      setWarnigColor(MIDDLE_LINE)
      setAlbeToSave(false)
    }
    //* 닉네임 변환 카운트를 먼저 알려줘야 할거 같아서
    /*else if (nicknameCount === 3) {
      setNicknameWarningMessage("* 이번 달 수정 가능 횟수를 다 사용하셨습니다.")
      setAlbeToSave(false) //*3회 시 코드 -> 후에 변동 
    } */
    else if (/[^ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|_]/.test(input)) {
      setNicknameWarningMessage("* 언더바 제외, 특수문자, 이모티콘, 공백은 사용할 수 없습니다.")
      setWarnigColor(ERROR_RED)
      setAlbeToSave(false)
    } else {
      setNicknameWarningMessage("* 사용가능한 이름입니다!")
      setWarnigColor(SUCCESS_BLUE)
      setAlbeToSave(true)
    }
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
          //LayoutAnimation.configureNext(LayoutAnimation.create(0, "keyboard", "opacity"))
          position = "center"
          console.log("position", position)
          return position
        }
    }
  }

  return (
    <ScreenRootView preset={"fixed"}>
      <ImageBackground
        style={{
          marginTop: 20,
          width: 130,
          height: 130,
          borderRadius: 130 / 2,
          alignSelf: "center",
        }} //? width 를 곱하는것이 맞는지?
        source={images.my_profile_management_default}
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

      {/* //*닉네임 info 부분. 닉네임 옆의 more info 버튼으로 인해 컴포넌트로 이용하지 않음. 밑의 다른 info 들은 컴포넌트로 뺌.*/}
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
        {editable && nicknameCount < 3 ? (
          <Pressable
            onPress={() => {
              setTouched(true)
              //alert("touched")
            }}
          >
            <PreMed16 color={HEAD_LINE} text={`방울이엄마`} />
            {/* //*저장하기 버튼도 보이고 3번 안썼을때*/}
          </Pressable>
        ) : editable === true && nicknameCount === 3 ? (
          <PreMed16 color={DISABLED} text={`방울이엄마`} /> //*저장하기 버튼이 보이는데 3번 다 썼을때
        ) : (
          <PreMed16 color={HEAD_LINE} text={`방울이엄마`} /> //* editable이 아닐때. 즉 저장하기 버튼이 안보일때
        )}
        {/*//? marginRight 를 16으로 조절해야하는지? divisionline 을 적용시 디자인보다 오른쪽이 더 길어보임*/}
        <DivisionLine color={MIDDLE_LINE} style={{ marginTop: 4 }} />
        {infoTouced && (
          <ImageBackground
            source={images.speech_bubble}
            style={{
              width: 172,
              height: 50.03,
              position: "absolute",
              top: 18.5, //*'닉네임' 에서부터 18.5 떨어짐
              left: BASIC_BACKGROUND_PADDING_WIDTH, //*parent view 에 주어진 padding 만큼 띄우기
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <PreMed14
              text={`이번 달 수정 가능 횟수 ${nicknameCount}회`}
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
      <UserOrPetProfileInfo title={"생년월일"} profileInfo={"99.12.28"} color={editable} />
      {/*//? 이렇게 써도 작동이 되는것은 route.params 가 업데이트 될때마다 스크린 rerender, 그리고
      //?route.params 의 값을 받은 visable 이 들어간 컴포넌트들을 모두 리랜더링 시키기 때문이라고
            //?이해해도 되는것?*/}
      {/*editable ? (
        <UserOrPetProfileInfo title={"생년월일"} profileInfo={"99.12.28"} color={DISABLED} />
      ) : (
        <UserOrPetProfileInfo title={"생년월일"} profileInfo={"99.12.28"} color={HEAD_LINE} />
      )//*이전 코드 */}
      {/* //* 성별 */}
      <UserOrPetProfileInfo title={"성별"} profileInfo={"여"} color={editable} />
      {/* //* 이메일 */}
      <UserOrPetProfileInfo title={"이메일"} profileInfo={"hhh@gmail.com"} color={editable} />
      {/* //* 전화번호우 */}
      {editable ? (
        <Pressable onPress={() => setPhoneNumTouched(true)}>
          <UserOrPetProfileInfo title={"전화번호"} profileInfo={"010-0000-0000"} />
        </Pressable>
      ) : (
        <UserOrPetProfileInfo title={"전화번호"} profileInfo={"010-0000-0000"} />
      )}

      {/* //* visiabillity Test */}
      {/* //* Ternary: 조건  ? 충족 : 불충족 */}
      {/* {editable ? (
      {editable ? (
        <ConditionalButton
          label="저장하기"
          isActivated={true}
          style={{
            marginTop: "auto",
          }}
          onPress={() => {
            // alert("saved")
            showEditButton() //* 저장하기를 누르면, 편집버튼이 보여야 합니다
          }}
        />
      ) : null} */}
      {editable && (
        <ConditionalButton
          label="저장하기"
          isActivated={true}
          style={{
            marginTop: "auto",
            marginBottom: 0,
          }}
          onPress={() => {
            // alert("saved")
            showEditButton() //* 저장하기를 누르면, 편집버튼이 보여야 합니다
          }}
        />
      )}

      {/*//*modal 창 따로 뺌. -> 모달이 스크린 전체를 parent 로 삼는다면 -> 여기선 keyboardavoidigView flex : 1 이 그걸 해줌? 모달이 컴포넌트 내에서 어디 있어도 상관없음 */}
      {/* //?그렇다면 질문 :  modal 이 어떤 컴포넌트 안의 자식으로 있어서 flex : 1 을 해도 그 컴포넌트 크기 안에 갇힌다면 ? 위의 주석처리 해놓은, info 버튼 눌렀을때의 모달 창으로 말풍선 띄우기 시도 참고 */}
      <Modal animationType="fade" transparent={true} visible={touched}>
        {/* //* Modal Backgound View */}
        {/* //*모달 바깥쪽 터치시 사용 */}
        {/*  <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            setTouched(false)
          }}
          //?activeOpacity={0.2} -> default : 0.2 가 괜찮아 보여서 냅뒀는데 값 조정? 
          //?touchableOpacity 보다 pressable 이 더 범용성이 넓어서 이를 우리 프로젝트에서도 많이 쓴거 같은데 이에 대한 질문 
          //? 언제 touchableOpacity 쓰고 언제 Pressable 쓸지 ? 
        >*/}
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
              //justifyContent: "center",
              // alignSelf: "center",
              marginTop: "auto",
              alignItems: "center",
              //justifyContent: "flex-end", //*iskeyboardshown : flexend not center
              justifyContent: handlePosition(),
              backgroundColor: "rgba(0,0,0,0.25)",

              // position: "absolute",
              // backgroundColor: "red",
            }}
          >
            <View
              style={{
                //width: modalWidth - 16 * 2,
                //alignItems: "center",
                width: DEVICE_SCREEN_WIDTH - 2 * BASIC_BACKGROUND_PADDING_WIDTH,
                paddingTop: 36,
                paddingBottom: 16,
                paddingHorizontal: 16,
                height: 226,
                borderRadius: 8,
                backgroundColor: palette.white,
                marginBottom: 60,
                //opacity: 1,
              }}
            >
              <View
                style={{
                  //paddingHorizontal: 24,
                  paddingHorizontal: 10,
                }}
              >
                <PreBol18 color={HEAD_LINE} text={"이름"} />
                <TextInput
                  style={{
                    paddingTop: 43, //?
                    //backgroundColor: palette.black,
                  }}
                  placeholder="닉네임을 입력해주세요."
                  onChangeText={(newText) => checkNickname(newText)}
                  value={nicknameInput}
                />
                <DivisionLine color={warningColor} style={{ marginTop: 4 }} /> 
                {/* //?useState 안써도 되는데 UseState 쓰게 바꿔야 할지?  */}
                {<PreReg12 text={nicknameWarningMessage} color={warningColor} />}
              </View>

              <ConditionalButton
                label="확인"
                isActivated={abletoSave}
                style={{
                  marginTop: "auto",
                }}
                onPress={() => {
                  alert("saved")
                  setTouched(false)
                }}
              />
            </View>
          </KeyboardAvoidingView>
        </Pressable>
        {/*</TouchableOpacity>*/}
      </Modal>

      {/*//*두번째 모달창 : 전화번호우  */}
      <Modal
        animationType="none"
        transparent={true}
        visible={phoneNumTouched}

        /*onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
          //setModalVisible(false);
        }*/
      >
        {/* //* Modal Backgound View */}
        {/* //*모달 바깥쪽 터치시 사용 */}

        <Pressable
          style={{ flex: 1 }}
          onPress={() => {
            setPhoneNumTouched(false)
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"} //* iOS 에서 키보드에 모달 안 가리게 하기 ref: https://stackoverflow.com/questions/64961683/in-react-native-how-can-i-use-keyboardavoidingview-with-a-modal-in-ios
            style={{
              width: DEVICE_SCREEN_WIDTH,
              flex: 1,
              marginTop: "auto",
              marginBottom: "auto",
              alignItems: "center",
              justifyContent: handlePosition(),
              backgroundColor: "rgba(0,0,0,0.25)",
            }}
          >
            <View
              style={{
                width: DEVICE_SCREEN_WIDTH - 2 * BASIC_BACKGROUND_PADDING_WIDTH,
                paddingTop: 36,
                paddingBottom: 16,
                paddingHorizontal: 16,
                height: 226,
                borderRadius: 8,
                backgroundColor: palette.white,
                marginBottom: 60,
              }}
            >
              <View
                style={{
                  paddingHorizontal: 10,
                }}
              >
                <PreBol18 color={HEAD_LINE} text={"전화번호"} />
                <TextInput
                  style={{
                    paddingTop: 43, //?
                  }}
                  placeholder="전화번호를 입력해주세요."
                  onChangeText={setPhoneNum}
                  value={phoneNum}
                />
                <DivisionLine color={MIDDLE_LINE} style={{ marginTop: 4 }} />
              </View>

              <ConditionalButton
                label="확인"
                isActivated={phoneNum.length > 0}
                style={{
                  marginTop: "auto",
                }}
                onPress={() => {
                  alert("saved")
                  setPhoneNumTouched(false)
                }}
              />
            </View>
          </KeyboardAvoidingView>
        </Pressable>

        {/*</TouchableOpacity>*/}
      </Modal>
    </ScreenRootView>
  )
})

//*일단 닉네임 부분은 유저 이름으로 불러오기. -> 세팅 화면부터 먼저 만ㅡ었어야 할것 같지만... 이걸 먼저 했기 때문에..
//* mst 필요? mst 만들어서 유저 정보들 좌라라락 넣기 -> update 되는 함수는 아직 모르겠음. flow 가 안나와서 .
//* 유저 정보 어떻게 넣나? 로그인 된 유저 토큰은 무엇?
//* rest api 공부 -> mst 안에 넣기
//* 연필 눌렀을 때 화면 바뀌는 부분 구현
//* 닉네임 눌렀을 때 화면 바뀌는 부분 구현

//TODO - 스크린 이름 바꾸기
