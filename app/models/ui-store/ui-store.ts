import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"

/**
 * 앱 내 UI 를 제어하는 스토어입니다.
 * [구현됨]
 * - @showingBottomTab 하단 탭바 보이기/숨기기
 *
 * [TODO]
 * - 다크모드
 */
export const UiStoreModel = types
  .model("UiStore")
  .props({
    showingBottomTab: types.optional(types.boolean, true),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    hideBottomTab() {
      self.showingBottomTab = false
    },

    showBottomTab() {
      self.showingBottomTab = true
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type UiStoreType = Instance<typeof UiStoreModel>
export interface UiStore extends UiStoreType {}
type UiStoreSnapshotType = SnapshotOut<typeof UiStoreModel>
export interface UiStoreSnapshot extends UiStoreSnapshotType {}
export const createUiStoreDefaultModel = () => types.optional(UiStoreModel, {})
