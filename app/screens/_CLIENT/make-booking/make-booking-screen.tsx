import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import {
  Screen,
  PlaceHolderInputBox,
  ClickToBlueButton,
  PreReg12,
  PreBol14,
  PreBol16,
} from "#components"
import { View, Pressable, StyleSheet } from "react-native"
import { BOTTOM_HEIGHT, DISABLED, GIVER_CASUAL_NAVY } from "#theme"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useKeyboardShown } from "../../../utils/hooks"

type Requests = {
  petToolsLocInfo: string
  avoidFoodInfo: string
  bondingTipsInfo: string
  request: string
}

export const MakeBookingScreen: FC<
  StackScreenProps<NavigatorParamList, "make-booking-screen">
> = observer(function MakeBookingScreen({ route }) {
  // @ts-ignore
  const { key, service, selectedPetIds, selectedTime } = route.params
  const isKeyboardShown = useKeyboardShown()
  const isButtonShown = !isKeyboardShown
  console.log("selectedTime 2", selectedTime)

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
  }, [is치즈Active, is닭고기Active, is없음Active])

  /**
   * 2번째 버튼 그룹의 예외 처리
   */
  const [꿀팁, set꿀팁] = useState<"사람이면다" | "처음엔" | "되도록">(null)

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
  }, [is엉덩이Active, is다리Active, is모두Active])

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

  /**
   * 4가지 requestText
   */
  const [petToolsLocInfo, setPetToolsLocInfo] = useState("")
  const [avoidFoodInfo, setAvoidFoodInfo] = useState("")
  const [bondingTipsInfo, setBondingTipsInfo] = useState("")
  const [request, setRequest] = useState("")
  const requests: Requests = {
    petToolsLocInfo: petToolsLocInfo,
    avoidFoodInfo: avoidFoodInfo,
    bondingTipsInfo: bondingTipsInfo,
    request: request,
  }
  const onPress = () => {
    console.log("petToolsLocInfo: ", petToolsLocInfo)
    navigate("payment-screen", {
      key,
      service,
      selectedPetIds,
      selectedTime,
      requests,
    })
  }

  return (
    <Screen testID="MakeBooking" type="View">
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <PreReg12
          style={{ textAlign: "right" }}
          color={DISABLED}
          text={"상세하게 입력해 주실수록 서비스 품질을 높이는데 도움이 됩니다 :)"}
        />
        {key === "visiting" ? (
          <View>
            <PreBol14
              style={{ marginTop: 24, marginBottom: 8 }}
              text="펫시팅에 도움을 줄 수 있는 도구, 사료는 어디에 위치해있나요?"
            />
            <PlaceHolderInputBox
              placeholderText="Ex) 몇 번째 서랍, 몇 번째 칸에 사료가 있고, 신발장 옆에 리드줄이 있어요…"
              boxHeight={78}
              text={petToolsLocInfo}
              setText={setPetToolsLocInfo}
            />
          </View>
        ) : null}

        <PreBol14
          style={{ marginTop: 24, marginBottom: 14 }}
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
          text={avoidFoodInfo}
          setText={setAvoidFoodInfo}
        />
        <PreBol14
          style={{ marginTop: 24, marginBottom: 14 }}
          text={"반려동물과 친해질 수 있는 꿀팁을 알려주세요."}
        />
        <View style={{ justifyContent: "space-between", marginBottom: 11, height: 151 }}>
          <ClickToBlueButton
            buttonText={"ENFP! 사람이면 다 좋아해요."}
            buttonHeight={45}
            buttonWidth={358}
            isActiving={꿀팁 === "사람이면다"}
            onPress={() => set꿀팁("사람이면다")}
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
          text={bondingTipsInfo}
          setText={setBondingTipsInfo}
        />
        <PreBol14
          style={{ marginTop: 16, marginBottom: 11 }}
          text={"배변 처리 방법을 알려주세요"}
        />
        <PlaceHolderInputBox
          placeholderText="Ex) 몇 번째 서랍, 몇 번째 칸에 사료가 있고, 신발장 옆에 리드줄이 있어요…"
          boxHeight={78}
        />

        <PreBol14 style={{ marginTop: 24, marginBottom: 8 }} text={"자유 요청 사항"} />
        <PlaceHolderInputBox
          placeholderText="요청 사항을 자유롭게 작성해주세요. (300자 이내)"
          boxHeight={161}
          text={request}
          setText={setRequest}
        />
      </KeyboardAwareScrollView>
      {isButtonShown && (
        <Pressable style={styles.pressableContainer} onPress={onPress}>
          <PreBol16 text={"예약하기"} color="white" />
        </Pressable>
      )}
    </Screen>
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
