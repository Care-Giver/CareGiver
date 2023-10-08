import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"
import { ratingRound } from "../../utils/format"
import {
  Amenity,
  CommonData,
  SearchRequest,
  Service,
  UserRelatedData,
} from "./types/creches.visitings.common.types"

export interface CrechesSearchRequest extends SearchRequest {
  startDate: string // "2023-07-29T00:00:00"
  endDate: string // "2023-07-30T00:00:00"
}

export interface CrechesService extends Service {}

export interface CrecheAmenity extends Amenity {}

interface CrecheRelatedData extends CommonData {
  serviceCreche: CrechesService[]
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
    console.log("creche!!")
    console.log("requestBody", requestBody)
    const response = await axios.post<CrechesSearchRequestResponse>(
      `${BASE_URL}/creches/search`,
      requestBody,
    )
    // console.log("response >>>", response)
    // console.log("response.data >>>", response.data)

    if (!response.data.ok) {
      const error = response.data.error
      console.error("response.data.error 에러!!!", error)
      // @ts-ignore
      return []
    }

    return response.data.creches.map((item) => ({
      ...item,
      star: ratingRound(item.creche.star),
    }))
  } catch (error) {
    console.error("catch 에러!!!", error)
    return []
  }
}
