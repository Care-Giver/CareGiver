import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"

export interface User {
  id: number
  name: string
}

//? /reserve/creche/{id} 결과
// {
//   "id": 1,
//   "createAt": "2022-10-07T08:25:00.699Z",
//   "updatedAt": "2022-10-10T04:44:56.123Z",
//   "status": "Waiting",
//   "services": [
//     "산책"
//   ],
//   "crecheId": 1,
//   "startDay": "2022-10-06T15:00:00.000Z",
//   "endDay": "2022-10-08T15:00:00.000Z",
//   "reviewStatus": "Waiting",
//   "request": "잘 부탁드립니다."
// }

//? /reserve/creche?userId={user id} response props
export interface ReserveCrecheResponse {
  id: number
  createAt: string
  updatedAt: string
  status: string
  services: Array<string>
  crecheId: number
  startDay: string
  endDay: string
  reviewStatus: string
  request: string
}

// ? /reserve/pet-sitter?userId={user id} response props
export interface ReservePetSitterResponse {
  id: number
  createAt: string
  updatedAt: string
  status: string
  services: Array<string>
  petSitterId: number
  startTime: string
  endTime: string
  reviewStatus: string
  request: string
}

export interface FormattedPetsitterReserve {
  serviceType: "creche" | "visit"
  caregiverType: "petsitter" | "trainer"
  reserveId: number
  startDate: string
  endDate: string
}

enum UserRole {
  CLIENT = "CLIENT",
  ADMIN = "ADMIN",
}

enum Sex {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export interface IUpdateUserNicknameRequest {
  // 'sex',
  // 'birthday',
  // 'desc',
  // 'address',
  // 'profileImage',
  sex: Sex
  birthday: string
  desc?: string
  address?: string
  profileImage?: string

  //   nickname: string;
  // email: string;
  // password?: string;
  // role: UserRole;
  // phoneNumber: string;
  // provider: string;
  // refreshToken: string;
  // isCertified: boolean;
  // pushToken?: string;
  // maxDistance?: number;
}
export interface IUpdateUserNicknameResponse {}

// ? 위탁 - 펫시터 API (/reserve/creche) 요청 결과
export type GetCrechePetsittersResult =
  | { kind: "ok"; reserves: FormattedPetsitterReserve[] }
  | GeneralApiProblem

// ? 방문 - 펫시터 API (/reserve/pet-sitter) 요쳥 결과
export type GetVisitPetsitterResult =
  | { kind: "ok"; reserves: FormattedPetsitterReserve[] }
  | GeneralApiProblem

// * pet

interface PetProps {
  age: number
  birthday: string
  createAt: string
  id: number
  image: string
  isNeutralizated: boolean
  name: string
  petType: "소형" | "중형" | "대형"
  sex: "male" | "female"
  speciesId: number
  specifics: string
  updatedAt: string
  weight: number
}
export interface PetResultProps {
  familyId: number
  pet: PetProps
}

// ? /pets response props
export interface PetsResponse {
  petResults: PetResultProps[]
}

export interface FormattedPetData {
  // id: number
  petId: number
  name: string
  image: string
  age: number
  sex: "male" | "female"
  petType: "소형" | "중형" | "대형"
  species: string
  familyName: "Dog" | "Cat"
}

export type GetMyPetResult = { kind: "ok"; pets: FormattedPetData[] } | GeneralApiProblem

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem
