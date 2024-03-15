import { Rating } from "../../models"
import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"
import { PickerImage } from "../../components"
import { ratingRound } from "../../utils/format"
import { alertModal } from "../../utils/alert-modal"
import { Pet } from "./pets"

// TODO: 현재 유저의 id 어떻게 얻어오는지?
const USER_ID = 7

/**
 * postVisitingReview 함수의 인자 파라미터
 * :: 이미지 업로드를 위해 images는 PickerImage[] 형태를 갖는다.
 */
interface PostReviewParams {
  visitingId?: number
  crecheId?: number
  bookingId: number
  desc: string
  star: Rating
  images: PickerImage[]
}

/**
 * [POST] visiting-review/visiting api의 request params
 * :: postVisitingReview 함수 내부에서 사용된다.
 */
interface PostReviewToServerParams {
  userId: number
  visitingId?: number
  crecheId?: number
  bookingId: number
  desc: string
  star: Rating
  images: string[]
}

export interface Review {
  id: number
  createAt: string
  updatedAt: string
  desc: string
  star: number
  images: string[]
  hasReply: boolean
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
interface PostReviewResponse extends GeneralResponse {
  id: number
  createAt: string
  updatedAt: string
}

interface GetVisitingReviewResponse extends GeneralResponse {
  visitingReview: Review | null
}

interface GetCrecheReviewResponse extends GeneralResponse {
  crecheReview: Review | null
}

/**
 * AWS 서버에 이미지를 업로드할 때 호출하는 함수
 * @param images 서버에 업로드할 이미지 주소 배열
 * @returns 서버에 업로드된 Urls
 */
export const uploadURIS = async (images: PickerImage[]): Promise<string[] | []> => {
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
      // console.info("[uploads response.data] >>>", response.data)
      return response.data.urls
    } else {
      // throw new Error("")
      alertModal(
        "이미지 업로드 실패",
        "알 수 없는 이유로 이미지 업로드에 실패했습니다. 잠시 뒤 다시 시도해주세요.",
      )
      return []
    }
  } catch (error) {
    console.error("[axios/review.ts - Upload error] >>>", error)
    alertModal(
      "이미지 업로드 실패 (axios)",
      "알 수 없는 이유로 이미지 업로드에 실패했습니다. 잠시 뒤 다시 시도해주세요.",
    )
    return []
  }
}

/**
 * 방문 서비스 리뷰를 서버에 등록할 때 실행하는 함수
 * @param params 방문 리뷰를 post하기 위해 필요한 params
 * @returns post 성공 | 실패 여부
 */
export const postVisitingReview = async (
  userId: number,
  params: PostReviewParams,
): Promise<boolean> => {
  // ! undefined 추가 안할 시 에러 뜸 ... 왜?
  try {
    // * 서버에 이미지를 upload 하는 과정
    const postParams: PostReviewToServerParams = {
      userId: userId,
      ...params,
      images: [],
    }

    const AwsUris = await uploadURIS(params.images)

    if (AwsUris) {
      postParams.images = [...AwsUris]

      const response = await axios.post<PostReviewResponse>(
        `${BASE_URL}/visiting-review/visiting`,
        postParams,
      )

      if (response.data.ok) {
        return true
      }
      alertModal(
        "리뷰 작성에 실패했습니다.",
        "알 수 없는 이유로 리뷰 작성에 실패했습니다. 잠시 뒤 다시 시도해주세요.",
      )
    }
    return false
  } catch (error) {
    console.error("[review axios] >>>", error)
    alertModal(
      "리뷰 작성에 실패했습니다. (axios)",
      "알 수 없는 이유로 리뷰 작성에 실패했습니다. 잠시 뒤 다시 시도해주세요.",
    )
    return false
  }
}

export const postCrecheReview = async (params: PostReviewParams): Promise<boolean | undefined> => {
  try {
    const postParams: PostReviewToServerParams = {
      userId: USER_ID,
      ...params,
      images: [],
    }

    const AwsUris = await uploadURIS(params.images)

    if (AwsUris) {
      postParams.images = [...AwsUris]

      const response = await axios.post<PostReviewResponse>(
        `${BASE_URL}/creche-review/creche`,
        postParams,
      )

      if (response.data.ok) {
        return true
      }
    }
    throw new Error("[PostVisitingReview] image upload | review post 과정 오류")
  } catch (error) {
    console.error("[creche review axios] >>>", error)
    return false
  }
}

