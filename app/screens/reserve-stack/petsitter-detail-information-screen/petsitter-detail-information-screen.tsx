import React, { FC } from "react"
import {
  Comment,
  FullWidthSizeImagesBoxWithIndicator,
  ScreenRootView,
} from "../../../custom-components"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../../navigators"
import { observer } from "mobx-react-lite"
import { HEADER_HEIGHT } from "../../../theme"

const commentsDummy = [
  {
    userId: "유저닉네임",
    desc:
      "안녕하세요, 펫시터님! 몇가지 궁금한 점이 있어서 여쭤보려고 하는데 어디로 연락을 드려야 편하실까요~?? 편하신 연락처 알려알려알려알려",
    createAt: "2022-03-22T11:30",
    updatedAt: "2022-04-01T13:50",
    reply: false,
  },
]

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

      <Comment
        userId={commentsDummy[0].userId}
        desc={commentsDummy[0].desc}
        createAt={commentsDummy[0].createAt}
        updatedAt={commentsDummy[0].updatedAt}
        reply={commentsDummy[0].reply}
      />
    </ScreenRootView>
  )
})
