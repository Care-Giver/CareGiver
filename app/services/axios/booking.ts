import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"
import { PetsitterType, ServiceType } from "../../models"
import { ratingRound } from "../../utils/format"
import { alertModal } from "../../utils/alert-modal"

export interface CreateCrecheBookingRequestBody {
  crecheId: number
  userId: number
  request: string
  startDate: string
  endDate: string
  petIds: number[]
  paymentId: number
  avoidFoodInfo: string
  bondingTipsInfo: string
}
interface CreateCrecheBookingResponse extends GeneralResponse {
  //
}
type CreateCrecheBookingResult =
  | {
      isSuccess: true // 성공
      // TODO: 성공시...
    }
  | {
      isSuccess: false // 실패
      reason?: string // 실패시, 실패이유
      // TODO: 실패시...
    }
/**
 * [클라이언트 ➡️ 펫시터]
 * 위탁 예약을 생성합니다.
 * 결제완료후, "예약신청" 상황에서 사용됩니다.
 */
export const createCrecheBooking = async (
  body: CreateCrecheBookingRequestBody,
): Promise<CreateCrecheBookingResult> => {
  try {
    const response = await axios.post<CreateCrecheBookingResponse>(
      `${BASE_URL}/booking/creche`,
      body,
    )
    if (!response.data.ok) {
      return { isSuccess: false }
    }
    return { isSuccess: true }
  } catch (error) {
    console.error("catch 에러!!!", error)
    return { isSuccess: false }
  }
}

export interface CreateVisitingBookingRequestBody {
  visitingId: number
  userId: number
  request: string
  destination: string // 방문 펫시터가 찾아갈 목적지 입니다.
  startTime: string[]
  endTime: string[]
  petIds: number[]
  paymentId: number
  petToolsLocInfo: string
  avoidFoodInfo: string
  bondingTipsInfo: string
}
interface CreateVisitingBookingResponse extends GeneralResponse {
  //
}
type CreateVisitingBookingResult = CreateCrecheBookingResult
/**
 * [클라이언트 ➡️ 펫시터]
 * 방문 예약을 생성합니다.
 * 결제완료후, "예약신청" 상황에서 사용됩니다.
 */
export const createVisitingBooking = async (
  body: CreateVisitingBookingRequestBody,
): Promise<CreateVisitingBookingResult> => {
  try {
    console.log(body)
    const response = await axios.post<CreateVisitingBookingResponse>(
      `${BASE_URL}/booking/visiting`,
      body,
    )
    if (!response.data.ok) {
      return { isSuccess: false, reason: response?.data?.error }
    }
    return { isSuccess: true }
  } catch (error) {
    console.error("catch 에러!!!", error)
    return { isSuccess: false }
  }
}

export interface CrecheBooking {
  status: string
  services: string
  crecheId: string
  startDate: string
  endDate: string
  totalFee: string
  defalutFee: string
  reviewStatus: string
  request: string
}

export interface VisitingBooking {
  id: number
  createAt: string
  updatedAt: string
  status: string
  reviewStatus: string
  visitingId: number
  request: string
}

export interface CurrentBooking {
  visitingBookingId?: number
  crecheBookingId?: number
  visitingId?: number
  crecheId?: number

  // ? visiting인 경우 time
  startTime?: string
  endTime?: string
  // ? creche인 경우 date
  startDate?: string
  endDate?: string

  petSitterName: string
  ratings: number
  reviewCount: number
  desc: string
  profileImage: string | null
}

export type ReviewStatus = "Waiting" | "Possible" | "Complete" | "Expired"

/**
 * API에서 사용되는 지난 예약 내역 Props
 * */
interface PreviousBooking {
  visitingBookingId?: number
  crecheBookingId?: number
  visitingId?: number
  crecheId?: number

  // ? visiting인 경우 time
  startTime?: string
  endTime?: string
  // ? creche인 경우 date
  startDate?: string
  endDate?: string

  petSitterName: string
  desc: string
  profileImage: string | null
  isCanceled: boolean
  isFavorite: boolean
  reviewStatus: ReviewStatus
}

/**
 * 스크린에서 사용되는 지난 예약 내역 props
 * */
export interface PreviousBookingParams {
  profileImage: string | null
  serviceType: ServiceType
  petsitterType: PetsitterType
  petsitterId: number
  bookingId: number
  petsitterName: string
  desc: string
  // ? 여기서는 creche | visiting 모두 Date로 통일한다.
  startDate: string
  endDate: string
  isCanceled: boolean
  isFavorite: boolean
  reviewStatus: ReviewStatus
}

interface CrecheBookingsResponse extends GeneralResponse {
  crecheBookings: CrecheBooking[]
}

