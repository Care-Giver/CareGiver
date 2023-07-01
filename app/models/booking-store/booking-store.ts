import { Api, FormattedPetsitterReserve } from "#api"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { BookingModel } from "../booking/booking"

/**
 * Model description here for TypeScript hints.
 */
export const BookingStoreModel = types
  .model("BookingStore")
  .props({
    bookings: types.optional(types.array(BookingModel), []),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  // * bookings에 예약 내역을 추가하는 함수
  .actions((self) => ({
    addBooking: (data: FormattedPetsitterReserve) => {
      const id = self.bookings.reduce((maxId, booking) => Math.max(maxId, booking.id), 0) + 1
      const newBooking = {
        id,
        ...data,
      }
      self.bookings.push(newBooking)
    },
  }))
  // * 위탁 | 방문 예약 내역을 불러와서 bookings 데이터를 설정하는 함수
  // ? -> 외부에서는 setBookings만 사용
  .actions((self) => ({
    setBookings: async (userId: number) => {
      const api = new Api()
      api.setup()

      const _bookings = []

      // ? 위탁 - 펫시터 예약 불러오기
      const crecheResponse = await api.getCrechePetsitters(userId)

      if (crecheResponse.kind === "ok") {
        const crechePetsitterReserves = crecheResponse.reserves
        crechePetsitterReserves.forEach((value) => {
          // self.addBooking(value)
          _bookings.push(value)
        })
      }

      // ? 방문 - 펫시터 예약 불러오기
      const visitResponse = await api.getVisitPetsitters(userId)

      if (visitResponse.kind === "ok") {
        const visitPetsitterReserves = visitResponse.reserves
        visitPetsitterReserves.forEach((value) => {
          // self.addBooking(value)
          _bookings.push(value)
        })
      }

      // ? 예약 내역 정렬하기
      _bookings.sort((a, b) => {
        const a_date = new Date(a.startDate).getTime()
        const b_date = new Date(b.startDate).getTime()

        // ? 오름차순 정렬
        if (a_date > b_date) return 1
        else if (a_date === b_date) return 0
        else return -1
      })

      // ? 정렬된 예약 내역들을 순서대로 bookings 에 추가
      _bookings.forEach((value) => self.addBooking(value))
    },
  }))
// eslint-disable-line @typescript-eslint/no-unused-vars

type BookingStoreType = Instance<typeof BookingStoreModel>
export interface BookingStore extends BookingStoreType {}
type BookingStoreSnapshotType = SnapshotOut<typeof BookingStoreModel>
export interface BookingStoreSnapshot extends BookingStoreSnapshotType {}
export const createBookingStoreDefaultModel = () => types.optional(BookingStoreModel, {})
