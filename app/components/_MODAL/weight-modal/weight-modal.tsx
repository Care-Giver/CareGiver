import React from "react"
import { observer } from "mobx-react-lite"
import { styles } from "./styles"
import { StyleProp, ViewStyle, TextInput, Platform, UIManager, View } from "react-native"
import { HEAD_LINE, MIDDLE_LINE, ERROR_RED, SUCCESS_BLUE } from "#theme"
import { DivisionLine, ConditionalButton, PreBol18, PreReg12 } from "#components"
import { useForm, Controller } from "react-hook-form"
import Modal from "react-native-modal"
import _ from "lodash"

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
  defaultValue?: number
  placeholder?: string
}

export const WeightModal = observer(function WeightModal(props: WeightModalProps) {
  const {
    style,
    visibleState,
    handleModalHide,
    title,
    handleInput,
    defaultValue = undefined,
    placeholder,
  } = props

  const allStyles = Object.assign({}, styles.root, style)

  if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true)
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
      weight: defaultValue,
    },
  })

  const onNicknameSubmit = (data: WeightForm) => {
    //console.log("pressed!!!!")
    handleInput(data.weight)
    handleModalHide()
  }

  return (
    <Modal
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      backdropOpacity={0.3}
      isVisible={visibleState}
      //* 모달 바깥쪽 터치시 모달창 사라지는데에 사용
      onBackdropPress={() => {
        handleModalHide()
      }}
      //* 키보드 자동 회피
      avoidKeyboard
      style={allStyles}
    >
      <View style={styles.modalPetWeight}>
        <View style={{ paddingHorizontal: 16 }}>
          {/* //*모달창 제목 부분  */}
          <PreBol18 color={HEAD_LINE} text={title} />

          {/* //* hook form*/}
          <Controller
            name="weight"
            control={petWeight}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={{
                  paddingTop: 20,
                }}
                placeholder={placeholder || "숫자만 입력해주세요."}
                onChangeText={(text) => {
                  // 소수점 입력을 위한 경우 핸들링
                  if (text.length >= 2 && _.last(text) === ".") {
                    onChange(text)
                    return
                  }

                  const number = _.toNumber(text)
                  // 숫자가 아닌 경우, 초기화
                  if (_.isNaN(number)) {
                    return onChange(0)
                  }

                  // 0 ~ 99.99 사이 숫자만 입력 가능
                  if (_.inRange(number, 0, 99.99)) {
                    onChange(number)
                  } else {
                    onChange(0)
                  }
                }}
                value={_.toString(value)}
                autoCapitalize="none"
                keyboardType="numeric"
                maxLength={4} //*두자리수 몸무게인 경우 00.0 까지 쓸수있게.
              />
            )}
            rules={{
              required: true,
              pattern: {
                // value: /^[0-9]+$/,
                value: /^[\d]*\.?[\d]{0,1}$/,
                message: "* 숫자 외에 다른 문자는 입력할 수 없습니다.",
              },
            }}
          />

          {/* //* 위에서 입력한 닉네임 에러 여부에 따라 달라지는 bordercolor, error message */}
          {errors.weight ? (
            <View>
              {/* //*오류 있을 때 : 빈칸일때 회색,  오류 있으면 빨간색 */}
              <DivisionLine
                color={errors.weight.type === "required" ? MIDDLE_LINE : ERROR_RED}
                mt={4}
                mb={4}
              />
              <PreReg12
                text={errors.weight.type === "pattern" ? errors.weight.message : ""}
                color={ERROR_RED}
              />
            </View>
          ) : (
            // *오류 없을 때
            <View>
              <DivisionLine color={dirtyFields.weight ? SUCCESS_BLUE : MIDDLE_LINE} mt={4} mb={4} />
            </View>
          )}
        </View>

        {/* //*확인 버튼 -> 새로 입력한 몸무게가 에러가 없을때만 activated */}
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

//*edit-mypage-screen, edit-pet-info-screen 에서 닉네임, 이름 등의 input 받을때 사용하는 컴포넌트
//*재사용 할때 어떻게 refactor 할지 추후 고민 필요
