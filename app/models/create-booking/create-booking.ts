import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"

/**
 * TypeScript 힌트를 위해, Model 에 대한 설명을 여기에 작성해주세요.
 */
export const CreateBookingModel = types
  .model("CreateBooking")
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type CreateBookingType = Instance<typeof CreateBookingModel>
export interface CreateBooking extends CreateBookingType {}
type CreateBookingSnapshotType = SnapshotOut<typeof CreateBookingModel>
export interface CreateBookingSnapshot extends CreateBookingSnapshotType {}
export const createCreateBookingDefaultModel = () => types.optional(CreateBookingModel, {})
