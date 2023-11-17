import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { PickerImage } from "../../components"

export type PetsitterType = "creche" | "visiting"
export type ServiceType = "creche" | "visiting"
export type Rating = 0 | 1 | 2 | 3 | 4 | 5
// 리뷰 평점 몇점까지있죠? - 5점입니다

/**
 * 현재 유저가 작성한 서비스 리뷰 정보(어느 펫시터에 대한 어떤 내용의 리뷰인지)를 담는 객체
 */
export const ReviewModel = types
  .model("Review")
  .props({
    // ? 리뷰 객체의 id
    id: types.identifierNumber,

    // ? 예약 진행자가 crecheId를 갖는지(위탁) | visitingId를 갖는지(방문)
    petsitterType: types.frozen<PetsitterType>(),
    // ? 예약 진행자가 방문 펫시터면 visitingId 값 | 위탁 펫시터면 crecheId 값
    petsitterId: types.number,
    // ? 예약 내역이 crecheBookingId를 갖는지(위탁) | visitingBookingId를 갖는지(방문)
    serviceType: types.frozen<ServiceType>(),
    // ? 리뷰 평점
    rating: types.frozen<Rating>(),
    // ? 리뷰 내용
    description: types.string,
    // ? 리뷰 첨부 사진
    images: types.optional(types.frozen<PickerImage[]>(), []),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type ReviewType = Instance<typeof ReviewModel>
export interface Review extends ReviewType {}
type ReviewSnapshotType = SnapshotOut<typeof ReviewModel>
export interface ReviewSnapshot extends ReviewSnapshotType {}
export const createReviewDefaultModel = () => types.optional(ReviewModel, {})
