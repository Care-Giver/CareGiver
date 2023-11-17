import { Instance, SnapshotOut, types, destroy } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { ReviewModel, ServiceType, Rating } from "../review/review"
import { PickerImage } from "../../components"

interface ReviewData {
  // ? 예약 진행자가 crecheId를 갖는지(위탁) | visitingId를 갖는지(방문)
  petsitterType: ServiceType
  // ? 예약 진행자가 방문 펫시터면 visitingId값을, 위탁 펫시터면 crecheId값을 저장
  petsitterId: number
  // ? 예약 내역이 crecheBookingId를 갖는지(위탁) | visitingBookingId를 갖는지(방문)
  serviceType: ServiceType
  // ? 리뷰 평점
  rating: Rating
  // ? 리뷰 내용
  description: string
  // ? 리뷰 첨부 사진
  images: PickerImage[]
}

// TODO: interface로 어떻게 ..? type으로 하면 모델로 입력받아야 해서 코드가 복잡해짐
// type ReviewData = Omit<Review, "id">

export interface ReviewContent {
  // ? 리뷰 평점
  rating: Rating
  // ? 리뷰 내용
  description: string
  // ? 리뷰 첨부 사진
  images: PickerImage[]
}

/**
 * 현재 유저가 작성한 리뷰 객체들의 배열
 */
export const ReviewStoreModel = types
  .model("ReviewStore")
  .props({
    reviews: types.optional(types.array(ReviewModel), []),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    // get reviewById(id) {
    //   return self.reviews.find((review) => review.id === id)
    // },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    /**
     * reviews에 새로운 review 객체 추가
     * @param review 추가할 리뷰 정보 객체
     * @returns 새로 추가된 리뷰 객체 model의 id값
     */
    addReview: (review: ReviewData): number => {
      const id =
        self.reviews.reduce((maxId, currentReview) => Math.max(maxId, currentReview.id), 0) + 1
      const newReview = ReviewModel.create({
        id,
        petsitterType: review.petsitterType,
        petsitterId: review.petsitterId,
        serviceType: review.serviceType,
        rating: review.rating,
        description: review.description,
        images: review.images,
      })

      self.reviews.push(newReview)
      return id
    },
    // removeReview: (id: number) => {
    //   self.reviews = self.reviews.filter((value) => value.id !== id)
    // },

    /**
     * 전달받은 id에 해당되는 리뷰 객체를 reviews에서 삭제
     * (리뷰를 백엔드에 post한 이후에 사용된다.)
     * @param id 삭제할 리뷰 객체의 id
     */
    removeReview: (id: number) => {
      const review = self.reviews.find((review) => review.id === id)
      destroy(review)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    /**
     * 리뷰 객체의 내용을 수정하는 메서드
     * @param id 수정할 리뷰 객체의 id
     * @param reviewContent 수정할 리뷰 내용
     */
    setReview: (id: number, reviewContent: ReviewContent) => {
      const findReview = self.reviews.find((review) => review.id === id)
      const petsitterType = findReview.petsitterType
      const petsitterId = findReview.petsitterId
      const serviceType = findReview.serviceType

      // console.info("[review store] petsitterId >>>", petsitterId)

      self.removeReview(id) // ! 이거 actions 분리 안 하면 안되더라구요
      const newReview = ReviewModel.create({
        id,
        petsitterType,
        petsitterId,
        serviceType,
        rating: reviewContent.rating,
        description: reviewContent.description,
        images: reviewContent.images,
      })
      self.reviews.push(newReview)
    },
  }))
  .actions((self) => ({
    /**
     *
     * @param petsitterType 예약 진행자(펫시터)의 서비스 타입 (creche | visiting)
     * @param serviceType 예약 내역의 서비스 타입 (creche | visiting)
     * @param petsitterId 예약 진행자(펫시터)의 id (crecheId | visitingId)
     * @returns 매칭되는 리뷰 객체가 존재하면 해당 리뷰 객체 model의 id를, 존재하지 않으면 리뷰 객체 model을 새로 추가하여 생성된 id를 리턴
     */
    getReviewId: (
      petsitterType: ServiceType,
      serviceType: ServiceType,
      petsitterId: number,
    ): number => {
      // ? 매칭되는 리뷰 객체를 찾는다.
      const findResult = self.reviews.find(
        (review) =>
          review.petsitterType === petsitterType &&
          review.serviceType === serviceType &&
          review.petsitterId === petsitterId,
      )

      // ? 매칭되는 리뷰 객체가 존재하지 않으면, 새로운 객체를 생성하여 배열에 추가하고 해당 객체의 id를 반환한다.
      if (!findResult) {
        const id = self.addReview({
          petsitterType,
          petsitterId,
          serviceType,
          rating: 0,
          description: "",
          images: [],
        })
        return id
      }

      return findResult.id
    },
  }))

type ReviewStoreType = Instance<typeof ReviewStoreModel>
export interface ReviewStore extends ReviewStoreType {}
type ReviewStoreSnapshotType = SnapshotOut<typeof ReviewStoreModel>
export interface ReviewStoreSnapshot extends ReviewStoreSnapshotType {}
export const createReviewStoreDefaultModel = () => types.optional(ReviewStoreModel, {})
