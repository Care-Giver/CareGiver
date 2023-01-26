import { FlatList, TextStyle, View, StyleProp } from "react-native"
import React, { useCallback, useEffect, useLayoutEffect, FC, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { observer } from "mobx-react-lite"
import {
  RegistrationButton,
  PreReg14,
  ScreenRootView,
  PressableButton,
  PreBol16,
} from "#components"
import { styles } from "./styles"
import { color, HEIGHT } from "#theme"
// * 화면에 띄울 서비스 배열
import { services } from "./service-data"

// - 버튼의 가로 간격
const WIDTH_INTERVAL = 16
// - 버튼의 column 수
const NUM_OF_COLS = 2

export const ServiceRegistrationScreen: FC<
  StackScreenProps<NavigatorParamList, "service-registration-screen">
> = observer(() => {
  // * 선택된 옵션들의 배열
  const [selectedOptions, setSelectedOptions] = useState<Array<string>>([])

  // * submit 버튼이 활성화되었는지 나타내는 state 값
  const [isSubmitActive, setIsSubmitActive] = useState<boolean>(false)
  // ? submit 버튼의 텍스트
  const submitText = `총 ${selectedOptions.length}개 등록`

  // * 선택된 옵션 항목이 존재할 때 submit 버튼을 active 상태로 변경
  useLayoutEffect(() => {
    setIsSubmitActive(selectedOptions.length > 0)
  }, [selectedOptions])

  // - press 이벤트 핸들러
  // * 옵션 버튼을 클릭했을 때 동작하는 함수
  // ? 해당 옵션 내용을 전달받아서 selectedOptions에 추가
  const handleOptionPress = useCallback((option: string) => {
    console.log(option)
    setSelectedOptions((prev) => [...prev, option])
  }, [])
  console.log(selectedOptions)

  // * X 버튼을 클릭했을 때 동작하는 함수
  // ? 해당 옵션 내용을 전달받아서 selectedOptions에서 삭제
  const handleXPress = useCallback((option: string) => {
    setSelectedOptions((prev) => prev.filter((value) => value !== option))
  }, [])

  // * 제출 버튼을 클릭했을 때 동작하는 함수
  const handleSubmitPress = () => {
    console.log(selectedOptions)
    alert("제출 버튼 클릭")
  }

  // * 옵션 버튼을 담는 컨테이너의 너비 (flatlist의 너비 값을 저장)
  const [containerWidth, setContainerWidth] = useState(0)

  return (
    <ScreenRootView>
      {/* //? grid 처럼 배치하기 - https://deemmun.tistory.com/46 */}
      <FlatList
        style={{
          marginTop: 20,
        }}
        data={services}
        // onLayout: 레이아웃이 생성될 때, 해당 레이아웃의 width를 가져올 수 있다
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
        renderItem={({ item }) => (
          <RegistrationButton
            isActive={selectedOptions.findIndex((value) => value === item.value) !== -1}
            text={item.name}
            onPress={() => handleOptionPress(item.value)}
            onXPress={() => handleXPress(item.value)}
            style={{
              width: (containerWidth - WIDTH_INTERVAL) / NUM_OF_COLS,
            }}
          />
        )}
        numColumns={NUM_OF_COLS}
        columnWrapperStyle={{
          marginBottom: 16,
          justifyContent: "space-between",
        }}
      />

      <PressableButton
        style={[styles.submitBtn, { backgroundColor: isSubmitActive ? "#00196C" : "#F1F1F4" }]}
        // ? submit 버튼이 active 상태가 아닐 때는 이벤트 헨들러를 지정하지 않는다.
        onPress={isSubmitActive ? handleSubmitPress : null}
      >
        <PreBol16 text={submitText} color={color.palette.white} />
      </PressableButton>
    </ScreenRootView>
  )
})
