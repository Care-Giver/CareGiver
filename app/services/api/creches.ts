import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"
import { ratingRound } from "../../utils/format"
import {
  Amenity,
  CareGiverPetsitter,
  SearchRequest,
  Service,
  UserRelatedData,
} from "./types/creches.visitings.common.types"
import { alertModal } from "../../utils/alert-modal"

export interface CrechesSearchRequest extends SearchRequest {
  startDate: string // "2023-07-29T00:00:00"
  endDate: string // "2023-07-30T00:00:00"
}

export interface CrecheService extends Service {}

export interface CrecheAmenity extends Amenity {}

interface CrecheRelatedData extends CareGiverPetsitter {
  serviceCreche: CrecheService[]
  crecheAmenities: CrecheAmenity[]
}

export interface Creche extends UserRelatedData {
  creche: CrecheRelatedData
}

interface CrechesSearchRequestResponse extends GeneralResponse {
  creches: Creche[]
  totalItems: number // 4
  totalpages: number // 1
}

/**
 * 조건에 맞는 방문 펫시터를 검색한다
 * @returns {Promise<number>} 생성된 위탁장소의 id (crecheId) 를 리턴한다.
 */
export const getCrechesSearch = async (requestBody: CrechesSearchRequest): Promise<Creche[]> => {
  try {
    const response = await axios.post<CrechesSearchRequestResponse>(
      `${BASE_URL}/creches/search`,
      requestBody,
    )

    if (!response.data.ok) {
      const error = response.data.error
      console.error("response.data.error 에러!!!", error)
      alertModal("위탁 펫시터 검색에 실패했습니다.", `${response.data.error}`)
      return []
    }

    return response.data.creches.map((item) => ({
      ...item,
      star: ratingRound(item.creche.star),
    }))
  } catch (error) {
    alertModal("위탁 펫시터 검색에 실패했습니다.", `catch: ${error?.message}`)
    return []
  }
}
