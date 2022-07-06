import React, { FC } from "react"
import {
  FullWidthSizeImagesBoxWithIndicator,
  HiredTimesAndPetYears,
  ScreenRootView,
} from "../../../custom-components"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../../navigators"
import { observer } from "mobx-react-lite"
import { HEADER_HEIGHT } from "../../../theme"

export const PetsitterDetailInformationScreen: FC<
  StackScreenProps<NavigatorParamList, "petsitter-detail-information-screen">
> = observer(({ navigation, route }) => {
  return (
    <ScreenRootView
      testID="testetst"
      preset="scroll"
      //? 스크롤할 때 헤더 투명도 바꾸기. 출처: https://stackoverflow.com/questions/52469579/transparent-background-for-header-using-createstacknavigator-react-native
      onScroll={(event) => {
        const headerOpacity =
          Math.min(Math.max(event.nativeEvent.contentOffset.y, 0) / HEADER_HEIGHT, 1.0) ?? 0.0
        navigation.setOptions({
          headerStyle: {
            elevation: headerOpacity,
            backgroundColor: `rgba(255,255,255,${headerOpacity})`,
          },
          headerTintColor: `rgba(0,255,0,${headerOpacity})`,
        })
      }}
      scrollEventThrottle={16}
      contentInsetAdjustmentBehavior="never"
    >
      <FullWidthSizeImagesBoxWithIndicator
        style={{
          // marginTop: -HEADER_HEIGHT,
          marginTop: 0,
        }}
      />

      <HiredTimesAndPetYears /*style={{ marginTop: HEIGHT * 20 }}*/ />
    </ScreenRootView>
  )
})
