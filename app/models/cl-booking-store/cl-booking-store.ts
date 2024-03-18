import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"

/**
 * TypeScript 힌트를 위해, Model 에 대한 설명을 여기에 작성해주세요.
 */
export const ClBookingStoreModel = types
  .model("ClBookingStore")
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type ClBookingStoreType = Instance<typeof ClBookingStoreModel>
export interface ClBookingStore extends ClBookingStoreType {}
type ClBookingStoreSnapshotType = SnapshotOut<typeof ClBookingStoreModel>
export interface ClBookingStoreSnapshot extends ClBookingStoreSnapshotType {}
export const createClBookingStoreDefaultModel = () => types.optional(ClBookingStoreModel, {})
