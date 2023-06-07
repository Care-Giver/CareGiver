import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { getvisitingAvailableTimes, visitingAvailableTime } from "../../services/axios/calendar"

/**
 * TypeScript 힌트를 위해, Model 에 대한 설명을 여기에 작성해주세요.
 */
export const VisitingAvailableTimesModel = types
  .model("VisitingAvailableTimes")
  .props({
    visitingAvailableTimes: types.optional(types.frozen<visitingAvailableTime[] | null>(), null),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get showAllVisitingAvailableTimes() {
      return self.visitingAvailableTimes
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async setAllVisitingAvailableTimes(visitingId: number) {
      const response = await getvisitingAvailableTimes(visitingId)
      console.log("axios response", response)

      self.visitingAvailableTimes = response
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type VisitingAvailableTimesType = Instance<typeof VisitingAvailableTimesModel>
export interface VisitingAvailableTimes extends VisitingAvailableTimesType {}
type VisitingAvailableTimesSnapshotType = SnapshotOut<typeof VisitingAvailableTimesModel>
export interface VisitingAvailableTimesSnapshot extends VisitingAvailableTimesSnapshotType {}
export const createVisitingAvailableTimesDefaultModel = () =>
  types.optional(VisitingAvailableTimesModel, {})
