import axios from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"
import { PetsitterType, ServiceType } from "../../models"

//* 위탁예약 생성
export interface CreateCrecheBookingInput {
  crecheId: number
  userId: number
  request: string
  services: string[]
  startDate: string
  endDate: string
  petIds: number[]
  paymentId: number
  avoidFoodInfo: string
  bondingTipsInfo: string
  totalFee: number
  defalutFee: number
}
interface CreateCrecheBookingInputResponse extends GeneralResponse {
  CreateCrecheBookingInput: CreateCrecheBookingInput
}
/**
 * @returns {Promise<CreateCrecheBookingInput>}
 */
export const postCrecheBooking = async (
  post: CreateCrecheBookingInput,
): Promise<CreateCrecheBookingInput> => {
  try {
    const response = await axios.post<CreateCrecheBookingInputResponse>(
      `${BASE_URL}/booking/creche`,
      post,
      CONFIG,
    )

    if (!response.data.ok) {
      const error = response.data.error
      console.log(response.data)
      console.error("postCrecheBooking response.data.error 에러!!!", error)
      // @ts-ignore
      return error
    }

    // console.log("response", response)
    console.log("response.data", response.data)
    console.log("response.data.CreateCrecheBookingInputs", response.data.CreateCrecheBookingInput)
    return response.data.CreateCrecheBookingInput
  } catch (error) {
    console.error("catch 에러!!!", error)
    return null
  }
}

//* 방문 예약 생성

//? requestBody
export interface CreateVisitingBookingInput {
  visitingId: number
  userId: number
  request: string
  services: string[]
  destination: string
  startTime: string[]
  endTime: string[]
  petIds: number[]
  paymentId: number
  petToolsLocInfo: string
  avoidFoodInfo: string
  bondingTipsInfo: string
}
//? responseBody
export interface CreateVisitingBookingRes {
  id: number
  createAt: Date
  updatedAt: Date
  status: string
  reviewStatus: string
  destination: string
  visitingId: string
  request: string
  petToolsLocInfo: string
  avoidFoodInfo: string
  bondingTipsInfo: string
}
interface CreateVisitingBookingResponse extends GeneralResponse {
  CreateVisitingBookingResponse: CreateVisitingBookingRes
}
/**
 * @returns {Promise<CreateVisitingBookingResponse>}
 */
export const postVisitingBooking = async (
  post: CreateVisitingBookingInput,
): Promise<CreateVisitingBookingResponse> => {
  try {
    console.log(post)
    const response = await axios.post<CreateVisitingBookingResponse>(
      `${BASE_URL}/booking/visiting`,
      post,
      CONFIG,
    )

    if (!response.data.ok) {
      const error = response.data.error
      console.error("postVisitingBooking response.data.error 에러!!!", error)
      console.log(response.data)
      // @ts-ignore
      return error
    }

    // console.log("response", response)
    console.log("response.data", response.data)
    console.log(
      "response.data.CreateVisitingBookingInputs",
      response.data.CreateVisitingBookingResponse,
    )
    return response.data
  } catch (error) {
    console.error("catch 에러!!!", error)
    return null
  }
}

interface CrecheBooking {
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

interface VisitingBooking {
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
 * 로그인한 유저의 모든 위탁 예약을 읽어온다.
 * @returns {Promise<CrecheBooking[]>}
 */
export const getCrechePetsitters = async (userId: number): Promise<CrecheBooking[]> => {
  try {
    const response = await axios.get<CrecheBookingsResponse>(
      `${BASE_URL}/booking/creche?userId=${userId}`,
      CONFIG,
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

/**
 * 로그인한 유저의 모든 위탁 예약을 읽어온다.
 * @returns {Promise<VisitingBooking[]>}
 */
export const getVisitingPetsitters = async (userId: number): Promise<VisitingBooking[]> => {
  try {
    const response = await axios.get<VisitingBookingResponse>(
      `${BASE_URL}/booking/visiting?userId=${userId}`,
      CONFIG,
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

/**
 * 로그인한 유저의 진행중인 예약 내역을 읽어온다.
 * @return {Promise<CurrentBooking[]>}
 */
export const getCurrentBookings = async (): Promise<CurrentBooking[]> => {
  try {
    const response = await axios.get<CurrentBookingResponse>(
      `${BASE_URL}/user/my-current-bookings`,
      CONFIG,
    )

    if (!response.data.ok) {
      const error = response.data.error
      console.error("[getCurrentBookings] error >>>", error)
      // @ts-ignore
      return error
    }

    // console.log("[getCurrentBookings] response.data >>> ", response.data)

    return response.data.currentBookings
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
      CONFIG,
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
      CONFIG,
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
