import { Instance, SnapshotOut, applySnapshot, types } from "mobx-state-tree"
import { NotificationMessage } from "../../services/api/notification"
import { NotificationModel } from "../notification/notification"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { Type } from "../user-store/user-store"

/**
 * 로그인한 사용자의 알림 목록
 * 기존 interface에 알림 확인 상태를 체크하기 위한 isChecked 추가.
 */

export const NotificationStoreModel = types
  .model("NotificationStore")
  .props({ notifications: types.array(NotificationModel) })
  .actions(withSetPropAction)
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

    get isClientNotiEmpty() {
      return self.notifications.filter((noti) => noti.type === Type.CLIENT).length === 0
    },

    get isCareGiverNotiEmpty() {
      return self.notifications.filter((noti) => noti.type === Type.CARE_GIVER).length === 0
    },

    //* 모델 자신
    get self() {
      return self
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    //* 새로운 "유일한" notification 객체 추가
    addNotification(value: NotificationMessage) {
      console.log("🔷 addNotification |", value)

      // 유일성 검증
      const isAlreadyInList = self.notifications.some(
        (notification) => notification.id === value.id,
      )
      if (isAlreadyInList) return

      // 검증 통과시, 추가
      self.notifications.push({
        ...value,
        isChecked: false,
        isDeleted: false,
      })
    },

    //* 서버에서 받아온 notification 객체들에 isChecked 프로퍼티를 추가하여 저장한다.
    //* MST가 비어있을 때만 사용한다.
    initNotifications(value: NotificationMessage[]) {
      value.forEach((item) => {
        this.addNotification({
          ...item,
          careGiverReceiverId: item.careGiverReceiverId || null,
          clientReceiverId: item.clientReceiverId || null,
        })
      })
      // self.setProp("notifications", value)
    },

    //* 모든 notification을 isDeleted 처리한다.
    deleteAllNotifications() {
      self.notifications.forEach((item) => {
        if (!item.isDeleted) {
          item.isDeleted = true
        }
      })
    },

    //* 확인하지 않았던 notification 객체를 확인한 상태로 바꾼다
    checkAllNotifications() {
      self.notifications.forEach((item) => {
        if (!item.isChecked) {
          item.isChecked = true
        }
      })
    },

    /**
     * [❗️ 개발용 으로만 사용할 것]
     * NotificationStoreModel 모델을 초기화한다.
     */
    reset() {
      applySnapshot(self, {})
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type NotificationStoreType = Instance<typeof NotificationStoreModel>
export interface NotificationStore extends NotificationStoreType {}
type NotificationStoreSnapshotType = SnapshotOut<typeof NotificationStoreModel>
export interface NotificationStoreSnapshot extends NotificationStoreSnapshotType {}
export const createNotificationStoreDefaultModel = () => types.optional(NotificationStoreModel, {})
