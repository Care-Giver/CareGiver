import axios from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"

export interface Item {
  id: number
  createAt: string
  updatedAt: string
  name: string
}
interface Location {
  type: string
  coordinates: number[]
}
export interface PetsitterVisiting {
  id: number
  createAt: string
  updatedAt: string
  title: string
  desc: string
  address: string
  defaultFee: number
  hiredNumber: number
  star: number
  location: Location
  maxUnit: number
  handleType: string[]
  images: string[]
  extraSizeFee: string
  promoted: boolean
  responseRate: number[]
  acceptRate: number[]
  serviceVisiting: Item[]
  visitingAmenities: Item[]
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
      CONFIG,
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

interface ExtraFee {
  Small: number
  Medium: number
  Large: number
}
export interface PetsitterCreche {
  id: number
  createAt: string
  updatedAt: string
  title: string
  address: string
  location: Location
  desc: string
  maxUnit: number
  handleType: string[]
  images: string[]
  hiredNumber: number
  star: number
  defaultFee: number
  extraSizeFee: ExtraFee
  promoted: boolean
  responseRate: number[]
  acceptRate: number[]
  serviceCreche: Item[]
  crecheAmenities: Item[]
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
    const response = await axios.get<PetsitterCrecheResponse>(
      `${BASE_URL}/creche/${crecheId}`,
      CONFIG,
    )

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
