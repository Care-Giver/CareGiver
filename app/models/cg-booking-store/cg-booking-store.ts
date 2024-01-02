import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { BookingStatus, CgBooking, ConfirmedBooking, RejectedBooking, WaitingBooking } from "#axios"
import _ from "lodash"

/**
 * [케어기버 전용 모델]
 * - 펫시터 모드일 때 사용됩니다.
 * - 로그인한 펫시터 유저의 모든 예약 객체들을 저장하기 위해 사용됩니다.
 * - 데이터의 "갱신"은 이곳에서 이루어지지 않으며,
 * - manage-booking-screen 에서 30초 마다 한 번씩 갱신됩니다.
 */
export const CgBookingStoreModel = types
  .model("CgBookingStore")
  .props({
    allBookings: types.frozen<CgBooking[]>([]),
    confirmedBookings: types.frozen<ConfirmedBooking[]>([]),
    waitingBookings: types.frozen<WaitingBooking[]>([]),
    rejectedBookings: types.frozen<RejectedBooking[]>([]),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get hasWaitingBookings() {
      return self.waitingBookings.length > 0
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    /**
     * getAllBookings 의 response 로 얻어낸 모든 예약 객체를
     * status 에 따라 분류하여 모델에 저장합니다.
     */
    setBookings(value: CgBooking[]) {
      self.setProp("allBookings", value)

      const confirmedBookings = _.filter(
        value,
        (booking) =>
          booking.status === BookingStatus.PENDING || booking.status === BookingStatus.PROCEEDING,
      ) as ConfirmedBooking[]
      self.setProp("confirmedBookings", confirmedBookings)

      const waitingBookings = _.filter(
        value,
        (booking) => booking.status === BookingStatus.WAITING,
      ) as WaitingBooking[]
      self.setProp("waitingBookings", waitingBookings)

      const rejectedBookings = _.filter(
        value,
        (booking) => booking.status === BookingStatus.REJECT,
      ) as RejectedBooking[]
      self.setProp("rejectedBookings", rejectedBookings)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type CgBookingStoreType = Instance<typeof CgBookingStoreModel>
export interface CgBookingStore extends CgBookingStoreType {}
type CgBookingStoreSnapshotType = SnapshotOut<typeof CgBookingStoreModel>
export interface CgBookingStoreSnapshot extends CgBookingStoreSnapshotType {}
export const createCgBookingStoreDefaultModel = () => types.optional(CgBookingStoreModel, {})
