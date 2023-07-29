import axios, { AxiosError, AxiosResponse } from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"
import { Sex } from "./user"

interface VisitingsSearchRequest {
  page: number
  lat: number
  lng: number
  startTime: string // "2023-07-27T10:40:59"
  endTime: string //"2023-07-27T11:40:59"
  petIds: number[] //[1, 2, 3]
  radius: number //10
  sortBy: string // "distance"
  sortOrder: string // "ASC"
  gender: Sex // "FEMALE"
  services: number[] //[1, 2]
  amenities: number[] // [1, 2]
  certifiedOnly: boolean //true
}

interface Visiting {
  id: 1
  createAt: "2023-01-01T11:00:00"
  updatedAt: "2023-01-01T11:00:00"
  title: "ENFP의 친화력"
  desc: "강아지 3년 기른 경력으로 보살핍니다."
  address: "경기도 안산시 사동 한양대학로 55"
  defaultFee: "5,000"
  hiredNumber: 132
  star: 5
  location: "(127, 38)"
  maxUnit: 3
  handleType: "대형, 중형, 소형"
  images: ["이미지 주소"]
  extraSizeFee: "{SMALL:0, MEDIUM:0, LARGE:0}"
  promoted: false
  responseRate: [0.25, 1, 4]
  acceptRate: [0.25, 1, 4]
  serviceVisiting: [
    {
      id: 1
      createAt: "2023-01-01T11:00:00"
      updatedAt: "2023-01-01T11:00:00"
      name: "산책하기"
    },
  ]
  visitingAmenities: [
    {
      id: 1
      createAt: "2023-01-01T11:00:00"
      updatedAt: "2023-01-01T11:00:00"
      name: "노견 케어"
    },
  ]
}

interface VisitingsSearchRequestResponse extends GeneralResponse {
  visitings: Visiting[]
}

/**
 * 조건에 맞는 방문 펫시터를 검색한다
 * @returns {Promise<number>} 생성된 위탁장소의 id (crecheId) 를 리턴한다.
 */
export const getVisitingsSearch = async (requestBody: VisitingsSearchRequest): Promise<number> => {
  try {
    // console.log("creche", creche)
    const response = await axios.post<VisitingsSearchRequestResponse>(
      `${BASE_URL}/visitings/search`,
      requestBody,
      CONFIG,
    )
    // console.log("response >>>", response)
    console.log("response.data >>>", response.data)

    if (!response.data.ok) {
      const error = response.data.error
      console.error("response.data.error 에러!!!", error)
      // @ts-ignore
      return null
    }

    console.log("response.data", response.data)
    return response.data.crecheId
  } catch (error) {
    console.error("catch 에러!!!", error)
    return null
  }
}
