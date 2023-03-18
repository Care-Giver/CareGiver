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

type NicknameForm = {
  nickname: string
}

//*edit-mypage-screen, edit-pet-info-screen 에서 닉네임, 이름 등의 input 받을때 사용 .
//*재사용 할때 어떻게 refactor 할지 추후 고민 필요

export interface CustomInputModalProps {
  visibleState: boolean
  style?: StyleProp<ViewStyle>
  title: string
  controlMode: string
  validateFunction?: (arg: any) => any
  handleModalHide: () => any
  handleInput: (arg: any) => any
}

export const CustomInputModal = observer(function CustomInputModal(props: CustomInputModalProps) {
  const {
    style,
    visibleState,
    handleModalHide,
    title,
    controlMode,
    validateFunction,
    handleInput,
  } = props
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
    //?애니메이션 부분들 주석 질문들
    switch (Platform.OS) {
      case "android":
        //!LayoutAnimation.configureNext(LayoutAnimation.create(1, "easeInEaseOut", "opacity"))
        //*안드로이드에선 layoutanitmation 과 모달창의 종료가 충돌하는 일은 없음. 다만 에니메이션을 준 효과가 나지 않게 갱장히 버벅거림.
        //*그래도 다행히 실제 기기에서 테스트시에는 그렇게 버벅거리지 않음.
        //? ios 와 안드로이드 둘다 화면 움직임을 고려하여 키보드 띄워져 있을때 굳이 모달창을 키보드 가깝게 붙이는 이 코드를 추가로 고집 하는 것이 득이될지 실이될지 따지기 필요
        //! android 에서 위의 애니메이션 썼을때 초기 저장하기 사용 후 다시 연필 버튼 눌렀을 때 trying to remove a view index above child count 에러 발생
        //!어차피 저 에니메이션이 있으나 없으나 소용이 없어서 (있어도 뚝딱거리고 없어도 비슷하게 뚝딱거림) 일단 주석처리하고 없앰
        //!밑의 ios 에서도 오류 때문에 어차피 못쓰고 있으니 이를 해결 못할시 그냥 switch platform.os 하지 말고 그냥 코드 통합하는게 좋아보임
        //*android 에선 keyboardWillShow 사용 못함
        if (keyboard.keyboardShown) {
          position = "flex-end"
          //console.log("position", position)
          return position
        } else {
          position = "center"
          //console.log("position", position)
          return position
        }

      case "ios":
        if (keyboardStatus === "Keyboard will Show") {
          //!LayoutAnimation.configureNext(LayoutAnimation.create(0, "easeIn", "scaleY"))
          //!화면 전환을 부드럽게 시도해 봤지만 모달창이 닫혔을 때에도 다시 열리는 문제가 있음. 찾아보니 2018년에 동일한 문제가 발견되었는데 해결책은 아직 나오지 않은듯하고 2022년까지 issue 였던듯 함.
          //!https://github.com/facebook/react-native/issues/33733
          position = "flex-end"
          //console.log("position", position)
          return position
        } else {
          position = "center"
          //console.log("position", position)
          return position
        }
    }
  }
  const _styles = Object.assign({}, styles, style)

  const {
    control: userNickname,
    handleSubmit, //*handleNicknameSubmit
    formState: { errors, isValid, isDirty, dirtyFields },
    reset,
  } = useForm<NicknameForm>({
    mode: "onChange",
    defaultValues: {
      nickname: "",
    },
  })

  const onSubmit = (data: NicknameForm) => {
    //*onNicknameSubmit
    handleInput(data.nickname)
    handleModalHide()
    reset()
  }

  return (
    <Modal animationType="fade" transparent={true} visible={visibleState}>
      {/* //*모달 바깥쪽 터치시 사용 */}
      <Pressable
        style={{ flex: 1 }}
        onPress={() => {
          handleModalHide()
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
          <View style={styles.modalName}>
            <View
              style={{
                paddingHorizontal: 10,
              }}
            >
              <PreBol18 color={HEAD_LINE} text={title} />
              {/*//?재사용 방법 생각  {controlMode === "userNickname" && } */}
              <Controller
                name="nickname"
                control={userNickname}
                //control = {contrilMode} //? -> type : string 안맞아서 안됨. 이 경우에 어떻게 재활용 코드로 바꿀지?
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
                    value: /^[ㄱ-ㅎ|가-힣|ㅏ-ㅣ|a-z|A-Z|0-9|_]+$/,
                    message: "* 언더바 제외, 특수문자, 이모티콘, 공백은 사용할 수 없습니다.",
                  },
                  validate: {
                    duplicateSearch: (value) =>
                      validateFunction(value) ? "중복된 닉네임입니다." : true,
                    //*validation rule to true to indicate that the field is valid and has no error.
                  },
                }}
              />
              {/* {console.log("errors! ", errors.nickname)} */}
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

                // updateUserNickname() //TODO server 로 통신하는 함수. API call 을 통해서 server DB 에있는 유저 data 속 닉네임을 바꾸는 함수
              }
            />
          </View>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  )
})
