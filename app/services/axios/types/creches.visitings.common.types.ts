/* eslint-disable camelcase */
import { Sex } from "../user"
import { CareGiverEntity, CrecheReviewEntity } from "./entity.types"

export enum SearchResultSortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export interface SearchRequest {
  page: number
  lat: number // 위도
  lng: number // 경도
  petIds: number[] //[1, 2, 3]
  radius: number //10
  sortBy: string // "distance"
  sortOrder: SearchResultSortOrder
  gender: Sex // "FEMALE"
  services: number[] //[1, 2]
  amenities: number[] // [1, 2]
  certifiedOnly: boolean //true
}

// DB 정의 그대로임
// TODO: HandleType pet.ts 와 pet-store 에 있는 HandleType 바꿀 것
export enum HandleType {
  SMALL = "Small",
  MEDIUM = "Medium",
  LARGE = "Large",
}

type ExtraSizeFee = {
  Small: number
  Medium: number
  Large: number
}

export type Service = {
  id: number
  createAt: string
  updatedAt: string
  name: string
  desc?: string

  /* {
      "id": 2,
      "createAt": "2023-07-03T17:25:01.840Z",
      "updatedAt": "2023-07-03T17:25:01.840Z",
      "name": "실내 놀이"
      },*/
}

export type Amenity = {
  id: number
  createAt: string
  updatedAt: string
  name: string
  desc?: string
}

type Coordinates = [number, number] //[126.834393833, 37.298004735]

interface LocationResponse {
  coordinates: Coordinates
  type: "Point"
}

interface CareGiverRelatedData {
  __careGiver__: CareGiverEntity
  __crecheReviews__: CrecheReviewEntity[]
  __has_careGiver__: boolean // true,
  __has_crecheReviews__: boolean // true,
}

export interface Petsitter {
  id: number //1
  createAt: string //"2023-01-01T11:00:00"
  updatedAt: string // "2023-01-01T11:00:00"
  title: string // "ENFP의 친화력"
  desc: string //"강아지 3년 기른 경력으로 보살핍니다."
  address: string // "경기도 안산시 사동 한양대학로 55" //! 필수 값입니다. 실제 주소를 입력해야 합니다. 엠티 스트링 불가능.
  detailAddress: string // 상세주소. //! "위탁" 펫시터만 입력할 것!
  defaultFee: number //10000
  hiredNumber: number //132
  star: number //5
  /* location: string // "(127, 38)" */
  location: LocationResponse
  dogMaxUnit: number // 필수값입니다. 없을 경우 0 기입.
  catMaxUnit: number // 필수값입니다. 없을 경우 0 기입.
  handleType: HandleType[]
  images: string[] // ["이미지 주소"]
  extraSizeFee: ExtraSizeFee // "{SMALL:0, MEDIUM:0, LARGE:0}"
  promoted: false
  responseRate: number[] // [0.25, 1, 4]
  acceptRate: number[] //[0.25, 1, 4]
}

export interface CareGiverPetsitter extends CareGiverRelatedData, Petsitter {}

export interface UserRelatedData {
  isFavorite: boolean //false,
  reviewCount: number // 6,
  userNickname: string //"지우",
  userProfile: any // null, //TODO: userProfile 타입 적용할 것
}
