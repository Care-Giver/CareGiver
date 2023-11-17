import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { ConfirmedBookings, getconfirmedBookings } from "../../services/axios/confirmed-bookings"

/**
 * TypeScript 힌트를 위해, Model 에 대한 설명을 여기에 작성해주세요.
 */
export const ConfirmedBookingsModel = types
  .model("ConfirmedBookings")
  .props({
    confirmedBookings: types.optional(types.frozen<ConfirmedBookings[] | null>(), null),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setResponse(response: ConfirmedBookings[]) {
      self.confirmedBookings = response
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async setAllconfirmedBookings() {
      await getconfirmedBookings()
        .then((res) => self.setResponse(res))
        .catch((res) => console.error(res))
    },
  }))

type ConfirmedBookingsType = Instance<typeof ConfirmedBookingsModel>
export interface ConfirmedBookings extends ConfirmedBookingsType {}
type ConfirmedBookingsSnapshotType = SnapshotOut<typeof ConfirmedBookingsModel>
export interface ConfirmedBookingsSnapshot extends ConfirmedBookingsSnapshotType {}
export const createConfirmedBookingsDefaultModel = () => types.optional(ConfirmedBookingsModel, {})
