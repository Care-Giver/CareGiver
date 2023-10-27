import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"
import { Petsitter } from "./types/creches.visitings.common.types"
import { CrecheAmenity, CrecheService } from "./creches"

interface CreateCrecheRequestBody
  extends Partial<
    Omit<
      Petsitter,
      | "id"
      | "createAt"
      | "updatedAt"
      | "hiredNumber"
      | "star"
      | "location"
      | "responseRate"
      | "acceptRate"
    >
  > {
  userId: number // 현재 로그인한 유저의 userId
  services: number[] // CrecheService 객체 id[], //! 배열의 길이가 1 이상이어야 합니다.
  amenities: number[] // CrecheAmenity 객체 id[], //! 빈 배열도 OK
}
interface CreateCrecheResponse extends GeneralResponse {
  crecheId: number
}
interface CreateCrecheResult {
  isSuccess: boolean // 성공여부
  reason?: string // 실패시, 실패이유
  crecheId?: number // 성공시, 생성된 위탁장소의 id (crecheId)
}
/**
 * [케어기버 전용 API]
 * 위탁 펫시터를 생성한다
 *
 */
export const createCreche = async (body: CreateCrecheRequestBody): Promise<CreateCrecheResult> => {
  try {
    const response = await axios.post<CreateCrecheResponse>(`${BASE_URL}/creche`, body)
    console.log("response ♦️ createCreche", response)
    console.log("response.data 🔷 createCreche", response.data)

    if (!response?.data.ok) {
      console.error("API 에러!!! - createCreche ♦️", response?.data?.error)
      return { isSuccess: false, reason: response?.data?.error }
    }

    return {
      isSuccess: true,
      crecheId: response.data.crecheId,
    }
  } catch (error) {
    console.error("catch 에러!!! - createCreche", error)
    console.error("catch 에러!!! - createCreche body", body)
    return { isSuccess: false, reason: error }
  }
}

interface UpdateCrecheRequestBody extends Partial<Omit<CreateCrecheRequestBody, "userId">> {}
interface UpdateCrecheResponse extends GeneralResponse {
  creche: CrechePetsitter
}
interface UpdateCrecheResult {
  isSuccess: boolean // 성공여부
  reason?: string // 실패시, 실패이유
  creche?: CrechePetsitter // 성공시, 업데이트된 위탁 펫시터 객체
}
/**
 * [케어기버 전용 API]
 * 위탁 펫시터 정보를 수정한다
 *
 */
export const updateCreche = async (
  id: number,
  body: UpdateCrecheRequestBody,
): Promise<UpdateCrecheResult> => {
  try {
    const response = await axios.put<UpdateCrecheResponse>(`${BASE_URL}/creche/${id}`, body)
    console.log("response ♦️ updateCreche", response)
    console.log("response.data 🔷 updateCreche", response.data)

    if (!response?.data.ok) {
      console.error("API 에러!!! - updateCreche ♦️", response?.data?.error)
      return { isSuccess: false, reason: response?.data?.error }
    }

    return {
      isSuccess: true,
      creche: response.data.creche,
    }
  } catch (error) {
    console.error("catch 에러!!! - updateCreche", error)
    console.error("catch 에러!!! - updateCreche id, body", id, body)
    return { isSuccess: false, reason: error }
  }
}

//! NOTE: DELETE /creche/:id 는 불가능합니다. 서버에서만 실행가능한 API 입니다.

export interface CrechePetsitter extends Petsitter {
  serviceCreche: CrecheService[]
  crecheAmenities: CrecheAmenity[]
}
interface GetCrecheCareGiverResponse extends GeneralResponse {
  creches: CrechePetsitter[]
}
interface GetCrecheCareGiverResult {
  isSuccess: boolean // 성공여부
  reason?: string // 실패시, 실패이유
  creche?: CrechePetsitter //! CrechePetsitter[] 아님
}
/**
 * [케어기버 전용 API]
 * 로그인 유저가 등록한 모든 위탁 펫시팅 정보를 가져온다.
 */