interface VisitingBookingResponse extends GeneralResponse {
  visitingBookings: VisitingBooking[]
}

interface CurrentBookingResponse extends GeneralResponse {
  currentBookings: CurrentBooking[]
}

interface PreviousBookingResponse extends GeneralResponse {
  previousBookings: PreviousBooking[]
}

/**
 * (보호자 용)
 * 로그인한 유저의 모든 위탁 예약을 읽어온다.
 * @returns {Promise<CrecheBooking[]>}
 */
export const getCrechePetsitters = async (userId: number): Promise<CrecheBooking[]> => {
  try {
    const response = await axios.get<CrecheBookingsResponse>(
      `${BASE_URL}/booking/creche?userId=${userId}`,
    )

    if (!response.data.ok) {
      const error = response.data.error
      console.error("response.data.error 에러!!!", error)
      // @ts-ignore
      return error
    }

    // console.log("response", response)
    console.log("response.data", response.data)
    console.log("response.data.crecheBookings", response.data.crecheBookings)
    return response.data.crecheBookings
  } catch (error) {
    console.error("catch 에러!!!", error)
    return []
  }
}

interface GetCrecheBookingResponse extends GeneralResponse {
  crecheBooking: CrecheBooking
}
export const getCrecheBooking = async (crecheBookingId: number): Promise<CrecheBooking | null> => {
  try {
    console.log("♦️ CALLED | getCrecheBooking")
    const response = await axios.get<GetCrecheBookingResponse>(
      `${BASE_URL}/booking/creche/${crecheBookingId}`,
    )

    if (!response.data.ok) {
      alertModal(
        `해당 위탁 예약을 읽어오는데 실패했습니다. crecheBookingId: ${crecheBookingId}`,
        `${response.data.error.message}`,
      )
      return null
    }

    console.log("response.data.crecheBooking", response.data.crecheBooking)
    return response.data.crecheBooking
  } catch (error) {
    alertModal(
      `해당 위탁 예약을 읽어오는데 실패했습니다. crecheBookingId: ${crecheBookingId}`,
      `catch: ${error?.message}`,
    )
    return null
  }
}

/**
 * (보호자 용)
 * 로그인한 유저의 모든 위탁 예약을 읽어온다.
 * @returns {Promise<VisitingBooking[]>}
 */
export const getVisitingPetsitters = async (userId: number): Promise<VisitingBooking[]> => {
  try {
    const response = await axios.get<VisitingBookingResponse>(
      `${BASE_URL}/booking/visiting?userId=${userId}`,
    )

    if (!response.data.ok) {
      const error = response.data.error
      console.error("[getVisitingPetsitters]", error)
      //@ts-ignore
      return null
    }

    console.log("[getVisitingPetsitters] response.data >>> ", response.data)
    return response.data.visitingBookings
  } catch (error) {
    console.error("[getVisitingPetsitters]", error)
    //@ts-ignore
    return null
  }
}

interface GetVisitingBookingResponse extends GeneralResponse {
  visitingBooking: VisitingBooking
}
export const getVisitingBooking = async (
  visitingBookingId: number,
): Promise<VisitingBooking | null> => {
  try {
    const response = await axios.get<GetVisitingBookingResponse>(
      `${BASE_URL}/booking/visiting/${visitingBookingId}`,
    )

    if (!response.data.ok) {
      alertModal(
        `해당 방문 예약을 읽어오는데 실패했습니다. visitingBookingId: ${visitingBookingId}`,
        `${response.data.error.message}`,
      )
      return null
    }

    console.log("response.data", response.data)
    return response.data.visitingBooking
  } catch (error) {
    alertModal(
      `해당 방문 예약을 읽어오는데 실패했습니다. visitingBookingId: ${visitingBookingId}`,
      `catch: ${error?.message}`,
    )
    return null
  }
}

/**
 * 로그인한 유저의 진행중인 예약 내역을 읽어온다.
 * @return {Promise<CurrentBooking[]>}
 */
export const getCurrentBookings = async (): Promise<CurrentBooking[]> => {
  try {
    const response = await axios.get<CurrentBookingResponse>(`${BASE_URL}/user/my-current-bookings`)

    if (!response.data.ok) {
      const error = response.data.error
      console.error("[getCurrentBookings] error >>>", error)
      // @ts-ignore
      return error
    }

    console.log("[getCurrentBookings] response.data >>> ", response.data)
    const currentBookings = response.data.currentBookings.map((value: CurrentBooking) => ({
      ...value,
      ratings: ratingRound(value.ratings),
    }))

    return currentBookings
  } catch (error) {
    console.error("[getCurrentBookings] catch error >>>", error)
    return []
  }
}

