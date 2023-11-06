import React, { Dispatch, SetStateAction, useLayoutEffect, useState } from "react"
import { FlatList, useWindowDimensions } from "react-native"
import { RegistrationButton } from "../buttons/registration-button/registration-button"
import { BASIC_BACKGROUND_PADDING_WIDTH } from "../screen/screen"
import { CrecheAmenity, CrecheService, VisitingAmenity, VisitingService } from "#axios"

// - 버튼의 가로 간격
const WIDTH_INTERVAL = 16
// - 버튼의 column 수
const NUM_OF_COLS = 2

export interface RegisterButtonsContainerProps {
  services: Array<VisitingService | CrecheService | VisitingAmenity | CrecheAmenity>
  selectedOptions?: Array<VisitingService | CrecheService | VisitingAmenity | CrecheAmenity>
  handleOptionPress?: Dispatch<
    SetStateAction<Array<VisitingService | CrecheService | VisitingAmenity | CrecheAmenity>>
  >
  handleXPress?: (option) => void
  alwaysActive?: boolean
}

export const RegisterButtonsContainer = (props: RegisterButtonsContainerProps) => {
  const { services, selectedOptions, handleOptionPress, handleXPress, alwaysActive } = props

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
          isActive={alwaysActive ? true : !!selectedOptions.find((value) => value === item)}
          text={item.name}
          onPress={() => handleOptionPress(item)}
          onXPress={() => handleXPress(item)}
          style={{
            width: registBtnWidth,
          }}
          alwaysActive={alwaysActive}
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
