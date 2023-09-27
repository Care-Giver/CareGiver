import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"
import { AuthProvider } from "#models"
import { alertModal } from "../../utils/alert-modal"

export enum Sex {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

//* Pet관련 Types

export interface PetColumns {
  id: number
  createAt: string
  updatedAt: string
  name: string
  species: Species
  age: number
  sex: Sex
  images: string[]
  weight: number
  petType: string
  isNeutralizated: boolean
  birthday: string
  desc: string
}

export interface Species {
  id: number
  createAt: string
  updatedAt: string
  name: string
  familyType: string
}

export interface Pet {
  pet: Omit<PetColumns, "createAt" | "updatedAt">
  familyType: string
}

interface PetsResponse extends GeneralResponse {
  pets: Pet[]
}

export type PetDetail = Pick<PetColumns, "images" | "petType" | "name" | "age" | "species" | "sex">

interface GetPetsResult {
  isSuccess: boolean // 성공여부
  petsDetail?: PetDetail[] // 성공시, 펫 상세정보
  reason?: string // 실패시, 실패이유
}
/**
 * pets API의 목적은 x-jwt값을 펫 데이터로 변환하는 것에 있습니다.
 * login API 를 통해 얻어낸 x-jwt 토큰값을 사용하여,
 * 로그인한 유저의 펫 정보를 가져옵니다.
 * @returns {Promise<any>}
 *
 *
 */

export const getPets = async (token: string): Promise<GetPetsResult> => {
  try {
    console.log("token", token)
    if (!token) {
      alertModal("로그인이 필요합니다.", "토큰 값이 존재하지 않음")
      return { isSuccess: false, reason: "토큰 값이 존재하지 않음" }
    }

    const response = await axios.get<PetsResponse>(`${BASE_URL}/pets`, {
      headers: {
        "x-jwt": token,
        Accept: "Application/json",
      },
    })

    if (!response?.data.ok) {
      console.error("/user/me API 에러!!! ♦️", response?.data?.error)
      return { isSuccess: false, reason: response?.data?.error }
    }

    return {
      isSuccess: true,
      petsDetail: response.data.pets.map((data) => {
        return {
          images: data.pet.images,
          petType: data.pet.petType,
          name: data.pet.name,
          age: data.pet.age,
          species: data.pet.species,
          sex: data.pet.sex,
        }
      }),
    }
  } catch (error) {
    console.error("catch 에러!!! - getMe", error.toJSON())
    return { isSuccess: false, reason: error.toJSON() }
  }
}
