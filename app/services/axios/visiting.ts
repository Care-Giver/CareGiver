/* eslint-disable camelcase */
import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"
import { Petsitter } from "./types/creches.visitings.common.types"
import { VisitingAmenity, VisitingService } from "./visitings"
import { CareGiverEntity } from "./types/entity.types"
import _ from "lodash"

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
      | "detailAddress"
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
    console.log("response ♦️ createVisiting", response)
    console.log("response.data 🔷 createVisiting", response.data)

    if (!response?.data.ok) {
      console.error("API 에러!!! - createVisiting ♦️", response?.data?.error)
      return { isSuccess: false, reason: response?.data?.error }
    }

    return {
      isSuccess: true,
      visitingId: response.data.visitingId,
    }
  } catch (error) {
    console.error("catch 에러!!! - createVisiting", error)
    console.error("catch 에러!!! - createVisiting body", body)
    return { isSuccess: false, reason: error }
  }
}

interface UpdateVisitingRequestBody extends Partial<Omit<CreateVisitingRequestBody, "userId">> {}
interface UpdatedVisiting extends VistingPetsitter {
  __careGiver__: CareGiverEntity
  __has_careGiver__: boolean
  __has_visitingBookings__: boolean
  __visitingBookings__: any[] //TODO: visitingBooking 객체로 변경
}
interface UpdateVisitingResponse extends GeneralResponse {
  visiting: UpdatedVisiting // 업데이트된 방문 객체
}
interface UpdateVisitingResult {
  isSuccess: boolean // 성공여부
  reason?: string // 실패시, 실패이유
  visiting?: VistingPetsitter // 성공시, 업데이트된 방문 객체에서, 필요없는 필드들을 제거한 객체 ( _.omit() 참고 )
}
/**
 * [케어기버 전용 API]
 * 방문 펫시터 정보를 수정한다
 *
 */
export const updateVisiting = async (
  id: number,
  body: UpdateVisitingRequestBody,
): Promise<UpdateVisitingResult> => {
  try {
    const response = await axios.put<UpdateVisitingResponse>(`${BASE_URL}/visiting/${id}`, body)
    console.log("response ♦️ updateVisiting", response)
    console.log("response.data 🔷 updateVisiting", response.data)

    if (!response?.data.ok) {
      console.error("API 에러!!! - updateVisiting ♦️", response?.data?.error)
      return { isSuccess: false, reason: response?.data?.error }
    }

    return {
      isSuccess: true,
      visiting: _.omit(response.data.visiting, [
        "__careGiver__",
        "__has_careGiver__",
        "__has_visitingBookings__",
        "__visitingBookings__",
      ]),
    }
  } catch (error) {
    console.error("catch 에러!!! - updateVisiting", error)
    console.error("catch 에러!!! - updateVisiting id, body", id, body)
    return { isSuccess: false, reason: error }
  }
}

//! NOTE: DELETE /visiting/:id 는 불가능합니다. 서버에서만 실행가능한 API 입니다.

export interface VistingPetsitter extends Petsitter {
  serviceVisiting: VisitingService[]
  visitingAmenities: VisitingAmenity[]
}
interface GetVisitingCareGiverResponse extends GeneralResponse {
  visiting: VistingPetsitter
}
interface GetVisitingCareGiverResult {
  isSuccess: boolean // 성공여부
  reason?: string // 실패시, 실패이유
  visiting?: VistingPetsitter
}
/**
 * [케어기버 전용 API]
 * 로그인 유저가 등록한 모든 방문 펫시팅 정보를 가져온다.
 */
export const getVisitingCareGiver = async (): Promise<GetVisitingCareGiverResult> => {
  try {
    const response = await axios.get<GetVisitingCareGiverResponse>(
      `${BASE_URL}/visiting/care-giver`,
    )
    // console.log("response ♦️ getVisitingCareGiver", response)
    console.log("response.data 🔷 getVisitingCareGiver", response.data)

    if (!response?.data.ok) {
      switch (response?.data?.error?.errorCode) {
        case 404:
          console.error("유저가 등록한 visiting 객체가 없습니다.", response?.data?.error)
          return { isSuccess: true, visiting: null } //! isSuccess: true 이어야 함. 수정 금지
        default:
          console.error("API 에러!!! - getVisitingCareGiver", response?.data?.error)
          return { isSuccess: false, reason: response?.data?.error }
      }
    }

    return {
      isSuccess: true,
      visiting: response.data.visiting,
    }
  } catch (error) {
    console.error("catch 에러!!! - getVisitingCareGiver", error)
    return { isSuccess: false, reason: error }
  }
}
