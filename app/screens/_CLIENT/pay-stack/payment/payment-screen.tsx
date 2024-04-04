import React, { FC, useState } from "react"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  CareSummary,
  DivisionLine,
  FOOTER_CONTENT_GAP,
  Footer,
  PaymentTool,
  PreBol14,
  PreBol16,
  PreBol18,
  PreMed14,
  PreReg14,
  RefundNote,
  Screen,
} from "#components"
import { ScrollView } from "react-native-gesture-handler"
import { BODY, BOTTOM_HEIGHT, GIVER_CASUAL_NAVY, MIDDLE_LINE, SUB_HEAD_LINE } from "#theme"
import IMP, { IMPData, IMPConst } from "iamport-react-native"
import { useStores } from "#models"
import { price as priceFormatter } from "../../../../utils/format"
import { alertModal } from "../../../../utils/alert-modal"
import { useCalculator, createBooking, CreateBookingProps } from "./payment-screen.controller"
import { PaymentFeeInfo } from "../../../../components/payment-fee-info/payment-fee-info"
import { differenceInDays, differenceInHours } from "date-fns"
import { preRegister } from "#api"
import Config from "react-native-config"

export interface PaymentParams {
  params: IMPData.PaymentData
  tierCode?: string
  bookingData: Omit<CreateBookingProps, "setSuccessModalVisible">
}

export type SimplePayment = "카카오페이" | "네이버페이" | "토스"

