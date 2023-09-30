import { getPets } from "../../services/axios/pets"
import { Instance, SnapshotOut, types } from "mobx-state-tree"

export enum PetSex {
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
  sex: PetSex
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
    pets: types.frozen<Pet[]>([]),
  })
  .views((self) => ({
    /**
     * (호중님 참고용 예제 코드)
     * 펫 목록중에 첫번째 반려동물을 리턴합니다.
     * 만약 펫 목록이 비어있다면 null 을 리턴합니다.
     *
     */
    get firstPet() {
      // console.log("self.pets", self.pets)
      if (self.pets.length === 0) return null

      return self.pets[0]
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    /** API 를 통해 받아온 펫 목록을 저장합니다. */
    setPets(value: Pet[]) {
      self.pets = value
    },

    async petsHandler() {
      try {
        const { isSuccess, petsDetail } = await getPets()

        if (!isSuccess) {
          return false
        }

        if (!petsDetail) {
          return false
        }
        this.setPets(petsDetail)

        return true
      } catch (error) {
        console.error("catch 에러!!! - petsDetailHandler", error)
        return false
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type PetStoreType = Instance<typeof PetStoreModel>
export interface PetStore extends PetStoreType {}
type PetStoreSnapshotType = SnapshotOut<typeof PetStoreModel>
export interface PetStoreSnapshot extends PetStoreSnapshotType {}
export const createPetStoreDefaultModel = () => types.optional(PetStoreModel, {})

// GETTER (views)
//  저장된 펫을 "읽기" 작업
// SETTER (actions)
//  setPets -> API 를 통해 얻어온 반려동물 리스트를 저장
