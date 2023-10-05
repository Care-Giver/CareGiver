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
  birthday: string
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
    return {
      isSuccess: true,
      petsDetail: response.data.petResults.map((data) => {
        return {
          id: data.pet.id,
          createAt: data.pet.createAt,
          updatedAt: data.pet.updatedAt,
          images: data.pet.images?.length > 5 ? data.pet.images.slice(0, 5) : data.pet.images, // DB 에서 가져온 이미지중에서 5개까지만 저장한다.
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
interface PetResponse extends GeneralResponse {
  pet: Omit<Pet, "familyType">
}
interface UpdatePetRequestBody {
  name: string
  age: number
  sex: PetSex
  weight: number
  images: string[]
  isNeutralizated: boolean
  desc: string
  //? userId가 nullable
  //userId: number
  speciesName: string
  familyType: string
  birthday: string
}
interface UpdatePetResult {
  isSuccess: boolean // 성공여부
  reason?: string // 실패시, 실패이유
}
export const updatePet = async (
  id: number,
  body: UpdatePetRequestBody,
): Promise<UpdatePetResult> => {
  try {
    const response = await axios.put<PetResponse>(`${BASE_URL}/pet/${id}`, body)

    if (!response?.data.ok) {
      console.error("/pets API 에러!!! ♦️", response?.data?.error)
      return { isSuccess: false, reason: response?.data?.error }
    }
    console.log("updatePets >>>", response.data.pet)
    return {
      isSuccess: true,
    }
  } catch (error) {
    console.error("catch 에러!!! - modifyPet", error)
    return { isSuccess: false, reason: error }
  }
}
