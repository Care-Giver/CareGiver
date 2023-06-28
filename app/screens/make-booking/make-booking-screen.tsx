import React, { FC, useEffect, useState } from "react"
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
import {
  View,
  ScrollView,
  Pressable,
  Alert,
  StyleSheet,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from "react-native"
import { useKeyboard } from "@react-native-community/hooks"

import { BOTTOM_HEIGHT, DISABLED, GIVER_CASUAL_NAVY } from "#theme"
import {
  offsets,
  presets,
} from "/Users/iyebeom/CareGiver/app/components/basics/ignite-basics/screen/screen.presets"

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

  /**
   * 키보드 관련
   * 안드로이드 일 경우에 useKeyboard의 keyboardshown 사용 (단, 에뮬레이터 상으로 버튼이 늦게 사라지고 생성됨..)
   * ios 일 경우에 useKeyboard도 사용 가능해 보이지만, keyboardWillshow, keyboardWillHide사용
   */
  const keyboard = useKeyboard()

  const [keyboardStatus, setKeyboardStatus] = useState(undefined)
  useEffect(() => {
    const keyboardUp = Keyboard.addListener("keyboardWillShow", () => {
      //*console.log("keyboardUp!")
      setKeyboardStatus(true)
    })
    const keyboardDown = Keyboard.addListener("keyboardWillHide", () => {
      //*console.log("keboardDown!")
      setKeyboardStatus(false)
    })

    return () => {
      keyboardUp.remove()
      keyboardDown.remove()
    }
  }, [])

  /**
   *  1번째 버튼 그룹의 예외 처리
   */
  const [is없음Active, setIs없음Active] = useState(false)
  const [is치즈Active, setIs치즈Active] = useState(false)
  const [is닭고기Active, setIs닭고기Active] = useState(false)

  const firstClick = (click: "없음" | "치즈" | "닭고기") => {
    if (click === "없음") {
      setIs없음Active(true)
    } else if (click === "치즈") {
      setIs치즈Active(!is치즈Active)
    } else if (click === "닭고기") {
      setIs닭고기Active(!is닭고기Active)
    }
  }

  useEffect(() => {
    if (is없음Active) {
      setIs치즈Active(false)
      setIs닭고기Active(false)
    }
  }, [is없음Active])

  useEffect(() => {
    if (is없음Active && (is치즈Active || is닭고기Active)) {
      setIs없음Active(!is없음Active)
    }
  }, [is치즈Active, is닭고기Active])

  /**
   * 2번째 버튼 그룹의 예외 처리
   */
  const [꿀팁, set꿀팁] = useState<"강아지" | "처음엔" | "되도록">(null)

  /**
   * 3번째 버튼 그룹의 예외 처리
   */
  const [is모두Active, setIs모두Active] = useState(false)
  const [is엉덩이Active, setIs엉덩이Active] = useState(false)
  const [is다리Active, setIs다리Active] = useState(false)

  const thirdClick = (click: "모두" | "엉덩이" | "다리") => {
    if (click === "모두") {
      setIs모두Active(!is모두Active)
    } else if (click === "엉덩이") {
      setIs엉덩이Active(!is엉덩이Active)
    } else if (click === "다리") {
      setIs다리Active(!is다리Active)
    }
  }
  useEffect(() => {
    if (is모두Active) {
      setIs엉덩이Active(false)
      setIs다리Active(false)
    }
  }, [is모두Active])

  useEffect(() => {
    if (is모두Active && (is엉덩이Active || is다리Active)) {
      setIs모두Active(!is모두Active)
    }
  }, [is엉덩이Active, is다리Active])

  /**
   *  선택하는 버튼이 함께 있는 TextInput박스를 눌렀을 때, onPressIn을 사용하여 눌려있는 버튼을 취소할 수 있게됨
   */
  const textboxClick = (click: "먹으면안되는음식" | "꿀팁") => {
    if (click === "먹으면안되는음식") {
      setIs없음Active(false)
      setIs치즈Active(false)
      setIs닭고기Active(false)
    } else if (click === "꿀팁") {
      set꿀팁(null)
    }
  }

  return (
    <ScreenRootView testID="MakeBooking">
      <ScrollView>
        <PreReg12
          style={{ textAlign: "right" }}
          color={DISABLED}
          text={"상세하게 입력해 주실수록 서비스 품질을 높이는데 도움이 됩니다 :)"}
        />
        <PreBol14
          style={{ marginTop: 24, marginBottom: 8 }}
          text={"펫시팅에 도움을 줄 수 있는 도구, 사료는 어디에 위치해있나요?"}
        />
        <PlaceHolderInputBox
          placeholderText="Ex) 몇 번째 서랍, 몇 번째 칸에 사료가 있고, 신발장 옆에 리드줄이 있어요…"
          boxHeight={78}
        />

        <PreBol14
          style={{ marginTop: 16, marginBottom: 14 }}
          text={"먹으면 안되는 음식을 알려주세요! (알러지 여부)"}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 11 }}>
          <ClickToBlueButton
            buttonText={"없음"}
            buttonHeight={45}
            buttonWidth={115}
            isActiving={is없음Active}
            onPress={() => firstClick("없음")}
          />
          <ClickToBlueButton
            buttonText={"치즈"}
            buttonHeight={45}
            buttonWidth={115}
            isActiving={is치즈Active}
            onPress={() => firstClick("치즈")}
          />
          <ClickToBlueButton
            buttonText={"닭고기"}
            buttonHeight={45}
            buttonWidth={115}
            isActiving={is닭고기Active}
            onPress={() => firstClick("닭고기")}
          />
        </View>
        <PlaceHolderInputBox
          placeholderText="주의할 음식을 직접 작성해주세요!"
          boxHeight={78}
          onPressIn={() => textboxClick("먹으면안되는음식")}
        />
        <PreBol14
          style={{ marginTop: 16, marginBottom: 14 }}
          text={"반려동물과 친해질 수 있는 꿀팁을 알려주세요."}
        />
        <View style={{ justifyContent: "space-between", marginBottom: 11, height: 151 }}>
          <ClickToBlueButton
            buttonText={"강아지계의 ENFP! 사람이면 다 좋아해요."}
            buttonHeight={45}
            buttonWidth={358}
            isActiving={꿀팁 === "강아지"}
            onPress={() => set꿀팁("강아지")}
          />
          <ClickToBlueButton
            buttonText={"처음엔 낯가릴 수 있어서 조심이 필요해요."}
            buttonHeight={45}
            buttonWidth={358}
            isActiving={꿀팁 === "처음엔"}
            onPress={() => set꿀팁("처음엔")}
          />
          <ClickToBlueButton
            buttonText={"되도록이면 만지지 말고 간식만 챙겨주세요."}
            buttonHeight={45}
            buttonWidth={358}
            isActiving={꿀팁 === "되도록"}
            onPress={() => set꿀팁("되도록")}
          />
        </View>
        <PlaceHolderInputBox
          placeholderText="꿀팁을 자유롭게 작성해주세요"
          boxHeight={78}
          onPressIn={() => textboxClick("꿀팁")}
        />
        <PreBol14
          style={{ marginTop: 16, marginBottom: 11 }}
          text={"배변 처리 방법을 알려주세요"}
        />
        <PlaceHolderInputBox
          placeholderText="Ex) 몇 번째 서랍, 몇 번째 칸에 사료가 있고, 신발장 옆에 리드줄이 있어요…"
          boxHeight={78}
        />
        <PreBol14
          style={{ marginTop: 16, marginBottom: 17 }}
          text={"스킨십할 때 좋아하는 부위를 말씀해주세요"}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 11 }}>
          <ClickToBlueButton
            buttonText={"모두"}
            buttonHeight={45}
            buttonWidth={115}
            isActiving={is모두Active}
            onPress={() => thirdClick("모두")}
          />
          <ClickToBlueButton
            buttonText={"엉덩이 빼고"}
            buttonHeight={45}
            buttonWidth={115}
            isActiving={is엉덩이Active}
            onPress={() => thirdClick("엉덩이")}
          />
          <ClickToBlueButton
            buttonText={"다리 빼고"}
            buttonHeight={45}
            buttonWidth={115}
            isActiving={is다리Active}
            onPress={() => thirdClick("다리")}
          />
        </View>
        <PreBol14 style={{ marginTop: 72, marginBottom: 8 }} text={"자유 요청 사항"} />
        <KeyboardAvoidingView
          style={presets.fixed.outer}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={40}
        >
          <PlaceHolderInputBox
            placeholderText="요청 사항을 자유롭게 작성해주세요. (300자 이내)"
            boxHeight={161}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      {Platform.OS === "android" && !keyboard.keyboardShown && (
        <Pressable style={styles.pressableContainer} onPress={checkbuttonPress}>
          <PreBol16 text={"확인"} color="white" />
        </Pressable>
      )}
      {Platform.OS === "ios" && !keyboardStatus && (
        <Pressable style={styles.pressableContainer} onPress={checkbuttonPress}>
          <PreBol16 text={"확인"} color="white" />
        </Pressable>
      )}
    </ScreenRootView>
  )
})

const styles = StyleSheet.create({
  pressableContainer: {
    width: "100%",
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: GIVER_CASUAL_NAVY,
    backgroundColor: GIVER_CASUAL_NAVY,
    alignItems: "center",
    justifyContent: "center",
    bottom: BOTTOM_HEIGHT,
  },
})
