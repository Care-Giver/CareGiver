import React, { FC, useState } from "react"
import { Image, Platform, Pressable, View } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  ConditionalButton,
  PreBol20,
  PreMed14,
  PreMed16,
  RegisterTextInput,
  Row,
  Screen,
} from "#components"
import { BODY, BOTTOM_HEIGHT, DISABLED, GIVER_CASUAL_NAVY, MIDDLE_LINE } from "#theme"
import { images } from "#images"
import { styles } from "./styles"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { signUp } from "#axios"
import { alertModal } from "../../utils/alert-modal"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
type Sex = "male" | "female"

export const RegisterScreen: FC<StackScreenProps<NavigatorParamList, "register-screen">> = observer(
  function RegisterScreen({ navigation }) {
    // MST store 를 가져옵니다.
    // const { someStore, anotherStore } = useStores()

    // 필요시, useNavigation 훅을 사용할 수 있습니다.
    // const navigation = useNavigation()

    const [nickname, setNickname] = useState<string>("")
    const [birthday, setBirthday] = useState<string>("")
    const [sex, setSex] = useState<Sex>(null)
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [certification, setCertification] = useState<string>("")
    // const [isCertificated, setIsCertificated] = useState(false) //TODO: setIsCertificated 을 "인증번호" 컴포넌트에 넣을 것
    const isCertificated = true //TODO: 인증번호 검증 기능 추가

    //* 인증번호가 맞다면 활성화
    //TODO 인증번호 로직이 완성되면 코드 추가하면 될 것 같습니다.
    // const [isActivated, setIsActivated] = useState<boolean>(true)
    // 소프트웨어 키보드 올라옴 여부
    const [isKeyboardShown, setIsKeyboardShown] = useState(false)

    // "다음" 버튼 표시 여부
    //  1. ios 의 경우, 키보드가 "다음 버튼"을 항상 덮어씌우므로 별도의 로직이 필요없음. 항상 true
    //  2. android 의 경우, 키보드 바로 위에 "다음 버튼" 표출됨. 따라서, 조건부로 표출해야 함. 키보드가 올라오면 false, 내려가면 true
    const isNextButtonShown = Platform.select({
      ios: true,
      android: !isKeyboardShown,
    })

    const isActivated = !!nickname && !!birthday && !!sex && !!phoneNumber && !!isCertificated

    const nextButtonHandler = async () => {
      // 회원가입 진행 - TODO: 각각의 소셜 Provider 에서 얻은 데이터들을 넣어줘야 함
      const signUpResult = await signUp({
        nickname,
        birthday,
        provider: "google", // 일단 구글로 하드코딩함
        idToken: "blah-blah-blah", //일단 하드코딩
        email: "blah@test.com", //일단 하드코딩
      })

      //  실패
      if (!signUpResult.isSuccess) {
        alertModal("회원가입 실패", `사유: ${signUpResult.reason}`)
        return
      }

      // 성공
      navigation.replace("register-success-screen")
    }

    return (
      <Screen testID="Register" type="View">
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          // onKeyboardWillShow={(e) => { // ios 만 지원되는 prop 임
          //   console.log("onKeyboardWillShow", e)
          // }}
          onKeyboardDidShow={() => {
            setIsKeyboardShown(true)
          }}
          // onKeyboardWillHide={(e) => { // ios 만 지원되는 prop 임
          //   console.log("onKeyboardWillHide", e)
          // }}
          onKeyboardDidHide={() => {
            // 시간지연 없이 바로 실행하면, 버튼 렌더링이  어색함
            setTimeout(() => {
              setIsKeyboardShown(false)
            }, 100)
          }}
        >
          <PreBol20 text={"계정 생성에\n필요한 정보를 입력해주세요"} mt={20} mb={40} />
          <RegisterTextInput
            placeholder="활동하게 될 닉네임을 입력해주세요."
            title="닉네임(필수)"
            value={nickname}
            setValue={setNickname}
          />
          <RegisterTextInput
            placeholder="보호자님의 생년월일을 입력해주세요. 예)20010313"
            title="생년월일(필수)"
            value={birthday}
            setValue={setBirthday}
            keyboardType="number-pad"
          />

          <PreMed14 text="성별" color={BODY} style={{ marginBottom: 8 }} />
          <Row style={{ marginBottom: 36, justifyContent: "space-between" }}>
            {/* // ? 남자 버튼 */}

            <Pressable
              style={[
                styles.radioContainer,
                {
                  borderColor: sex === "male" ? GIVER_CASUAL_NAVY : MIDDLE_LINE,
                },
              ]}
              onPress={() => setSex("male")}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={sex === "male" ? images.radio_active : images.radio_inactive}
                  style={styles.radioImg}
                />
                <PreMed16
                  style={{ marginLeft: 6 }}
                  text="남자"
                  color={sex === "male" ? GIVER_CASUAL_NAVY : DISABLED}
                />
              </View>
            </Pressable>

            {/* // ? 여자 버튼 */}
            <Pressable
              style={[
                styles.radioContainer,
                {
                  borderColor: sex === "female" ? GIVER_CASUAL_NAVY : MIDDLE_LINE,
                },
              ]}
              onPress={() => setSex("female")}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={sex === "female" ? images.radio_active : images.radio_inactive}
                  style={styles.radioImg}
                />
                <PreMed16
                  style={{ marginLeft: 6 }}
                  text="여자"
                  color={sex === "female" ? GIVER_CASUAL_NAVY : DISABLED}
                />
              </View>
            </Pressable>
          </Row>

          <RegisterTextInput
            placeholder="휴대폰 번호(-없이 숫자만 입력)"
            title="휴대폰 번호"
            value={phoneNumber}
            setValue={setPhoneNumber}
            keyboardType="number-pad"
          />
          <RegisterTextInput
            // placeholder="인증번호를 입력해주세요."
            placeholder="(인증번호 검증 기능은 현재 미구현 상태 입니다.)"
            title="인증번호"
            value={certification}
            setValue={setCertification}
            keyboardType="number-pad"
          />
        </KeyboardAwareScrollView>

        {isNextButtonShown && (
          <ConditionalButton
            label="계정 생성하기"
            isActivated={isActivated}
            style={{ position: "absolute", bottom: BOTTOM_HEIGHT, alignSelf: "center" }}
            //TODO navigation추가 필요
            onPress={nextButtonHandler}
          />
        )}
      </Screen>
    )
  },
)
