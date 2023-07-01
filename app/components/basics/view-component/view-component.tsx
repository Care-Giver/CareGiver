import { ViewStyle, FlexStyle, Platform } from "react-native"
import React from "react"
import { Screen } from "../ignite-basics/screen/screen"
import { ScreenProps } from "../ignite-basics/screen/screen.props"

export const BASIC_BACKGROUND_PADDING_WIDTH = 16

export const FULL: ViewStyle = { flex: 1 }

export const BASIC_BACKGROUND_PADDING: FlexStyle = {
  paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
}

interface ScreenRootViewProps extends ScreenProps {
  testID?: string
}

/**
 * ScreenRootView 는 기본적으로 side edge padding 16px 이 적용되어있습니다 :)
 * 모든 screen 컴포넌트는 해당 컴포넌트가 최상위에 위치해야 합니다.
 * 본 컴포넌트는 scrolling 이 없는 고정된 컴포넌트입니다.
 * scroll 필요시, 자식 컴포넌트로써 ScrollView 를 추가하세요.
 * @param props 추후 type 업데이트 예정
 */
export const ScreenRootView = (props: ScreenRootViewProps) => {
  return (
    <Screen
      preset="fixed"
      style={[FULL, BASIC_BACKGROUND_PADDING, props.style]}
      //! custom-header 를 header prop 에 적용시킬때, iOS statusbar 가 흰색에 뭍혀 버린다. 이를 보완하기 위해 추가함
      statusBar={Platform.select({
        ios: "dark-content",
        android: "light-content",
      })}
      //! headerShown: true 로 하게되면 iOS 는 스크린과 헤더사이 여백이 생긴다. 이를 보완하기 위해 추가함
      unsafe={true}
      {...props}
    />
  )
}