export const PaymentScreen: FC<StackScreenProps<NavigatorParamList, "payment-screen">> = observer(
  function PaymentScreen({ route, navigation }) {
    const { key, service, selectedPetIds, selectedTime, bookingRequest, destination } = route.params
    console.log("bookingRequest", bookingRequest)
    const {
      userStore: { userDetail },
      petStore: { getPetsByIds },
    } = useStores()

    //* 결제 정보 관련
    const [pg, setPg] = useState("html5_inicis")
    const [tierCode, setTierCode] = useState(undefined)
    const [method, setMethod] = useState("card")
    const [cardQuota, setCardQuota] = useState(0)
    const [merchantUid, setMerchantUid] = useState(`mid_${new Date().getTime()}`)
    const [name, setName] = useState("케어기버:펫시팅 예약")
    const [buyerName, setBuyerName] = useState("케어기버")
    const [buyerTel, setBuyerTel] = useState("050-6667-1542")
    const [buyerEmail, setBuyerEmail] = useState("dev@caregiver.pet")
    const [vbankDue, setVbankDue] = useState("")
    const [bizNum, setBizNum] = useState("")
    const [escrow, setEscrow] = useState(false)
    const [digital, setDigital] = useState(false)
    const [selectedTool, setSelectedTool] = useState<SimplePayment | "신용/체크카드">(null)
    const is신용체크카드 = selectedTool === "신용/체크카드"

    // totalFee 계산
    const amount = useCalculator({ key, selectedPetIds, selectedTime, service })
    const duration =
      key === "visiting"
        ? differenceInHours(new Date(selectedTime.end), new Date(selectedTime.start))
        : differenceInDays(new Date(selectedTime.end), new Date(selectedTime.start))

    /**
     * 포트원 SDK 와 케어기버 서버 API를 사용하여,
     * 실제 카카오페이 결제를 진행합니다.
     */
    const onPressPayKakaoPay = async () => {
      if (!selectedTool) {
        alertModal("결제 수단", "결제 수단을 선택해주세요.")
        return
      }

      if (!amount?.totalFee) {
        alertModal(
          "결제 금액 계산 실패",
          "알 수 없는 이유로 결제 금액 계산에 실패하였습니다. 잠시 후, 다시 시도해주세요.",
        )
      }

      // 1. 결제정보 사전등록 - 케어기버 서버 API
      const payment = await preRegister({ amount: amount?.totalFee })
      if (!payment) return

      // 2-1. 결제 진행 - 포트원 SDK
      const data: PaymentParams = {
        params: {
          pg: "kakaopay",
          pay_method: "kakaopay",
          merchant_uid: payment.merchant_uid,
          name,
          amount: amount?.totalFee,
          buyer_email: buyerEmail,
          buyer_name: buyerName,
          buyer_tel: buyerTel,
          buyer_addr: undefined,
          buyer_postcode: undefined,
          m_redirect_url: Config.IMP_M_REDIRECT_URL,
          app_scheme: "exampleforrn",
          escrow,
        },
        tierCode,
        //
        // 예약 생성을 위한 값들
        bookingData: {
          key,
          userId: userDetail.id,
          selectedTime,
          selectedPetIds,
          bookingRequest,
          destination,
          service,
          paymentId: payment.id,
        },
      }

      navigate("test-iamport-payment-screen", data) // 2-2. 예약 생성 - 케어기버 서버 API && 3. 결제 사후 검증
    }

    /**
     * [개발중 🏗️]
     * 결제기능은 원포트 계약 체결후 개발가능하므로,
     * 우선 결제를 패스하고 예약객체만 생성하도록 함.
     * 참고 디스코드: https://discord.com/channels/1137734002258755654/1139710316675080203/1178274350856675369
     */
    const onPressPay = () => {
      if (!selectedTool) {
        alertModal("결제 수단", "결제 수단을 선택해주세요.")
        return
      }

      if (!amount?.totalFee) {
        alertModal(
          "결제 금액 계산 실패",
          "알 수 없는 이유로 결제 금액 계산에 실패하였습니다. 잠시 후, 다시 시도해주세요.",
        )
      }

      createBooking({
        key,
        userId: userDetail.id,
        selectedTime,
        selectedPetIds,
        bookingRequest,
        destination,
        service,
        setSuccessModalVisible,
        paymentData: {
          imp_uid: "111",
          merchant_uid: "111",
          imp_success: true,
          isRefunded: false,
          totalFee: amount.totalFee,
        },
      })
    }

    /**
     * 포트원(아임포트) 심사 제출용 함수.
     * onPressPay 를 임시로 대체한다.
     */
    const onPressPayIamportSubmit = () => {
      if (!selectedTool) {
        alertModal("결제 수단", "결제 수단을 선택해주세요.")
        return
      }

      if (!amount?.totalFee) {
        alertModal(
          "결제 금액 계산 실패",
          "알 수 없는 이유로 결제 금액 계산에 실패하였습니다. 잠시 후, 다시 시도해주세요.",
        )
      }

      let _pg = ""
      let _method = ""
      switch (selectedTool) {
        case "카카오페이":
          _pg = "kakaopay"
          _method = "kakaopay"
          break
        case "네이버페이":
          _pg = "naverpay"
          _method = "naverpay"
          break
        case "토스":
          _pg = "tosspay"
          _method = "tosspay"
          break
        case "신용/체크카드":
          _pg = "nice" // nice.{상점ID} - 참고: https://developers.portone.io/docs/ko/sdk/javascript-sdk/payrq?v=v1#%EA%B2%B0%EC%A0%9C%EC%9A%94%EC%B2%AD-%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0-%EC%A0%95%EC%9D%98
          _method = "card"
          break
      }

      const data: PaymentParams = {
        params: {
          pg: _pg,
          pay_method: _method,
          currency: undefined,
          notice_url: undefined,
          display: undefined,
          merchant_uid: merchantUid,
          name,
          amount: amount?.totalFee,
          app_scheme: "exampleforrn",
          tax_free: undefined,
          buyer_name: buyerName,
          buyer_tel: buyerTel,
          buyer_email: buyerEmail,
          buyer_addr: undefined,
          buyer_postcode: undefined,
          custom_data: undefined,
          vbank_due: undefined,
          digital: undefined,
          language: undefined,
          biz_num: undefined,
          customer_uid: undefined,
          naverPopupMode: undefined,
          naverUseCfm: undefined,
          naverProducts: undefined,
          m_redirect_url: IMPConst.M_REDIRECT_URL,
          niceMobileV2: true,
          escrow,
        },
        tierCode,
      }

      // 신용카드의 경우, 할부기한 추가
      if (_method === "card" && cardQuota !== 0) {
        data.params.display = {
          card_quota: cardQuota === 1 ? [] : [cardQuota],
        }
      }

      if (pg === "naverpay") {
        const today = new Date()
        const oneMonthLater = new Date(today.setMonth(today.getMonth() + 1))
        const dd = String(oneMonthLater.getDate()).padStart(2, "0")
        const mm = String(oneMonthLater.getMonth() + 1).padStart(2, "0") // January is 0!
        const yyyy = oneMonthLater.getFullYear()

        data.params.naverPopupMode = false
        data.params.naverUseCfm = `${yyyy}${mm}${dd}`
        data.params.naverProducts = [
          {
            categoryType: "TEST",
            categoryId: "BOOKING",
            uid: "107922211",
            name: `${service[key].__careGiver__.__user__.nickname}-${userDetail?.nickname}`,
            payReferrer: "CARE_GIVER",
            count: 10,
          },
        ]
      }

      console.log("Payment data >>>", data)
      navigate("test-iamport-payment-screen", data)
    }

    const serviceTypeKorean = key === "creche" ? "위탁" : "방문"

    return (
      <Screen testID="Payment" style={{ paddingHorizontal: 0 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}>
            <View style={styles.bookingInfo}>
              <PreBol16 text="예약 정보" />
            </View>

            <DivisionLine mt={12} />
            <PreBol14 text="담당 케어기버" color={SUB_HEAD_LINE} mb={8} mt={15} />
            <PreReg14 text={service[key].__careGiver__.__user__.nickname} mb={36} color={BODY} />

            <CareSummary
              address={service[key].address}
              start={selectedTime?.start}
              end={selectedTime?.end}
              pets={getPetsByIds(selectedPetIds)}
              serviceTypeKorean={serviceTypeKorean}
              showServiceType={true}
              // style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}
            />
          </View>

          <DivisionLine height={6} mb={24} />

          <View style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}>
            <PreBol16 text="결제 수단" mb={14} />
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
                // @ts-ignore
                selectedTool={selectedTool}
                setSelectedTool={() => {
                  setSelectedTool("카카오페이")
                  setPg("kakaopay")
                }}
              />
              {/* <PaymentTool
                tool="네이버페이"
                // @ts-ignore
                selectedTool={selectedTool}
                setSelectedTool={() => {
                  setSelectedTool("네이버페이")
                  setPg("naverpay")
                }}
              />
              <PaymentTool
                tool="토스"
                // @ts-ignore
                selectedTool={selectedTool}
                setSelectedTool={() => {
                  setSelectedTool("토스")
                  setPg("tosspay")
                }}
              /> */}
            </View>
            {/* <Pressable
              style={[styles.borderBox, is신용체크카드 && styles.selectedBorderBox]}
              onPress={() => {
                setSelectedTool("신용/체크카드")
                setPg("html5_inicis")
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
            </Pressable> */}

            <View style={styles.couponInfo}>
              <PreMed14 text="쿠폰" />
              <PreReg14 text="보유 중인 쿠폰 없음" color={BODY} />
            </View>
          </View>

          <DivisionLine height={6} mv={24} />

          {/* //* 결제 요금 */}
          <View
            style={{
              paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
            }}
          >
            <PreBol18 text="요금 세부 정보" />
            {amount && (
              <PaymentFeeInfo
                style={{ marginTop: 10, marginBottom: 42 }}
                serviceType={key}
                serviceFee={amount.serviceFee}
                duration={duration}
                petTypeExtraFee={amount.petTypeExtraFee}
                wage={Math.ceil(amount.serviceFee / duration)}
                totalFee={amount.totalFee}
                petTypeExtraFeeSumByTime={amount.totalExtraFee}
              />
            )}
          </View>

          {/* 환불 안내 */}
          <View style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}>
            <RefundNote />
          </View>

          <Footer mt={FOOTER_CONTENT_GAP} />
        </ScrollView>

        <TouchableOpacity style={styles.paymentButton} onPress={onPressPayKakaoPay}>
          <PreBol16
            text={amount?.totalFee ? `${priceFormatter(String(amount?.totalFee))} 원` : "계산중..."}
            color="white"
            ml={16}
          />
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
    bottom: BOTTOM_HEIGHT,
    marginHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
    backgroundColor: GIVER_CASUAL_NAVY,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 56,
    borderRadius: 10,
    alignItems: "center",
  },
})
