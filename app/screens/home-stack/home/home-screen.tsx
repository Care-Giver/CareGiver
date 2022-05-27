import React, { FC, useState } from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
  SafeAreaView,
  Text as ReactNativeText,
  FlatList,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Text } from "../../../components"
import {
  ScreenRootView,
  Row,
  RowRoundedBox,
  PreBol12,
  PreBol18,
  PreBol20,
  ServiceChoiceButton,
  SitterProfileButton,
} from "../../../custom-components"
import { NavigatorParamList } from "../../../navigators"

import { HEIGHT, palette, SHADOW_4, WIDTH } from "../../../theme"
import { BODY, DISABLED, SUB_HEAD_LINE } from "../../../theme/palette"
import { ComeHomeGoToSwitchButton } from "../../../custom-components/buttons/come-home-go-to-switch-button/come-home-go-to-switch-button"
import { RowRoundedButton } from "../../../custom-components/buttons/row-rounded-button/row-rounded-button"

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  ({ navigation }) => {
    const [isOn, setIsOn] = useState(false)
    const toggle = () => {
      isOn ? setIsOn(false) : setIsOn(true)
    }

    //? 기본값은 "방문" 으로 한다 (기획)
    const [isComeHomePetSitter, setIsComeHomePetSitter] = useState(true)
    const [isComeHomeTrainer, setIsComeHomeTrainer] = useState(true)

    return (
      <ScreenRootView testID="HomeScreen" preset="scroll">
        <RowRoundedButton
          text={"경기 안산시 상록구 한양대학로 55"}
          textColor={BODY}
          onPress={() => {
            alert("dd")
          }}
          style={{ marginTop: HEIGHT * 18 }}
        />

        {/*//? Title */}
        <PreBol20 text="케어기버에게 요청할 서비스를" style={{ marginTop: HEIGHT * 50 }} />
        <PreBol20 text="선택해주세요!" style={{ marginTop: HEIGHT * 8 }} />

        {/*//? 펫시팅 | 훈련 선택 박스 */}
        <Row style={{ marginTop: HEIGHT * 20 }}>
          <ServiceChoiceButton
            title="펫시팅"
            subtitle={"산책, 간식 주기 등 펫을\n돌봐주는 서비스입니다."}
          />

          <ServiceChoiceButton
            title="훈련"
            subtitle={"손 주기, 기다려 등의 훈련\n을 시켜주는 서비스입니다."}
            style={{ marginLeft: "auto" }}
          />
        </Row>

        <Text>{"\n\n\n\n"}</Text>

        {/*//? Title */}
        <PreBol20 text="내 주변 케어기버 둘러보기" />
        <Row style={{ marginTop: HEIGHT * 8, backgroundColor: "orange" }}>
          {/*//? 펫시터 */}
          <PreBol18 text="펫시터" color={SUB_HEAD_LINE} />

          {/*//? 방문/위탁 토글 버튼 */}
          <ComeHomeGoToSwitchButton
            state={isComeHomePetSitter}
            setState={setIsComeHomePetSitter}
            style={{ marginLeft: "auto" }}
          />
        </Row>

        {/*//? 펫시터 선택 박스 리스트 Horzontal FaltList*/}
        {/* <FlatList /> */}
        <Row style={{ marginTop: HEIGHT * 10 }}>
          <SitterProfileButton name={"최수민"} ratings={3.5} intro={"떼껄룩"} />
          <SitterProfileButton
            name={"박민선"}
            ratings={4.7}
            intro={"ㅎㅇㄹ"}
            style={{ marginLeft: WIDTH * 10 }}
          />
          <SitterProfileButton
            name={"김지우"}
            ratings={2.8}
            intro={"출시까지 안죽습니다"}
            style={{ marginLeft: WIDTH * 10 }}
          />
        </Row>

        <Text>{"\n\n\n\n"}</Text>

        <Row
          style={{
            marginTop: HEIGHT * 8,
            backgroundColor: "yellow",
          }}
        >
          {/*//? 훈련사 */}
          <PreBol18 text="훈련사" color={SUB_HEAD_LINE} />

          {/*//? 방문/위탁 토글 버튼 */}
          <ComeHomeGoToSwitchButton
            state={isComeHomeTrainer}
            setState={setIsComeHomeTrainer}
            style={{ marginLeft: "auto" }}
          />
        </Row>

        {/*//? 훈련사 선택 박스 리스트 Horzontal FaltList*/}

        <Row
          style={{
            marginTop: HEIGHT * 8,
            backgroundColor: "yellow",
          }}
        >
          {/*//? 훈련사 */}
          <PreBol18 text="훈련사" color={SUB_HEAD_LINE} />

          {/*//? 방문/위탁 토글 버튼 */}
          <ComeHomeGoToSwitchButton
            state={isComeHomeTrainer}
            setState={setIsComeHomeTrainer}
            style={{ marginLeft: "auto" }}
          />
        </Row>

        <Row
          style={{
            marginTop: HEIGHT * 8,
            backgroundColor: "yellow",
          }}
        >
          {/*//? 훈련사 */}
          <PreBol18 text="훈련사" color={SUB_HEAD_LINE} />

          {/*//? 방문/위탁 토글 버튼 */}
          <ComeHomeGoToSwitchButton
            state={isComeHomeTrainer}
            setState={setIsComeHomeTrainer}
            style={{ marginLeft: "auto" }}
          />
        </Row>
        <Row
          style={{
            marginTop: HEIGHT * 8,
            backgroundColor: "yellow",
          }}
        >
          {/*//? 훈련사 */}
          <PreBol18 text="훈련사" color={SUB_HEAD_LINE} />

          {/*//? 방문/위탁 토글 버튼 */}
          <ComeHomeGoToSwitchButton
            state={isComeHomeTrainer}
            setState={setIsComeHomeTrainer}
            style={{ marginLeft: "auto" }}
          />
        </Row>
      </ScreenRootView>
    )
  },
)
