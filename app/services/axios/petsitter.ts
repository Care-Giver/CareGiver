// TODO: 이 파일은 삭제하고,
// TODO: 각각 visiting.ts, creche.ts 파일로 이동시킨다
import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"
import { VisitingAmenity, VisitingService } from "./visitings"
import { Petsitter } from "./types/creches.visitings.common.types"
import { CrecheAmenity, CrecheService } from "./creches"

export interface PetsitterVisiting extends Petsitter {
  serviceVisiting: VisitingService[]
  visitingAmenities: VisitingAmenity[]
}
interface PetsitterVisitingResponse extends GeneralResponse {
  PetsitterVisiting: PetsitterVisiting
}

/**
 * 로그인한 유저의 모든 위탁 예약을 읽어온다.
 * @returns {Promise<PetsitterVisiting>}
 */
export const getPetsitterVisitings = async (visitingId: number): Promise<PetsitterVisiting> => {
  try {
    const response = await axios.get<PetsitterVisitingResponse>(
      `${BASE_URL}/visiting/${visitingId}`,
    )

    if (!response.data.ok) {
      const error = response.data.error
      console.error("response.data.error 에러!!!", error)
      // @ts-ignore
      return error
    }

    // console.log("response", response)
    console.log("response.data", response.data)
    console.log("response.data.PetsitterVisitings", response.data.PetsitterVisiting)
    return response.data
  } catch (error) {
    console.error("catch 에러!!!", error)
    return null
  }
}

export interface PetsitterCreche extends Petsitter {
  serviceCreche: CrecheService[]
  crecheAmenities: CrecheAmenity[]
}
interface PetsitterCrecheResponse extends GeneralResponse {
  PetsitterCreche: PetsitterCreche
}

/**
 * 로그인한 유저의 모든 위탁 예약을 읽어온다.
 * @returns {Promise<PetsitterCreche>}
 */
export const getPetsitterCreches = async (crecheId: number): Promise<PetsitterCreche> => {
  try {
    const response = await axios.get<PetsitterCrecheResponse>(`${BASE_URL}/creche/${crecheId}`)

    if (!response.data.ok) {
      const error = response.data.error
      console.error("response.data.error 에러!!!", error)
      // @ts-ignore
      return error
    }

    // console.log("response", response)
    console.log("response.data", response.data)
    console.log("response.data.PetsitterCreches", response.data.PetsitterCreche)
    return response.data
  } catch (error) {
    console.error("catch 에러!!!", error)
    return null
  }
}
