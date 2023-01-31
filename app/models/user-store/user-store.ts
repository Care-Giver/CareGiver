import { applySnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"

/* //* User Model 
        ~ type: ENUM! ( CARE_GIVER | CLIENT )
        ~ loggedIn: bool!
        ~ pushToken: string~ 

        ~ email: string!
        ~ password: string?
        ~ provider: string~ 

        ~ name: string!
        ~ phoneNumber: string!
        ~ sex: ENUM! ( MALE | FEMALE )
        ~ birthday: string~ 

        ~ address: string!
        ~ profileImg: string?
        ~ isCertified: bool!
 */

enum Type {
  CARE_GIVER = "CARE_GIVER",
  CLIENT = "CLIENT",
}

enum Provider {
  GOOGLE = "GOOGLE",
  APPLE = "APPLE",
  KAKAO = "KAKAO",
  NAVER = "NAVER",
}

enum Sex {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

/**
 * User Model is for both CareGiver and Client.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    type: types.optional(types.frozen<Type>(), Type.CLIENT),
    loggedIn: false,
    pushToken: types.optional(types.string, ""),

    email: types.optional(types.string, ""),
    password: types.optional(types.string, ""),
    provider: types.optional(types.string, null), //TODO: To be changed to Provider enum

    name: types.optional(types.string, ""),
    phoneNumber: types.optional(types.string, ""),
    sex: types.optional(types.frozen<Sex>(), null),
    birthday: types.optional(types.string, ""),

    address: types.optional(types.string, ""),
    profileImg: types.optional(types.string, ""),
    isCertified: false,
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get isLoggedIn() {
      return self.loggedIn
    },

    get showAll() {
      console.log({
        ...self,
      })
      return {
        ...self,
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    reset() {
      applySnapshot(self, {})
    },

    setLoggedIn(value?: boolean) {
      self.loggedIn = value
    },

    setEmail(value: string) {
      self.email = value.replace(/ /g, "")
    },
    setPassword(value: string) {
      self.password = value.replace(/ /g, "")
    },
    setProvider(value: string) {
      self.provider = value
    },

    async signIn() {
      try {
        //
      } catch (error) {
        //
      }
    },

    async logIn() {
      try {
        //
      } catch (error) {
        //
      }
    },

    logOut() {
      self.loggedIn = false
    },

    async queryUser() {
      try {
        //
      } catch (error) {
        //
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
