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
} from "#components"
import { useKeyboard } from "@react-native-community/hooks"
import { images } from "#images"
//import { PRETENDARD_REGULAR } from "~/assets/fonts"
import { NavigationContainer } from "@react-navigation/native"

export const MyProfileManagementScreen: FC<
  StackScreenProps<NavigatorParamList, "my-profile-management-screen">
> = observer(({ navigation, route }) => {
  const [visiable, setVisable] = useState(true)

  useLayoutEffect(() => {
    navigation.setOptions({
      /*
      headerRight: () => ({
        visiable ? (
          <Pressable
            //onPress={() => setVisable((prev) => !prev)}
            style={{
              marginLeft: "auto",
              marginRight: 8, //!
            }}
          >
            <Image style={{ width: 28, height: 28 }} source={images.pencil} />
          </Pressable>
        ) : null

      }
      ),
      */
      headerRight: () => (
        <Pressable
          onPress={() => setVisable((prev) => !prev)}
          style={{
            marginLeft: "auto",
            marginRight: 8, //!
          }}
        >
          <Image style={{ width: 28, height: 28 }} source={images.pencil} />
        </Pressable>
      ),

      //visiable
      //? 아래와 같이 쓰면 안되는 이유?
      /*headerRight: () => (
        {visiable?  (<Pressable
          onPress={() => setVisable((prev) => !prev)}
          style={{
            marginLeft: "auto",
            marginRight: 8, //!
          }}
        >
          <Image style={{ width: 28, height: 28 }} source={images.pencil} />
        </Pressable>) : null }
       
      ),*/
    })
  }, [visiable])

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
        <PreMed16 color={HEAD_LINE} text={`방울이엄마`} />
        {/*//? marginRight 를 16으로 조절해야하는지? divisionline 을 적용시 디자인보다 오른쪽이 더 길어보임*/}
        <DivisionLine color={MIDDLE_LINE} style={{ marginTop: HEIGHT * 4 }} />
      </View>

      {/* //* 생년월일 */}
      <UserOrPetProfileInfo title={"생년월일"} profileInfo={"99.12.28"} />

      {/* //* 성별 */}
      <UserOrPetProfileInfo title={"성별"} profileInfo={"여"} />

      {/* //* 이메일 */}
      <UserOrPetProfileInfo title={"이메일"} profileInfo={"hhh@gmail.com"} />

      {/* //* 전화번호우 */}
      <UserOrPetProfileInfo title={"전화번호"} profileInfo={"010-0000-0000"} />

      {/* //* visiabillity Test */}
      {visiable ? (
        <ConditionalButton
          label="저장하기"
          isActivated={true}
          style={{
            marginTop: "auto",
          }}
          onPress={() => {
            alert("saved")
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
