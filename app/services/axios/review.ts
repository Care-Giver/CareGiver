import { Rating } from "#models"
import axios from "axios"
import { BASE_URL, CONFIG } from "./axios-config"

// TODO: 현재 유저의 id 어떻게 얻어오는지?
const USER_ID = 7

interface PostVisitingReviewParams {
  visitingId: number
  bookingId: number
  desc: string
  star: Rating
  images: string[]
}

interface PostVisitingReviewResponse {
  id: number
  createAt: string
  updatedAt: string
}

export const postVisitingReview = async (params: PostVisitingReviewParams) => {
  try {
    const _params = {
      id: USER_ID,
      ...params,
    }
    const response = await axios.post<PostVisitingReviewResponse>(
      `${BASE_URL}/visiting-review/visiting`,
      _params,
      CONFIG,
    )

    // ! 응답 성공 / 실패 여부 ...? (스웨거에 확인 과정 없음)
  } catch (error) {
    console.error("[review axios] >>>", error)
  }
}
