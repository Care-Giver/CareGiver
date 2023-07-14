import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { getCrecheDays, crecheAvailableDates } from "../../services/axios/creche-day"
/**
 * TypeScript 힌트를 위해, Model 에 대한 설명을 여기에 작성해주세요.
 */
export const CrecheDayModel = types
  .model("CrecheDay")
  .props({ crecheDays: types.optional(types.frozen<crecheAvailableDates[] | null>(), null) })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setResponse(response: crecheAvailableDates[]) {
      self.crecheDays = response
    },
  }))
  .actions((self) => ({
    async setAllCrecheDays(crecheId: number) {
      // const CrecheDays = await getCrecheDays(crecheId)
      // self.CrecheDays = CrecheDays
      await getCrecheDays(crecheId)
        .then((res) => self.setResponse(res))
        .catch((res) => console.error(res))
    },
  }))
// eslint-disable-line @typescript-eslint/no-unused-vars

type CrecheDayType = Instance<typeof CrecheDayModel>
export interface CrecheDay extends CrecheDayType {}
type CrecheDaySnapshotType = SnapshotOut<typeof CrecheDayModel>
export interface CrecheDaySnapshot extends CrecheDaySnapshotType {}
export const createCrecheDayDefaultModel = () => types.optional(CrecheDayModel, {})
