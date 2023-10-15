import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"
import { Petsitter } from "./types/creches.visitings.common.types"

interface CreateVisitingRequestBody
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
  services: number[] // VisitingService 객체 id[], //! 배열의 길이가 1 이상이어야 합니다.
  amenities: number[] // VisitingAmenity 객체 id[], //! 빈 배열도 OK
}
interface CreateVisitingResponse extends GeneralResponse {
  visitingId: number
}
interface CreateVisitingResult {
  isSuccess: boolean // 성공여부
  reason?: string // 실패시, 실패이유
  visitingId?: number // 성공시, 생성된 방문장소의 id (visitingId)
}
/**
 * [케어기버 전용 API]
 * 방문 펫시터를 생성한다
 *
 */
export const createVisiting = async (
  body: CreateVisitingRequestBody,
): Promise<CreateVisitingResult> => {
  try {
    const response = await axios.post<CreateVisitingResponse>(`${BASE_URL}/visiting`, body)
    console.log("response ♦️", response)
    console.log("response.data 🔷", response.data)

    if (!response?.data.ok) {
      console.error("API 에러!!! - createPet ♦️", response?.data?.error)
      return { isSuccess: false, reason: response?.data?.error }
    }

    return {
      isSuccess: true,
      visitingId: response.data.visitingId,
    }
  } catch (error) {
    console.error("catch 에러!!! - createPet", error)
    console.error("catch 에러!!! - createPet body", body)
    return { isSuccess: false, reason: error }
  }
}
