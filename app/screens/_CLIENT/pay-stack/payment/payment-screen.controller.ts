import {
  CreatePaymentInput,
  FeeResponse,
  calculateCrecheBooking,
  calculateVisitingBooking,
  createCrecheBooking,
  createPayment,
  createVisitingBooking,
} from "#axios"
import { ServiceType } from "#models"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { alertModal } from "../../../../utils/alert-modal"
import { VisitingCreche } from "../../search-stack/search-result-screen/search-result-screen"
import { BookingRequest } from "../../make-booking/make-booking-screen"
import { SelectedTime } from "#navigators"
import { PaymentAdaptor, RawPayment } from "./payment-adaptor"
import { calculateDay, calculateHour } from "../../../../utils/calculate-time"

/**
 * API 에서 불러온 subTotalFee 는 반려동물 추가요금이 포함된 가격이므로,
 * 이렇게 분리 함.
 */
type Amount = Omit<FeeResponse, "subTotalFee"> & {
  /**
   * 서비스 이용료
   */
  serviceFee: number
  /**
   * 반려동물 추가요금 총 금액
   */
  totalExtraFee: number
}

/**
 * 총 결제 금액을 계산합니다.
 */
export const useCalculator = ({ key, selectedPetIds, selectedTime, service }: RawPayment) => {
  const [amount, setAmount] = useState<Amount>(null)

  // totalFee 계산
  useEffect(() => {
    const req = new PaymentAdaptor({ key, selectedPetIds, selectedTime, service }).adapt()

    const calculator = key === "visiting" ? calculateVisitingBooking : calculateCrecheBooking
    //@ts-ignore
    calculator(req).then((res) => {
      const serviceTime =
        key === "visiting" ? calculateHour(selectedTime) : calculateDay(selectedTime)

      //? 반려동물 추가요금 총 금액
      const totalExtraFee =
        res?.petTypeExtraFee.reduce((prev, current) => prev + current.extraFee, 0) * serviceTime

      setAmount({
        serviceFee: res.subTotalFee - totalExtraFee,
        totalFee: res?.totalFee,
        totalExtraFee,
        petTypeExtraFee: res?.petTypeExtraFee,
      })
    })
  }, [key, selectedPetIds, selectedTime, service])

  return amount
}

type CreateBookingProps = {
  key: ServiceType
  userId: number
  selectedTime: SelectedTime
  selectedPetIds: number[]
  bookingRequest: BookingRequest
  destination: string
  service: VisitingCreche
  setSuccessModalVisible: Dispatch<SetStateAction<boolean>>
  paymentData: CreatePaymentInput
}

/**
 *   TODO: 1. 예약 결제 가격 계산
 *   TODO:     /api/v1/payment/creche-booking/calculate 를 통해 결제될 총 금액을 계산합니다.
 *   TODO: 2. 결제 사전 등록
 *   TODO:   /api/v1/payment/invoice 를 통해 예상 결제 금액을 서버에 전달합니다.
 *   TODO: 3. 프론트엔드에서 포트원을 띄워 해당 정보로 결제를 진행함.
 *   TODO: 4. 결제 사후 정보 확인
 *   TODO:   /api/v1/payment/confirm 포트원 결제 이후에 발행된 imp_uid와 merchant_uid를 통해 결제가 제대로 이루어졌는지 확인합니다.
 *   TODO: 5. 결제 정보 DB 저장
 *   TODO:   POST /api/v1/payment 를 통해 정상적으로 처리된 결제 내용을 DB에 저장합니다.
 *   TODO: 6.예약 완료
 *   TODO:   POST /api/v1/booking/creche 를 통해 결제 정보와 같이 예약을 생성합니다.
 *
 * 현재 아래코드는
 * 5, 6 만 구현되어 있음.
 * 1 은 useCalculator 으로 구현되어있음.
 */
export const createBooking = async (props: CreateBookingProps) => {
  const {
    key,
    userId,
    selectedTime,
    selectedPetIds,
    bookingRequest,
    destination,
    service,
    setSuccessModalVisible,
    paymentData,
  } = props
  try {
    const paymentResponse = await createPayment(paymentData)

    // 결제 성공시
    if (paymentResponse.isSuccess) {
      const { id } = service[key]
      const creator = key === "visiting" ? createVisitingBooking : createCrecheBooking
      const idProp = key === "visiting" ? "visitingId" : "crecheId"
      const startProp = key === "visiting" ? "startTime" : "startDate"
      const endProp = key === "visiting" ? "endTime" : "endDate"

      const bookingData = {
        [idProp]: id,
        userId,
        [startProp]: selectedTime.start,
        [endProp]: selectedTime.end,
        petIds: selectedPetIds,
        paymentId: paymentResponse.paymentId,
        request: bookingRequest.request,
        avoidFoodInfo: bookingRequest.avoidFoodInfo,
        bondingTipsInfo: bookingRequest.bondingTipsInfo,
      }

      if (key === "visiting") {
        bookingData.petToolsLocInfo = bookingRequest.petToolsLocInfo
        bookingData.destination = destination
      }

      console.log("bookingData 🔷", bookingData)

      //@ts-ignore
      const bookingResponse = await creator(bookingData)

      if (bookingResponse.isSuccess) {
        alertModal(
          "결제기능 개발중 🏗️",
          "실제 결제는 이루어지지 않았으며, 예약 객체가 성공적으로 생성되었습니다.",
        )
        setSuccessModalVisible(true)
      } else {
        alertModal(
          "예약 객체 생성 실패",
          "알 수 없는 이유로, 예약 객체 생성에 실패하였습니다. 잠시 후, 다시 시도해주세요.",
        )
      }
    }
    // 결제 실패시
    else {
      alertModal("결제기능 개발중 🏗️", "결제 실패")
    }
  } catch (error) {
    console.error("createBooking 에러발생 - catch:", error)
  }
}

//~ LEGACY 코드 BEGIN =======================
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
//~ LEGACY 코드 ENDED =======================
