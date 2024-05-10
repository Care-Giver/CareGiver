/* eslint-disable camelcase */
import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"

export interface CrecheAvailableDate {
  id: number
  createAt: string // "2022-01-01T11:00:00"
  updatedAt: string // "2022-01-01T11:00:00"
  startDate: string // "2022-09-14",
  fee: number
  isBooked: boolean
  deletedAt: string | null // 펫시팅 시간 비활성화 여부. string 이면 비활성화된 상태이며 시각을 저장하고 있고, null 이면 비활성화 되어있지 않은 상태이다.
  // eslint-disable-next-line @typescript-eslint/ban-types
  __creche__: object //TODO type 업데이트
  __has_creche__: boolean
}
interface CrecheDatesResponse extends GeneralResponse {
  crecheAvailableDates: CrecheAvailableDate[]
}
/**
 * [펫시터 전용 API]
 * 로그인한 유저의 모든 위탁서비스 가능 날짜들을 불러온다.
 */
export const getCrecheDates = async (crecheId: number): Promise<CrecheAvailableDate[]> => {
  try {
    const response = await axios.get<CrecheDatesResponse>(`${BASE_URL}/creche-date/${crecheId}`)

    if (!response.data.ok) {
      const error = response.data.error
      console.error("response.data.error 에러!!!", error)
      return []
    }

    // console.log("response", response)
    //console.log("response.data", response.data)
    // console.log("response.data.CrecheDates", response.data.CrecheDates)
    return response.data.crecheAvailableDates.map((item) => ({
      ...item,
      startDate: item.startDate.substring(0, 10),
    }))
  } catch (error) {
    console.error("catch 에러!!!", error)
    return []
  }
}

interface CreateCrecheDateBody {
  startDates: string[] // [ "2022-09-14", "2022-09-15"]
  crecheId: number
  fee: number
}
interface CreateCrecheDateResponse extends GeneralResponse {
  crecheAvailableDates: CrecheAvailableDate[]
}
type CreateCrecheDateResult =
  | {
      isSuccess: true // 성공여부
      crecheAvailableDates: CrecheAvailableDate[] // 성공시, 생성된 방문 펫시팅 서비스 가능한 날짜 객체들
    }
  | {
      isSuccess: false // 성공여부
      reason: string // 실패시, 실패이유
      crecheAvailableDates: [] // 실패시, 빈 배열
    }
/**
 * [펫시터 전용 API]
 * 위탁장소 펫시팅 서비스를 진행할 날짜들을 입력한다.
 * 날짜는 한 개 가 될수도 있고,
 * 여러개가 될수도 있다.
 * TODO: 현재 API는 DB 내 객체들 중에서 이미 해당 startDate 가 존재하는지 확인하지 않음.
 * TODO: 개선이 필요 함.
 */
export const createCrecheDate = async (
  body: CreateCrecheDateBody,
): Promise<CreateCrecheDateResult> => {
  try {
    const response = await axios.post<CreateCrecheDateResponse>(`${BASE_URL}/creche-date`, body)

    if (!response.data.ok) {
      const error = response.data.error
      console.error("createCrecheDate | response.data.error 에러!!!", error)
      return { isSuccess: false, reason: error?.message, crecheAvailableDates: [] }
    }

    return {
      isSuccess: true,
      crecheAvailableDates: response.data.crecheAvailableDates,
    }
  } catch (error) {
    console.error("createCrecheDate | catch 에러!!!", error)
    return { isSuccess: false, reason: "axios catch error", crecheAvailableDates: [] }
  }
}

interface UpdateCrecheDateBody {
  startDate: string // "2022-09-14"
  crecheId: number
  fee: number
}
interface UpdateCrecheDateResponse extends GeneralResponse {
  crecheAvailableDates: CrecheAvailableDate[]
}
type UpdateCrecheDateResult =
  | {
      isSuccess: true // 성공여부
      crecheAvailableDates: CrecheAvailableDate[] // 성공시, 생성된 방문 펫시팅 서비스 가능한 날짜 객체들
    }
  | {
      isSuccess: false // 성공여부
      reason: string // 실패시, 실패이유
      crecheAvailableDates: [] // 실패시, 빈 배열
    }
/**
 * [펫시터 전용 API]
 * 위탁장소 펫시팅 서비스를 진행할 날짜를 수정한다.
 * 수정 시에는 하나의 날짜만 입력 가능하다.
 */
export const updateCrecheDate = async (
  crecheAvailableDateId: number,
  body: UpdateCrecheDateBody,
): Promise<UpdateCrecheDateResult> => {
  try {
    const response = await axios.put<UpdateCrecheDateResponse>(
      `${BASE_URL}/creche-date/${crecheAvailableDateId}`,
      body,
    )
    console.log("response.data 🔷 updateCrecheDate", response.data)

    if (!response.data.ok) {
      const error = response.data.error
      console.error("updateCrecheDate | response.data.error 에러!!!", error)
      return { isSuccess: false, reason: error?.message, crecheAvailableDates: [] }
    }

    return {
      isSuccess: true,
      crecheAvailableDates: response.data.crecheAvailableDates,
    }
  } catch (error) {
    console.error("updateCrecheDate | catch 에러!!!", error)
    return { isSuccess: false, reason: "axios catch error", crecheAvailableDates: [] }
  }
}

interface DisableCrecheDateRequestBody {
  crecheId: number // 16,
  date: string // "2023-06-05",
}
interface DisableCrecheDateResponse extends GeneralResponse {}
interface DisableCrecheDateResult {
  isSuccess: boolean // 성공여부
  reason?: string // 실패시, 실패이유
}
/**
 * [펫시터 전용 API]
 * 입력받은 날짜에 해당하는 펫시팅 서비스를 비활성화 한다.
 * TODO: 현재 reponse 구조가 이상함. error, ok 구조가 아님. 수정 필요 함
 */
export const disableCrecheDate = async (
  body: DisableCrecheDateRequestBody,
): Promise<DisableCrecheDateResult> => {
  try {
    const response = await axios.post<DisableCrecheDateResponse>(
      `${BASE_URL}/creche-date/disable`,
      body,
    )

    if (!response?.data.ok) {
      return { isSuccess: false, reason: response?.data?.error.message }
    }

    return {
      isSuccess: true,
    }
  } catch (error) {
    return { isSuccess: false, reason: error }
  }
}

interface RestoreCrecheDateRequestBody {
  crecheId: number // 16,
  date: string // "2023-06-05",
}
interface RestoreCrecheDateResponse extends GeneralResponse {
  crecheAvailableDates: CrecheAvailableDate[]
}
interface RestoreCrecheDateResult {
  isSuccess: boolean // 성공여부
  reason?: string // 실패시, 실패이유
}
/**
 * [펫시터 전용 API]
 * 한번 비활성화 된 적 있는 펫시팅 서비스를 다시 활성화 한다.
 */
export const restoreCrecheDate = async (
  body: RestoreCrecheDateRequestBody,
): Promise<RestoreCrecheDateResult> => {
  try {
    const response = await axios.post<RestoreCrecheDateResponse>(
      `${BASE_URL}/creche-date/restore`,
      body,
    )

    if (!response?.data.ok) {
      return { isSuccess: false, reason: response?.data?.error.message }
    }

    return {
      isSuccess: true,
    }
  } catch (error) {
    return { isSuccess: false, reason: error }
  }
}
