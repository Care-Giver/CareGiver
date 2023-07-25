import axios from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"

export interface crecheAvailableDates {
  id: number
  createAt: string
  updatedAt: string
  startTime: string
  endTime: string
  fee: number
  totalFee: number
}

interface crecheDaysResponse extends GeneralResponse {
  crecheAvailableDates: crecheAvailableDates[]
}

/**
 * 로그인한 유저의 모든 위탁 예약을 읽어온다.
 * @returns {Promise<crecheAvailableDates>}
 */
export const getCrecheDays = async (crecheId: number): Promise<crecheAvailableDates[]> => {
  try {
    const response = await axios.get<crecheDaysResponse>(
      `${BASE_URL}/creche-day/${crecheId}`,
      CONFIG,
    )

    if (!response.data.ok) {
      const error = response.data.error
      console.error("response.data.error 에러!!!", error)
      // @ts-ignore
      return error
    }

    // console.log("response", response)
    //console.log("response.data", response.data)
    // console.log("response.data.CrecheDays", response.data.CrecheDays)
    return response.data.crecheAvailableDates
  } catch (error) {
    console.error("catch 에러!!!", error)
    return []
  }
}

interface PostCrecheDayBody {
  startDates: Date[]
  endDates: Date[]
  crecheId: number
  fee: number
}

interface ICrecheAvailableDate {
  id: number
  createAt: Date
  updatedAt: Date
  startDate: Date
  endDate: Date
  fee: number
  TotalFee: number
}

interface PostCrecheDayResponse extends GeneralResponse {
  crecheAvailableDates: ICrecheAvailableDate[]
}

/**
 * 위탁장소 펫시팅 서비스를 진행할 날짜들을 입력한다.
 * 날짜는 한 개 가 될수도 있고,
 * 여러개가 될수도 있다.
 *
 * @param data
 * @returns null
 */
export const postCrecheDay = async (data: PostCrecheDayBody) => {
  try {
    const response = await axios.post<PostCrecheDayResponse>(`${BASE_URL}/creche-day`, data, CONFIG)

    if (!response.data.ok) {
      const error = response.data.error
      console.error("postCrecheDay | response.data.error 에러!!!", error)
      // @ts-ignore
      return error
    }

    // 정확한 데이터가 왔음 response.data
    // return 있어야하는가? 는 혜리님이 결정하실 것
    // return
  } catch (error) {
    console.error("postCrecheDay | catch 에러!!!", error)
  }
}
