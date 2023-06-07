import { Api, FormattedPetsitterReserve } from "#api"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { getvisitingAvailableTimes } from "../../services/axios/calendar"

/**
 * Model description here for TypeScript hints.
 */
export interface DateFee {
  startTime: string
  endTime: string
  fee: string
}
export const CalendarModel = types
  .model("CalendarStore")
  .props({
    datefee: types.frozen<DateFee>(),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setCalendarFee: async (visitingId: number) => {
      const crecheResponse = await getvisitingAvailableTimes(visitingId)
      self.datefee = crecheResponse
      console.log(crecheResponse)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type CalendarStoreType = Instance<typeof CalendarModel>
export interface CalendarStore extends CalendarStoreType {}
type CalendarSnapshotType = SnapshotOut<typeof CalendarModel>
export interface CalendarSnapshot extends CalendarSnapshotType {}
export const createCalendarDefaultModel = () => types.optional(CalendarModel, {})
