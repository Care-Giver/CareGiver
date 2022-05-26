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
} from "../../components"
import { color, spacing, typography, SHADOW_4, WIDTH } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { DivisionLine } from "../../components/lines/division-line"
// import {} from "../../components/text/custom-texts"

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

          <DivisionLine />

          <PreReg14 color="red">
            {" "}
            하하하하
            <PreBol32>이건 큰 하하하하</PreBol32>
            하하하하
            {"\n"}
          </PreReg14>

          <View
            style={{
              width: 300,
              height: 300,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={[
                {
                  width: 100 * WIDTH,
                  height: 100,
                  backgroundColor: "yellow",
                },
                SHADOW_4,
              ]}
            />
          </View>

          <PopSem14 text="LETS GET PSYCICAL" color="#21ffff" />

          <DivisionLine />
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
