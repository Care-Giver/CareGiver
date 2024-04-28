import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { format, formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"

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
    get createAtText() {
      const d = new Date(self.createAt.replace("Z", "+09:00")) //! 케어기버 DB 는 UTC 시간이라서 +09:00 반드시 추가 해야 함.
      const now = Date.now()
      const diff = (now - d.getTime()) / 1000 // 현재 시간과의 차이(초)
      // 1분 미만일땐 방금 전 표기
      if (diff < 60 * 1) {
        return "방금 전"
      }

      // 3일 미만일땐 시간차이 출력(몇시간 전, 몇일 전)
      if (diff < 60 * 60 * 24 * 3) {
        return formatDistanceToNow(d, { addSuffix: true, locale: ko })
      }

      // 그 외: 2024년 4월 28일 22:35
      return format(d, "PPP p", { locale: ko })
    },

type NotificationType = Instance<typeof NotificationModel>
export interface Notification extends NotificationType {}
type NotificationSnapshotType = SnapshotOut<typeof NotificationModel>
export interface NotificationSnapshot extends NotificationSnapshotType {}
export const createNotificationDefaultModel = () => types.optional(NotificationModel, {})
