import { applySnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { delay } from "../../utils/delay"
import { navigate } from "#navigators"
import { getMe, login, LoginRequestBody, postPushToken, Sex, UserDetail } from "#axios"
import axios from "axios"
import { registerForPushNotificationsAsync } from "app/utils/get-pushToken"

export enum Type {
  CARE_GIVER = "CARE_GIVER",
  CLIENT = "CLIENT",
}

/**
 * 회원가입/로그인시 사용된 OAuth 제공자 입니다.
 * 원래 enum 으로 정의하려 했으나, 백엔드팀과의 협의 후, string 값으로 정의하였습니다. - https://care-giver-hq.slack.com/archives/C03E515JKV2/p1686457726838459?thread_ts=1686399709.649689&cid=C03E515JKV2
 */
export type AuthProvider = "google" | "apple" | "kakao" | "naver"

interface UserAuth {
  token: string
  provider: AuthProvider
  email: string
}

type SocialLoginHanderParams = UserAuth

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

    /* 유저 Auth 정보 */
    userAuth: types.frozen<UserAuth>({
      token: "",
      provider: null,
      email: "",
    }),

    /* 유저 상세정보 */
    userDetail: types.frozen<UserDetail>({
      id: null,
      nickname: "",
      phoneNumber: "",
      sex: null,
      birthday: "",
      address: "",
      profileImage: "",
      pushToken: "",
    }),

    /* 인증된 펫시터인지 여부 */
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

    /** 성별 (sex) 정보를 enum 값 대신 한글로 리턴합니다. */
    get sexInKorean() {
      switch (self.userDetail?.sex) {
        case Sex.MALE:
          return "남성"
        case Sex.FEMALE:
          return "여성"
        default:
          return "오류"
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

    /* 유저 Auth정보 쓰기 */
    setUserAuth(value: UserAuth) {
      // 반드시 새 객체를 만들어서 넣어야 합니다. - Immutability 를 지키기 위함임.
      self.userAuth = value
    },

    /* 유저 상세정보 쓰기 */
    setUserDetail(value: UserDetail) {
      // 반드시 새 객체를 만들어서 넣어야 합니다. - Immutability 를 지키기 위함임 .
      self.userDetail = value
    },

    /**
     * getMe API 를 통하여, 받아온 정보를
     * 유저 상세정보 - userDetail 에 저장합니다.
     * */
    async userDetailHandler(token: string) {
      try {
        const { isSuccess, userDetail } = await getMe(token)

        if (!isSuccess) {
          return false
        }

        if (!userDetail) {
          return false
        }
        // 푸시토큰 발급
        const pushToken = await registerForPushNotificationsAsync().then((token) => {
          //? 토큰 발급에 실패한다면 null이 반환되고, 이 때 useDetail.pushToken의 type에 맞춰 ""을 return한다.
          if (token === null) return ""

          //? post api 사용하여 유저 db에 푸시토큰 저장
          postPushToken(token)
          //? mst내에서 사용하기 위해 발급받은 푸시토큰 return
          return token
        })
        // 유저 상세정보 저장
        this.setUserDetail({
          id: userDetail.id,
          nickname: userDetail.nickname,
          phoneNumber: userDetail.phoneNumber,
          sex: userDetail.sex,
          birthday: userDetail.birthday,
          address: userDetail.address,
          profileImage: userDetail.profileImage,
          pushToken: pushToken,
        })

        return true
      } catch (error) {
        console.error("catch 에러!!! - userDetailHandler", error)
        return false
      }
    },

    /**
     * 로그인 (혹은 회원가입) 성공시, 유저 Auth정보를 저장합니다.
     * - 유저 Auth정보: token, provider, email
     *
     * 이후, 유저 상세정보를 저장하는 함수 userDetailHandler 를 호출합니다.
     * - 유저 상세정보: nickname, phoneNumber, sex, birthday, address, profileImage, pushToken
     *  */
    async loginHander(loginRequestBody: LoginRequestBody) {
      try {
        const { isSuccess, token } = await login(loginRequestBody)
        if (!isSuccess) {
          return false
        }

        if (!token) {
          return false
        }

        const isUserDatailHandlerSuccess = await this.userDetailHandler(token)
        if (!isUserDatailHandlerSuccess) {
          return false
        }

        this.setUserAuth({
          token,
          provider: loginRequestBody.provider,
          email: loginRequestBody.email,
        })

        this.setLoggedIn(true)

        await delay(500)
        // @ts-ignore
        navigate("Searching", { screen: "search-screen" })
        return true
        //
      } catch (error) {
        console.error("catch 에러!!! - loginHander", error)
        return false
        //
      }
    },

    /**
     * 카카오 - 구현완료
     * 네이버 [개발중]
     * 애플 [개발중]
     *
     * 소셜 로그인 인증 성공시, 유저 Auth정보를 저장합니다.
     * - 유저 Auth정보: token, provider, email
     *
     * 이후, 유저 상세정보를 저장하는 함수 userDetailHandler 를 호출합니다.
     * - 유저 상세정보: nickname, phoneNumber, sex, birthday, address, profileImage, pushToken
     *  */
    async socialLoginHander({ token, provider, email }: SocialLoginHanderParams) {
      try {
        if (!token) {
          return false
        }

        const isUserDatailHandlerSuccess = await this.userDetailHandler(token)
        if (!isUserDatailHandlerSuccess) {
          return false
        }

        this.setUserAuth({
          token,
          provider,
          email,
        })

        this.setLoggedIn(true)

        await delay(500)
        // @ts-ignore
        navigate("Searching", { screen: "search-screen" })
        return true
        //
      } catch (error) {
        console.error("catch 에러!!! - loginHander", error)
        return false
        //
      }
    },

    /**
     * 로그아웃
     * - UserStoreModel 초기화
     * */
    logoutHandler() {
      //! 중요: 로그인시, axios 기본 설정에 넣어줬던 토큰을 초기화 해야 한다.
      axios.defaults.headers.common["x-jwt"] = ""

      // UserStoreModel 모델 초기화
      this.reset()

      // TODO: provider 마다, 추가로 해야 할 동작이 다를 것임
      /*         
      switch (self.userAuth.provider) {
          case "kakao":
            kakaoLogOut()
            break

          case "naver":
            naverLogOut()
            break

          case "apple":
            break

          case "google":
            break

          default:
            break
        } 
        */
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
