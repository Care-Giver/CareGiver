import {
  FeeResponse,
  calculateCrecheBooking,
  calculateVisitingBooking,
  createCrecheBooking,
  createVisitingBooking,
} from "#api"
import { ServiceType } from "#models"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { alertModal } from "../../../../utils/alert-modal"
import { VisitingCreche } from "../../search-stack/search-result-screen/search-result-screen"
import { BookingRequest } from "../../make-booking/make-booking-screen"
import { SelectedTime } from "#navigators"
import { PaymentRequestAdaptor, RawPayment } from "./payment-adaptor"
import { differenceInDays, differenceInHours } from "date-fns"

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
    const req = new PaymentRequestAdaptor({ key, selectedPetIds, selectedTime, service }).adapt()

    const calculator = key === "visiting" ? calculateVisitingBooking : calculateCrecheBooking
    //@ts-ignore
    calculator(req).then((res) => {
      const serviceTime =
        key === "visiting"
          ? differenceInHours(new Date(selectedTime.end), new Date(selectedTime.start))
          : differenceInDays(new Date(selectedTime.end), new Date(selectedTime.start))

      console.log(serviceTime)

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

export type CreateBookingProps = {
  key: ServiceType
  userId: number
  selectedTime: SelectedTime
  selectedPetIds: number[]
  bookingRequest: BookingRequest
  destination: string
  service: VisitingCreche
  setSuccessModalVisible: Dispatch<SetStateAction<boolean>>
  paymentId: number
}

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
    // paymentData,
    paymentId,
  } = props
  try {
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
      paymentId,
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
    if (!bookingResponse.isSuccess) {
      alertModal(
        "예약 객체 생성 실패",
        "알 수 없는 이유로, 예약 객체 생성에 실패하였습니다. 잠시 후, 다시 시도해주세요.",
      )
      console.log(bookingResponse)
      return
    }

    setSuccessModalVisible(true)
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
