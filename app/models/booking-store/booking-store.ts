import { Api } from "#api/api"
import { FormattedCrechePetsitterReserve } from "#api/api.types"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { BookingModel } from "../booking/booking"

/**
 * Model description here for TypeScript hints.
 */
// TODO: bookings에 저장된 예약 내역 시간순으로 정렬 어떻게? (=방문, 위탁 서비스 섞이고 나서 시간순으로 정렬 어떻게?)
export const BookingStoreModel = types
  .model("BookingStore")
  .props({
    bookings: types.optional(types.array(BookingModel), []),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    addBooking: (data: FormattedCrechePetsitterReserve) => {
      const id = self.bookings.reduce((maxId, booking) => Math.max(maxId, booking.id), 0) + 1
      const newBooking = {
        id,
        ...data,
      }
      self.bookings.push(newBooking)
    },
  }))
  .actions((self) => ({
    setBookings: async (userId: number) => {
      const api = new Api()
      api.setup()

      //? 위탁 - 펫시터 예약 불러오기
      const response = await api.getCrechePetsitters(userId)

      if (response.kind === "ok") {
        const crechePetsitterReserves = response.reserves
        crechePetsitterReserves.forEach((value) => {
          self.addBooking(value)
        })
      }

      // TODO: 방문 - 펫시터 예약 불러오기
    },
  }))
// eslint-disable-line @typescript-eslint/no-unused-vars

type BookingStoreType = Instance<typeof BookingStoreModel>
export interface BookingStore extends BookingStoreType {}
type BookingStoreSnapshotType = SnapshotOut<typeof BookingStoreModel>
export interface BookingStoreSnapshot extends BookingStoreSnapshotType {}
export const createBookingStoreDefaultModel = () => types.optional(BookingStoreModel, {})
