import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"

export interface CrecheAvailableDate {
  id: number
  createAt: string // "2022-01-01T11:00:00"
  updatedAt: string // "2022-01-01T11:00:00"
  startDate: string // "2022-09-14",
  fee: number
  isBooked: boolean
}
interface CrecheDatesResponse extends GeneralResponse {
  crecheAvailableDates: CrecheAvailableDate[]
}
/**
 * [케어기버 전용 API]
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
 * [케어기버 전용 API]
 * 위탁장소 펫시팅 서비스를 진행할 날짜들을 입력한다.
 * 날짜는 한 개 가 될수도 있고,
 * 여러개가 될수도 있다.
 */
export const createCrecheDate = async (
  body: CreateCrecheDateBody,
): Promise<CreateCrecheDateResult> => {
  try {
    const response = await axios.post<CreateCrecheDateResponse>(`${BASE_URL}/creche-date`, body)
    console.log("response.data 🔷 createCrecheDate", response.data)

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
 * [케어기버 전용 API]
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
