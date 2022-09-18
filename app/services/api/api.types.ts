import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem

export interface Creche {
  id: number
  createAt: string
  updatedAt: string
  title: string
  address: string
  location: string
  desc: string
  maxUnit: number
  handleType: string
  roomType: string
  facilities: string
  services: string
  images: string
  hiredNumber: number
  star: number
  CareGiverId: number
  dist: string
}

/* {
"id": 1,
"createAt": "2022-08-14T09:24:01.677Z",
"updatedAt": "2022-09-16T08:36:04.302Z",
"title": "ENFP의 친화력",
"address": "경기도 안산시 상록구 한양대학로 55 제 5공학관 지하1층 창업3실",
"location": "0101000020E6100000052E64B566B55F406770E70425A64240",
"desc": "창업실에서 펫시팅 부업도 합니다!",
"maxUnit": 3,
"handleType": "{소형,중형,대형}",
"roomType": "아파트",
"facilities": "산책로",
"services": "산책,목욕",
"images": "image1,image2",
"hiredNumber": 0,
"star": 0,
"CareGiverId": 2,
"dist": "6735.16"
}, */

export type GetCrecheResult = { kind: "ok"; creche: Creche } | GeneralApiProblem
