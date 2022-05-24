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
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"

import { PRE_14, POP_14, POP_SB_14, PRE_M_14, PRE_B_14 } from "../../../assets/fonts"
import { DivisionLine } from "../../components/lines/division-line"

//* export convention of Our Project
//! 절대 package 를 혼자 설치하지 않는다,
//! 절대 node, npm, expo, ignite-cli를 혼자 업데이트하지 않는다.
// -> 무조건 날 잡고, 같이한다.

//- 1. 절대 export default 사용하지 않는다 (99%)
//~     export const 함수명 ......
//~       (예외는 나중에 설명함)

//-2. index 파일 생성 규약
// export * from "./bullet-item/bullet-item"
// export * from "./button/button"
// export * from "./checkbox/checkbox"
// export * from "./form-row/form-row"
// export * from "./header/header"
// export * from "./gradient-background/gradient-background"
// export * from "./icon/icon"
// export * from "./screen/screen"
// export * from "./switch/switch"
// export * from "./text/text"
// export * from "./text-field/text-field"
// export * from "./wallpaper/wallpaper"
// export * from "./auto-image/auto-image"
// // export * from "./lines/division-line"
//- 이렇게 만든다.

//- 3. 무조건 styles.ts 따로 만든다!!!!!!!!!!!

//- 4. width 와 heihgt 는 무조건 WIDTH * 값, HEIGTH * 값 으로 사용해야한다. (값: xd 값))
//~   WIDTH, HEIGTH 는 상수이며, import 해서 쓸꺼임.
// ~  웬만하면 이짓거리 안하게, component 화 하겠으나,
//~   혼자 작업할때 필요하다면, styles 작성시 위에처럼 곱해서 사용할것!

const bowserLogo = require("./bowser.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}
const ALMOST: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 26,
  fontStyle: "italic",
}
const BOWSER: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
  width: 343,
  height: 230,
}
const CONTENT: TextStyle = {
  ...TEXT,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
}
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {
    const nextScreen = () => navigation.navigate("demo")

    return (
      <View testID="WelcomeScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header headerTx="welcomeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />

          <ReactNativeText style={{ fontSize: 14, color: "white" }}>
            [기본, DEFAULT 폰트] 내 모든 걸 다주었네 내 술도마셔 난 선명하게 이 밤을 다 기억할래 내
            몸을 모두 I'm levitating The Milky Way, we're renegading Yeah, yeah, yeah, yeah, yeah I
            got you, moonlight
            {"\n"}
          </ReactNativeText>

          <DivisionLine />

          <Text style={PRE_14}>
            [PRE_14] 내 모든 걸 다주었네 내 술도마셔 난 선명하게 이 밤을 다 기억할래 내 몸을 모두
            담궈도 fig 난 눈물론 안젖어 날 가지고 노는 걸알아 그래서 난 니가 좋아
            {"\n"}
          </Text>

          <Text style={PRE_M_14}>
            [PRE_14] 내 모든 걸 다주었네 내 술도마셔 난 선명하게 이 밤을 다 기억할래 내 몸을 모두
            담궈도 fig 난 눈물론 안젖어 날 가지고 노는 걸알아 그래서 난 니가 좋아
            {"\n"}
          </Text>

          <Text style={PRE_B_14}>
            [PRE_14] 내 모든 걸 다주었네 내 술도마셔 난 선명하게 이 밤을 다 기억할래 내 몸을 모두
            담궈도 fig 난 눈물론 안젖어 날 가지고 노는 걸알아 그래서 난 니가 좋아
            {"\n"}
          </Text>

          <DivisionLine />

          <Text style={POP_14}>
            [POP_14] You want me, I want you, baby My sugarboo, I'm levitating The Milky Way, we're
            renegading Yeah, yeah, yeah, yeah, yeah I got you, moonlight, you're my starlight I need
            you all night, come on, dance with me I'm levitating You, moonlight, you're my starlight
            (you're the moonlight) I need you all night, come on, dance with me I'm levitating (woo)
            {"\n"}
          </Text>

          <Text style={POP_SB_14}>
            [POP_14] You want me, I want you, baby My sugarboo, I'm levitating The Milky Way, we're
            renegading Yeah, yeah, yeah, yeah, yeah I got you, moonlight, you're my starlight I need
            you all night, come on, dance with me I'm levitating You, moonlight, you're my starlight
            (you're the moonlight) I need you all night, come on, dance with me I'm levitating (woo)
            {"\n"}
          </Text>

          <Text style={TITLE_WRAPPER}>
            <Text style={TITLE} text="Your new app, " />
            <Text style={ALMOST} text="almost" />
            <Text style={TITLE} text="!" />
          </Text>
          <Text style={TITLE} preset="header" tx="welcomeScreen.readyForLaunch" />
          <Image source={bowserLogo} style={BOWSER} />
          <Text style={CONTENT}>
            This probably isn't what your app is going to look like. Unless your designer handed you
            this screen and, in that case, congrats! You're ready to ship.
          </Text>
          <Text style={CONTENT}>
            For everyone else, this is where you'll see a live preview of your fully functioning app
            using Ignite.
          </Text>
        </Screen>
        <SafeAreaView style={FOOTER}>
          <View style={FOOTER_CONTENT}>
            <Button
              testID="next-screen-button"
              style={CONTINUE}
              textStyle={CONTINUE_TEXT}
              tx="welcomeScreen.continue"
              onPress={nextScreen}
            />
          </View>
        </SafeAreaView>
      </View>
    )
  },
)
