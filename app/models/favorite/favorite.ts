import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import {
  ProfileCardInfo,
  SearchOption,
  deleteFavorite,
  getFavorites,
} from "../../services/axios/favorite"

interface UpdateInput {
  serviceType: "creche" | "visiting"
  id: number
}

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
  .views((self) => ({
    get isEmptyFavoritePetsitters() {
      return self.favoritePetsitters.length === 0
    },

    get isEmptyFavoriteTrainers() {
      return self.favoriteTrainers.length === 0
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
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

          if (res && res.favoritePetsitters[0]) {
            const favoritePetsitters = [...res.favoritePetsitters]
            self.setPetsittersResponse(favoritePetsitters)
          } else {
            self.setPetsittersResponse([])
          }

          // TODO: 훈련사 데이터 처리
          self.setTrainersResponse([])
        })
        .catch((err) => console.error(err))
    },
  }))
  .actions((self) => ({
    async cancelFavorite(info: UpdateInput) {
      // * 위탁 서비스인 경우
      if (info.serviceType === "creche") {
        await deleteFavorite({ crecheId: info.id })
          .then((res) => {
            console.info("[delete favorite successfully] delete creche info >>> ", info.id)
            // ? favoritePetsitter 목록을 새로 갱신한다. - delete한 정보 삭제
            const newPetsittersData = self.favoritePetsitters.filter(
              (value) => value.crecheId !== info.id,
            )
            // ? favoriteTrainer 목록을 새로 갱신한다. - delete한 정보 삭제
            const newTrainersData = self.favoriteTrainers.filter(
              (value) => value.crecheId !== info.id,
            )
            self.setPetsittersResponse(newPetsittersData)
            self.setTrainersResponse(newTrainersData)
          })
          .catch((err) => console.error(err))
      }
      // * 방문 서비스인 경우
      else {
        await deleteFavorite({ visitingId: info.id })
          .then((res) => {
            console.info("[delete favorite successfully] delete visiting info >>> ", info.id)
            // ? favoritePetsitter 목록을 새로 갱신한다. - delete한 정보 삭제
            const newPetsittersData = self.favoritePetsitters.filter(
              (value) => value.visitingId !== info.id,
            )
            // ? favoriteTrainer 목록을 새로 갱신한다. - delete한 정보 삭제
            const newTrainersData = self.favoriteTrainers.filter(
              (value) => value.visitingId !== info.id,
            )
            self.setPetsittersResponse(newPetsittersData)
            self.setTrainersResponse(newTrainersData)
          })
          .catch((err) => console.error(err))
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type FavoriteType = Instance<typeof FavoriteModel>
export interface Favorite extends FavoriteType {}
type FavoriteSnapshotType = SnapshotOut<typeof FavoriteModel>
export interface FavoriteSnapshot extends FavoriteSnapshotType {}
export const createFavoriteDefaultModel = () => types.optional(FavoriteModel, {})
