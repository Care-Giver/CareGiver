import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"
import { HandleType } from "./types/creches.visitings.common.types"

//* Pet관련 Types
export enum PetSex {
  MALE = "MALE",
  FEMALE = "FEMALE",
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
  birthday: string // "2019-09-03"
  desc: string
}

export interface Species {
  id: number
  createAt: Date
  updatedAt: Date
  name: string
  familyType: FamilyType
}

interface PetAndFamilyType {
  pet: PetDetail
  familyType: string
}

interface GetPetsResponse extends GeneralResponse {
  petResults: PetAndFamilyType[]
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
    const response = await axios.get<GetPetsResponse>(`${BASE_URL}/pets`)

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
interface GetPetResponse extends GeneralResponse {
  pet: PetDetail
  familyType: FamilyType
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

/**
 * 선택한 반려동물의 정보를 수정한다.
 * @param id 반려동물 id
 * @param body
 * @returns
 */
export const updatePet = async (
  id: number,
  body: UpdatePetRequestBody,
): Promise<UpdatePetResult> => {
  try {
    const response = await axios.put<GetPetResponse>(`${BASE_URL}/pet/${id}`, body)
    if (!response?.data.ok) {
      console.error("API 에러!!! - updatePet", response?.data?.error)
      return { isSuccess: false, reason: response?.data?.error }
    }
    return {
      isSuccess: true,
    }
  } catch (error) {
    console.error("catch 에러!!! - updatePet", error)
    return { isSuccess: false, reason: error }
  }
}

interface CreatePetRequestBody extends UpdatePetRequestBody {
  userId: number // 현재 로그인한 유저의 userId
}
interface CreatePetResponse extends GeneralResponse {
  pet: PetDetail
}
interface CreatePetResult {
  isSuccess: boolean // 성공여부
  reason?: string // 실패시, 실패이유
}

/**
 * 반려동물를 생성한다.
 * @param body
 * @returns
 */
export const createPet = async (body: CreatePetRequestBody): Promise<CreatePetResult> => {
  try {
    const response = await axios.post<CreatePetResponse>(`${BASE_URL}/pet`, body)

    if (!response?.data.ok) {
      console.error("API 에러!!! - createPet ♦️", response?.data?.error)
      return { isSuccess: false, reason: response?.data?.error }
    }

    console.log("response.data 🔷", response.data)
    return {
      isSuccess: true,
    }
  } catch (error) {
    console.error("catch 에러!!! - createPet", error)
    return { isSuccess: false, reason: error }
  }
}

interface DeletePetResponse extends GeneralResponse {}
interface DeletePetResult {
  isSuccess: boolean // 성공여부
  reason?: string // 실패시, 실패이유
}

/**
 * 반려동물를 삭제한다.
 * @param id 반려동물 id
 * @returns
 */
export const deletePet = async (id: number): Promise<DeletePetResult> => {
  try {
    const response = await axios.delete<DeletePetResponse>(`${BASE_URL}/pet/${id}`)

    if (!response?.data.ok) {
      console.error("API 에러!!! - deletePet ♦️", response?.data?.error)
      return { isSuccess: false, reason: response?.data?.error }
    }

    return {
      isSuccess: true,
    }
  } catch (error) {
    console.error("catch 에러!!! - deletePet", error)
    return { isSuccess: false, reason: error }
  }
}
