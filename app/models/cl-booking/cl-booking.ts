import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { BookingStatus, ReviewStatus } from "../../services/api"

/**
 * 보호자 입장에서 사용하게 되는 예약 정보 객체
 */
export const ClBookingModel = types
  .model("ClBooking")
  //TODO frozen 메서드에 대해 고민(검증) 필요
  .props({
    visitingBookingId: types.identifierNumber,
    visitingId: types.number,
    paymentId: types.number,
    startTime: types.Date,
    endTime: types.Date,
    petSitterName: types.string,
    profileImage: types.string,
    desc: types.string,
    status: types.frozen<BookingStatus>(),
    ratings: 0,
    reviewCount: 0,
    isCanceled: false,
    isFavorite: false,
    reviewStatus: types.optional(types.frozen<ReviewStatus>(), "Waiting"),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    completeReview() {
      self.reviewStatus = "Complete"
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type ClBookingType = Instance<typeof ClBookingModel>
export interface ClBooking extends ClBookingType {}
type ClBookingSnapshotType = SnapshotOut<typeof ClBookingModel>
export interface ClBookingSnapshot extends ClBookingSnapshotType {}
export const createClBookingDefaultModel = () => types.optional(ClBookingModel, {})
