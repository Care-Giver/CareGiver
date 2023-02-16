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
//import { PRETENDARD_REGULAR } from "~/assets/fonts"

export const MyProfileManagementScreen: FC<
  StackScreenProps<NavigatorParamList, "my-profile-management-screen">
> = observer(({ navigation, route }) => {
  console.log("route @MyProfileManagementScreen", route)

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
  console.log("visible screen", visible)
  const [text, setText] = React.useState("")
  const [changeCount, onChangeChangeCount] = React.useState(1)
  const [nicknameMessage, setNicknameMessage] = React.useState("")
  const [warningColor, setWarnigColor] = React.useState("")
  //![^A-Za-z0-9_] 도 가능 . 필요에 따라 이걸로 교환도 가능. 차이점이 있다면..
  const checkNickname = (input) => {
    setText(input)
    if (/[^\w_]/.test(input)) {
      console.log("specialsymbols!")
      setNicknameMessage("* 언더바 제외, 특수문자, 이모티콘, 공백은 사용할 수 없습니다.")
      setWarnigColor(palette.orange)
    }
    //*중복 기능 구현
    else if (changeCount === 3) {
      setNicknameMessage("* 이번 달 수정 가능 횟수를 다 사용하셨습니다.")
    } else {
      setNicknameMessage("* 사용가능한 이름입니다!")
      setWarnigColor(palette.deepPurple)
    }
  }

  //* 편집버튼 보이기
  const showEditButton = () => {
    navigation.setParams({
      visible: false,
    })
  }

  return (
    <ScreenRootView preset="fixed">
      <Image
        style={{
          marginTop: HEIGHT * 20,
          width: WIDTH * 130,
          height: HEIGHT * 130,
          borderRadius: (WIDTH * 130) / 2,
          alignSelf: "center",
        }} //? width 를 곱하는것이 맞는지?
        source={images.my_profile_management_default}
      />
      {/* //*닉네임 info 부분. 닉네임 옆의 more info 버튼으로 인해 컴포넌트로 이용하지 않음. 밑의 다른 info 들은 컴포넌트로 뺌.*/}
      <View style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH, marginTop: HEIGHT * 20 }}>
        <Row style={{ marginBottom: HEIGHT * 10 }}>
          <PreMed14 color={BODY} text={`닉네임`} />
          <Pressable
            onPress={() => {
              alert("hi")
            }}
          >
            <Image
              source={images.more_info_bigger}
              style={{ width: WIDTH * 16, height: HEIGHT * 16, marginLeft: WIDTH * 4 }}
            />
          </Pressable>
        </Row>
        {visible ? (
          <Pressable
            onPress={() => {
              setTouched(true)
              //alert("touched")
            }}
          >
            <PreMed16 color={HEAD_LINE} text={`방울이엄마`} />
          </Pressable>
        ) : (
          <PreMed16 color={HEAD_LINE} text={`방울이엄마`} />
        )}
        {/*//? marginRight 를 16으로 조절해야하는지? divisionline 을 적용시 디자인보다 오른쪽이 더 길어보임*/}
        <DivisionLine color={MIDDLE_LINE} style={{ marginTop: HEIGHT * 4 }} />
      </View>

      <Modal
        animationType="fade"
        transparent={false}
        visible={touched}
        /*onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
          //setModalVisible(false);
        }*/
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: MIDDLE_LINE,
          }}
        >
          <View
            style={{
              width: modalWidth - 16 * 2,
              //alignItems: "center",
              paddingTop: 36,
              paddingBottom: 16,
              paddingHorizontal: 16,
              height: 226,
              borderRadius: 8,
              backgroundColor: palette.white,
            }}
          >
            <View
              style={{
                paddingHorizontal: 24,
              }}
            >
              <PreBol18 color={HEAD_LINE} text={"이름"} />
              <TextInput
                style={{
                  paddingTop: 43,
                  //backgroundColor: palette.black,
                }}
                placeholder="닉네임을 입력해주세요."
                onChangeText={(newText) => checkNickname(newText)}
                value={text}
              />
              <DivisionLine color={MIDDLE_LINE} style={{ marginTop: HEIGHT * 4 }} />
              <PreReg12 text={nicknameMessage} color={warningColor} />
            </View>

            <ConditionalButton
              label="확인"
              isActivated={true}
              style={{
                marginTop: "auto",
              }}
              onPress={() => {
                alert("saved")
                setTouched(false)
              }}
            />
          </View>
        </View>
      </Modal>

      {/* //* 생년월일 */}
      {visible ? (
        <Pressable
          onPress={() => {
            setTouched(true)
            alert("touched")
          }}
        >
          <UserOrPetProfileInfo title={"생년월일"} profileInfo={"99.12.28"} />
        </Pressable>
      ) : (
        <UserOrPetProfileInfo title={"생년월일"} profileInfo={"99.12.28"} />
      )}

      <UserOrPetProfileInfo title={"생년월일"} profileInfo={"99.12.28"} />

      {/* //* 성별 */}
      <UserOrPetProfileInfo title={"성별"} profileInfo={"여"} />

      {/* //* 이메일 */}
      <UserOrPetProfileInfo title={"이메일"} profileInfo={"hhh@gmail.com"} />

      {/* //* 전화번호우 */}
      <UserOrPetProfileInfo title={"전화번호"} profileInfo={"010-0000-0000"} />

      {/* //* visiabillity Test */}
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
      ) : null}
    </ScreenRootView>
  )
})

//*일단 닉네임 부분은 유저 이름으로 불러오기. -> 세팅 화면부터 먼저 만ㅡ었어야 할것 같지만... 이걸 먼저 했기 때문에..
//* mst 필요? mst 만들어서 유저 정보들 좌라라락 넣기 -> update 되는 함수는 아직 모르겠음. flow 가 안나와서 .
//* 유저 정보 어떻게 넣나? 로그인 된 유저 토큰은 무엇?
//* rest api 공부 -> mst 안에 넣기
//* 연필 눌렀을 때 화면 바뀌는 부분 구현
//* 닉네임 눌렀을 때 화면 바뀌는 부분 구현
