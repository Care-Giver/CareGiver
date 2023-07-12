import axios from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"

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

export interface SearchOption {
  startTime: string
  endTime: string
  petIds: number[]
  sortBy: string
  petSitterType: string
}

export interface UpdateFavoriteBody {
  visitingId?: number
  crecheId?: number
}

interface FavoriteResponse extends GeneralResponse {
  favoritePetsitters: ProfileCardInfo[] | null[]
  // TODO: 훈련사 추가
}

interface CreateFavoriteResponse extends GeneralResponse {
  favoriteId: number
}

/**
 * 현재 유저가 찜한 펫시터 / 훈련사 리스트를 받아온다.
 * @returns {Promise<FavoriteResponse>}
 */
export const getFavorites = async (body: SearchOption | {}): Promise<FavoriteResponse> => {
  try {
    const response = await axios.post<FavoriteResponse>(`${BASE_URL}/user/favorites`, body, CONFIG)

    if (!response.data.ok) {
      console.error(response.data.error)
      //@ts-ignore
      return null
    }
    // console.info("[getFavorites] response.data: ", response.data)
    // console.log("in Axios response.data >>>", response.data)
    return response.data
  } catch (error) {
    console.error(error)
    //@ts-ignore
    return null
  }
}

/**
 * 현재 유저의 찜을 새로 생성한다.
 * @returns {Promise<CreateFavoriteResponse>}
 */
export const createFavorite = async (body: UpdateFavoriteBody): Promise<CreateFavoriteResponse> => {
  try {
    const response = await axios.post<CreateFavoriteResponse>(
      `${BASE_URL}/user/favorite`,
      body,
      CONFIG,
    )
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
    const response = await axios.put<GeneralResponse>(`${BASE_URL}/user/unfavorite`, body, CONFIG)
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
