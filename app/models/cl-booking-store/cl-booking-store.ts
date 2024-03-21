import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { ClBookingModel, ClBooking } from "../cl-booking/cl-booking"
import { BookingStatus, ReviewStatus } from "../../services/api"
import { CurrentBooking } from "../../services/api/booking"
/**
 * TypeScript 힌트를 위해, Model 에 대한 설명을 여기에 작성해주세요.
 */
export const ClBookingStoreModel = types
  .model("ClBookingStore")
  .props({
    allBookings: types.array(ClBookingModel),
    watingBookings: types.array(types.reference(ClBookingModel)),
    currentBookings: types.array(types.reference(ClBookingModel)),
    previousBookings: types.array(types.reference(ClBookingModel)),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    getBooking(bookingId) {
      const targetBooking = self.watingBookings.find(
        (booking) => booking.visitingBookingId === bookingId,
      ) as ClBooking

      return targetBooking
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    /**
     * 첫 렌더링시 모든 예약을 불러옵니다.
     */
    fetchAll(bookings: ClBooking[]) {
      self.setProp("allBookings", bookings)
      self.allBookings[0].completeReview()
    },
    /**
     * 특정 예약에 대해서 수락되었을때 "Wating" 상태를 "Current"상태로 변경합니다.
     */
    waitingsToCurrents(bookingId: number) {
      const targetBooking = self.getBooking(bookingId)
      self.watingBookings.remove(targetBooking)
      self.currentBookings.push(targetBooking)
    },
    /**
     * 특정 예약에 대해서 완료되었을때 "Current" 상태를 "Previous"상태로 변경합니다.
     */
    currentsToPrevious(bookingId: number) {
      const targetBooking = self.getBooking(bookingId)
      self.currentBookings.remove(targetBooking)
      self.previousBookings.push(targetBooking)
    },
    /**
     * 특정 예약 리뷰 상태를 "Complete"로 변경합니다.
     */
    setCompleteReview(bookingId: number) {
      const targetBooking = self.getBooking(bookingId)
      targetBooking.completeReview()
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type ClBookingStoreType = Instance<typeof ClBookingStoreModel>
export interface ClBookingStore extends ClBookingStoreType {}
type ClBookingStoreSnapshotType = SnapshotOut<typeof ClBookingStoreModel>
export interface ClBookingStoreSnapshot extends ClBookingStoreSnapshotType {}
export const createClBookingStoreDefaultModel = () => types.optional(ClBookingStoreModel, {})
