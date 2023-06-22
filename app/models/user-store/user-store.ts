import { applySnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { delay } from "../../utils/delay"
import { navigate } from "#navigators"

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

export enum Type {
  CARE_GIVER = "CARE_GIVER",
  CLIENT = "CLIENT",
}

/**
 * 회원가입/로그인시 사용된 OAuth 제공자 입니다.
 * 원래 enum 으로 정의하려 했으나, 백엔드팀과의 협의 후, string 값으로 정의하였습니다. - https://care-giver-hq.slack.com/archives/C03E515JKV2/p1686457726838459?thread_ts=1686399709.649689&cid=C03E515JKV2
 */
export type AuthProvider = "google" | "apple" | "kakao" | "naver"

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
    // onSwitchingType: types.optional(types.boolean, false),
    onSwitchingType: false,

    loggedIn: false,
    pushToken: types.optional(types.string, ""),

    email: types.optional(types.string, ""),
    password: types.optional(types.string, ""),
    provider: types.optional(types.frozen<AuthProvider>(), null),
    refreshToken: types.optional(types.string, ""),

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
    /**
     * 유저의 역할을 케어기버와 클라이언트 두 종류 사이에서 전환합니다.
     * [중요] 하나의 action 에서 하나의 object 만 변경할 것. 그렇지 않으면 정상 작동 하지 않음
     *  */
    async switchType() {
      if (self.type === Type.CLIENT) {
        self.type = Type.CARE_GIVER
        this.setOnSwitchingTypeTrue()
        console.log("self.onSwitchingType - CLIENT", self.onSwitchingType)
        await delay(500)
        await delay(300)
        navigate("Calendar")
        await delay(200)
        this.setOnSwitchingTypeFalse()
        console.log("self.onSwitchingType - CLIENT", self.onSwitchingType)
      } else {
        self.type = Type.CLIENT
        this.setOnSwitchingTypeTrue()
        console.log("self.onSwitchingType - CG", self.onSwitchingType)
        await delay(500)
        await delay(300)
        navigate("Searching")
        await delay(200)
        this.setOnSwitchingTypeFalse()
        console.log("self.onSwitchingType - CG", self.onSwitchingType)
      }
    },

    setOnSwitchingType() {
      self.onSwitchingType = !self.onSwitchingType
    },

    setOnSwitchingTypeFalse() {
      self.onSwitchingType = false
    },

    setOnSwitchingTypeTrue() {
      self.onSwitchingType = true
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
    setProvider(value: AuthProvider) {
      self.provider = value
    },
    setRefreshToken(value: string) {
      self.refreshToken = value
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
