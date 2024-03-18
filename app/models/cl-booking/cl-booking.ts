import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { BookingStatus } from "../../services/api"

/**
 * TypeScript 힌트를 위해, Model 에 대한 설명을 여기에 작성해주세요.
 */
export const ClBookingModel = types
  .model("ClBooking")
  .props({
    visitingBookingId: types.identifierNumber,
    visitingId: types.number,
    paymentId: types.number,
    startTime: types.Date,
    endTime: types.Date,
    petSitterName: types.string,
    ratings: types.number,
    reviewCount: types.number,
    profileImage: types.string,
    desc: types.string,
    status: types.frozen<BookingStatus>(),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type ClBookingType = Instance<typeof ClBookingModel>
export interface ClBooking extends ClBookingType {}
type ClBookingSnapshotType = SnapshotOut<typeof ClBookingModel>
export interface ClBookingSnapshot extends ClBookingSnapshotType {}
export const createClBookingDefaultModel = () => types.optional(ClBookingModel, {})
