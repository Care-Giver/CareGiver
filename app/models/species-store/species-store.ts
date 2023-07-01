import { Api } from "#api"
import { Instance, SnapshotOut, types, IStateTreeNode, SnapshotIn } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"

/**
 * If you include this in your model in an action() block just under your props,
 * it'll allow you to set property values directly while retaining type safety
 * and also is executed in an action. This is useful because often you find yourself
 * making a lot of repetitive setter actions that only update one prop.
 *
 * E.g.:
 *
 *  const UserModel = types.model("User")
 *    .props({
 *      name: types.string,
 *      age: types.number
 *    })
 *    .actions(withSetPropAction)
 *
 *   const user = UserModel.create({ name: "Jamon", age: 40 })
 *
 *   user.setProp("name", "John") // no type error
 *   user.setProp("age", 30)      // no type error
 *   user.setProp("age", "30")    // type error -- must be number
 */

export interface ISpecies {
  speciesId: number
  name: string
  familyId: number
}

/**
 * 서버에 있는 등록된 모든 반려동물 종의 정보를 읽어옵니다.
 * 그 후, SpeciesStoreModel 모델에 species 값에 모든 종의 정보를
 */
export const SpeciesStoreModel = types
  .model("SpeciesStore")
  .props({
    species: types.frozen<ISpecies[]>(),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get getSpecies() {
      return self.species
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async setSpecies() {
      const api = new Api()
      api.setup()
      const formattedData = await api.getSpeciesNames()
      self.species = formattedData
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type SpeciesStoreType = Instance<typeof SpeciesStoreModel>
export interface SpeciesStore extends SpeciesStoreType {}
type SpeciesStoreSnapshotType = SnapshotOut<typeof SpeciesStoreModel>
export interface SpeciesStoreSnapshot extends SpeciesStoreSnapshotType {}
export const createSpeciesStoreDefaultModel = () => types.optional(SpeciesStoreModel, {})
