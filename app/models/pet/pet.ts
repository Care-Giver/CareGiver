import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * "pet": {
                "id": 5,
                "createAt": "2023-05-22T01:37:12.073Z",
                "updatedAt": "2023-05-22T01:37:12.073Z",
                "name": "상추",
                "speciesId": null,
                "age": 1,
                "sex": "MALE",
                "images": null,
                "weight": 7,
                "petType": "소형",
                "isNeutralizated": true,
                "birthday": "2022-09-14T00:00:00.000Z",
                "desc": "사람을 엄청 좋아해요"
            },
            "familyType": "DOG"
 */

// TODO: 정확한 enum값 조사
type Sex = "MALE" | "FEMALE"
type PetSizeType = "소형" | "중형" | "대형"
type FamilyType = "DOG" | "CAT"

interface PetData {
  id: 5
  createAt: string
  updatedAt: string
  name: string
  speciesId: number | null
  age: number
  sex: Sex
  images: string | null
  weight: number
  petType: PetSizeType
  isNeutralizated: boolean
  birthday: string
  desc: string
}

/**
 * Model description here for TypeScript hints.
 */
export const PetModel = types
  .model("Pet")
  .props({
    // pet: types.frozen<PetData>(),
    // familyType: types.frozen<FamilyType>(),

    id: types.number,
    name: types.string,
    image: types.maybe(types.string),
    age: types.number,
    // ? 성별: 남("male") | 여("female")
    sex: types.union(types.literal("male"), types.literal("female")),
    // ? 펫 타입: "소형" | "중형" | "대형"
    petType: types.union(types.literal("소형"), types.literal("중형"), types.literal("대형")),
    // ? 반려동물의 종 이름 ("푸들", "시츄", ...)
    species: types.string,
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
