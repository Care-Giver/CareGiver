import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import {
  getVisitingAvailableTimes,
  groupedVisitingAvailableTimesByDate,
} from "../../services/axios/visiting-available-time"

/**
 * TypeScript 힌트를 위해, Model 에 대한 설명을 여기에 작성해주세요.
 */
export const VisitingAvailableTimesModel = types
  .model("VisitingAvailableTimes")
  .props({
    visitingAvailableTimes: types.optional(
      types.frozen<groupedVisitingAvailableTimesByDate[] | null>(),
      null,
    ),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get showAllVisitingAvailableTimes() {
      return self.visitingAvailableTimes
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setResponse(response: groupedVisitingAvailableTimesByDate[]) {
      self.visitingAvailableTimes = response
    },
  }))
  .actions((self) => ({
    async setAllVisitingAvailableTimes(visitingId: number) {
      // const visitingAvailableTimes = await getvisitingAvailableTimes(visitingId)
      // self.visitingAvailableTimes = visitingAvailableTimes
      await getVisitingAvailableTimes(visitingId)
        .then((res) => {
          self.setResponse(res)
          console.log("model: ", res)
        })
        .catch((res) => console.error(res))
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type VisitingAvailableTimesType = Instance<typeof VisitingAvailableTimesModel>
export interface VisitingAvailableTimes extends VisitingAvailableTimesType {}
type VisitingAvailableTimesSnapshotType = SnapshotOut<typeof VisitingAvailableTimesModel>
export interface VisitingAvailableTimesSnapshot extends VisitingAvailableTimesSnapshotType {}
export const createVisitingAvailableTimesDefaultModel = () =>
  types.optional(VisitingAvailableTimesModel, {})
