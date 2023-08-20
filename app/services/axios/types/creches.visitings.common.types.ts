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
  startDate: string // "2023-07-29T00:00:00"
  endDate: string // "2023-07-30T00:00:00"
  petIds: number[] //[1, 2, 3]
  radius: number //10
  sortBy: string // "distance"
  sortOrder: SearchResultSortOrder
  gender: Sex // "FEMALE"
  services: number[] //[1, 2]
  amenities: number[] // [1, 2]
  certifiedOnly: boolean //true
}

enum PetHandleType {
  SMALL = "소형",
  MEDIUM = "중형",
  LARGE = "대형",
}

type ExtraSizeFee = {
  SMALL: number
  MEDIUM: number
  LARGE: number
}

export type Service = {
  id: number
  createAt: string
  updatedAt: string
  name: string

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
}

type Coordinates = [number, number] //[126.834393833, 37.298004735]

interface LocationResponse {
  coordinates: Coordinates
  type: "Point"
}

interface CareGiverRelatedData {
  __careGiver__: CareGiverEntity
  __crecheReviews__: CrecheReviewEntity[]
  // eslint-disable-next-line camelcase
  __has_careGiver__: boolean // true,
  // eslint-disable-next-line camelcase
  __has_crecheReviews__: boolean // true,
}

export interface CommonData extends CareGiverRelatedData {
  id: number //1
  createAt: string //"2023-01-01T11:00:00"
  updatedAt: string // "2023-01-01T11:00:00"
  title: string // "ENFP의 친화력"
  desc: string //"강아지 3년 기른 경력으로 보살핍니다."
  address: string // "경기도 안산시 사동 한양대학로 55"
  defaultFee: number //10000
  hiredNumber: number //132
  star: number //5
  /* location: string // "(127, 38)" */
  location: LocationResponse
  maxUnit: number //3
  handleType: PetHandleType[] //"대형, 중형, 소형"
  images: string[] // ["이미지 주소"]
  extraSizeFee: ExtraSizeFee // "{SMALL:0, MEDIUM:0, LARGE:0}"
  promoted: false
  responseRate: number[] // [0.25, 1, 4]
  acceptRate: number[] //[0.25, 1, 4]
}

export interface UserRelatedData {
  isFavorite: boolean //false,
  reviewCount: number // 6,
  userNickname: string //"지우",
  userProfile: any // null, //TODO: userProfile 타입 적용할 것
}