/**
 * 로그인한 유저의 지난 예약 내역을 읽어온다.
 * @return {Promise<PreviousBooking[]>}
 */
export const getPreviousBookings = async (): Promise<PreviousBooking[]> => {
  try {
    const response = await axios.get<PreviousBookingResponse>(
      `${BASE_URL}/user/my-previous-bookings`,
    )

    // console.debug("[test] >>>", response.data)

    if (!response.data.ok) {
      const error = response.data.error
      console.error("[getPreviousBookings] error >>>", error)
      // @ts-ignore
      return error
    }

    // console.log("[getPreviousBookings] response.data >>> ", response.data)

    return response.data.previousBookings
  } catch (error) {
    console.error("[getPreviousBookings] catch error >>>", error)
    return []
  }
}

export const getFirstPreviousBooking = async (): Promise<PreviousBookingParams | null> => {
  try {
    const response = await axios.get<PreviousBookingResponse>(
      `${BASE_URL}/user/my-previous-bookings`,
    )

    if (!response.data.ok) {
      const error = response.data.error
      console.error("[getFirstPreviousBooking] error >>>", error)
      return null
    }

    if (response.data.previousBookings.length === 0) return null

    const bookingData: PreviousBooking = response.data.previousBookings[0]
    const serviceType: ServiceType = bookingData.crecheId ? "creche" : "visiting"

    return {
      profileImage: bookingData.profileImage,
      serviceType: serviceType,
      petsitterType: serviceType,
      // @ts-ignore
      petsitterId: serviceType === "creche" ? bookingData.crecheId : bookingData.visitingId,
      // @ts-ignore
      bookingId:
        serviceType === "creche" ? bookingData.crecheBookingId : bookingData.visitingBookingId,
      petsitterName: bookingData.petSitterName,
      desc: bookingData.desc,
      // ? 여기서는 creche | visiting 모두 Date로 통일한다.
      // @ts-ignore
      startDate: serviceType === "creche" ? bookingData.startDate : bookingData.startTime,
      // @ts-ignore
      endDate: serviceType === "creche" ? bookingData.endDate : bookingData.endTime,
      isCanceled: bookingData.isCanceled,
      isFavorite: bookingData.isFavorite,
      reviewStatus: bookingData.reviewStatus,
    }
  } catch (error) {
    console.error("[getFirstPreviousBooking] catch error >>>", error)
    return null
  }
}

interface ResponseCrecheBookingRequestBody {
  response: boolean // true 이면 "수락", false 이면 "거절"
}
type ResponseCrecheBookingResult =
  | {
      isSuccess: true // 성공
    }
  | {
      isSuccess: false // 실패
    }
/**
 * [케어기버 전용 API]
 * [펫시터 ➡️ 클라이언트]
 * 입력받은 "위탁"서비스 예약 id의 수락 여부를  응답한다.
 */
export const responseCrecheBooking = async (
  crecheBookingId: number,
  post: ResponseCrecheBookingRequestBody,
): Promise<ResponseCrecheBookingResult> => {
  try {
    const response = await axios.patch<GeneralResponse>(
      `${BASE_URL}/booking/creche/response/${crecheBookingId}`,
      post,
      {
        headers: {
          Accept: "Application/json",
        },
      },
    )

    if (!response?.data?.ok) {
      alertModal("위탁 예약 수락에 실패했습니다.", `${response.data?.error?.message}`)
      return { isSuccess: false }
    }

    return { isSuccess: true }
  } catch (error) {
    alertModal("위탁 예약 수락에 실패했습니다.", `catch: ${error?.message}`)
    return { isSuccess: false }
  }
}

type ResponseVisitingBookingRequestBody = ResponseCrecheBookingRequestBody
type ResponseVisitingBookingResult = ResponseCrecheBookingResult
/**
 * [케어기버 전용 API]
 * [펫시터 ➡️ 클라이언트]
 * 입력받은 id의 "방문" 예약 정보를 응답한다.
 */
export const responseVisitingBooking = async (
  visitingBookingId: number,
  post: ResponseVisitingBookingRequestBody,
): Promise<ResponseVisitingBookingResult> => {
  try {
    const response = await axios.patch<GeneralResponse>(
      `${BASE_URL}/booking/visiting/response/${visitingBookingId}`,
      post,
      {
        headers: {
          Accept: "Application/json",
        },
      },
    )

    if (!response?.data?.ok) {
      alertModal("방문 예약 수락에 실패했습니다.", `${response.data?.error?.message}`)
      return { isSuccess: false }
    }

    return { isSuccess: true }
  } catch (error) {
    alertModal("방문 예약 수락에 실패했습니다.", `catch: ${error?.message}`)
    return { isSuccess: false }
  }
}
