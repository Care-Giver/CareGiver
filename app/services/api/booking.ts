import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"
import { PetsitterType, ServiceType } from "../../models"
import { ratingRound } from "../../utils/format"
import { alertModal } from "../../utils/alert-modal"
import { BookingStatus, CgBooking } from "./care-giver"
import _ from "lodash"

type Rename<
  T,
  R extends { [K in keyof R]: K extends keyof T ? PropertyKey : "Error: key not in T" }
> = Omit<T, keyof R> &
  UnionToIntersection<{ [P in keyof R & keyof T]: { [PP in R[P]]: T[P] } }[keyof R & keyof T]>

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never

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
    console.log("booking/visiting request body >>>", body)
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

type BookingKeys = {
  id: number
  createAt: string
  updatedAt: string
  status: BookingStatus
  reviewStatus: ReviewStatus
  visitingId: number
  request: string
}

export type CrecheBooking = BookingKeys & { crecheId: number } & {
  // example: '김지우',
  // description: '펫시터의 이름입니다.',
  name?: string

  // example: '프로필 이미지',
  // description: '펫시터 프로필 이미지입니다.',
  image?: string

  // example: 3,
  // description: '위탁 장소에 달린 리뷰의 개수',
  reviewCount?: number

  // example: '경기도 안산시 한양대학로 55',
  // description: '위탁 펫시팅 장소입니다.',
  location?: string

  // example: '2023-03-13T00:00:00',
  // description: '위탁 예약 시작 날짜 입니다.',
  startDate?: string

  // example: '2023-03-13T00:00:00',
  // description: '위탁 예약 종료 날짜 입니다.',
  endDate?: string

  // example: [1, 2],
  // description: '예약을 받은 반려동물 id 배열입니다.',
  petIds?: number[]

  // example: 18000,
  // description: '펫시터에게 지불한 금액입니다.',
  fee?: number
}

export type VisitingBooking = BookingKeys & { visitingId: number } & {
  // example: '김지우',
  // description: '펫시터의 이름입니다.',
  name?: string

  // example: '프로필 이미지',
  // description: '펫시터 프로필 이미지입니다.',
  image?: string

  // example: 3,
  // description: '방문 펫시터에게 달린 리뷰의 개수',
  reviewCount?: number

  // example: '경기도 안산시 한양대학로 55',
  // description: '방문 펫시팅 장소입니다.',
  location?: string

  // example: '2023-03-13T00:00:00',
  // description: '방문 예약 시작 시각 입니다.',
  startTime?: string

  // example: '2023-03-13T00:00:00',
  // description: '방문 예약 종료 시각 입니다.',
  endTime?: string

  // example: [1, 2],
  // description: '예약을 받은 반려동물 id 배열입니다.',
  petIds?: number[]

  // example: 18000,
  // description: '펫시터에게 지불한 금액입니다.',
  fee?: number
}

