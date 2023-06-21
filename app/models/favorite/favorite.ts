import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { ProfileCardInfo, getFavorites } from "../../services/axios/favorite"

/**
 * 즐겨찾기 목록을 관리하는 MST 모델
 */
export const FavoriteModel = types
  .model("Favorite")
  .props({
    // error 상황과 구별할 수 있도록 초깃값은 null로 설정
    favorites: types.optional(types.frozen<ProfileCardInfo[] | null>(), null),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setResponse(data: ProfileCardInfo[]) {
      self.favorites = data
    },
  }))
  .actions((self) => ({
    async setFavorites() {
      await getFavorites()
        .then((res) => {
          const favorites = [...res.favoriteCrechesData, ...res.favoriteVisitingsData]
          self.setResponse(favorites)
        })
        .catch((err) => console.error(err))
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type FavoriteType = Instance<typeof FavoriteModel>
export interface Favorite extends FavoriteType {}
type FavoriteSnapshotType = SnapshotOut<typeof FavoriteModel>
export interface FavoriteSnapshot extends FavoriteSnapshotType {}
export const createFavoriteDefaultModel = () => types.optional(FavoriteModel, {})
