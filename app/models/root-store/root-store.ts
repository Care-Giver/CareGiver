import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { SpeciesStoreModel } from "../species-store/species-store"
import { VisitingAvailableTimesModel } from "../visiting-available-times/visiting-available-times"
import { CrecheDayModel } from "../creche-day/creche-day"
import { UserStoreModel } from "../user-store/user-store"
import { ReviewStoreModel } from "../review-store/review-store"
import { FavoriteModel } from "../favorite/favorite"
import { PetStoreModel } from "../pet-store/pet-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  speciesStoreModel: types.optional(SpeciesStoreModel, {} as any),
  visitingAvailableTimesModel: types.optional(VisitingAvailableTimesModel, {} as any),
  CrecheDayModel: types.optional(CrecheDayModel, {} as any),
  userStore: types.optional(UserStoreModel, {} as any),
  reviewStoreModel: types.optional(ReviewStoreModel, {} as any),
  petStore: types.optional(PetStoreModel, {} as any),
  FavoriteModel: types.optional(FavoriteModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
