import axios from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"
import { Sex } from "./user"
import { CareGiverEntity, VisitingReviewEntity } from "./entity.types"

export enum SearchResultSortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

interface VisitingsSearchRequest {
  page: number
  lat: number // 위도
  lng: number // 경도
  startTime: string // "2023-07-27T10:40:59"
  endTime: string //"2023-07-27T11:40:59"
  petIds: number[] //[1, 2, 3]
  radius: number //10
  sortBy: string // "distance"
  sortOrder: SearchResultSortOrder
  gender: Sex // "FEMALE"
  services: number[] //[1, 2]
  amenities: number[] // [1, 2]
  certifiedOnly: boolean //true
}

enum VisitingHandleType {
  SMALL = "소형",
  MEDIUM = "중형",
  LARGE = "대형",
}

type ExtraSizeFee = {
  SMALL: number
  MEDIUM: number
  LARGE: number
}

type VisitingService = {
  id: number
  createAt: string
  updatedAt: string
  name: string

  /* {
    id: 1
    createAt: "2023-01-01T11:00:00"
    updatedAt: "2023-01-01T11:00:00"
    name: "산책하기"
    }, */
}

type VisitingAmenity = VisitingService

type Coordinates = [number, number] //[126.834393833, 37.298004735]

interface LocationResponse {
  coordinates: Coordinates
  type: "Point"
}

interface CareGiverRelatedData {
  __careGiver__: CareGiverEntity
  __visitingReviews__: VisitingReviewEntity[]
  // eslint-disable-next-line camelcase
  __has_careGiver__: boolean // true,
  // eslint-disable-next-line camelcase
  __has_crecheReviews__: boolean // true,
}

interface VisitingRelatedData extends CareGiverRelatedData {
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
  handleType: VisitingHandleType //"대형, 중형, 소형"
  images: string[] // ["이미지 주소"]
  extraSizeFee: ExtraSizeFee // "{SMALL:0, MEDIUM:0, LARGE:0}"
  promoted: false
  responseRate: number[] // [0.25, 1, 4]
  acceptRate: number[] //[0.25, 1, 4]
  serviceVisiting: VisitingService[]
  visitingAmenities: VisitingAmenity[]
}

interface UserRelatedData {
  isFavorite: boolean //false,
  reviewCount: number // 6,
  userNickname: string //"지우",
  userProfile: any // null, //TODO: userProfile 타입 적용할 것
}

export interface Visiting extends UserRelatedData {
  visiting: VisitingRelatedData
}

interface VisitingsSearchRequestResponse extends GeneralResponse {
  visitings: Visiting[]
  totalItems: number // 4
  totalpages: number // 1
}

/**
 * 조건에 맞는 방문 펫시터를 검색한다
 * @returns {Promise<number>} 생성된 위탁장소의 id (crecheId) 를 리턴한다.
 */
export const getVisitingsSearch = async (
  requestBody: VisitingsSearchRequest,
): Promise<Visiting[]> => {
  try {
    // console.log("creche", creche)
    const response = await axios.post<VisitingsSearchRequestResponse>(
      `${BASE_URL}/visitings/search`,
      requestBody,
      CONFIG,
    )
    // console.log("response >>>", response)
    // console.log("response.data >>>", response.data.visitings)

    if (!response.data.ok) {
      const error = response.data.error
      console.error("response.data.error 에러!!!", error)
      // @ts-ignore
      return []
    }

    return response.data.visitings
  } catch (error) {
    console.error("catch 에러!!!", error)
    return []
  }
}
