import axios from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"
import { ratingRound } from "../../utils/format"
import {
  Amenity,
  CommonData,
  SearchRequest,
  Service,
  UserRelatedData,
} from "./types/creches.visitings.common.types"

interface VisitingsSearchRequest extends SearchRequest {}

export interface VisitingService extends Service {}

export interface VisitingAmenity extends Amenity {}

interface VisitingRelatedData extends CommonData {
  serviceVisiting: VisitingService[]
  visitingAmenities: VisitingAmenity[]
}

export interface Visiting extends UserRelatedData {
  visiting: VisitingRelatedData
}

interface VisitingsSearchRequestResponse extends GeneralResponse {
  visitings: Visiting[]
  totalItems: number // 4
  totalpages: number // 1
}

/**
 * 조건에 맞는 방문 펫시터를 검색한다
 * @returns {Promise<number>} 생성된 위탁장소의 id (crecheId) 를 리턴한다.
 */
export const getVisitingsSearch = async (
  requestBody: VisitingsSearchRequest,
): Promise<Visiting[]> => {
  try {
    // console.log("creche", creche)
    const response = await axios.post<VisitingsSearchRequestResponse>(
      `${BASE_URL}/visitings/search`,
      requestBody,
      CONFIG,
    )
    // console.log("response >>>", response)
    // console.log("response.data >>>", response.data.visitings)

    if (!response.data.ok) {
      const error = response.data.error
      console.error("response.data.error 에러!!!", error)
      // @ts-ignore
      return []
    }

    return response.data.visitings.map((item) => ({
      ...item,
      star: ratingRound(item.visiting.star),
    }))
  } catch (error) {
    console.error("catch 에러!!!", error)
    return []
  }
}
