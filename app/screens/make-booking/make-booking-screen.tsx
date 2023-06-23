import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  ScreenRootView,
  PlaceHolderInputBox,
  ClickToBlueButton,
  PreReg12,
  PreBol14,
  PreBol16,
} from "#components"
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native"
import { DISABLED, GIVER_CASUAL_NAVY } from "#theme"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const MakeBookingScreen: FC<
  StackScreenProps<NavigatorParamList, "make-booking-screen">
> = observer(function MakeBookingScreen() {
  // MST store 를 가져옵니다.
  // const { someStore, anotherStore } = useStores()

  // 필요시, useNavigation 훅을 사용할 수 있습니다.
  // const navigation = useNavigation()
  const checkbuttonPress = () => {
    Alert.alert("확인 버튼이 눌렸습니다.")
  }

  return (
    <ScreenRootView testID="MakeBooking">
      <ScrollView>
        {/* 1번째  */}
        <PreReg12
          style={{ textAlign: "right" }}
          color={DISABLED}
          text={"상세하게 입력해 주실수록 서비스 품질을 높이는데 도움이 됩니다 :)"}
        />
        {/* 2번째 */}
        <View style={{ marginTop: 24, marginBottom: 16 }}>
          <PreBol14
            style={{ marginBottom: 8 }}
            text={"펫시팅에 도움을 줄 수 있는 도구, 사료는 어디에 위치해있나요?"}
          />
          <PlaceHolderInputBox
            placeholdertext="Ex) 몇 번째 서랍, 몇 번째 칸에 사료가 있고, 신발장 옆에 리드줄이 있어요…"
            boxheight={78}
          />
        </View>
        {/* 3번째 */}
        <View style={{ marginTop: 16 }}>
          <PreBol14
            style={{ marginBottom: 14 }}
            text={"먹으면 안되는 음식을 알려주세요! (알러지 여부)"}
          />
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 11 }}>
            <ClickToBlueButton
              buttonText={"없음"}
              buttonHeight={45}
              buttonWidth={115}
            ></ClickToBlueButton>
            <ClickToBlueButton
              buttonText={"치즈"}
              buttonHeight={45}
              buttonWidth={115}
            ></ClickToBlueButton>
            <ClickToBlueButton
              buttonText={"닭고기"}
              buttonHeight={45}
              buttonWidth={115}
            ></ClickToBlueButton>
          </View>
          <PlaceHolderInputBox placeholdertext="주의할 음식을 직접 작성해주세요!" boxheight={78} />
        </View>
        {/* 4번째 */}
        <View style={{ marginTop: 16 }}>
          <PreBol14
            style={{ marginBottom: 14 }}
            text={"먹으면 안되는 음식을 알려주세요! (알러지 여부)"}
          />
          <View style={{ justifyContent: "space-between", marginBottom: 11, height: 151 }}>
            <ClickToBlueButton
              buttonText={"강아지계의 ENFP! 사람이면 다 좋아해요."}
              buttonHeight={45}
              buttonWidth={358}
            ></ClickToBlueButton>
            <ClickToBlueButton
              buttonText={"처음엔 낯가릴 수 있어서 조심이 필요해요."}
              buttonHeight={45}
              buttonWidth={358}
            ></ClickToBlueButton>
            <ClickToBlueButton
              buttonText={"되도록이면 만지지 말고 간식만 챙겨주세요."}
              buttonHeight={45}
              buttonWidth={358}
            ></ClickToBlueButton>
          </View>
          <PlaceHolderInputBox placeholdertext="꿀팁을 자유롭게 작성해주세요" boxheight={78} />
        </View>
        {/* 5번째 */}
        <View style={{ marginTop: 16 }}>
          <PreBol14 style={{ marginBottom: 11 }} text={"배변 처리 방법을 알려주세요"} />
          <PlaceHolderInputBox
            placeholdertext="Ex) 몇 번째 서랍, 몇 번째 칸에 사료가 있고, 신발장 옆에 리드줄이 있어요…"
            boxheight={78}
          />
        </View>
        {/* 6번째 */}
        <View style={{ marginTop: 16 }}>
          <PreBol14
            style={{ marginBottom: 17 }}
            text={"스킨십할 때 좋아하는 부위를 말씀해주세요"}
          />
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 11 }}>
            <ClickToBlueButton
              buttonText={"모두"}
              buttonHeight={45}
              buttonWidth={115}
            ></ClickToBlueButton>
            <ClickToBlueButton
              buttonText={"엉덩이 빼고"}
              buttonHeight={45}
              buttonWidth={115}
            ></ClickToBlueButton>
            <ClickToBlueButton
              buttonText={"다리 빼고"}
              buttonHeight={45}
              buttonWidth={115}
            ></ClickToBlueButton>
          </View>
        </View>
        {/* 7번째 */}
        <View style={{ marginTop: 72 }}>
          <PreBol14 style={{ marginBottom: 8 }} text={"자유 요청 사항"} />
          <PlaceHolderInputBox
            placeholdertext="Ex) 몇 번째 서랍, 몇 번째 칸에 사료가 있고, 신발장 옆에 리드줄이 있어요…"
            boxheight={161}
          />
        </View>
        {/*8번째*/}
        <View>
          <TouchableOpacity
            style={{
              width: "100%",
              height: 56,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: GIVER_CASUAL_NAVY,
              backgroundColor: GIVER_CASUAL_NAVY,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={checkbuttonPress}
          >
            <PreBol16 text={"확인"} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenRootView>
  )
})
