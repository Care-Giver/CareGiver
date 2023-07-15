import React, { FC, useState } from "react"
import { StyleSheet, View, Image, Pressable, TouchableOpacity } from "react-native"
import { images } from "#images"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  DivisionLine,
  PaymentTool,
  PreBol14,
  PreBol16,
  PreBol18,
  PreMed14,
  PreReg14,
  Screen,
} from "#components"
import { ScrollView } from "react-native-gesture-handler"
import { BODY, GIVER_CASUAL_NAVY, MIDDLE_LINE } from "#theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

export type PaymentModuleType = "카카오페이" | "네이버페이" | "토스" | "신용/체크카드"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const PaymentScreen: FC<StackScreenProps<NavigatorParamList, "payment-screen">> = observer(
  function PaymentScreen() {
    // MST store 를 가져옵니다.
    // const { someStore, anotherStore } = useStores()

    const [selectedTool, setSelectedTool] = useState<PaymentModuleType>(null)

    const is신용체크카드 = selectedTool === "신용/체크카드"

    // 필요시, useNavigation 훅을 사용할 수 있습니다.
    // const navigation = useNavigation()
    return (
      <Screen testID="Payment" style={{ paddingHorizontal: 0 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* CONTENT 시작, paddingHorizontal:16 */}
          <View style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}>
            <View style={styles.bookingInfo}>
              <PreBol14 text="예약 정보" />
              {/* 방문, 펫시터 Box 컴포넌트 가져오기 */}
            </View>

            <DivisionLine mt={12} />
            <PreMed14 text="담당 Care Giver" mb={8} mt={15} />
            <PreReg14 text="유혜린 펫시터" mb={24} color={BODY} />
            {/* 맡길 반려동물 컴포넌트 가져오기 */}
            <PreMed14 text="방문 장소" mb={8} />
            <PreReg14 text="경기도 안산시 상록구 한양대로 55" mb={24} color={BODY} />
            <PreMed14 text="방문 시간" mb={8} />
            <PreReg14 text="6월 14일 10:00 - 6월 14일 18:00" mb={24} color={BODY} />
          </View>

          <DivisionLine height={6} mb={24} />

          {/* paddingHorizontal:16 */}
          <View style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}>
            <PreBol14 text="결제 수단" mb={14} />
            <DivisionLine />
            {/* 결제 수단 컴포넌트 시작 */}
            <View
              style={{
                marginTop: 16,
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: 24,
              }}
            >
              <PaymentTool
                tool="카카오페이"
                selectedTool={selectedTool}
                setSelectedTool={() => {
                  setSelectedTool("카카오페이")
                }}
              />
              <PaymentTool
                tool="네이버페이"
                selectedTool={selectedTool}
                setSelectedTool={() => {
                  setSelectedTool("네이버페이")
                }}
              />
              <PaymentTool
                tool="토스"
                selectedTool={selectedTool}
                setSelectedTool={() => {
                  setSelectedTool("토스")
                }}
              />
            </View>
            <Pressable
              style={[styles.borderBox, is신용체크카드 && styles.selectedBorderBox]}
              onPress={() => {
                setSelectedTool("신용/체크카드")
              }}
            >
              <Image
                style={styles.radio}
                source={is신용체크카드 ? images.radio_active : images.radio_inactive}
              />
              {is신용체크카드 ? (
                <PreBol14 text="신용/체크카드" color={GIVER_CASUAL_NAVY} />
              ) : (
                <PreReg14 text="신용/체크카드" color={BODY} />
              )}
            </Pressable>

            <View style={styles.couponInfo}>
              <PreMed14 text="쿠폰" />
              <PreReg14 text="보유 중인 쿠폰 없음" color={BODY} />
            </View>
          </View>

          <DivisionLine height={6} mv={24} />

          <View style={styles.priceContainer}>
            <PreBol14 text="요금 세부 정보" mb={13} />
            <DivisionLine />
            {/* 가격 테이블  */}
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <PreReg14 text="서비스 이용료" style={{ flex: 3 }} />
                <PreReg14 text="50,000" style={{ flex: 2 }} />
                <PreReg14 text="8시간" style={{ flex: 1 }} />
                <PreReg14 text="400,000원" style={{ flex: 3, textAlign: "right" }} />
              </View>
              <View style={styles.tableRow}>
                <PreReg14 text="수수료" style={{ flex: 3 }} />
                <PreReg14 text="40,000" style={{ flex: 3 }} />
                <PreReg14 text="40,000원" style={{ flex: 3, textAlign: "right" }} />
              </View>
              <View style={styles.tableRow}>
                <PreReg14 text="할인 쿠폰" style={{ flex: 5 }} />
                <PreReg14 text="1" style={{ flex: 1, textAlign: "center" }} />
                <PreReg14 text="-10,000원" style={{ flex: 3, textAlign: "right" }} />
              </View>
            </View>
            <DivisionLine />
            <View style={styles.totalPrice}>
              <PreBol16 text="결제 금액" />
              <PreBol18 text="430,000원" />
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.paymentButton}>
          <PreBol16 text="430,000원" color="white" ml={16} />
          <PreBol16 text="결제하기" color="white" mr={16} />
        </TouchableOpacity>
      </Screen>
    )
  },
)

const styles = StyleSheet.create({
  bookingInfo: {
    marginTop: 22,
    justifyContent: "center",
  },

  borderBox: {
    width: "100%",
    height: 47,
    borderStyle: "solid",
    borderColor: MIDDLE_LINE,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
    marginBottom: 25,
  },

  selectedBorderBox: {
    borderWidth: 1,
    borderColor: GIVER_CASUAL_NAVY,
  },

  radio: {
    width: 16,
    height: 16,
    marginRight: 7,
  },

  couponInfo: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    alignItems: "center",
  },
  priceContainer: {
    paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
    height: 300,
  },
  table: {
    height: 112,
    width: "100%",
  },
  tableRow: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  tableColumn: {
    flex: 1,
  },
  totalPrice: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 13,
  },
  paymentButton: {
    bottom: 40,
    marginHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
    backgroundColor: GIVER_CASUAL_NAVY,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 56,
    borderRadius: 10,
    alignItems: "center",
  },
})
