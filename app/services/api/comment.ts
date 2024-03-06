/* eslint-disable camelcase */
import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"
import { alertModal } from "../../utils/alert-modal"

export interface CreateCommentInput {
  userId: number
  visitingId: number
  desc: string
  //TODO 기획상 '공개'만 가능
  isPrivate: false
}
export interface CreateCommentResponse extends GeneralResponse {
  visitingCommentId: number
}
type CreateCommentResult =
  | {
      isSuccess: true // 성공
      visitingCommentId?: number // 성공시, 생성된 결제 객체의 id
    }
  | {
      isSuccess: false // 실패
      reason?: string // 실패시, 실패이유
    }

/**
 * 댓글 객체를 생성합니다.
 */
export const createVisitingComment = async (
  body: CreateCommentInput,
): Promise<CreateCommentResult> => {
  try {
    console.log(body)
    const response = await axios.post<CreateCommentResponse>(`${BASE_URL}/comment/visiting`, body)

    if (!response.data.ok) {
      return {
        isSuccess: false,
        reason: response.data?.error.message,
      }
    }

    return {
      isSuccess: true,
      visitingCommentId: response.data.visitingCommentId,
    }
  } catch (error) {
    console.error("catch 에러!!!", error)
    return {
      isSuccess: false,
      reason: error?.message,
    }
  }
}

/**
 * 주어진 id 에 해당하는 댓글 객체를 불러옵니다.
 */

export interface CommentatorType {
  id: number
  nickname: string
  profileImage: string
}
export interface CommentColmns {
  id: number
  createAt: string
  updatedAt: string
  desc: string
  hasReply: boolean
  //TODO 기획상 '공개'만 가능
  isPrivate: false
  visitingId: number
  //TODO resBody 소통 후 type명시
  visitingCommentReply: any
  __commentator__: CommentatorType
}
interface GetCommentsResponse extends GeneralResponse {
  visitingComments: CommentColmns[]
  totalpages: number
  totalItems: number
}

type GetCommentsInputResult =
  | {
      isSuccess: true // 성공
      visitingComments?: CommentColmns[]
      totalpages?: number
      totalItems?: number
    }
  | {
      isSuccess: false // 실패
      reason?: string // 실패시, 실패이유
    }
export const getVisitingComments = async (visitingId: number): Promise<GetCommentsInputResult> => {
  try {
    const response = await axios.get<GetCommentsResponse>(
      `${BASE_URL}/comment/visiting/${visitingId}`,
    )

    if (!response.data.ok) {
      return {
        isSuccess: false,
        reason: response.data?.error.message,
      }
    }

    return {
      isSuccess: true,
      visitingComments: response.data.visitingComments,
    }
  } catch (error) {
    console.error("catch 에러!!!", error)
    return {
      isSuccess: false,
      reason: error?.message,
    }
  }
}

export interface UpdateVisitingCommentInput {
  desc: string
  //TODO 기획상 '공개'만 가능
  isPrivate: false
}

export type UpdateVisitingCommentResult =
  | { isSuccess: true }
  | { isSuccess: false; reason?: string }
export const updateVisitingComment = async (
  id: number,
  body: UpdateVisitingCommentInput,
): Promise<UpdateVisitingCommentResult> => {
  try {
    const response = await axios.patch<GeneralResponse>(`${BASE_URL}/comment/visiting/${id}`, body)
    if (!response.data.ok) {
      return {
        isSuccess: false,
        reason: response.data?.error.message,
      }
    }

    return {
      isSuccess: true,
    }
  } catch (error) {
    console.error("catch 에러!!!", error)
    return {
      isSuccess: false,
      reason: error?.message,
    }
  }
}
