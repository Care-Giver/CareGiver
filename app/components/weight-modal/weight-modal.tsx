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
import { HEAD_LINE, MIDDLE_LINE, ERROR_RED, SUCCESS_BLUE, DEVICE_SCREEN_WIDTH } from "#theme"
import { DivisionLine, ConditionalButton, PreBol18, PreReg12 } from "#components"
import { useKeyboard } from "@react-native-community/hooks"
import { useForm, Controller } from "react-hook-form"

//*hook form 위한 form 정해놓기
type WeightForm = {
  weight: number
}

export interface WeightModalProps {
  visibleState: boolean
  style?: StyleProp<ViewStyle>
  title: string
  handleModalHide: () => any
  handleInput: (arg: any) => any
}

export const WeightModal = observer(function WeightModal(props: WeightModalProps) {
  const {
    style,
    visibleState,
    handleModalHide,
    title,
    handleInput,
  } = props

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
    control: petWeight,
    handleSubmit, //추후 다른 스크린의 모달과 섞어 써야할시 : handleNicknameSubmit로 바꾸기
    formState: { errors, isValid, dirtyFields },
    reset,
  } = useForm<WeightForm>({
    mode: "onChange",
    defaultValues: {
      weight: undefined,
    },
  })

  const onNicknameSubmit = (data: WeightForm) => {
    handleInput(data.weight)
    handleModalHide()
    reset()
  }

  return (
    <Modal animationType="fade" transparent={true} visible={visibleState}>
      {/* //*모달 바깥쪽 터치시 모달창 사라지는데에 사용 */}
      <Pressable
        style={{ flex: 1 }}
        onPress={() => {
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
          <View style={styles.modalPetWeight}>
            <View
              style={{
                paddingHorizontal: 10,
              }}
            >
              {/* //*모달창 제목 부분  */}
              <PreBol18 color={HEAD_LINE} text={title} />

              {/* //* hook form*/}
              <Controller
                name="weight"
                control={petWeight}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={{
                      paddingTop: 43,
                    }}
                    placeholder={"숫자만 입력해주세요."}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    maxLength={4}
                  />
                )}
                rules={{
                  required: true,
                  pattern: {
                    value: /^[0-9]+(\.[0-9]{0,2})?$/,
                    message: "숫자만 입력해주세요.",
                  },
                }}
              />

              {/* //* 위에서 입력한 닉네임 에러 여부에 따라 달라지는 bordercolor, error message */}
              {errors.weight ? (
                <View>
                  {/* //*오류 있을 때 : 빈칸일때 회색, 패턴/중복 오류 있으면 빨간색 */}
                  <DivisionLine
                    color={errors.weight.type === "required" ? MIDDLE_LINE : ERROR_RED}
                    style={{ marginTop: 4 }}
                  />
                  <PreReg12
                    text={errors.weight.type === "pattern" ? errors.weight.message : ""}
                    color={ERROR_RED}
                  />
                </View>
              ) : (
                // *오류 없을 때
                <View>
                  <DivisionLine
                    color={dirtyFields.weight ? SUCCESS_BLUE : MIDDLE_LINE}
                    style={{ marginTop: 4 }}
                  />
                </View>
              )}
            </View>

            {/* //*확인 버튼 -> 새로 입력한 닉네임이 에러가 없을때만 activated */}
            <ConditionalButton
              label="확인"
              isActivated={isValid}
              style={{
                marginTop: "auto",
              }}
              onPress={
                handleSubmit(onNicknameSubmit)

                // updateUserNickname() //TODO server 로 통신하는 함수. API call 을 통해서 server DB 에있는 유저 data 속 닉네임을 바꾸는 함수
              }
            />
          </View>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  )
})

//*edit-mypage-screen, edit-pet-info-screen 에서 닉네임, 이름 등의 input 받을때 사용하는 컴포넌트
//*재사용 할때 어떻게 refactor 할지 추후 고민 필요
