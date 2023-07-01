import { Rating } from "#models"
import axios from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"
import { PickerImage } from "#components"

// TODO: 현재 유저의 id 어떻게 얻어오는지?
const USER_ID = 7

/**
 * postVisitingReview 함수의 인자 파라미터
 * :: 이미지 업로드를 위해 images는 PickerImage[] 형태를 갖는다.
 */
interface PostVisitingReviewParams {
  visitingId: number
  bookingId: number
  desc: string
  star: Rating
  images: PickerImage[]
}

/**
 * [POST] visiting-review/visiting api의 request params
 * :: postVisitingReview 함수 내부에서 사용된다.
 */
interface PostVisitingReviewServerParams {
  visitingId: number
  bookingId: number
  desc: string
  star: Rating
  images: string[]
}

/**
 * [POST] uploads/multiple api의 응답 형식
 */
interface URLsResponse extends GeneralResponse {
  urls: string[]
}

/**
 * [POST] visiting-review/visiting api의 응답 형식
 */
interface PostVisitingReviewResponse extends GeneralResponse {
  id: number
  createAt: string
  updatedAt: string
}

/**
 * AWS 서버에 이미지를 업로드할 때 호출하는 함수
 * @param images 서버에 업로드할 이미지 주소 배열
 * @returns 서버에 업로드된 Urls
 */
export const uploadURIS = async (images: PickerImage[]): Promise<string[]> => {
  try {
    const formData = new FormData()

    //@ts-ignore
    images.forEach((image) => formData.append("files", image))

    const response = await axios.post<URLsResponse>(`${BASE_URL}/uploads/multiple`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    if (response.data.ok) {
      console.info("[uploads response.data] >>>", response.data)
      return response.data.urls
    } else {
      throw new Error("")
    }
  } catch (error) {
    console.error("[axios/review.ts - Upload error] >>>", error)
    return null
  }
}

/**
 * 방문 서비스 리뷰를 서버에 등록할 때 실행하는 함수
 * @param params 방문 리뷰를 post하기 위해 필요한 params
 * @returns post 성공 | 실패 여부
 */
export const postVisitingReview = async (params: PostVisitingReviewParams): Promise<boolean> => {
  try {
    // * 서버에 이미지를 upload 하는 과정
    const uploadParams: PostVisitingReviewServerParams = {
      ...params,
      images: [],
    }
    uploadURIS(params.images).then(async (res) => {
      // ? 서버에서 정상적으로 Uri를 반환한 경우
      if (res) {
        uploadParams.images = [...res]
        // * 방문 리뷰를 서버에 post하는 과정
        const postParams = {
          id: USER_ID,
          ...uploadParams,
        }
        console.debug("postParmas:", postParams)
        const _response = await axios.post<PostVisitingReviewResponse>(
          `${BASE_URL}/visiting-review/visiting`,
          postParams,
          CONFIG,
        )

        console.log("_response.data", _response.data)

        // ! 응답 성공 / 실패 여부 ...? (스웨거에 확인 과정 없음)
        if (_response.data.ok) {
          return true
        } else {
          throw new Error("")
        }
      }
      // ? 서버에서 uri를 정상적으로 반환하지 못 한 경우
      else {
        throw new Error("")
      }
    })
  } catch (error) {
    console.error("[review axios] >>>", error)
    return false
  }
}
