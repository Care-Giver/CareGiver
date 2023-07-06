import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { getUsers, User as userType } from "../../services/axios/user"
import { string } from "mobx-state-tree/dist/internal"
/**
 * TypeScript 힌트를 위해, Model 에 대한 설명을 여기에 작성해주세요.
 */
export const UserModel = types
  .model("User")
  .props({ user: types.optional(types.frozen<userType | null>(), null) })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setResponse(response: userType) {
      self.user = response
    },
    init() {
      self.user = {
        id: null,
        createAt: "",
        updatedAt: "",
        email: "",
        role: "",
        nickname: "",
        kakaoIdToken: "",
        naverIdToken: "",
        phoneNumber: "",
        sex: null,
        birthday: "",
        provider: "",
        address: "",
        desc: "",
        profileImage: "",
        isCertified: null,
        pushToken: "",
        clientStreamToken: "",
        maxDistance: null,
      }
    },
  }))
  .actions((self) => ({
    async setUser() {
      // const CrecheDays = await getCrecheDays(crecheId)
      // self.CrecheDays = CrecheDays
      if (self.user == null) {
        self.init()
      }
      await getUsers()
        .then((res) => {
          self.setResponse(res)
          self.user.profileImage = ""
          console.log("ok: ", res)
        })
        .catch((res) => console.error(res))
    },
  }))
// eslint-disable-line @typescript-eslint/no-unused-vars

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
export const createUserDefaultModel = () => types.optional(UserModel, {})
