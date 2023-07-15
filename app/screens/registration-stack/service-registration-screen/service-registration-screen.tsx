import React, { useCallback, useLayoutEffect, FC, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { observer } from "mobx-react-lite"
import { Screen, RegisterButtonsContainer, RegisterSubmitButton } from "#components"
// * 화면에 띄울 서비스 배열
import { services } from "./service-data"

export const ServiceRegistrationScreen: FC<
  StackScreenProps<NavigatorParamList, "service-registration-screen">
> = observer(function ServiceRegistrationScreen() {
  // * 선택된 옵션들의 배열
  const [selectedOptions, setSelectedOptions] = useState<Array<string>>([])

  // // * submit 버튼이 활성화되었는지 나타내는 state 값
  // const [isSubmitActive, setIsSubmitActive] = useState<boolean>(false)
  // ? submit 버튼의 텍스트
  const submitText = `총 ${selectedOptions.length}개 등록`

  // // * 선택된 옵션 항목이 존재할 때 submit 버튼을 active 상태로 변경
  // useLayoutEffect(() => {
  //   setIsSubmitActive(selectedOptions.length > 0)
  // }, [selectedOptions])

  // - press 이벤트 핸들러
  // * 옵션 버튼을 클릭했을 때 동작하는 함수
  // ? 해당 옵션 내용을 전달받아서 selectedOptions에 추가
  const handleOptionPress = useCallback((option: string) => {
    setSelectedOptions((prev) => [...prev, option])
  }, [])

  // * X 버튼을 클릭했을 때 동작하는 함수
  // ? 해당 옵션 내용을 전달받아서 selectedOptions에서 삭제
  const handleXPress = useCallback((option: string) => {
    setSelectedOptions((prev) => prev.filter((value) => value !== option))
  }, [])

  // * 제출 버튼을 클릭했을 때 동작하는 함수
  const handleSubmitPress = () => {
    console.log("selected options: ", selectedOptions)
    alert("제출 버튼 클릭")
    setSelectedOptions([])
  }

  return (
    <Screen>
      <RegisterButtonsContainer
        services={services}
        selectedOptions={selectedOptions}
        handleOptionPress={handleOptionPress}
        handleXPress={handleXPress}
      />

      <RegisterSubmitButton
        // isActive={isSubmitActive}
        text={submitText}
        onPress={handleSubmitPress}
      />
    </Screen>
  )
})
