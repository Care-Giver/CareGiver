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
type GetFavoritesResult =
  | { isSuccess: true; favoritePetsitters: any[] }
  | { isSuccess: false; reason: string }
/**
 * 현재 유저가 즐겨찾기 한
 * 모든 펫시터 리스트를 받아온다.
 */
export const getFavorites = async (body: GetFavoritesRequestBody): Promise<GetFavoritesResult> => {
  try {
    if (Object.keys(body).length === 0) return

    const response = await axios.post<GetFavoritesResponse>(`${BASE_URL}/user/favorites`, body)

    if (!response.data.ok) {
      return { isSuccess: false, reason: response.data.error }
    }

    const favoritePetsitters: ProfileCardInfo[] = response.data.favoritePetsitters.map(
      (value: ProfileCardInfo) => ({
        ...value,
        rating: ratingRound(value.rating),
      }),
    )

    return { isSuccess: true, favoritePetsitters: response.data.favoritePetsitters }
  } catch (error) {
    return { isSuccess: false, reason: error?.message }
  }
}

export interface UpdateFavoriteBody {
  visitingId?: number
  crecheId?: number
}
interface CreateFavoriteResponse extends GeneralResponse {
  favoriteId: number
}
type CreateFavoriteResult =
  | { isSuccess: true; favoriteId: number }
  | { isSuccess: false; reason: string }
/**
 * 현재 유저의 찜을 새로 생성한다.
 */
export const createFavorite = async (body: UpdateFavoriteBody): Promise<CreateFavoriteResult> => {
  try {
    const response = await axios.post<CreateFavoriteResponse>(`${BASE_URL}/user/favorite`, body)
    if (!response.data.ok) {
      return { isSuccess: false, reason: response.data.error }
    }
    return { isSuccess: true, favoriteId: response.data.favoriteId }
  } catch (error) {
    return { isSuccess: false, reason: error?.message }
  }
}

interface DeleteFavoriteResponse extends GeneralResponse {
  favoriteId: number
}
type DeleteFavoriteResult =
  | { isSuccess: true; favoriteId: number }
  | { isSuccess: false; reason: string }
/**
 * 현재 유저의 찜을 삭제한다.
 */
export const deleteFavorite = async (body: UpdateFavoriteBody): Promise<DeleteFavoriteResult> => {
  try {
    const response = await axios.put<DeleteFavoriteResponse>(`${BASE_URL}/user/unfavorite`, body)
    if (!response.data.ok) {
      return { isSuccess: false, reason: response.data.error }
    }
    return { isSuccess: true, favoriteId: response.data.favoriteId }
  } catch (error) {
    return { isSuccess: false, reason: error?.message }
  }
}
