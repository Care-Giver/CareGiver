import React, { FC, useCallback, useLayoutEffect, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { observer } from "mobx-react-lite"
import { Screen, RegisterButtonsContainer, RegisterSubmitButton } from "#components"
import { facilities } from "./facility-data"

export const FacilityRegistrationScreen: FC<
  StackScreenProps<NavigatorParamList, "facility-registration-screen">
> = observer(function FacilityRegistrationScreen() {
  const [selectedOptions, setSelectedOptions] = useState<Array<string>>([])

  //   const [isSubmitActive, setIsSubmitActive] = useState<boolean>(false)
  const submitText = `총 ${selectedOptions.length}개 등록`

  //   // * 선택된 옵션 항목이 존재할 때 submit 버튼을 active 상태로 변경
  //   useLayoutEffect(() => {
  //     setIsSubmitActive(selectedOptions.length > 0)
  //   }, [selectedOptions])

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
        services={facilities}
        selectedOptions={selectedOptions}
        handleOptionPress={handleOptionPress}
        handleXPress={handleXPress}
      />

      <RegisterSubmitButton text={submitText} onPress={handleSubmitPress} />
    </Screen>
  )
})
