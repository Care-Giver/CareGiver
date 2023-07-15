import { View, Text, FlatList, useWindowDimensions } from "react-native"
import React, { useLayoutEffect, useState } from "react"
import { RegisterButtonsContainerProps } from "./register-buttons-container.props"
import { RegistrationButton } from "../../../components/buttons/registration-button/registration-button"
import { NUM_OF_COLS, WIDTH_INTERVAL } from "../style-const"
import { BASIC_BACKGROUND_PADDING_WIDTH } from "../../../components/screen/screen"

export const RegisterButtonsContainer = (props: RegisterButtonsContainerProps) => {
  const { services, selectedOptions, handleOptionPress, handleXPress } = props

  // * 옵션 버튼 하나의 너비
  const [registBtnWidth, setRegistBtnWidth] = useState<number>()

  const windowWidth = useWindowDimensions().width
  // * 버튼이 갑자기 늘어나면서 화면이 깜빡이는 현상을 막기 위해, 동기적으로 처리하는 useLayoutEffect 사용
  useLayoutEffect(() => {
    setRegistBtnWidth(
      (windowWidth - BASIC_BACKGROUND_PADDING_WIDTH * 2 - WIDTH_INTERVAL) / NUM_OF_COLS,
    )
  }, [windowWidth])

  return (
    // ? grid 처럼 배치하기 - https://deemmun.tistory.com/46
    <FlatList
      style={{
        marginTop: 20,
      }}
      data={services}
      // ? onLayout: 레이아웃이 생성될 때, 해당 레이아웃의 width를 가져올 수 있다
      // ! onLayout으로 너비를 설정하게 되면, 렌더링이 끝난 후에야 버튼의 너비를 결정할 수 있으므로 화면 깜빡임 불가피
      // * -> UX 개선을 위해 onLayout 대신 useWindowDimensions와 useLayoutEffect를 사용
      // onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      renderItem={({ item }) => (
        <RegistrationButton
          isActive={selectedOptions.findIndex((value) => value === item.value) !== -1}
          text={item.name}
          onPress={() => handleOptionPress(item.value)}
          onXPress={() => handleXPress(item.value)}
          style={{
            width: registBtnWidth,
          }}
        />
      )}
      numColumns={NUM_OF_COLS}
      columnWrapperStyle={{
        marginBottom: 16,
        justifyContent: "space-between",
      }}
    />
  )
}
