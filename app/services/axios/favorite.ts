import axios from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"

export interface ProfileCardInfo {
  id: number
  image: string | null
  userNickname: string
  title: string
  reviewCount: number
  rating: number
  desc: string
}

interface FavoriteResponse extends GeneralResponse {
  favoriteCrechesData: ProfileCardInfo[]
  favoriteVisitingsData: ProfileCardInfo[]
}

/**
 * 현재 유저가 찜한 펫시터 / 훈련사 리스트를 받아온다.
 * @returns {Promise<FavoriteResponse>}
 */
export const getFavorites = async (): Promise<FavoriteResponse> => {
  try {
    const response = await axios.get<FavoriteResponse>(`${BASE_URL}/user/favorites`, CONFIG)

    if (!response.data.ok) {
      console.error(response.data.error)
      return null
    }
    // console.info("[getFavorites] response.data: ", response.data)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

/**
 * 현재 유저가 찜한 훈련사 정보 리스트만 받아온다.
 * @returns {Promise<ProfileCardInfo[]>}
 */
export const getFavoriteCreches = async (): Promise<ProfileCardInfo[]> => {
  try {
    const response = await axios.get<FavoriteResponse>(`${BASE_URL}/user/favorites`, CONFIG)
    if (!response.data.ok) {
      console.error(response.data.error)
      return null
    }

    console.info(
      "[getFavoriteCreches] response.data.favoriteCrechesData: ",
      response.data.favoriteCrechesData,
    )
    return response.data.favoriteCrechesData
  } catch (error) {
    console.error(error)
    return null
  }
}
