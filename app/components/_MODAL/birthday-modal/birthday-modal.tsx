/* eslint-disable no-case-declarations */
import React from "react"
import { observer } from "mobx-react-lite"
import { styles } from "./styles"
import { StyleProp, ViewStyle, TextInput, Platform, UIManager, View } from "react-native"
import { HEAD_LINE, MIDDLE_LINE, ERROR_RED, SUCCESS_BLUE, BODY } from "#theme"
import { DivisionLine, ConditionalButton, PreBol18, PreReg12 } from "#components"
import { useForm, Controller } from "react-hook-form"
import Modal from "react-native-modal"
import { isExists } from "date-fns"

//*hook form 위한 form 정해놓기
type BirthdayForm = {
  birthday: string
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

  const allStyles = Object.assign({}, styles.root, style)

  if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true)
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
    <Modal
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      backdropOpacity={0.3}
      isVisible={visibleState}
      //* 모달 바깥쪽 터치시 모달창 사라지는데에 사용
      onBackdropPress={() => {
        reset()
        handleModalHide()
      }}
      //* 키보드 자동 회피
      avoidKeyboard
      style={allStyles}
    >
      <View style={styles.modalPetBirthday}>
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
                placeholder={"예) 20230524"}
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
                  }

                  switch (String(value).length) {
                    case 8:
                      const year = Number(String(value).substring(0, 4))
                      const month = Number(String(value).substring(4, 6)) - 1 //! Date object 에서 month 는 0 부터 시작한다.
                      const date = Number(String(value).substring(6, 8))
                      if (isExists(year, month, date)) {
                        return null
                      } else {
                        return `* 유효하지 않은 생년월일 입니다: ${year}년 ${month + 1}월 ${date}일`
                      }

                    default:
                      return "* 8자리 숫자로 입력해주세요."
                  }
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
            alignSelf: "center",
          }}
          onPress={handleSubmit(onBirthdaySubmit)}
        />
      </View>
    </Modal>
  )
})
