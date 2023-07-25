import React, { useEffect, useState } from "react"
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
import { userinfo } from "./dummy-data"
import { getUsers, User } from "../../services/axios/user"
import {
  postCrecheTotalFee,
  postVisitingTotalFee,
  CalculateVisitingTotalFeeInput,
  CalculateCrecheTotalFeeInput,
} from "../../services/axios/payment-calculate"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

export interface PaymentParams {
  params: IMPData.PaymentData
  tierCode?: string
  serviceType: string
  visitingId: number
  userId: number
  request: string
  services: string[]
  destination: string
  selectedDate: string
  startTime: string[]
  endTime: string[]
  petIds: number[]
  petToolsLocInfo: string
  avoidFoodInfo: string
  bondingTipsInfo: string
}

export type PaymentModuleType = "카카오페이" | "네이버페이" | "토스" | "신용/체크카드"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const PaymentScreen: FC<StackScreenProps<NavigatorParamList, "payment-screen">> = observer(
  function PaymentScreen({ route }) {
    // MST store 를 가져옵니다.
    // const { someStore, anotherStore } = useStores()
    //* 결제 정보 관련
    const [pg, setPg] = useState("html5_inicis")
    const [tierCode, setTierCode] = useState(undefined)
    const [method, setMethod] = useState("card")
    const [cardQuota, setCardQuota] = useState(0)
    const [merchantUid, setMerchantUid] = useState(`mid_${new Date().getTime()}`)
    const [name, setName] = useState("아임포트 결제데이터분석")
    const [amount, setAmount] = useState("39000")
    const [buyerName, setBuyerName] = useState("홍길동")
    const [buyerTel, setBuyerTel] = useState("01012341234")
    const [buyerEmail, setBuyerEmail] = useState("example@example.com")
    const [vbankDue, setVbankDue] = useState("")
    const [bizNum, setBizNum] = useState("")
    const [escrow, setEscrow] = useState(false)
    const [digital, setDigital] = useState(false)
    const {
      sitterData,
      services,
      serviceType,
      selectedDate,
      selectedPets,
      beginDate,
      endDate,
      requests,
    } = route.params
    console.log(requests)
    //* 로그인된 유저 정보
    const [userMe, setUserMe] = useState<User>()
    const [selectedTool, setSelectedTool] = useState<PaymentModuleType>(null)
    const is신용체크카드 = selectedTool === "신용/체크카드"

    //* axios 사용하여 유저정보, totalFee 초기화
    useEffect(() => {
      getUsers().then((res) => setUserMe(res))
      if (serviceType == "방문") {
        const visitingTotalFeeInput: CalculateVisitingTotalFeeInput = {
          //? 현재 visitingId가 2 이상이면 데이터가 없어, responseerror 발생하여, 일시적으로 예외처리.
          visitingId: Number(sitterData.id) < 3 ? Number(sitterData.id) : 1,
          startTime: beginDate,
          endTime: endDate,
          petIds: selectedPets,
        }
        console.log(visitingTotalFeeInput)
        postVisitingTotalFee(visitingTotalFeeInput).then((res) =>
          setAmount(res.totalFee.toString()),
        )
      } else if (serviceType == "위탁") {
        const crecheTotalFeeInput: CalculateCrecheTotalFeeInput = {
          crecheId: sitterData.id,
          startDate: selectedDate.dateString,
          endDate: selectedDate.dateString,
          petIds: selectedPets,
        }
        console.log("crecheTotalFeeInput: ", crecheTotalFeeInput)
        postCrecheTotalFee(crecheTotalFeeInput).then((res) => setAmount("10000"))
        //res.totalFee.toString()))
      }
    }, [])

    //* 결제 정보에 따른 data update 및 결제스크린 이동
    const onPress = () => {
      const data: PaymentParams = {
        params: {
          pg,
          pay_method: method,
          currency: undefined,
          notice_url: undefined,
          display: undefined,
          merchant_uid: merchantUid,
          name,
          amount,
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
        serviceType: serviceType,

        //? 예약 생성 api를 위한 값들
        visitingId: Number(sitterData.id) < 3 ? Number(sitterData.id) : 1,
        userId: userMe.id,
        request: requests?.request,
        services: services,
        destination: userMe.address,
        selectedDate: selectedDate,
        startTime: beginDate,
        endTime: endDate,
        petIds: selectedPets,
        petToolsLocInfo: requests?.petToolsLocInfo,
        avoidFoodInfo: requests?.avoidFoodInfo,
        bondingTipsInfo: requests?.bondingTipsInfo,
      }

      // 신용카드의 경우, 할부기한 추가
      if (method === "card" && cardQuota !== 0) {
        data.params.display = {
          card_quota: cardQuota === 1 ? [] : [cardQuota],
        }
      }

      /*     // 가상계좌의 경우, 입금기한 추가
      if (method === "vbank" && vbankDue) {
        data.params.vbank_due = vbankDue
      }

      // 다날 && 가상계좌의 경우, 사업자 등록번호 10자리 추가
      if (method === "vbank" && pg === "danal_tpay") {
        data.params.biz_num = bizNum
      }

      // 휴대폰 소액결제의 경우, 실물 컨텐츠 여부 추가
      if (method === "phone") {
        data.params.digital = digital
      }

      // 정기결제의 경우, customer_uid 추가
      if (pg === "kcp_billing") {
        data.params.customer_uid = `cuid_${new Date().getTime()}`
      } */

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
            categoryType: "BOOK",
            categoryId: "GENERAL",
            uid: "107922211",
            name: "한국사",
            payReferrer: "NAVER_BOOK",
            count: 10,
          },
        ]
      }

      console.log("Payment data >>>", data)
      navigate("test-iamport-payment-screen", data)
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
            <PreReg14 text={userMe?.nickname} mb={24} color={BODY} />
            {/* 맡길 반려동물 컴포넌트 가져오기 */}
            <PreMed14 text="방문 장소" mb={8} />
            <PreReg14 text={userMe?.address} mb={24} color={BODY} />
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
                  setPg("kakaopay")
                }}
              />
              <PaymentTool
                tool="네이버페이"
                selectedTool={selectedTool}
                setSelectedTool={() => {
                  setSelectedTool("네이버페이")
                  setPg("naverpay")
                }}
              />
              <PaymentTool
                tool="토스"
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

        <TouchableOpacity style={styles.paymentButton} onPress={onPress}>
          <PreBol16 text={amount + "원"} color="white" ml={16} />
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
