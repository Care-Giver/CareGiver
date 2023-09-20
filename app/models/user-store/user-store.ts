import { applySnapshot, Instance, SnapshotOut, types, unprotect } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { delay } from "../../utils/delay"
import { navigate } from "#navigators"
import { getMe, login, LoginRequestBody, UserDetail } from "#axios"

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
    token: types.optional(types.string, ""),
    provider: types.optional(types.frozen<AuthProvider>(), null),
    email: types.optional(types.string, ""),

    nickname: types.optional(types.string, ""),
    phoneNumber: types.optional(types.string, ""),
    sex: types.optional(types.frozen<Sex>(), null),
    birthday: types.optional(types.string, ""),
    address: types.optional(types.string, ""),
    profileImage: types.optional(types.string, ""),

    isCertified: false,
    pushToken: types.optional(types.string, ""),
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

    /* 유저 Auth 정보 BEGIN */
    setLoggedIn(value?: boolean) {
      self.loggedIn = value
    },

    setProvider(value: AuthProvider) {
      self.provider = value
    },

    setToken(value: string) {
      self.token = value
    },

    setEmail(value: string) {
      self.email = value.replace(/ /g, "")
    },
    /* 유저 Auth 정보 ENDED */

    /* 유저 상세정보 BEGIN */
    setNickname(value: string) {
      self.nickname = value
    },

    setPhoneNumber(value: string) {
      self.phoneNumber = value
    },

    setSex(value: Sex) {
      self.sex = value
    },

    setBirthday(value: string) {
      self.birthday = value
    },

    setAddress(value: string | null) {
      self.address = value || ""
    },

    setProfileImg(value: string | null) {
      self.profileImage = value || ""
    },
    /* 유저 상세정보 ENDED */

    /**
     * 유저 상세정보를 저장합니다
     * */
    async setUserDetail(token: string) {
      try {
        const { isSuccess, userDetail } = await getMe(token)

        if (!isSuccess) {
          return false
        }
        // 유저 상세정보 저장
        this.setNickname(userDetail.nickname)
        this.setPhoneNumber(userDetail.phoneNumber)
        this.setSex(userDetail.sex)
        this.setBirthday(userDetail.birthday)
        this.setAddress(userDetail.address)
        this.setProfileImg(userDetail.profileImage)

        return self
      } catch (error) {
        console.error("catch 에러!!! - setUserDetail", error)
        return false
      }
    },

    /**
     * 로그인 (혹은 회원가입) 성공시, 유저 정보의 일부를 저장합니다.
     * - token, provider, email
     *
     * 이후, 유저 상세정보를 저장하는 함수 setUserDetail 를 호출합니다.
     *  */
    async loginHander(loginRequestBody: LoginRequestBody) {
      try {
        const { isSuccess, token } = await login(loginRequestBody)
        if (!isSuccess) {
          return false
        }

        this.setLoggedIn(true)
        this.setToken(token)
        this.setProvider(loginRequestBody.provider)
        this.setEmail(loginRequestBody.email)

        const res = await this.setUserDetail(token)
        return res
        //
      } catch (error) {
        console.error("catch 에러!!! - logInHander", error)
        return false
        //
      }
    },

    logOut() {
      // self.loggedIn = false
      this.reset()
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
