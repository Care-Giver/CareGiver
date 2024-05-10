import { Instance, SnapshotOut, applySnapshot, types } from "mobx-state-tree"
import { SpeciesStoreModel } from "../species-store/species-store"
import { UserStoreModel } from "../user-store/user-store"
import { ReviewStoreModel } from "../review-store/review-store"
import { FavoriteModel } from "../favorite/favorite"
import { PetStoreModel } from "../pet-store/pet-store"
import { UiStoreModel } from "../ui-store/ui-store"
import { NotificationStoreModel } from "../notification-store/notification-store"
import { PetsitterStoreModel } from "../petsitter-store/petsitter-store"
import { EtcStoreModel } from "../etc-store/etc-store"
import { CgBookingStoreModel } from "../cg-booking-store/cg-booking-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  speciesStoreModel: types.optional(SpeciesStoreModel, {} as any),
  userStore: types.optional(UserStoreModel, {} as any),
  uiStore: types.optional(UiStoreModel, {} as any),
  reviewStoreModel: types.optional(ReviewStoreModel, {} as any),
  petsitterStore: types.optional(PetsitterStoreModel, {} as any),
  petStore: types.optional(PetStoreModel, {} as any),
  FavoriteModel: types.optional(FavoriteModel, {} as any),
  notificationStore: types.optional(NotificationStoreModel, {} as any),
  etcStore: types.optional(EtcStoreModel, {} as any),
  cgBookingStore: types.optional(CgBookingStoreModel, {} as any)
}).actions((self) => ({
  resetRootStore() {
    applySnapshot(self, {})
  }
}))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
