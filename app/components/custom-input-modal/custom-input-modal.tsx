//*edit-mypage-screen, edit-pet-info-screen 에서 닉네임, 이름 등의 input 받을때 사용하는 컴포넌트
//*재사용 할때 어떻게 refactor 할지 추후 고민 필요

import React, { useMemo } from "react"
import {
  StyleProp,
  ViewStyle,
  TextInput,
  Platform,
  UIManager,
  View,
  TextInputProps,
} from "react-native"
import { observer } from "mobx-react-lite"
import { styles } from "./styles"
import { HEAD_LINE, MIDDLE_LINE, ERROR_RED, SUCCESS_BLUE } from "#theme"
import { DivisionLine, ConditionalButton, PreBol18, PreReg12 } from "#components"
import { useForm, Controller, UseControllerProps } from "react-hook-form"
import Modal from "react-native-modal"

//*hook form 위한 form 정해놓기
type NicknameForm = {
  nickname: string
}

export interface CustomInputModalProps {
  visibleState: boolean
  style?: StyleProp<ViewStyle>
  title: string
  controlMode?: "userNickname"
  placeholderInput?: string
  validateFunction?: (arg: any) => any
  handleModalHide: () => any
  handleInput: (arg: any) => any
  rules?: UseControllerProps["rules"]
  textInputProps?: TextInputProps
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
    placeholderInput = "",
    rules,
    textInputProps,
  } = props

  const allStyles = Object.assign({}, styles.root, style)

  //*pet, user 에 따라 달라지는 Placeholder 관련 변수
  const placeholder = useMemo(() => {
    if (placeholderInput === "pet") {
      return "반려동물의 이름을 입력해주세요."
    } else if (placeholderInput === "user") {
      return "닉네임을 입력해주세요. (최대 10자)"
    } else {
      return placeholderInput
    }
  }, [placeholderInput])

  if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  //* 유저 nickname 설정 위한 hook form 설정
  const {
    control,
    handleSubmit, //추후 다른 스크린의 모달과 섞어 써야할시 : handleNicknameSubmit로 바꾸기
    formState: { errors, isValid, isDirty, dirtyFields },
    reset,
  } = useForm<NicknameForm>({
    mode: "onChange",
    defaultValues: {
      nickname: "",
    },
  })

  const onNicknameSubmit = (data: NicknameForm) => {
    handleInput(data.nickname)
    handleModalHide()
    reset()
  }

  return (
    <Modal
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      backdropOpacity={0.3}
      isVisible={visibleState}
      //*모달 바깥쪽 터치시 모달창 사라지는데에 사용
      onBackdropPress={() => {
        reset()
        handleModalHide()
      }}
      //* 키보드 자동 회피
      avoidKeyboard
      style={allStyles}
    >
      <View style={styles.modalUserNickname}>
        <View
          style={{
            paddingHorizontal: 16,
            //*디자인대로 24 추가 패딩을 주면 긴 경고 메세지가 끊김. 임의로 16로 조정
            //*확인 버튼 위에는 다 추가적 패딩 필요
          }}
        >
          {/* //*모달창 제목 부분  */}
          <PreBol18 color={HEAD_LINE} text={title} />

          {/*//?이후 다른 스크린에서도 사용시 효율적 재사용 방법 생각  {controlMode === "userNickname" && } */}

          {/* //* hook form*/}
          <Controller
            name="nickname"
            // @ts-ignore
            control={control}
            //control = {contrilMode} //? -> type : string 안맞아서 안됨. 이 경우에 어떻게 재활용 기능한 코드로 바꿀지?
            //?원래 계획 : control 에 controlMode 를 string 으로 받고 parent screen 에서 여기에 뭘 주느냐에 따라 달라지는 Controller control 설정들
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={{
                  paddingTop: 20,
                }}
                placeholder={placeholder}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                maxLength={10}
                {...textInputProps}
              />
            )}
            rules={
              rules || {
                required: true,
                pattern: {
                  value: /^[ㄱ-ㅎ|가-힣|ㅏ-ㅣ|a-z|A-Z|0-9|_]+$/,
                  message: "* 언더바 제외, 특수문자, 이모티콘, 공백은 사용할 수 없습니다.",
                },
                validate: {
                  //* 중복 닉네임 찾기 위한 코드
                  duplicateSearch: (value) =>
                    validateFunction(value) ? "중복된 닉네임입니다." : true,
                  //*validation rule to true to indicate that the field is valid and has no error.
                },
              }
            }
          />
          {/* {console.log("errors! ", errors.nickname)} */}
          {/* //* 위에서 입력한 닉네임 에러 여부에 따라 달라지는 bordercolor, error message */}
          {errors.nickname ? (
            <View>
              {/* //*오류 있을 때 : 빈칸일때 회색, 패턴/중복 오류 있으면 빨간색 */}
              <DivisionLine
                color={errors.nickname.type === "required" ? MIDDLE_LINE : ERROR_RED}
                style={styles.divisionLine}
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
            // *오류 없을 때
            <View>
              <DivisionLine
                // *dirtyFields : 첫 실행때 오류가 없어 입력 안한 창에서 닉네임 변경 가능 표시 뜨지 않기 위함. (오류 없는데 입력값이 있을때에만 succes_blue)
                //*모달창에 현재 입력창 하나 밖에 없어 isDirty 써도 되지만 후에 좀 다른 상황 대비 범용성 높은 dirtyFields 사용
                color={dirtyFields.nickname ? SUCCESS_BLUE : MIDDLE_LINE}
                style={styles.divisionLine}
              />
              {dirtyFields.nickname && controlMode === "userNickname" && (
                <PreReg12 text={"* 사용가능한 이름입니다!"} color={SUCCESS_BLUE} />
              )}
            </View>
          )}
        </View>

        {/* //*확인 버튼 -> 새로 입력한 닉네임이 에러가 없을때만 activated */}
        <ConditionalButton
          label="확인"
          isActivated={isValid}
          style={{
            marginTop: "auto",
            height: 49,
            width: "100%",
            alignSelf: "center",
          }}
          onPress={
            handleSubmit(onNicknameSubmit)

            // updateUserNickname() //TODO server 로 통신하는 함수. API call 을 통해서 server DB 에있는 유저 data 속 닉네임을 바꾸는 함수
          }
        />
      </View>
    </Modal>
  )
})
