import React, { FC, useState } from "react"
import { Image, Pressable, View } from "react-native"
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

    //* 인증번호가 맞다면 활성화
    //TODO 인증번호 로직이 완성되면 코드 추가하면 될 것 같습니다.
    const [isActivated, setIsActivated] = useState<boolean>(true)

    return (
      <Screen testID="Register">
        <PreBol20 text={"계정 생성에\n필요한 정보를 입력해주세요"} mt={20} mb={40} />
        <RegisterTextInput
          placeholder="활동하게 될 닉네임을 입력해주세요."
          title="닉네임(필수)"
          value={nickname}
          setValue={setNickname}
        />
        <RegisterTextInput
          placeholder="보호자님의 생년월일을 입력해주세요. 예)20010313"
          title="생년월일"
          value={birthday}
          setValue={setBirthday}
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
        />
        <RegisterTextInput
          placeholder="인증번호를 입력해주세요."
          title="인증번호"
          value={certification}
          setValue={setCertification}
        />

        <ConditionalButton
          label="다음"
          isActivated={isActivated}
          style={{ position: "absolute", bottom: BOTTOM_HEIGHT, alignSelf: "center" }}
          //TODO navigation추가 필요
          onPress={() => {
            navigation.replace("register-success-screen")
          }}
        />
      </Screen>
    )
  },
)
