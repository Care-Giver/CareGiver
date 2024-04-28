import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"

/**
 * TypeScript 힌트를 위해, Model 에 대한 설명을 여기에 작성해주세요.
 */
export const NotificationModel = types
  .model("Notification")
  .props({
    id: types.identifierNumber,
    createAt: types.string,
    updatedAt: types.string,
    title: types.string,
    content: types.string,
    senderName: types.string,
    needToPush: types.boolean,
    adAtNight: types.boolean,
    //? maybe / maybeNull 중에 고민 (maybe는 undefined로, maybeNull은 null로 판단하는 것으로 이해했음)
    careGiverReceiverId: types.maybeNull(types.number),
    clientReceiverId: types.maybeNull(types.number),
    isChecked: types.boolean,
    isDeleted: types.boolean,
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type NotificationType = Instance<typeof NotificationModel>
export interface Notification extends NotificationType {}
type NotificationSnapshotType = SnapshotOut<typeof NotificationModel>
export interface NotificationSnapshot extends NotificationSnapshotType {}
export const createNotificationDefaultModel = () => types.optional(NotificationModel, {})
