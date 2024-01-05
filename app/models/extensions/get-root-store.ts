import { getRoot, IStateTreeNode } from "mobx-state-tree"
import { RootStore, RootStoreModel } from "../root-store/root-store"

/**
 * 참고: https://github.com/infinitered/ignite/blob/01ea6cc30a9956f0e41516a1b60727312dc88b13/boilerplate/app/models/helpers/getRootStore.ts
 *
 * Model 내에서, 다른 Model 에 접근해야 할때 사용하는 함수입니다.
 * 예를 들어, PetsitterStoreModel 에서,
 * UserStoreModel 객체에 접근해야 하는 경우 다음과 같이 사용할 수 있습니다.
 * ```
 *   export const PetsitterStoreModel = types
 *   .model("PetsitterStore")
 *   .props({
 *       ...
 *   })
 *   .actions(withSetPropAction)
 *   .views((self) => ({
 *       ...
 *   })
 *   .actions((self) => ({
 *       ...
 *       const rootStore = getRootStore(self)
 *       const myStreamUserId = rootStore.userStore.myStreamUserId
 *   })
 *   ```
 */
export const getRootStore = (self: IStateTreeNode): RootStore => {
  return getRoot<typeof RootStoreModel>(self)
}
