import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"

export interface GroupedVisitingAvailableTimesByDate {
  id: number
  createAt: string // "2023-01-01T11:00:00",
  updatedAt: string // "2023-01-01T11:00:00",
  date: string // "2023-06-05",
  fee: number
}

interface VisitingAvailableTimesResponse extends GeneralResponse {
  groupedVisitingAvailableTimesByDate: GroupedVisitingAvailableTimesByDate[]
}

/**
 * [케어기버 전용 API]
 * 로그인한 유저의 모든 방문 펫시팅 서비스 가능 날짜들을 불러온다.
 */
export const getVisitingAvailableTimes = async (
  visitingId: number,
): Promise<GroupedVisitingAvailableTimesByDate[]> => {
  try {
    const response = await axios.get<VisitingAvailableTimesResponse>(
      `${BASE_URL}/visiting-available-time/${visitingId}`,
    )

    if (!response.data.ok) {
      const error = response.data.error
      console.error("response.data.error 에러!!!", error)
      return []
    }

    // console.log("response", response)
    //console.log("response.data", response.data)
    // console.log("response.data.visitingAvailableTimes", response.data.visitingAvailableTimes)
    return response.data.groupedVisitingAvailableTimesByDate.map((item) => ({
      ...item,
      date: item.date.substring(0, 10),
    }))
  } catch (error) {
    console.error("catch 에러!!!", error)
    return []
  }
}

interface GetAvailableTimesByDateRequestBody {
  visitingId: number // 1,
  date: string // "2022-09-14"
}
export interface VisitingAvailableTime {
  id: number // visitingAvailableTimeId
  createAt: string // "2023-01-01T11:00:00"
  updatedAt: string // "2023-01-01T11:00:00"
  startTime: string // "2022-09-14T22:00:00"
  fee: number
  isBooked: boolean // 해당 시간 객체가 유저 예약이 되어있는지 여부. true 일 경우, 예약이 걸려있으므로 PUT 불가 함.
}
interface GetAvailableTimesByDateResponse extends GeneralResponse {
  visitingAvailableTimes: VisitingAvailableTime[]
}
/**
 * 🏗️ WIP
 * [케어기버 전용 API]
 * 입력받은 visitingId 와 날짜에 맞는 펫시터의 서비스 시간들을 가져온다.
 */
export const getAvailableTimesByDate = async (
  body: GetAvailableTimesByDateRequestBody,
): Promise<VisitingAvailableTime[]> => {
  try {
    const response = await axios.post<GetAvailableTimesByDateResponse>(
      `${BASE_URL}/visiting-available-time/availableTimes`,
      body,
    )

    if (!response.data.ok) {
      const error = response.data.error
      console.error("response.data.error 에러!!!", error)
      return []
    }
    return response.data.visitingAvailableTimes
  } catch (error) {
    console.error("catch 에러!!!", error)
    return []
  }
}

interface CreateVisitingAvailableTimeRequestBody {
  startTime: string // "2022-09-14T22:00:00",
  endTime: string // "2022-09-14T23:00:00",
  visitingId: number // 16,
  fee: number //  "시간당 추가요금" 입니다. 기본요금(defaultFee)랑 다름.
}
interface CreateVisitingAvailableTimeResponse extends GeneralResponse {
  visitingAvailableTimes: VisitingAvailableTime[]
}
interface CreateVisitingAvailableTimeResult {
  isSuccess: boolean // 성공여부
  reason?: string // 실패시, 실패이유
  visitingAvailableTimes?: VisitingAvailableTime[] // 성공시, 생성된 방문 펫시팅 서비스 가능한 날짜 객체들
}
/**
 * 🏗️ WIP
 * [케어기버 전용 API]
 * 방문 펫시팅 서비스 가능한 날짜를 생성한다.
 */
export const createVisitingAvailableTime = async (
  body: CreateVisitingAvailableTimeRequestBody,
): Promise<CreateVisitingAvailableTimeResult> => {
  try {
    const response = await axios.post<CreateVisitingAvailableTimeResponse>(
      `${BASE_URL}/visiting-available-time`,
      body,
    )
    console.log("response.data 🔷 createVisitingAvailableTime", response.data)

    if (!response?.data.ok) {
      return { isSuccess: false, reason: response?.data?.error }
    }

    return {
      isSuccess: true,
      visitingAvailableTimes: response.data.visitingAvailableTimes,
    }
  } catch (error) {
    console.error("catch 에러!!! - createVisitingAvailableTime", error)
    console.error("catch 에러!!! - createVisitingAvailableTime body", body)
    return { isSuccess: false, reason: error }
  }
}

interface DeleteVisitingAvailableTimeResponse extends GeneralResponse {}
interface DeleteVisitingAvailableTimeResult {
  isSuccess: boolean // 성공여부
  reason?: string // 실패시, 실패이유
}
/**
 * [케어기버 전용 API]
 * 입력받은 id의 펫시팅 서비스를 진행할 시간을 삭제한다.
 */
export const deleteVisitingAvailableTime = async (
  visitingAvailableTimeId: number,
): Promise<DeleteVisitingAvailableTimeResult> => {
  try {
    const response = await axios.delete<DeleteVisitingAvailableTimeResponse>(
      `${BASE_URL}/visiting-available-time/${visitingAvailableTimeId}`,
    )

    if (!response?.data.ok) {
      console.error("API 에러!!! - createVisitingAvailableTime ♦️", response?.data?.error)
      return { isSuccess: false, reason: response?.data?.error?.message }
    }

    return {
      isSuccess: true,
    }
  } catch (error) {
    return { isSuccess: false, reason: error }
  }
}

interface DisableVisitingAvailableTimeRequestBody {
  visitingId: number // 16,
  date: string // "2023-06-05",
}
interface DisableVisitingAvailableTimeResponse extends GeneralResponse {}
interface DisableVisitingAvailableTimeResult {
  isSuccess: boolean // 성공여부
  reason?: string // 실패시, 실패이유
}
/**
 * [케어기버 전용 API]
 * 입력받은 날짜에 해당하는 펫시팅 서비스를 비활성화 한다.
 */
export const disableVisitingAvailableTime = async (
  body: DisableVisitingAvailableTimeRequestBody,
): Promise<DisableVisitingAvailableTimeResult> => {
  try {
    const response = await axios.post<DisableVisitingAvailableTimeResponse>(
      `${BASE_URL}/visiting-available-time/disable`,
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

interface RestoreVisitingAvailableTimeRequestBody {
  visitingId: number // 16,
  date: string // "2023-06-05",
}
interface RestoreVisitingAvailableTimeResponse extends GeneralResponse {
  visitingAvailableTimes: VisitingAvailableTime[]
}
interface RestoreVisitingAvailableTimeResult {
  isSuccess: boolean // 성공여부
  reason?: string // 실패시, 실패이유
}
/**
 * [케어기버 전용 API]
 * 한번 비활성화 된 적 있는 펫시팅 서비스를 다시 활성화 한다.
 */
export const restoreVisitingAvailableTime = async (
  body: RestoreVisitingAvailableTimeRequestBody,
): Promise<RestoreVisitingAvailableTimeResult> => {
  try {
    const response = await axios.post<RestoreVisitingAvailableTimeResponse>(
      `${BASE_URL}/visiting-available-time/restore`,
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
