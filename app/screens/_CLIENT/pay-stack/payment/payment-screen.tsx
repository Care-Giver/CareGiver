import React, { FC, useEffect, useState } from "react"
import { StyleSheet, View, Image, Pressable, TouchableOpacity } from "react-native"
import { images } from "#images"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
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
import IMP, { IMPData, IMPConst } from "iamport-react-native"
import {
  FeeResponse,
  calculateCrecheBooking,
  calculateVisitingBooking,
} from "../../../../services/axios/payment-calculate"
import { useStores } from "#models"
import { price as priceFormatter } from "../../../../utils/format"
import { alertModal } from "../../../../utils/alert-modal"

export interface PaymentParams {
  params: IMPData.PaymentData
  tierCode?: string

  visitingId: number // TODO: 교체하기!!
  userId: number
  request: string
  services: string[]
  destination: string

  startTime: string[]
  endTime: string[]
  petIds: number[]
  petToolsLocInfo: string
  avoidFoodInfo: string
  bondingTipsInfo: string
}

export type SimplePayment = "카카오페이" | "네이버페이" | "토스"

export const PaymentScreen: FC<StackScreenProps<NavigatorParamList, "payment-screen">> = observer(
  function PaymentScreen({ route }) {
    const { key, service, selectedPetIds, selectedTime, requests } = route.params
    console.log("selectedTime 3", selectedTime)

    const {
      userStore: { userDetail },
    } = useStores()

    //* 결제 정보 관련
    const [pg, setPg] = useState("html5_inicis")
    const [tierCode, setTierCode] = useState(undefined)
    const [method, setMethod] = useState("card")
    const [cardQuota, setCardQuota] = useState(0)
    const [merchantUid, setMerchantUid] = useState(`mid_${new Date().getTime()}`)
    const [name, setName] = useState("아임포트 결제데이터분석")
    const [amount, setAmount] = useState<FeeResponse>(null)
    const [buyerName, setBuyerName] = useState("홍길동")
    const [buyerTel, setBuyerTel] = useState("01012341234")
    const [buyerEmail, setBuyerEmail] = useState("example@example.com")
    const [vbankDue, setVbankDue] = useState("")
    const [bizNum, setBizNum] = useState("")
    const [escrow, setEscrow] = useState(false)
    const [digital, setDigital] = useState(false)
    const [selectedTool, setSelectedTool] = useState<SimplePayment | "신용/체크카드">(null)
    const is신용체크카드 = selectedTool === "신용/체크카드"

    // totalFee 계산
    useEffect(() => {
      const idProp = key === "visiting" ? "visitingId" : "crecheId"
      const startProp = key === "visiting" ? "startTime" : "startDate"
      const endProp = key === "visiting" ? "endTime" : "endDate"
      const req = {
        petIds: selectedPetIds,
        [startProp]: selectedTime.start,
        [endProp]: selectedTime.end,
        [idProp]: service[key].id,
      }
      const calculator = key === "visiting" ? calculateVisitingBooking : calculateCrecheBooking
      //@ts-ignore
      calculator(req).then((res) =>
        setAmount({
          subTotalFee: res?.subTotalFee,
          totalFee: res?.totalFee,
        }),
      )
    }, [key, selectedPetIds, selectedTime.end, selectedTime.start, service])

    // //* 결제 정보에 따른 data update 및 결제스크린 이동
    // const onPressPay = () => {
    //   const data: PaymentParams = {
    //     params: {
    //       pg,
    //       pay_method: method,
    //       currency: undefined,
    //       notice_url: undefined,
    //       display: undefined,
    //       merchant_uid: merchantUid,
    //       name,
    //       amount,
    //       app_scheme: "exampleforrn",
    //       tax_free: undefined,
    //       buyer_name: buyerName,
    //       buyer_tel: buyerTel,
    //       buyer_email: buyerEmail,
    //       buyer_addr: undefined,
    //       buyer_postcode: undefined,
    //       custom_data: undefined,
    //       vbank_due: undefined,
    //       digital: undefined,
    //       language: undefined,
    //       biz_num: undefined,
    //       customer_uid: undefined,
    //       naverPopupMode: undefined,
    //       naverUseCfm: undefined,
    //       naverProducts: undefined,
    //       m_redirect_url: IMPConst.M_REDIRECT_URL,
    //       niceMobileV2: true,
    //       escrow,
    //     },
    //     tierCode,

    //     //? 예약 생성 api를 위한 값들
    //     visitingId: service[key].id,
    //     userId: userDetail?.id,
    //     request: requests?.request,
    //     // services: services,
    //     destination: userDetail?.address,
    //     // selectedDate: selectedDate,
    //     startTime: selectedTime.start,
    //     endTime: selectedTime.end,
    //     petIds: selectedPetIds,
    //     petToolsLocInfo: requests?.petToolsLocInfo,
    //     avoidFoodInfo: requests?.avoidFoodInfo,
    //     bondingTipsInfo: requests?.bondingTipsInfo,
    //   }

    //   // 신용카드의 경우, 할부기한 추가
    //   if (method === "card" && cardQuota !== 0) {
    //     data.params.display = {
    //       card_quota: cardQuota === 1 ? [] : [cardQuota],
    //     }
    //   }

    //   /*     // 가상계좌의 경우, 입금기한 추가
    //   if (method === "vbank" && vbankDue) {
    //     data.params.vbank_due = vbankDue
    //   }

    //   // 다날 && 가상계좌의 경우, 사업자 등록번호 10자리 추가
    //   if (method === "vbank" && pg === "danal_tpay") {
    //     data.params.biz_num = bizNum
    //   }

    //   // 휴대폰 소액결제의 경우, 실물 컨텐츠 여부 추가
    //   if (method === "phone") {
    //     data.params.digital = digital
    //   }

    //   // 정기결제의 경우, customer_uid 추가
    //   if (pg === "kcp_billing") {
    //     data.params.customer_uid = `cuid_${new Date().getTime()}`
    //   } */

    //   if (pg === "naverpay") {
    //     const today = new Date()
    //     const oneMonthLater = new Date(today.setMonth(today.getMonth() + 1))
    //     const dd = String(oneMonthLater.getDate()).padStart(2, "0")
    //     const mm = String(oneMonthLater.getMonth() + 1).padStart(2, "0") // January is 0!
    //     const yyyy = oneMonthLater.getFullYear()

    //     data.params.naverPopupMode = false
    //     data.params.naverUseCfm = `${yyyy}${mm}${dd}`
    //     data.params.naverProducts = [
    //       {
    //         categoryType: "BOOK",
    //         categoryId: "GENERAL",
    //         uid: "107922211",
    //         name: "한국사",
    //         payReferrer: "NAVER_BOOK",
    //         count: 10,
    //       },
    //     ]
    //   }

    //   console.log("Payment data >>>", data)
    //   navigate("test-iamport-payment-screen", data)
    // }

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
      alertModal(
        "결제기능 개발중 🏗️",
        "실제 결제는 이루어지지 않았으며, 예약객체가 성공적으로 생성되었습니다.",
      )

      //TODO: 아래 항목중에서 5, 6 API 구현 후 추가. (visiting 도 마찬가지)
      //TODO: 1. 예약 결제 가격 계산
      //TODO:     /api/v1/payment/creche-booking/calculate 를 통해 결제될 총 금액을 계산합니다.
      //TODO: 2. 결제 사전 등록
      //TODO:   /api/v1/payment/invoice 를 통해 예상 결제 금액을 서버에 전달합니다.
      //TODO: 3. 프론트엔드에서 포트원을 띄워 해당 정보로 결제를 진행함.
      //TODO: 4. 결제 사후 정보 확인
      //TODO:   /api/v1/payment/confirm 포트원 결제 이후에 발행된 imp_uid와 merchant_uid를 통해 결제가 제대로 이루어졌는지 확인합니다.
      //TODO: 5. 결제 정보 DB 저장
      //TODO:   POST /api/v1/payment 를 통해 정상적으로 처리된 결제 내용을 DB에 저장합니다.
      //TODO: 6.예약 완료
      //TODO:   POST /api/v1/booking/creche 를 통해 결제 정보와 같이 예약을 생성합니다.
    }

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
            <PreReg14 text={service[key].__careGiver__.__user__.nickname} mb={24} color={BODY} />
            {/* 맡길 반려동물 컴포넌트 가져오기 */}
            <PreMed14 text="방문 장소" mb={8} />
            <PreReg14 text={service[key].address} mb={24} color={BODY} />
            <PreMed14 text="예약 일정" mb={8} />
            <PreReg14
              text={`${selectedTime.start.slice(0, 10)} - ${selectedTime.end.slice(0, 10)}`}
              mb={24}
              color={BODY}
            />
          </View>

          <DivisionLine height={6} mb={24} />

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
                // @ts-ignore
                selectedTool={selectedTool}
                setSelectedTool={() => {
                  setSelectedTool("카카오페이")
                  setPg("kakaopay")
                }}
              />
              <PaymentTool
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
              />
            </View>
            <Pressable
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
            </Pressable>

            <View style={styles.couponInfo}>
              <PreMed14 text="쿠폰" />
              <PreReg14 text="보유 중인 쿠폰 없음" color={BODY} />
            </View>
          </View>

          <DivisionLine height={6} mv={24} />

          {amount && (
            <View style={styles.priceContainer}>
              <PreBol14 text="요금 세부 정보" mb={13} />
              <DivisionLine />
              {/* 가격 테이블  */}
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <PreReg14 text="서비스 이용료" style={{ flex: 3 }} />
                  {/* <PreReg14 text="50,000" style={{ flex: 2 }} />
                <PreReg14 text="8시간" style={{ flex: 1 }} /> */}
                  <PreReg14
                    text={`${priceFormatter(String(amount?.subTotalFee))} 원`}
                    style={{ flex: 3, textAlign: "right" }}
                  />
                </View>
                <View style={styles.tableRow}>
                  <PreReg14 text="수수료" style={{ flex: 3 }} />
                  {/* <PreReg14 text="40,000" style={{ flex: 3 }} /> */}
                  <PreReg14
                    text={`${priceFormatter(String(amount?.totalFee - amount?.subTotalFee))} 원`}
                    style={{ flex: 3, textAlign: "right" }}
                  />
                </View>
                <View style={styles.tableRow}>
                  {/* // TODO: 쿠폰 기능 구현완료후, 주석 해제할 것.  */}
                  {/* <PreReg14 text="할인 쿠폰" style={{ flex: 5 }} />
                <PreReg14 text="1" style={{ flex: 1, textAlign: "center" }} />
                <PreReg14 text="-10,000원" style={{ flex: 3, textAlign: "right" }} /> */}
                </View>
              </View>
              <DivisionLine />
              <View style={styles.totalPrice}>
                <PreBol16 text="결제 금액" />
                <PreBol18 text={`${priceFormatter(String(amount?.totalFee))} 원`} />
              </View>
            </View>
          )}
        </ScrollView>

        <TouchableOpacity style={styles.paymentButton} onPress={onPressPay}>
          <PreBol16
            text={amount ? `${priceFormatter(String(amount?.totalFee))} 원` : "계산중..."}
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
