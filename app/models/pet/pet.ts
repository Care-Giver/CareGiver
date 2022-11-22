import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const PetModel = types
  .model("Pet")
  .props({
    id: types.identifierNumber,
    name: types.string,
    image: types.maybe(types.string),
    age: types.number,
    // ? 성별: 남("male") | 여("female")
    sex: types.union(types.literal("male"), types.literal("female")),
    // ? 펫 타입: "소형" | "중형" | "대형"
    petType: types.union(types.literal("소형"), types.literal("중형"), types.literal("대형")),
    // ? 반려동물의 종 이름 ("푸들", "시츄", ...)
    speciesName: types.string,
    // ? 반려동물의 유형 - "Dog", "Cat", ...
    familyName: types.union(types.literal("Dog"), types.literal("Cat")),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type PetType = Instance<typeof PetModel>
export interface Pet extends PetType {}
type PetSnapshotType = SnapshotOut<typeof PetModel>
export interface PetSnapshot extends PetSnapshotType {}
export const createPetDefaultModel = () => types.optional(PetModel, {})
