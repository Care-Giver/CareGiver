import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"

interface CautionModal {
  image?: "caution"
  title: string
  message?: string
}

/**
 * 앱 내 UI 를 제어하는 스토어입니다.
 * [구현됨]
 * - showingBottomTab: 하단 탭바 보이기/숨기기
 * - caution: "주의" 알림용 모달, 추가 액션 버튼이 없고 오직 모달창 종료 버튼만 있습니다.
 *
 * [TODO]
 * - 다크모드
 */
export const UiStoreModel = types
  .model("UiStore")
  .props({
    showingBottomTab: types.optional(types.boolean, true),
    caution: types.frozen<CautionModal>(null),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get hasCaution() {
      return !!self.caution
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    hideBottomTab() {
      self.showingBottomTab = false
    },

    showBottomTab() {
      self.showingBottomTab = true
    },

    setCaution(value: CautionModal | null) {
      self.setProp("caution", value)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type UiStoreType = Instance<typeof UiStoreModel>
export interface UiStore extends UiStoreType {}
type UiStoreSnapshotType = SnapshotOut<typeof UiStoreModel>
export interface UiStoreSnapshot extends UiStoreSnapshotType {}
export const createUiStoreDefaultModel = () => types.optional(UiStoreModel, {})
