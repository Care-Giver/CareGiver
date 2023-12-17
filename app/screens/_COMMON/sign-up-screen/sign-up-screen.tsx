import React, { FC, useEffect, useMemo, useState } from "react"
import { Image, Platform, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  ConditionalButton,
  PreBol20,
  PreMed14,
  PreMed16,
  SignUpTextInput,
  Row,
  Screen,
} from "#components"
import { BODY, BOTTOM_HEIGHT, DISABLED, GIVER_CASUAL_NAVY, MIDDLE_LINE } from "#theme"
import { images } from "#images"
import { styles } from "./styles"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { signUp } from "#axios"
import { alertModal } from "../../../utils/alert-modal"
import { useTimer } from "react-timer-hook"
import dayjs from "dayjs"
import { useStores } from "#models"
import { delay } from "../../../utils/delay"
import { isBefore, isExists, isFuture } from "date-fns"

type Sex = "MALE" | "FEMALE"

const TIMER_DURATION = 60

export const SignUpScreen: FC<StackScreenProps<NavigatorParamList, "sign-up-screen">> = observer(
  function SignUpScreen({ navigation, route }) {
    const {
      userStore: { loginHander },
    } = useStores()
    const { consentList, email, provider, idToken } = route.params
    console.log("route.params", route.params)

    // 소프트웨어 키보드 올라옴 여부
    const [isKeyboardShown, setIsKeyboardShown] = useState(false)

    const [nickname, setNickname] = useState<string>("")
    const [birthday, setBirthday] = useState<string>("")
    const [sex, setSex] = useState<Sex>(null)
    const [phoneNumber, setPhoneNumber] = useState<string>("")
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

    useEffect(() => {
      if (isSendingSMS) {
        restart(dayjs().add(TIMER_DURATION, "second").toDate())
      } else {
        pause()
      }
    }, [isSendingSMS])

    // "계정 생성하기" 버튼 표시 여부
    //  1. ios 의 경우, 키보드가 "다음 버튼"을 항상 덮어씌우므로 별도의 로직이 필요없음. 항상 true
    //  2. android 의 경우, 키보드 바로 위에 "다음 버튼" 표출됨. 따라서, 조건부로 표출해야 함. 키보드가 올라오면 false, 내려가면 true
    const isSignUpButtonShown = Platform.select({
      ios: true,
      android: !isKeyboardShown,
    })

    // "계정 생성하기" 버튼 활성화 여부
    //  - 닉네임, 생년월일, 성별, 휴대폰번호, 인증번호가 모두 입력되었는지 확인
    //  - 인증번호가 입력되었으면, 인증번호가 맞는지 확인
    // 생년월일 길이는 8 + 2 (대시 '-' 2개)
    // 휴대폰번호 길이는 11 + 2 (대시 '-' 2개)
    const isActivated = useMemo(() => {
      // 생년월일 검증
      let isValidBirthday = false
      if (birthday.length === 8 + 2) {
        const year = Number(String(birthday).substring(0, 4))
        const month = Number(String(birthday).substring(5, 7)) - 1 //! Date object 에서 month 는 0 부터 시작한다.
        const date = Number(String(birthday).substring(8, 10))

        // 존재 하지 않는 년/월/일 이면 거른다.
        if (!isExists(year, month, date)) {
          return false
        }
        // 미래인 경우, 거른다.
        const birthdayDate = new Date(year, month, date)
        if (isFuture(birthdayDate)) {
          return false
        }
        // 1900.01.01 보다 과거이면 거른다.
        if (isBefore(birthdayDate, new Date(1900, 0, 1))) {
          return false
        }

        // 모든 걸 다 패스하면, null 리턴 ( === 검증 완료)
        isValidBirthday = true
      }

      return nickname && isValidBirthday && sex && phoneNumber.length === 11 + 2 && isVerified
    }, [birthday, isVerified, nickname, phoneNumber.length, sex])

    const nextButtonHandler = async () => {
      // const email = `${dayjs().unix()}@test.com` //일단 하드코딩 - TODO: 이전 스크린에서 받아온 값으로 대체할 것
      // const provider = "naver" // 일단 하드코딩함 - TODO: 이전 스크린에서 받아온 값으로 대체할 것
      // const idToken = `test-idtoken-${dayjs().unix()}` //일단 하드코딩 - TODO: 이전 스크린에서 받아온 값으로 대체할 것

      // 회원가입 진행
      // TODO: 각각의 소셜 Provider 에서 얻은 데이터들을 넣어줘야 함
      const signUpResult = await signUp({
        email,
        nickname,
        provider,
        idToken,
        birthday,
        phoneNumber: phoneNumber.replace(/-/g, ""),
        sex,

        ...consentList,
      })

      //  실패
      if (!signUpResult.isSuccess) {
        alertModal("회원가입 실패", `사유: ${signUpResult.reason}`)
        return
      }

      // 성공
      navigation.replace("sign-up-success-screen")
      await delay(3000)
      loginHander({
        email,
        nickname,
        provider,
        OAuthId: idToken,
      })
    }

    return (
      <Screen testID="Register" type="View">
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          enableOnAndroid
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
            // 시간지연 없이 바로 실행하면, 안드로이드에서 버튼 렌더링이 어색함
            setTimeout(() => {
              setIsKeyboardShown(false)
            }, 100)
          }}
        >
          <PreBol20 text={"계정 생성에\n필요한 정보를 입력해주세요"} mt={20} mb={40} />

          {/* 닉네임 기입 */}
          <SignUpTextInput
            placeholder="활동하게 될 닉네임을 입력해주세요."
            title="닉네임(필수)"
            value={nickname}
            setValue={setNickname}
            textInputProps={{
              returnKeyType: "done",
            }}
            marginBottom={36}
          />

          {/* 생년월일 기입 */}
          <SignUpTextInput
            placeholder="보호자님의 생년월일을 입력해주세요. 예)20010313"
            title="생년월일(필수)"
            value={birthday}
            setValue={setBirthday}
            textInputProps={{
              keyboardType: "number-pad",
              returnKeyType: "done",
            }}
            marginBottom={36}
          />

          {/* 성별 기입 */}
          <PreMed14 text="성별" color={BODY} style={{ marginBottom: 8 }} />
          <Row style={{ marginBottom: 36, justifyContent: "space-between" }}>
            {/* // ? 남자 버튼 */}
            <Pressable
              style={[
                styles.radioContainer,
                {
                  borderColor: sex === "MALE" ? GIVER_CASUAL_NAVY : MIDDLE_LINE,
                },
              ]}
              onPress={() => setSex("MALE")}
            >
              <Image
                source={sex === "MALE" ? images.radio_active : images.radio_inactive}
                style={styles.radioImg}
              />
              <PreMed16
                style={{ marginLeft: 6 }}
                text="남자"
                color={sex === "MALE" ? GIVER_CASUAL_NAVY : DISABLED}
              />
            </Pressable>

            {/* // ? 여자 버튼 */}
            <Pressable
              style={[
                styles.radioContainer,
                {
                  borderColor: sex === "FEMALE" ? GIVER_CASUAL_NAVY : MIDDLE_LINE,
                },
              ]}
              onPress={() => setSex("FEMALE")}
            >
              <Image
                source={sex === "FEMALE" ? images.radio_active : images.radio_inactive}
                style={styles.radioImg}
              />
              <PreMed16
                style={{ marginLeft: 6 }}
                text="여자"
                color={sex === "FEMALE" ? GIVER_CASUAL_NAVY : DISABLED}
              />
            </Pressable>
          </Row>

          {/* 휴대폰번호 기입 */}
          <SignUpTextInput
            placeholder="휴대폰 번호 (숫자만 입력해주세요.)"
            title="휴대폰 번호"
            value={phoneNumber}
            setValue={setPhoneNumber}
            isSendingSMS={isSendingSMS}
            setIsSendingSMS={setIsSendingSMS}
            isVerified={isVerified}
            leftTime={totalSeconds}
            textInputProps={{
              keyboardType: "number-pad",
              returnKeyType: "done",
            }}
            marginBottom={36}
          />

          {/* 인증번호 기입 */}
          {isSendingSMS && (
            <SignUpTextInput
              placeholder="문자로 전송된 6자리 인증번호를 입력해주세요."
              title="인증번호"
              phoneNumber={phoneNumber}
              value={certification}
              setValue={setCertification}
              isVerified={isVerified}
              setIsVerified={setIsVerified}
              textInputProps={{
                keyboardType: "number-pad",
                returnKeyType: "done",
              }}
              marginBottom={36}
            />
          )}
        </KeyboardAwareScrollView>

        {/* 계정 생성하기 */}
        {isSignUpButtonShown && (
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