export interface CurrentBooking {
  visitingBookingId?: number
  crecheBookingId?: number
  visitingId?: number
  crecheId?: number
  paymentId: number

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
  paymentId: number

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
export type RenamedCrecheBooking = Rename<CrecheBooking, { startDate: "start"; endDate: "end" }>
type GetCrecheBookingResult = RenamedCrecheBooking | null
export const getCrecheBooking = async (
  crecheBookingId: number,
): Promise<GetCrecheBookingResult> => {
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

    return _.mapKeys(response.data.crecheBooking, (value, key) => {
      switch (key) {
        case "startDate":
          return "start"
        case "endDate":
          return "end"
        default:
          return key
      }
    }) as RenamedCrecheBooking
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
export type RenamedVisitingBooking = Rename<VisitingBooking, { startTime: "start"; endTime: "end" }>
type GetVisitingBookingResult = RenamedVisitingBooking | null
export const getVisitingBooking = async (
  visitingBookingId: number,
): Promise<GetVisitingBookingResult> => {
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

    return _.mapKeys(response.data.visitingBooking, (value, key) => {
      switch (key) {
        case "startTime":
          return "start"
        case "endTime":
          return "end"
        default:
          return key
      }
    }) as RenamedVisitingBooking
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
      return []
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

type WaitingBooking = {
  paymentId: number // 16,
  petSitterName: string // "지우",
  ratings: number // 3.5714285714285716,
  reviewCount: number // 0,
  desc: string // "강아지 3년 기른 경력으로 보살핍니다.",
  profileImage: string | null // null
} & (
  | {
      visitingBookingId: number // 1,
      visitingId: number // 1,
      startTime: string // "2022-09-15T04:00:00.000Z",
      endTime: string // "2022-09-15T06:00:00.000Z",
    }
  | {
      crecheBookingId: number //3,
      crecheId: number //1,
      startDate: string //"2023-09-14T00:00:00.000Z",
      endDate: string //"2023-09-16T00:00:00.000Z",
    }
)
interface WaitingBookingResponse extends GeneralResponse {
  waitingBookings: WaitingBooking[]
}
type GetMyWaitingBookingsResult =
  | {
      isSuccess: true // 성공
      waitingBookings: WaitingBooking[]
    }
  | {
      isSuccess: false // 실패
      waitingBookings: []
    }
/**
 * [보호자 전용 API]
 * 현재 로그인한 보호자 유저가 신청한 예약 중에서
 * 펫시터가 아직 수락 혹은 거절을 하지 않은 상태 즉,
 * {@link BookingStatus.WAITING} 상태에 있는 예약들만 불러옵니다.
 */
export const getMyWaitingBookings = async (): Promise<GetMyWaitingBookingsResult> => {
  try {
    const response = await axios.get<WaitingBookingResponse>(`${BASE_URL}/user/my-waiting-bookings`)
    console.log("response🔷", response.data)
    if (!response.data.ok) {
      alertModal("신청한 예약 내역을 읽어오는데 실패했습니다.", `${response.data.error.message}`)
      return { isSuccess: false, waitingBookings: [] }
    }
    return { isSuccess: true, waitingBookings: response.data.waitingBookings }
  } catch (error) {
    console.error("catch 에러!!!", error)
    alertModal("신청한 예약 내역을 읽어오는데 실패했습니다.", `catch: ${error?.message}`)
    return { isSuccess: false, waitingBookings: [] }
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

interface CancelCrecheBookingRequestBody {
  crecheBookingId: number // 1,
  reason: string // "단순 변심으로 인한 취소",
  isPetSitterCancel: boolean // 펫시터가 취소하는 경우 true, 보호자가 취소하는 경우는 false
}
interface CancelCrecheBookingResponse extends GeneralResponse {}
type CancelCrecheBookingResult =
  | {
      isSuccess: true // 성공
    }
  | {
      isSuccess: false // 실패
      reason: string
    }
/**
 * [공통 API]
 * 수락한 위탁 예약을 취소한다.
 */
export const cancelCrecheBooking = async (
  body: CancelCrecheBookingRequestBody,
): Promise<CancelCrecheBookingResult> => {
  try {
    const response = await axios.patch<CancelCrecheBookingResponse>(
      `${BASE_URL}/booking/creche/cancel`,
      body,
    )
    console.log("response.data 🔷 cancelCrecheBooking", response.data)

    if (!response?.data.ok) {
      alertModal("위탁 예약 취소에 실패하였습니다.", `${response.data.error.message}`)
      return { isSuccess: false, reason: response?.data?.error.message }
    }

    return { isSuccess: true }
  } catch (error) {
    alertModal("위탁 예약 취소에 실패하였습니다.", `catch: ${error?.message}`)
    return { isSuccess: false, reason: error?.message }
  }
}

interface CancelVisitingBookingRequestBody {
  visitingBookingId: number // 1,
  reason: string // "단순 변심으로 인한 취소",
  isPetSitterCancel: boolean // 펫시터가 취소하는 경우 true, 보호자가 취소하는 경우는 false
}
interface CancelVisitingBookingResponse extends GeneralResponse {}
type CancelVisitingBookingResult =
  | {
      isSuccess: true // 성공
    }
  | {
      isSuccess: false // 실패
      reason: string
    }
/**
 * [공통 API]
 * 수락한 방문 예약을 취소한다.
 */
export const cancelVisitingBooking = async (
  body: CancelVisitingBookingRequestBody,
): Promise<CancelVisitingBookingResult> => {
  try {
    const response = await axios.patch<CancelVisitingBookingResponse>(
      `${BASE_URL}/booking/visiting/cancel`,
      body,
    )
    console.log("response.data 🔷 cancelVisitingBooking", response.data)

    if (!response?.data.ok) {
      alertModal("방문 예약 취소에 실패하였습니다.", `${response.data.error.message}`)
      return { isSuccess: false, reason: response?.data?.error.message }
    }

    return { isSuccess: true }
  } catch (error) {
    alertModal("방문 예약 취소에 실패하였습니다.", `catch: ${error?.message}`)
    return { isSuccess: false, reason: error?.message }
  }
}
