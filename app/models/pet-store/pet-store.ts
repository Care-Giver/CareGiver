import { Api } from "#api/api"
import { FormattedPetData } from "#api/api.types"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { PetModel } from "../pet/pet"

/**
 * Model description here for TypeScript hints.
 */
export const PetStoreModel = types
  .model("PetStore")
  .props({
    pets: types.optional(types.array(PetModel), []),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    addPet: (data: FormattedPetData) => {
      const id = self.pets.reduce((maxId, pet) => Math.max(maxId, pet.id), 0)
      const newPet = {
        id,
        ...data,
      }
      self.pets.push(newPet)
    },
  }))
  .actions((self) => ({
    setMyPets: async () => {
      const api = new Api()
      api.setup()

      const _response = await api.getMyPets()

      if (_response.kind === "ok") {
        _response.pets.forEach((data) => self.addPet(data))
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type PetStoreType = Instance<typeof PetStoreModel>
export interface PetStore extends PetStoreType {}
type PetStoreSnapshotType = SnapshotOut<typeof PetStoreModel>
export interface PetStoreSnapshot extends PetStoreSnapshotType {}
export const createPetStoreDefaultModel = () => types.optional(PetStoreModel, {})
