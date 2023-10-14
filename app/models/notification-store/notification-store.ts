import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { getNotifications, Notification } from "../../services/axios/notification"

/**
 * 로그인한 사용자의 알림 목록
 * 기존 interface에 알림 확인 상태를 체크하기 위한 isChecked 추가.
 */

export const NotificationStoreModel = types
  .model("NotificationStore")
  .props({ notifications: types.frozen<Notification[]>([]) })
  .views((self) => ({
    get firstNotification() {
      if (self.notifications.length === 0) return null
      return self.notifications[0]
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    //* notifications 저장
    setNotifications(value: Notification[]) {
      self.notifications = value.map((item) => {
        //? 아직 isChecked가 추가되지 않았다면 isChecked:false 추가
        if (item.isChecked === null) {
          item.isChecked = false
        }
        return item
      })
    },
    //* 확인하지 않았던 notifications 확인
    setIsChecked() {
      self.notifications.forEach((item) => {
        if (!item.isChecked) {
          item.isChecked = true
        }
      })
    },
    async notificationsHandler() {
      try {
        const { isSuccess, notifications } = await getNotifications()

        if (!isSuccess) {
          return false
        }
        if (!notifications) {
          return false
        }
        this.setNotifications(notifications)

        return notifications
      } catch (error) {
        console.error("catch 에러!!! - notificationsHandler", error)
        return false
      }
    },
    async isCheckedHandler() {
      this.setIsChecked()
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type NotificationStoreType = Instance<typeof NotificationStoreModel>
export interface NotificationStore extends NotificationStoreType {}
type NotificationStoreSnapshotType = SnapshotOut<typeof NotificationStoreModel>
export interface NotificationStoreSnapshot extends NotificationStoreSnapshotType {}
export const createNotificationStoreDefaultModel = () => types.optional(NotificationStoreModel, {})