/**
 * (방문) bookingId에 해당하는 예약에 대해 현재 유저가 작성한 리뷰 객체를 가져온다.
 * @param bookingId 원하는 방문 서비스 리뷰의 예약 id (= visitingBookingId)
 * @returns 리뷰 객체. 만약 null을 리턴하면 잘못된 접근이므로 스크린에서 별도로 처리한다.
 */
export const getVisitingReview = async (bookingId: number): Promise<Review | null> => {
  try {
    const response = await axios.get<GetVisitingReviewResponse>(
      `${BASE_URL}/visiting-review/visiting-booking/${bookingId}`,
    )

    // console.debug("response.data", response.data)

    if (!response.data.ok) {
      console.error("[getVisitingReview] response error >>>", response.data.error)
      return null
    }

    return {
      ...response.data.visitingReview,
      star: ratingRound(response.data.visitingReview.star),
    }
  } catch (error) {
    console.error("[getVisitingReview] catch error >>>", error)
    return null
  }
}

/**
 * (위탁) bookingId에 해당하는 예약에 대해 현재 유저가 작성한 리뷰 객체를 가져온다.
 * @param bookingId 원하는 위탁 서비스 리뷰의 예약 id (= crecheBookingId)
 * @returns 리뷰 객체. 만약 null을 리턴하면 잘못된 접근이므로 스크린에서 별도로 처리한다.
 */
export const getCrecheReview = async (bookingId: number): Promise<Review | null> => {
  try {
    const response = await axios.get<GetCrecheReviewResponse>(
      `${BASE_URL}/creche-review/creche-booking/${bookingId}`,
    )

    // console.debug("response.data", response.data)

    if (!response.data.ok) {
      console.error("[getCrecheReview] response error >>>", response.data.error)
      return null
    }

    return {
      ...response.data.crecheReview,
      star: ratingRound(response.data.crecheReview.star),
    }
  } catch (error) {
    console.error("[getCrecheReview] catch error >>>", error)
    return null
  }
}

export interface visitingReview extends Review {
  __visitingBooking__: {
    id: number
    createAt: string
    updatedAt: string
    status: string
    reviewStatus: string
    destination: string
    visitingId: number
    request: string
    petToolsLocInfo: string
    avoidFoodInfo: string
    bondingTipsInfo: string
    __pets__: Array<Omit<Pet, "species">>
  }
  __user__: {
    id: number
    nickname: string
    profileImage: string
  }
}
interface GetVisitingReviewsResponse extends GeneralResponse {
  visitingReviews: visitingReview[]
}

type getVisitingReviewsResult =
  | {
      isSuccess: true
      visitingReviews: visitingReview[]
    }
  | {
      isSuccess: false
    }

/**
 * 특정 방문 서비스의 모든 리뷰를 불러온다.
 */
export const getVisitingReviews = async (visitingId: number): Promise<getVisitingReviewsResult> => {
  // ! undefined 추가 안할 시 에러 뜸 ... 왜?
  try {
    const response = await axios.get<GetVisitingReviewsResponse>(
      `${BASE_URL}/visiting-review/visiting/${visitingId}`,
    )

    if (!response.data.ok) {
      alertModal(
        "리뷰 조회 실패했습니다.",
        "알 수 없는 이유로 리뷰 조회에 실패했습니다. 잠시 뒤 다시 시도해주세요.",
      )
      return { isSuccess: false }
    }

    return { isSuccess: true, visitingReviews: response.data.visitingReviews }
  } catch (error) {
    console.error("[review axios] >>>", error)
    alertModal(
      "리뷰 조회에 실패했습니다. (axios)",
      "알 수 없는 이유로 리뷰 조회에 실패했습니다. 잠시 뒤 다시 시도해주세요.",
    )
    return { isSuccess: false }
  }
}
