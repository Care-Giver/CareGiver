import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"
import { ratingRound } from "../../utils/format"
import { SearchResultSortingOption } from "#screens"
import { ServiceType } from "#models"

export interface ProfileCardInfo {
  crecheId?: number
  visitingId?: number
  image: string | null
  userNickname: string
  title: string
  reviewCount: number
  rating: number
  desc: string
}

export interface GetFavoritesRequestBody {
  startTime: string
  endTime: string
  petIds: number[]
  sortBy: SearchResultSortingOption
  petSitterType: ServiceType
}
interface GetFavoritesResponse extends GeneralResponse {
  favoritePetsitters: ProfileCardInfo[] | null[]
  // TODO: 훈련사 추가
}
type GetFavoritesResult = { isSuccess: true } | { isSuccess: false }
/**
 * 현재 유저가 즐겨찾기 한
 * 모든 펫시터 리스트를 받아온다.
 */
export const getFavorites = async (body: GetFavoritesRequestBody): Promise<GetFavoritesResult> => {
  try {
    if (Object.keys(body).length === 0) return

    const response = await axios.post<GetFavoritesResponse>(`${BASE_URL}/user/favorites`, body)

    if (!response.data.ok) {
      console.error(response.data.error)
      //@ts-ignore
      return null
    }

    const favoritePetsitters: ProfileCardInfo[] = response.data.favoritePetsitters.map(
      (value: ProfileCardInfo) => ({
        ...value,
        rating: ratingRound(value.rating),
      }),
    )

    return {
      ...response.data,
      favoritePetsitters,
    }
  } catch (error) {
    console.error(error)
    console.error(error?.message)
    //@ts-ignore
    return null
  }
}

export interface UpdateFavoriteBody {
  visitingId?: number
  crecheId?: number
}
interface CreateFavoriteResponse extends GeneralResponse {
  favoriteId: number
}
/**
 * 현재 유저의 찜을 새로 생성한다.
 * @returns {Promise<CreateFavoriteResponse>}
 */
export const createFavorite = async (body: UpdateFavoriteBody): Promise<CreateFavoriteResponse> => {
  try {
    const response = await axios.post<CreateFavoriteResponse>(`${BASE_URL}/user/favorite`, body)
    if (!response.data.ok) {
      console.error(response.data.error)
      //@ts-ignore
      return null
    }
    // console.info("[createFavorite] response.data: ", response.data)
    return response.data
  } catch (error) {
    console.error(error)
    //@ts-ignore
    return null
  }
}

/**
 * 현재 유저의 찜을 삭제한다.
 * @returns {Promise<GeneralResponse>}
 */
export const deleteFavorite = async (body: UpdateFavoriteBody): Promise<GeneralResponse> => {
  try {
    const response = await axios.put<GeneralResponse>(`${BASE_URL}/user/unfavorite`, body)
    if (!response.data.ok) {
      console.error(response.data.error)
      //@ts-ignore
      return null
    }
    // console.info("[deleteFavorite] response.data: ", response.data)
    return response.data
  } catch (error) {
    console.error(error)
    //@ts-ignore
    return null
  }
}
