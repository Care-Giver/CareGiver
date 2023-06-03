import * as React from "react"
import { observer } from "mobx-react-lite"
import { styles } from "./styles"
import {
  StyleProp,
  ViewStyle,
  Keyboard,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
  View,
  Pressable,
  Modal,
  KeyboardAvoidingView,
} from "react-native"
import { useLayoutEffect, useState } from "react"
import { HEAD_LINE, MIDDLE_LINE, ERROR_RED, SUCCESS_BLUE, DEVICE_SCREEN_WIDTH, BODY } from "#theme"
import { DivisionLine, ConditionalButton, PreBol18, PreReg12 } from "#components"
import { useKeyboard } from "@react-native-community/hooks"
import { useForm, Controller } from "react-hook-form"

//*hook form 위한 form 정해놓기
type BirthdayForm = {
  birthday: number
}

export interface BirthdayModalProps {
  visibleState: boolean
  style?: StyleProp<ViewStyle>
  title: string
  handleModalHide: () => any
  handleInput: (arg: any) => any
}

export const BirthdayModal = observer(function BirthdayModal(props: BirthdayModalProps) {
  const { style, visibleState, handleModalHide, title, handleInput } = props
  const _styles = Object.assign({}, styles, style)

  //*키보드 관련
  const [keyboardStatus, setKeyboardStatus] = useState(undefined)
  const keyboard = useKeyboard()

  if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  useLayoutEffect(() => {
    const keyboardUp = Keyboard.addListener("keyboardWillShow", () => {
      setKeyboardStatus("Keyboard will Show")
    })
    const keyboardDown = Keyboard.addListener("keyboardWillHide", () => {
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
        if (keyboard.keyboardShown) {
          position = "flex-end"

          return position
        } else {
          position = "center"
          return position
        }

      case "ios":
        if (keyboardStatus === "Keyboard will Show") {
          position = "flex-end"

          return position
        } else {
          position = "center"
          return position
        }
    }
  }

  //* hook form 설정
  const {
    control: petBirthday,
    handleSubmit, //추후 다른 스크린의 모달과 섞어 써야할시 : handleNicknameSubmit로 바꾸기
    formState: { errors, isValid, dirtyFields },
    reset,
  } = useForm<BirthdayForm>({
    mode: "onChange",
    //criteriaMode: "all",

    defaultValues: {
      birthday: undefined,
    },
  })

  const onBirthdaySubmit = (data: BirthdayForm) => {
    handleInput(data.birthday)
    handleModalHide()
    reset()
  }

  return (
    <Modal animationType="fade" transparent={true} visible={visibleState}>
      {/* //*모달 바깥쪽 터치시 모달창 사라지는데에 사용 */}
      <Pressable
        style={{ flex: 1 }}
        onPress={() => {
          reset()
          handleModalHide()
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            width: DEVICE_SCREEN_WIDTH,
            flex: 1,
            marginTop: "auto",
            alignItems: "center",
            // *키보드 popup 에 따라 모달 창 위치 일정하게 유지 :
            justifyContent: handlePosition(),
            backgroundColor: "rgba(0,0,0,0.25)",
          }}
        >
          {/* //*모달창 안쪽은 눌러도 아무일도 안일어나게 기능없는 pressable */}
          <Pressable>
            <View style={styles.modalPetWeight}>
              <View
                style={{
                  paddingHorizontal: 24,
                }}
              >
                {/* //*모달창 제목 부분  */}
                <PreBol18 color={HEAD_LINE} text={title} />

                {/* //* hook form*/}
                <Controller
                  name="birthday"
                  control={petBirthday}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={{
                        paddingTop: 20,
                      }}
                      placeholder={"8자리 생년월일을 입력해주세요."}
                      //? 모를시 추정 생년월일을 입력해주세요 는 필요 X ?
                      onChangeText={onChange}
                      value={value}
                      autoCapitalize="none"
                      keyboardType="numeric"
                      maxLength={8}
                    />
                  )}
                  rules={{
                    required: true,

                    //* minLength 와 pattern 을 활용해 rules 를 관리하면 8자가 다 채워지기 전까지는 pattern rule을 적용 안시킴
                    //*이에 따라 validate 활용
                    validate: {
                      patternBeforeMinLength: (value) => {
                        const pattern = /^[0-9]+$/
                        if (!pattern.test(String(value))) {
                          return "* 숫자만 입력해주세요."
                        } else if (String(value).length < 8) {
                          return "* 8자리 숫자로 입력해주세요."
                        } else return null
                      },
                    },
                  }}
                />

                {/* //* 위에서 입력한 닉네임 에러 여부에 따라 달라지는 bordercolor, error message */}
                {errors.birthday ? (
                  <View>
                    {/* //*오류 있을 때 : 빈칸일때 회색, 오류 있으면 빨간색  */}

                    <DivisionLine
                      color={errors.birthday.type === "required" ? MIDDLE_LINE : ERROR_RED}
                      style={styles.divisionLine}
                    />
                    <PreReg12
                      text={
                        errors.birthday.type === "patternBeforeMinLength"
                          ? errors.birthday.message
                          : "* 생년월일을 모를 경우, 추청 생년월일을 입력해주세요."
                      }
                      color={errors.birthday.type === "patternBeforeMinLength" ? ERROR_RED : BODY}
                    />
                  </View>
                ) : (
                  // *오류 없을 때
                  <View>
                    <DivisionLine
                      color={isValid ? SUCCESS_BLUE : MIDDLE_LINE}
                      style={styles.divisionLine}
                    />
                    <PreReg12
                      text={"* 생년월일을 모를 경우, 추청 생년월일을 입력해주세요."}
                      color={BODY}
                    />
                  </View>
                )}
              </View>

              {/* //*확인 버튼 -> 새로 입력한 생년월일이 에러가 없을때만 activated */}

              <ConditionalButton
                label="확인"
                isActivated={isValid}
                style={{
                  marginTop: "auto",
                  height: 49,
                  width: 326,
                }}
                onPress={handleSubmit(onBirthdaySubmit)}
              />
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  )
})
