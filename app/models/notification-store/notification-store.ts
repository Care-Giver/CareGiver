import { Instance, SnapshotOut, applySnapshot, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { getNotifications, NotificationColumns } from "../../services/api/notification"
import { id } from "date-fns/locale"
interface Notification extends NotificationColumns {
  isChecked?: boolean // 유저가 해당 notification 을 확인했는지 안했는지를 판단한다.
  isDeleted?: boolean
}

/**
 * 로그인한 사용자의 알림 목록
 * 기존 interface에 알림 확인 상태를 체크하기 위한 isChecked 추가.
 */

export const NotificationStoreModel = types
  .model("NotificationStore")
  .props({ notifications: types.frozen<Notification[]>([]) })
  .views((self) => ({
    //* 안 읽은 알림 개수반환
    get unreadNotificationCount() {
      if (this.isEmpty) return 0

      return self.notifications.filter((item) => !item.isChecked).length
    },

    //* 알림이 비어있는지 여부 반환 - 비어있으면 true, 아니면 false
    get isEmpty() {
      return self.notifications.length === 0
    },

    //* 모델 자신
    get self() {
      return self
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    //* 서버에서 받아온 notification 객체들에 isChecked 프로퍼티를 추가하여 저장한다.
    //* MST가 비어있을 때만 사용한다.
    setNotifications(value: NotificationColumns[]) {
      // 각 notification 객체에 isChecked 프로퍼티를 추가한다.
      self.notifications = value.map((item) => ({
        ...item,
        isChecked: false,
        isDeleted: false,
      }))
    },

    //* 새 notification 객체를 추가한다.
    addNotification(value: NotificationColumns) {
      self.notifications = [
        // 기존 notification 객체
        ...self.notifications,
        // 새로운 notification 객체
        {
          ...value,
          isChecked: false,
          isDeleted: false,
        },
      ]
    },
    //* 모든 notification을 isDeleted 처리한다.
    deleteAllNotifications() {
      self.notifications = self.notifications.map((item) => {
        console.log("item.id, item.isDeleted >>>", item.id, item.isDeleted)
        if (item.isDeleted === false) {
          item.isDeleted = true
        }
        return item
      })
    },
    //* 확인하지 않았던 notification 객체를 확인한 상태로 바꾼다
    setIsChecked() {
      self.notifications = self.notifications.map((item) => {
        if ("isChecked" in item && item.isChecked === false) {
          item.isChecked = true
        }
        return item
      })
    },

    // NotificationStoreModel 모델을 초기화한다.
    reset() {
      applySnapshot(self, {})
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type NotificationStoreType = Instance<typeof NotificationStoreModel>
export interface NotificationStore extends NotificationStoreType {}
type NotificationStoreSnapshotType = SnapshotOut<typeof NotificationStoreModel>
export interface NotificationStoreSnapshot extends NotificationStoreSnapshotType {}
export const createNotificationStoreDefaultModel = () => types.optional(NotificationStoreModel, {})
