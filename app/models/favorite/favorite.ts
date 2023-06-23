import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { ProfileCardInfo, SearchOption, getFavorites } from "../../services/axios/favorite"

/**
 * 즐겨찾기 목록을 관리하는 MST 모델
 */
export const FavoriteModel = types
  .model("Favorite")
  .props({
    // ? 즐겨찾기한 펫시터 목록
    favoritePetsitters: types.optional(types.frozen<ProfileCardInfo[]>(), []), // 실제 디폴트는 null[] 이지만 프론트에서는 타입 통일을 위해 empty array로 사용
    // ? 즐겨찾기한 훈련사 목록
    favoriteTrainers: types.optional(types.frozen<ProfileCardInfo[]>(), []),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setPetsittersResponse(data: ProfileCardInfo[]) {
      self.favoritePetsitters = data
    },
    setTrainersResponse(data: ProfileCardInfo[]) {
      self.favoriteTrainers = data
    },
  }))
  .actions((self) => ({
    async setFavorites(option: SearchOption | {}) {
      await getFavorites(option)
        .then((res) => {
          console.log("in MST rest >>>", res)
          // const favoritePetsitters = [...res.favoritePetsitters]
          // self.setPetsittersResponse(favoritePetsitters)

          if (res.favoritePetsitters[0]) {
            const favoritePetsitters = [...res.favoritePetsitters]
            self.setPetsittersResponse(favoritePetsitters)
          } else {
            self.setPetsittersResponse([])
          }

          // const favoriteTrainers = [...res.favoriteTrainers]
          // self.setTrainersResponse(favoriteTrainers)
          self.setTrainersResponse([])
        })
        .catch((err) => console.error(err))
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type FavoriteType = Instance<typeof FavoriteModel>
export interface Favorite extends FavoriteType {}
type FavoriteSnapshotType = SnapshotOut<typeof FavoriteModel>
export interface FavoriteSnapshot extends FavoriteSnapshotType {}
export const createFavoriteDefaultModel = () => types.optional(FavoriteModel, {})
