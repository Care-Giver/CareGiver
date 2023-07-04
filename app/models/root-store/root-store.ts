import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CharacterStoreModel } from "../character-store/character-store"
import { SpeciesStoreModel } from "../species-store/species-store"
import { VisitingAvailableTimesModel } from "../visiting-available-times/visiting-available-times"
import { CrecheDayModel } from "../creche-day/creche-day"
import { UserStoreModel } from "../user-store/user-store"
import { FavoriteModel } from "../favorite/favorite"
import { PetStoreModel } from "../pet-store/pet-store"
import { ConfirmedBookingsModel } from "../confirmed-bookings/confirmed-bookings"
import { UserModel } from "../user/user"
import { PaymentModel } from "../payment/payment"
/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  speciesStoreModel: types.optional(SpeciesStoreModel, {} as any),
  visitingAvailableTimesModel: types.optional(VisitingAvailableTimesModel, {} as any),
  ConfirmedBookingsModel: types.optional(ConfirmedBookingsModel, {} as any),
  CrecheDayModel: types.optional(CrecheDayModel, {} as any),
  userStore: types.optional(UserStoreModel, {} as any),
  petStore: types.optional(PetStoreModel, {} as any),
  FavoriteModel: types.optional(FavoriteModel, {} as any),
  UserModel: types.optional(UserModel, {} as any),
  PaymentModel: types.optional(PaymentModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
