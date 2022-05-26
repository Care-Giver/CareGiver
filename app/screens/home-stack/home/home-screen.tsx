import React, { FC } from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
  SafeAreaView,
  Text as ReactNativeText,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Button,
  Header,
  Screen,
  Text,
  GradientBackground,
  AutoImage as Image,
  FormRow,
  PopSem14,
  PopSem20,
  PreReg14,
  PreBol32,
  PopReg20,
  PreBol20,
  PreBol18,
  PreBol12,
} from "../../../components"
import { HEIGHT, palette, SHADOW_4, WIDTH } from "../../../theme"
import { NavigatorParamList } from "../../../navigators"

import { BackgroundRootView, Row } from "../../../components/view-component/view-component"
import { DISABLED, SUB_HEAD_LINE } from "../../../theme/palette"

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  ({ navigation }) => {
    return (
      <BackgroundRootView testID="HomeScreen" preset="scroll">
        {/*//? Title */}
        <PreBol20 text="케어기버에게 요청할 서비스를" />
        <PreBol20 text="선택해주세요!" style={{ marginTop: HEIGHT * 8 }} />

        {/*//? 펫시팅 | 훈련 선택 박스 */}

        <Text>{"\n\n\n\n"}</Text>

        {/*//? Title */}
        <PreBol20 text="내 주변 케어기버 둘러보기" />
        <Row style={{ marginTop: HEIGHT * 8, backgroundColor: "orange" }}>
          {/*//? 펫시터 */}
          <PreBol18 text="펫시터" color={SUB_HEAD_LINE} />

          {/*//? 방문/위탁 토글 버튼 */}
          <PreBol12 color={palette.white} style={{ marginLeft: "auto" }}>
            방문
          </PreBol12>
          <PreBol12 color={DISABLED}>위탁</PreBol12>
        </Row>

        {/*//? 펫시터 선택 박스 리스트 Horzontal FaltList*/}

        <Text>{"\n\n\n\n"}</Text>

        <Row style={{ marginTop: HEIGHT * 8, backgroundColor: "yellow" }}>
          {/*//? 훈련사 */}
          <PreBol18 text="훈련사" color={SUB_HEAD_LINE} />

          {/*//? 방문/위탁 토글 버튼 */}
          <PreBol12 color={palette.white} style={{ marginLeft: "auto" }}>
            방문
          </PreBol12>
          <PreBol12 color={DISABLED}>위탁</PreBol12>
        </Row>

        {/*//? 훈련사 선택 박스 리스트 Horzontal FaltList*/}
      </BackgroundRootView>
    )
  },
)
