import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { ProfileCardInfo, getFavorites } from "../../services/axios/favorite"

/**
 * TypeScript 힌트를 위해, Model 에 대한 설명을 여기에 작성해주세요.
 */
export const FavoriteModel = types
  .model("Favorite")
  .props({
    // error 상황과 구별할 수 있도록 초깃값은 null로 설정
    favoriteCreches: types.optional(types.frozen<ProfileCardInfo[] | null>(), null),
    favoriteVisitings: types.optional(types.frozen<ProfileCardInfo[] | null>(), null),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setCreches(data: ProfileCardInfo[]) {
      self.favoriteCreches = data
    },
    setVisitings(data: ProfileCardInfo[]) {
      self.favoriteVisitings = data
    },
  }))
  .actions((self) => ({
    async setFavorites() {
      await getFavorites()
        .then((res) => {
          self.setCreches(res.favoriteCrechesData)
          self.setVisitings(res.favoriteVisitingsData)
        })
        .catch((err) => console.error(err))
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type FavoriteType = Instance<typeof FavoriteModel>
export interface Favorite extends FavoriteType {}
type FavoriteSnapshotType = SnapshotOut<typeof FavoriteModel>
export interface FavoriteSnapshot extends FavoriteSnapshotType {}
export const createFavoriteDefaultModel = () => types.optional(FavoriteModel, {})
