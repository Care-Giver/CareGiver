import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { getvisitingAvailableTimes, visitingAvailableTimes } from "../../services/axios/calendar"
import { CalendarModel } from "../calendar/calendar"
import { withSetPropAction } from "../extensions/with-set-prop-action"

/**
 * Model description here for TypeScript hints.
 */

export const CalendarStoreModel = types
  .model("CalendarStore")
  .props({
    visitingAvailableTimes: types.optional(types.array(CalendarModel), []),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    addFee: (data: visitingAvailableTimes) => {
      self.visitingAvailableTimes.push({ ...data })
    },
  }))
  .actions((self) => ({
    setCalendarFee: async (visitingId: number) => {
      const _response = await getvisitingAvailableTimes(visitingId)
      _response.forEach((value) => self.addFee(value))
      // _response.forEach((value) => self.visitingAvailableTimes.push(value))
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type CalendarStoreType = Instance<typeof CalendarModel>
export interface CalendarStore extends CalendarStoreType {}
type CalendarSnapshotType = SnapshotOut<typeof CalendarModel>
export interface CalendarSnapshot extends CalendarSnapshotType {}
export const createCalendarDefaultModel = () => types.optional(CalendarModel, {})