export const getCrecheCareGiver = async (): Promise<GetCrecheCareGiverResult> => {
  try {
    const response = await axios.get<GetCrecheCareGiverResponse>(`${BASE_URL}/creche/care-giver`)
    // console.log("response ♦️ getCrecheCareGiver", response)
    console.log("response.data 🔷 getCrecheCareGiver", response.data)

    if (!response?.data.ok) {
      switch (response?.data?.error?.errorCode) {
        case 404:
          console.error("유저가 등록한 creche 객체가 없습니다.", response?.data?.error)
          return { isSuccess: true, creche: null } //! isSuccess: true 이어야 함. 수정 금지
        default:
          console.error("API 에러!!! - getCrecheCareGiver", response?.data?.error)
          return { isSuccess: false, reason: response?.data?.error }
      }
    }

    return {
      isSuccess: true,
      creche: response.data.creches ? response.data.creches[0] : null,
    }
  } catch (error) {
    console.error("catch 에러!!! - getCrecheCareGiver", error)
    return { isSuccess: false, reason: error }
  }
}

interface GetCrecheServicesResponse extends GeneralResponse {
  crecheServices: CrecheService[]
}
interface GetCrecheServicesResult {
  isSuccess: boolean // 성공여부
  reason?: string // 실패시, 실패이유
  crecheServices?: CrecheService[]
}
/**
 * DB 에 있는 방문 펫시팅 Service 객체를 요청합니다.
 */
export const getCrecheServices = async (): Promise<GetCrecheServicesResult> => {
  try {
    const response = await axios.get<GetCrecheServicesResponse>(`${BASE_URL}/creche/services`)
    console.log("response.data 🔷 getCrecheServices", response.data)

    if (!response?.data.ok) {
      console.error("API 에러!!! - getCrecheServices", response?.data?.error)
      return { isSuccess: false, reason: response?.data?.error }
    }

    return {
      isSuccess: true,
      crecheServices: response.data.crecheServices,
    }
  } catch (error) {
    console.error("catch 에러!!! - getCrecheServices", error)
    return { isSuccess: false, reason: error }
  }
}

interface GetCrecheAmenitiesResponse extends GeneralResponse {
  crecheAmenities: CrecheAmenity[]
}
interface GetCrecheAmenitiesResult {
  isSuccess: boolean // 성공여부
  reason?: string // 실패시, 실패이유
  crecheAmenities?: CrecheAmenity[]
}
/**
 * DB 에 있는 방문 펫시팅 Amenity 객체를 요청합니다.
 */
export const getCrecheAmenities = async (): Promise<GetCrecheAmenitiesResult> => {
  try {
    const response = await axios.get<GetCrecheAmenitiesResponse>(`${BASE_URL}/creche/amenities`)
    console.log("response.data 🔷 getCrecheAmenities", response.data)

    if (!response?.data.ok) {
      console.error("API 에러!!! - getCrecheAmenities", response?.data?.error)
      return { isSuccess: false, reason: response?.data?.error }
    }

    return {
      isSuccess: true,
      crecheAmenities: response.data.crecheAmenities,
    }
  } catch (error) {
    console.error("catch 에러!!! - getCrecheAmenities", error)
    return { isSuccess: false, reason: error }
  }
}

interface GetCrecheAvgPriceRequestBody {
  lat: number // 37.2955072
  lng: number //  126.83539
}
interface GetCrecheAvgPriceResponse extends GeneralResponse {
  minAvgPrice: number | null // 7000
  avgPrice: number | null //  10000
  maxAvgPrice: number | null //  13000
}
interface GetCrecheAvgPriceResult {
  isSuccess: boolean // 성공여부
  reason?: string // 실패시, 실패이유
  // 성공시, prices 객체
  prices?: {
    minAvgPrice: number
    avgPrice: number
    maxAvgPrice: number
  }
}
/**
 *  근처 10km 이내 위탁 서비스의 평균 기본 요금을 요청한다.
 */
export const getCrecheAvgPrice = async (
  body: GetCrecheAvgPriceRequestBody,
): Promise<GetCrecheAvgPriceResult> => {
  try {
    const response = await axios.post<GetCrecheAvgPriceResponse>(
      `${BASE_URL}/visiting/avg-price`,
      body,
    )
    console.log("response.data 🔷 getCrecheAvgPrice", response.data)

    if (!response?.data.ok) {
      console.error("API 에러!!! - getCrecheAvgPrice", response?.data?.error)
      return { isSuccess: false, reason: response?.data?.error }
    }

    // null 값일 경우 방문 기본값 50000 으로 설정
    const prices = {
      minAvgPrice: response.data?.minAvgPrice || 50000,
      avgPrice: response.data?.avgPrice || 50000,
      maxAvgPrice: response.data?.maxAvgPrice || 50000,
    }

    return {
      isSuccess: true,
      prices,
    }
  } catch (error) {
    console.error("catch 에러!!! - getVisitingAvgPrice", error)
    return { isSuccess: false, reason: error }
  }
}
