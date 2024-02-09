import { Instance, SnapshotOut, applySnapshot, types } from "mobx-state-tree"
import { NotificationColumns } from "../../services/api/notification"
import { NotificationModel } from "../notification/notification"

/**
 * 로그인한 사용자의 알림 목록
 * 기존 interface에 알림 확인 상태를 체크하기 위한 isChecked 추가.
 */

export const NotificationStoreModel = types
  .model("NotificationStore")
  .props({ notifications: types.array(NotificationModel) })
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
    //* 새로운 notification 객체 추가
    addNotification(value: NotificationColumns) {
      self.notifications.push({
        ...value,
        isChecked: false,
        isDeleted: false,
      })
    },
    //* 서버에서 받아온 notification 객체들에 isChecked 프로퍼티를 추가하여 저장한다.
    //* MST가 비어있을 때만 사용한다.
    setNotifications(value: NotificationColumns[]) {
      value.forEach((item) => {
        this.addNotification(item)
      })
    },
    //* 모든 notification을 isDeleted 처리한다.
    deleteAllNotifications() {
      self.notifications.forEach((item) => {
        if (item.isDeleted === false) {
          item.isDeleted = true
        }
      })
    },
    //* 확인하지 않았던 notification 객체를 확인한 상태로 바꾼다
    setIsChecked() {
      self.notifications.forEach((item) => {
        if (item.isChecked === false) {
          item.isChecked = true
        }
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
