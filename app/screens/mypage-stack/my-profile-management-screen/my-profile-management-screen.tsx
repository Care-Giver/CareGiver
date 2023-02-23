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
  HEIGHT,
  WIDTH,
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
//import { PRETENDARD_REGULAR } from "~/assets/fonts"

export const MyProfileManagementScreen: FC<
  StackScreenProps<NavigatorParamList, "my-profile-management-screen">
> = observer(({ navigation, route }) => {
  //*console.log("route @MyProfileManagementScreen", route)

  // const [visible, setVisable] = useState(true)
  const [touched, setTouched] = useState(false)
  //!const windowWidth = useWindowDimensions().width
  //!const modalWidth = isWeb ? STANDARD_WIDTH : windowWidth
  const modalWidth = 358

  // useLayoutEffect(() => {
  //     //visible
  //     //? 아래와 같이 쓰면 안되는 이유?
  //     //! FEEDBACK: -> headerRight prop 은 return 값이 있어야 합니다. null 때문에 문제가 생긴것입니다 :)
  //     /*headerRight: () => (
  //       {visible?  (<Pressable
  //         onPress={() => setVisable((prev) => !prev)}
  //         style={{
  //           marginLeft: "auto",
  //           marginRight: 8, //!
  //         }}
  //       >
  //         <Image style={{ width: 28, height: 28 }} source={images.pencil} />
  //       </Pressable>) : null }

  //     ),*/
  //   })
  // }, [visible])

  //* 스크린을 렌더링할때 최초실행됩니다.
  useLayoutEffect(() => {
    showEditButton() //* 편집버튼을 보여주는 상태로 설정합니다.
  }, [])

  const visible = route.params?.visible //? 저장 버튼 누를때마다 visiable 변수가 자동으로 자신의 state 를 바꾸는것 -> 함수가 없어도 params 와 연결되어 있어서 가능한것?
  //*console.log("visible screen", visible)
  const [text, setText] = React.useState("")
  const [changeCount, onChangeChangeCount] = React.useState(2)
  const [nicknameMessage, setNicknameMessage] = React.useState("")
  const [warningColor, setWarnigColor] = React.useState(MIDDLE_LINE) //TODO ? React 써여하나? 그냥 useState 하면 안됨?
  const [abletoSave, setAlbeToSave] = React.useState(false)
  const [infoTouced, setInfoTouched] = useState(false)
  //![^A-Za-z0-9_] ,[^\w_] 도 가능 . 필요에 따라 이걸로 교환도 가능. 차이점이 있다면..
  const checkNickname = (input) => {
    setText(input)
    if (input.length === 0) {
      setNicknameMessage("")
      setWarnigColor(MIDDLE_LINE)
      setAlbeToSave(false)
    }
    //* 닉네임 변환 카운트를 먼저 알려줘야 할거 같아서
    /*else if (changeCount === 3) {
      setNicknameMessage("* 이번 달 수정 가능 횟수를 다 사용하셨습니다.")
      setAlbeToSave(false) //*3회 시 코드 -> 후에 변동 
    } */
    else if (/[^ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|_]/.test(input)) {
      //console.log("specialsymbols!")
      setNicknameMessage("* 언더바 제외, 특수문자, 이모티콘, 공백은 사용할 수 없습니다.")
      setWarnigColor(ERROR_RED)
      setAlbeToSave(false)
    } else {
      setNicknameMessage("* 사용가능한 이름입니다!")
      setWarnigColor(SUCCESS_BLUE)
      setAlbeToSave(true)
    }
  }

  //* 편집버튼 보이기
  const showEditButton = () => {
    navigation.setParams({
      visible: false,
    })
  }
  const [keyboardStatus, setKeyboardStatus] = useState(undefined)
  const keyboard = useKeyboard()

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
  }, []) //TODO : keyboard 관련 더 공부. 쓸데없는 코드 쳐내기
  //TODO : height, width 곱한거 다 지우기

  const handleMargin = () => {
    let marginNumber = 0
    let marginString = ""

    switch (Platform.OS) {
      case "android":
        //*android 에선 keyboardWillShow 사용 못함
        if (keyboard.keyboardShown) {
          marginNumber = 60
          console.log("marginNumber", marginNumber)
          console.log("marginString", marginString)
          return marginNumber
        } else {
          marginString = "auto"
          console.log("marginNumber", marginNumber)
          console.log("marginString", marginString)
          return marginString
        }

      case "ios":
        if (keyboardStatus === "Keyboard will Show") {
          marginNumber = 60
          console.log("marginNumber", marginNumber)
          console.log("marginString", marginString)
          return marginNumber
        } else {
          marginString = "auto"
          console.log("marginNumber", marginNumber)
          console.log("marginString", marginString)
          return marginString
        }

      /*case "web":
          
      position = "center"
       
      return position*/
    }
  }
  const handlePosition = () => {
    let position = ""

    switch (Platform.OS) {
      case "android":
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

  return (
    <ScreenRootView preset={"fixed"}>
      <ImageBackground
        style={{
          marginTop: HEIGHT * 20,
          width: WIDTH * 130,
          height: HEIGHT * 130,
          borderRadius: (WIDTH * 130) / 2,
          alignSelf: "center",
        }} //? width 를 곱하는것이 맞는지?
        source={images.my_profile_management_default}
      >
        {visible && (
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
          marginTop: HEIGHT * 20,
          //backgroundColor: "red",
        }}
      >
        <Row style={{ marginBottom: HEIGHT * 10 }}>
          <PreMed14 color={BODY} text={`닉네임`} style={{ marginRight: 4 }} />
          <Pressable
            onPress={() => {
              //alert("hi")
              setInfoTouched(true)
              console.log("!!!!!!!!TOUCHED!!!!!")
            }}
            style={{ backgroundColor: "red" }}
          >
            <Image
              source={images.more_info_bigger}
              style={{ width: WIDTH * 16, height: HEIGHT * 16 }}
            />

            {infoTouced && (
              <Image
                source={images.speech_bubble}
                style={{
                  width: 172,
                  height: 50.03,
                  position: "absolute",
                  left: -39, //* info 버튼 x = 55, 말풍선 x = 16 -> 차이는 39
                  bottom: -52.53, //*말풍선 height 50.03 + 인포 버튼 사이 빈틈 2.5
                }}
              />
            )}
          </Pressable>
          {/*//? 이렇게 modal 창이 자식으로 안에 있을때 모달창은 어떻게 작동하고 그 parent 위치에 맞춰서 모달창이 생길순 없는건지?*/}

          {/*//? 아래의 view 의 경우 row 컴포넌트 밑의, 다음 컴포넌트 인 '방울이 엄마' 보다 먼저 그려져서 그런지 방울이 엄마 글자 뒤에 배경처럼 들어감. 먼저 그려진 컴포넌트가 그 다음 컴포넌트 위에 그려지기 위해선 position 조절밖에 없는가? 다음 컴포넌트와는 parent 관계가 아니니 이 경우엔 불가능해보이는데 이를 해결할 방법이 궁금해졌음*/}
          <View
            style={{
              backgroundColor: "pink",
              padding: 30,
              position: "absolute",
              left: -39, //* info 버튼 x = 55, 말풍선 x = 16 -> 차이는 39
              bottom: -52.53, //*말풍선 height 50.03 + 인포 버튼 사이 빈틈 2.5
            }}
          >
            <Modal animationType="fade" transparent={true} visible={true}>
              <View
                style={{
                  //flex: 1,
                  padding: 100,
                  backgroundColor: "blue",
                  alignContent: "center",
                  alignItems: "center",

                  position: "absolute",
                  left: -39, //* info 버튼 x = 55, 말풍선 x = 16 -> 차이는 39
                  bottom: -52.53, //*말풍선 height 50.03 + 인포 버튼 사이 빈틈 2.5
                }}
              >
                <Image
                  source={images.speech_bubble}
                  style={{
                    width: 172,
                    height: 50.03,
                  }}
                />
              </View>
            </Modal>
          </View>
        </Row>
        {visible && changeCount < 3 ? (
          <Pressable
            onPress={() => {
              setTouched(true)
              //alert("touched")
            }}
          >
            <PreMed16 color={HEAD_LINE} text={`방울이엄마`} />
            {/* //*저장하기 버튼도 보이고 3번 안썼을때*/}
          </Pressable>
        ) : visible === true && changeCount === 3 ? (
          <PreMed16 color={DISABLED} text={`방울이엄마`} /> //*저장하기 버튼이 보이는데 3번 다 썼을때
        ) : (
          <PreMed16 color={HEAD_LINE} text={`방울이엄마`} /> //* visible이 아닐때. 즉 저장하기 버튼이 안보일때
        )}
        {/*//? marginRight 를 16으로 조절해야하는지? divisionline 을 적용시 디자인보다 오른쪽이 더 길어보임*/}
        <DivisionLine color={MIDDLE_LINE} style={{ marginTop: HEIGHT * 4 }} />
      </View>

      {/* //* 생년월일 */}
      <UserOrPetProfileInfo title={"생년월일"} profileInfo={"99.12.28"} color={visible} />
      {/*//? 이렇게 써도 작동이 되는것은 route.params 가 업데이트 될때마다 스크린 rerender, 그리고
      //?route.params 의 값을 받은 visable 이 들어간 컴포넌트들을 모두 리랜더링 시키기 때문이라고
            //?이해해도 되는것?*/}
      {/*visible ? (
        <UserOrPetProfileInfo title={"생년월일"} profileInfo={"99.12.28"} color={DISABLED} />
      ) : (
        <UserOrPetProfileInfo title={"생년월일"} profileInfo={"99.12.28"} color={HEAD_LINE} />
      )//*이전 코드 */}
      {/* //* 성별 */}
      <UserOrPetProfileInfo title={"성별"} profileInfo={"여"} color={visible} />
      {/* //* 이메일 */}
      <UserOrPetProfileInfo title={"이메일"} profileInfo={"hhh@gmail.com"} color={visible} />
      {/* //* 전화번호우 */}
      <UserOrPetProfileInfo title={"전화번호"} profileInfo={"010-0000-0000"} />

      {/* //* visiabillity Test */}
      {/* //* Ternary: 조건  ? 충족 : 불충족 */}
      {/* {visible ? (
      {visible ? (
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
      {visible && (
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={touched}

        /*onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
          //setModalVisible(false);
        }*/
      >
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
              marginBottom: handleMargin(), //*iskeyboardwhown : 60, not auto
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
                  value={text}
                />
                <DivisionLine color={warningColor} style={{ marginTop: HEIGHT * 4 }} />
                {<PreReg12 text={nicknameMessage} color={warningColor} />}
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
//TODO - variable name change. (visiable , etc .. )
