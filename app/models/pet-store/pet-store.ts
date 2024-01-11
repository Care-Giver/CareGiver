import { Pet, getPets } from "../../services/axios/pets"
import { Instance, SnapshotOut, types } from "mobx-state-tree"

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

    /** 반려동물 존재유무 (한 마리이상 등록했다면, true. ) */
    get hasPets() {
      return self.pets.length > 0
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
        return petsDetail
      } catch (error) {
        console.error("catch 에러!!! - petsDetailHandler", error)
        return false
      }
    },

    getPetsByIds(petIds: number[]) {
      if (!self.pets) return []
      return self.pets.filter((pet) => petIds.includes(pet.id))
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
