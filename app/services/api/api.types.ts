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

//? /reserve/creche/{user id} response props
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

export interface FormattedCrechePetsitterReserve {
  serviceType: "creche" | "visit"
  caregiverType: "petsitter" | "trainer"
  reserveId: number
  startDate: string
  endDate: string
}

export type getCrechePetsittersResult =
  | { kind: "ok"; reserves: FormattedCrechePetsitterReserve[] }
  | GeneralApiProblem

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem
