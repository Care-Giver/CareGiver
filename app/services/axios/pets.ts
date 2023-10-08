import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"

//* Pet관련 Types
export enum PetSex {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum HandleType {
  LARGE = "대형",
  MEDIUM = "중형",
  SMALL = "소형",
}

export enum FamilyType {
  DOG = "DOG",
  CAT = "CAT",
}
export interface PetDetail {
  id: number
  createAt: Date
  updatedAt: Date
  name: string
  species: Species
  age: number
  sex: PetSex
  images: string[]
  weight: number
  petType: HandleType
  isNeutralizated: boolean
  birthday: Date
  desc: string
}

export interface Species {
  id: number
  createAt: Date
  updatedAt: Date
  name: string
  familyType: FamilyType
}

export interface Pet {
  pet: PetDetail
  familyType: string
}

interface PetsResponse extends GeneralResponse {
  petResults: Pet[]
}

interface GetPetsResult {
  isSuccess: boolean // 성공여부
  petsDetail?: PetDetail[] // 성공시, 펫 상세정보 리스트
  reason?: string // 실패시, 실패이유
}

/**
 * 로그인한 유저의 모든 반려동물 정보를 읽어온다.
 * @returns {Promise<GetPetsResult>}
 */
export const getPets = async (): Promise<GetPetsResult> => {
  try {
    const response = await axios.get<PetsResponse>(`${BASE_URL}/pets`)

    if (!response?.data.ok) {
      console.error("/pets API 에러!!! ♦️", response?.data?.error)
      return { isSuccess: false, reason: response?.data?.error }
    }
    console.log("pets >>>", response.data.petResults)
    return {
      isSuccess: true,
      petsDetail: response.data.petResults.map((data) => {
        return {
          id: data.pet.id,
          createAt: data.pet.createAt,
          updatedAt: data.pet.updatedAt,
          images: data.pet.images,
          petType: data.pet.petType,
          name: data.pet.name,
          age: data.pet.age,
          species: data.pet.species,
          sex: data.pet.sex,
          weight: data.pet.weight,
          isNeutralizated: data.pet.isNeutralizated,
          birthday: data.pet.birthday,
          desc: data.pet.desc,
        }
      }),
    }
  } catch (error) {
    console.error("catch 에러!!! - getPets", error)
    return { isSuccess: false, reason: error }
  }
}
