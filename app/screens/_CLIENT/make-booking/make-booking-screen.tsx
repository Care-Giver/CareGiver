import React, { FC, useState } from "react"
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
  RowRoundedButton,
} from "#components"
import { View, Pressable, StyleSheet } from "react-native"
import { BOTTOM_HEIGHT, DISABLED, GIVER_CASUAL_NAVY, palette } from "#theme"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useKeyboardShown } from "../../../utils/hooks"
import _ from "lodash"
import { images } from "#images"
import { alertModal } from "../../../utils/alert-modal"

export type BookingRequest = {
  petToolsLocInfo?: string // (방문 ONLY) 펫시팅시 사용할 수 있는 도구 및 사료 위치
  avoidFoodInfo: string // 먹으면 안되는 음식
  bondingTipsInfo: string // 친해지기 위한 꿀팁
  request: string // 자유 요청사항
}

const bondingTip = {
  0: "ENFP! 사람이면 다 좋아해요.",
  1: "처음엔 낯가릴 수 있어서 조심이 필요해요.",
  2: "되도록이면 만지지 말고 간식만 챙겨주세요.",
}

export const MakeBookingScreen: FC<
  StackScreenProps<NavigatorParamList, "make-booking-screen">
> = observer(function MakeBookingScreen({ route }) {
  const { key, service, selectedPetIds, selectedTime, address } = route.params
  const isKeyboardShown = useKeyboardShown()
  const isButtonShown = !isKeyboardShown
  console.log("selectedTime 2", selectedTime)
  console.log("address", address)

  /**
   * "방문전용" [유저인풋 텍스트] 주소
   */
  const [visitingAddress, setVisitingAddress] = useState<{
    address: string
    detailAddress: string
  }>({
    address: address,
    detailAddress: "",
  })

  /**
   * [유저인풋 텍스트] 요청사항들
   */
  const [bookingRequest, setBookingRequest] = useState<
    BookingRequest & {
      cleaningTipsInfo: string
    }
  >({
    avoidFoodInfo: "",
    bondingTipsInfo: "",
    petToolsLocInfo: "",
    cleaningTipsInfo: "",
    request: "",
  })

  /**
   * [버튼] 먹으면 안되는 음식
   */
  const [is없음Active, setIs없음Active] = useState(false)
  const [is치즈Active, setIs치즈Active] = useState(false)
  const [is닭고기Active, setIs닭고기Active] = useState(false)

  const onPress먹으면안되는음식 = (click: "없음" | "치즈" | "닭고기") => {
    switch (click) {
      case "없음":
        setIs없음Active(!is없음Active) // 없음 버튼 토글
        // 초기상태
        if (!is없음Active && !is치즈Active && !is닭고기Active) {
          setBookingRequest((_) => ({ ..._, avoidFoodInfo: "" }))
        }
        // 없음 버튼이 눌려있는 상태
        else if (is없음Active) {
          setIs치즈Active(false)
          setIs닭고기Active(false)
          setBookingRequest((_) => ({ ..._, avoidFoodInfo: "" }))
        }
        // 없음 버튼이 눌려있지 않고, 다른 버튼들은 눌려있는 상태
        else if (!is없음Active && (is치즈Active || is닭고기Active)) {
          setIs없음Active(true)
          setIs치즈Active(false)
          setIs닭고기Active(false)
          setBookingRequest((_) => ({ ..._, avoidFoodInfo: "" }))
        }
        break
      case "치즈":
        setIs치즈Active(!is치즈Active) // 치즈 버튼 토글
        if (is없음Active) {
          setIs없음Active(false)
        }
        break
      case "닭고기":
        setIs닭고기Active(!is닭고기Active) // 닭고기 버튼 토글
        if (is없음Active) {
          setIs없음Active(false)
        }
        break
    }
  }

  /**
   * [버튼] 반려동물과 친해질 수 있는 꿀팁
   */
  const [꿀팁, set꿀팁] = useState<keyof typeof bondingTip>(null)

  // /**
  //  * 3번째 버튼 그룹의 예외 처리
  //  */
  // const [is모두Active, setIs모두Active] = useState(false)
  // const [is엉덩이Active, setIs엉덩이Active] = useState(false)
  // const [is다리Active, setIs다리Active] = useState(false)

  // useEffect(() => {
  //   if (is모두Active) {
  //     setIs엉덩이Active(false)
  //     setIs다리Active(false)
  //   }
  // }, [is모두Active])

  // useEffect(() => {
  //   if (is모두Active && (is엉덩이Active || is다리Active)) {
  //     setIs모두Active(!is모두Active)
  //   }
  // }, [is엉덩이Active, is다리Active, is모두Active])

  const onPress = () => {
    if (key === "visiting" && !visitingAddress?.detailAddress) {
      alertModal("상세 주소 입력", "펫시터님이 방문할 수 있도록 상세 주소도 필수로 입력해주세요!")
      return
    }

    let destination = null
    if (key === "visiting") {
      destination = `${visitingAddress?.address} ${visitingAddress?.detailAddress}`
    }
    let avo = ""
    let bond = ""
    if (is없음Active) {
      avo = "모든 음식 가능"
    } else if (is치즈Active && is닭고기Active) {
      avo = "치즈, 닭고기 금지"
    } else if (is치즈Active) {
      avo = "치즈 금지"
    } else if (is닭고기Active) {
      avo = "닭고기 금지"
    }

    if (꿀팁 === null) {
      bond = ""
    } else {
      bond = bondingTip[꿀팁]
    }

    navigate("payment-screen", {
      key,
      service,
      selectedPetIds,
      selectedTime,
      bookingRequest: {
        petToolsLocInfo: bookingRequest.petToolsLocInfo,
        avoidFoodInfo: avo
          ? `${avo} | ${bookingRequest.avoidFoodInfo}`
          : bookingRequest.avoidFoodInfo,
        bondingTipsInfo: bond
          ? `${bond} | ${bookingRequest.bondingTipsInfo}`
          : bookingRequest.bondingTipsInfo,
        request: bookingRequest.cleaningTipsInfo
          ? `${bookingRequest.cleaningTipsInfo} | ${bookingRequest.request}`
          : bookingRequest.request,
      },
      destination,
    })
  }

  return (
    <Screen testID="MakeBooking" type="View">
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid>
        <View style={styles.topTipBox}>
          <PreReg12
            color={palette.black}
            text={"* 상세하게 입력해 주실수록 서비스 품질을 높이는데 도움이 됩니다!"}
          />
        </View>

        {/* [방문 ONLY] 펫시터가 방문할 주소 입력 */}
        {key === "visiting" ? (
          <View style={{ marginBottom: 36 }}>
            <PreBol14
              style={{ marginTop: 24, marginBottom: 8 }}
              text="펫시터님이 방문할 주소를 알려주세요. (필수)"
            />
            {/*//* 위치 선택 */}
            <RowRoundedButton
              onPress={() => {
                //
              }}
              image={images.location_disabled}
              text={visitingAddress?.address}
              textColor={DISABLED}
              style={{ marginVertical: 12 }}
            />
            <PlaceHolderInputBox
              placeholderText="상세주소를 입력해주세요. Ex) 102동 310호"
              boxHeight={48}
              text={visitingAddress?.detailAddress}
              setText={(text) => {
                setVisitingAddress((_) => ({ ..._, detailAddress: text }))
              }}
            />
          </View>
        ) : null}

        <PreBol14
          style={{ marginTop: 24, marginBottom: 14 }}
          text={"먹으면 안되는 음식을 알려주세요!"}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 11 }}>
          <ClickToBlueButton
            buttonText={"없음"}
            buttonHeight={45}
            buttonWidth={115}
            isActiving={is없음Active}
            onPress={() => onPress먹으면안되는음식("없음")}
          />
          <ClickToBlueButton
            buttonText={"치즈"}
            buttonHeight={45}
            buttonWidth={115}
            isActiving={is치즈Active}
            onPress={() => onPress먹으면안되는음식("치즈")}
          />
          <ClickToBlueButton
            buttonText={"닭고기"}
            buttonHeight={45}
            buttonWidth={115}
            isActiving={is닭고기Active}
            onPress={() => onPress먹으면안되는음식("닭고기")}
          />
        </View>
        <PlaceHolderInputBox
          placeholderText="주의할 음식이나 알러지가 있다면, 직접 작성해주세요!"
          boxHeight={78}
          text={bookingRequest.avoidFoodInfo}
          setText={(text) => {
            is없음Active && setIs없음Active(false)
            setBookingRequest((_) => ({ ..._, avoidFoodInfo: text }))
          }}
        />

        <PreBol14
          style={{ marginTop: 24, marginBottom: 14 }}
          text={"반려동물과 친해질 수 있는 꿀팁을 알려주세요."}
        />
        <View style={{ justifyContent: "space-between", marginBottom: 11, height: 151 }}>
          {_.map(bondingTip, (item, index) => (
            <ClickToBlueButton
              key={index}
              buttonText={bondingTip[Number(index)]}
              buttonHeight={45}
              buttonWidth={358}
              isActiving={꿀팁 === Number(index)}
              onPress={() =>
                // @ts-ignore
                set꿀팁(Number(index))
              }
            />
          ))}
        </View>
        <PlaceHolderInputBox
          placeholderText="꿀팁을 자유롭게 작성해주세요"
          boxHeight={78}
          text={bookingRequest.bondingTipsInfo}
          setText={(text) => {
            setBookingRequest((_) => ({ ..._, bondingTipsInfo: text }))
          }}
        />

        {/* [방문 ONLY] 펫시팅에 도움을 줄 수 있는 도구/사료 위치  */}
        {key === "visiting" ? (
          <View>
            <PreBol14
              style={{ marginTop: 24, marginBottom: 8 }}
              text="펫시팅에 도움을 줄 수 있는 도구, 사료는 어디에 위치해있나요?"
            />
            <PlaceHolderInputBox
              placeholderText="Ex) 신발장 옆 첫번째 서랍, 마지막 칸에 사료가 있어요."
              boxHeight={78}
              text={bookingRequest.petToolsLocInfo}
              setText={(text) => {
                setBookingRequest((_) => ({ ..._, petToolsLocInfo: text }))
              }}
            />
          </View>
        ) : null}

        <PreBol14
          style={{ marginTop: 16, marginBottom: 11 }}
          text={"배변 처리 방법을 알려주세요"}
        />
        <PlaceHolderInputBox
          placeholderText="Ex) 고양이 모래는 절대 변기 안에 넣지 말아주세요!!"
          boxHeight={78}
          text={bookingRequest.cleaningTipsInfo}
          setText={(text) => {
            setBookingRequest((_) => ({ ..._, cleaningTipsInfo: text }))
          }}
        />

        <PreBol14 style={{ marginTop: 24, marginBottom: 8 }} text={"자유 요청 사항"} />
        <PlaceHolderInputBox
          placeholderText="요청 사항을 자유롭게 작성해주세요. (300자 이내)"
          boxHeight={161}
          text={bookingRequest.request}
          setText={(text) => {
            setBookingRequest((_) => ({ ..._, request: text }))
          }}
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
  topTipBox: {
    width: "100%",
    height: 35,
    justifyContent: "center",
    paddingHorizontal: 12,
    marginTop: 10,
    backgroundColor: "#F1F1F4",
    borderRadius: 8,
  },
})
