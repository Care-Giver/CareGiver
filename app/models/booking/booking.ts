import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const BookingModel = types
  .model("Booking")
  .props({
    id: types.identifierNumber,
    // ? 위탁 ("creche") | 방문 ("visit")
    serviceType: types.union(types.literal("creche"), types.literal("visit")),
    caregiverType: types.union(types.literal("petsitter"), types.literal("trainer")),
    // ? 위탁 예약이면 crecheId | 방문 예약이면 petSitterId 값이 저장됨
    reserveId: types.number,
    startDate: types.string,
    endDate: types.string,
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type BookingType = Instance<typeof BookingModel>
export interface Booking extends BookingType {}
type BookingSnapshotType = SnapshotOut<typeof BookingModel>
export interface BookingSnapshot extends BookingSnapshotType {}
export const createBookingDefaultModel = () => types.optional(BookingModel, {})
