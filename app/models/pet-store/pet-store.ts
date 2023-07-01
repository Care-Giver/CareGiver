import { Api, FormattedPetData } from "#api"
import { Instance, SnapshotOut, types } from "mobx-state-tree"

export enum Sex {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum HandleType {
  LARGE = "대형",
  MEDIUM = "중형",
  SMALL = "소형",
}

export enum FamilyType {
  DOG = "DOG",
  CAT = "CAT",
}

export interface Species {
  id: number
  createAt: Date
  updatedAt: Date
  name: string
  familyType: FamilyType
}

export interface Pet {
  id: number
  createAt: Date
  updatedAt: Date
  name: string
  species: Species
  age: number
  sex: Sex
  images: string[]
  weight: number
  petType: HandleType
  isNeutralizated: boolean
  birthday: Date
  desc: string
}

/* 
현재 Pet 더미 데이터는 낡았음 (업데이트 필요)
{
  "age": 3, 
  "id": "3", 
  "name": "자두", 
  "sex": "남", 
  "size": "소형", 
  "species": "여섯글자가넘어가"
} */

/**
 * Model description here for TypeScript hints.
 */
export const PetStoreModel = types
  .model("PetStore")
  .props({
    pets: types.optional(types.array(types.frozen<Pet>()), []),
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
