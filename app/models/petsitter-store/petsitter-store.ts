import { Instance, SnapshotOut, applySnapshot, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { VistingPetsitter, getVisitingCareGiver } from "../../services/api/visiting"
import { alertModal } from "../../utils/alert-modal"
import { ServiceType } from "../review/review"
import { CrechePetsitter, getCrecheCareGiver } from "#api"
import { StateString } from "#components"
import { getRootStore } from "../extensions/get-root-store"
import { streamChatClient } from "../../services/api/stream"

export type ServiceTypeKorean = "방문" | "위탁"

export interface PetsitterModel extends VistingPetsitter, CrechePetsitter {}

type DraftPetsitterModel = PetsitterModel

/**
 * 펫시터 프로필과 관련된 정보들을 관리하는 모델입니다.
 */
export const PetsitterStoreModel = types
  .model("PetsitterStore")
  .props({
    /**
     * DB 에 저장된 펫시터의 serviceType 입니다.
     * 저장된 펫시터가 없다면, null 값을 갖습니다.
     */
    serviceType: types.frozen<ServiceType>(null),

    /**
     * DB 에 저장된 펫시터의 petsitter 입니다.
     * 저장된 펫시터가 없다면, null 값을 갖습니다.
     */
    petsitter: types.frozen<PetsitterModel>(null),

    /**
     * DB 에 펫시터 생성 전, 프론트에서만 임시저장되는 serviceType 값 입니다.
     * 펫시터 등록 이후에는, null 로 초기화 됩니다.
     */
    draftServiceType: types.frozen<ServiceType>(null),

    /**
     * DB 에 펫시터 생성 전, 프론트에서만 임시저장되는 petsitter 객체 입니다.
     * 펫시터 등록 이후에는, null 로 초기화 됩니다.
     */
    draftPetsitter: types.frozen<Partial<DraftPetsitterModel>>(null),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    /**
     * serviceType 값 을 한글로 반환합니다
     */
    get serviceTypeKorean(): ServiceTypeKorean {
      switch (self.serviceType) {
        case "visiting":
          return "방문"
        case "creche":
          return "위탁"
        default:
          return null
      }
    },

    /**
     * petsitter 객체가 있으면 true 를 반환합니다.
     */
    get hasPetsitterProfile() {
      return !!self.petsitter
    },

    get draftServiceTypeKorean(): ServiceTypeKorean {
      switch (self.draftServiceType) {
        case "visiting":
          return "방문"
        case "creche":
          return "위탁"
        default:
          return null
      }
    },

    /**
     * 임시저장된 petsitter 객체가 있으면 true 를 반환합니다.
     */
    get hasDraftPetsitterProfile() {
      return !!self.draftPetsitter
    },

    /**
     * 펫시터 등록단계의 각 상태를 계산한 값 입니다.
     * 1단계 부터 3단계 까지의 상태 "todo", "progress", "done" 를 확인하여 반환합니다.
     */
    get regState(): {
      state1: StateString
      state2: StateString
      state3: StateString
    } {
      let state1: StateString, state2: StateString, state3: StateString

      // 이미 등록한 펫시터가 DB 에 있으면 전부 done
      if (self.petsitter !== null) {
        return { state1: "done", state2: "done", state3: "done" }
      }

      // draftPetsitter - state1
      if (
        !self.draftPetsitter?.address &&
        (!self.draftPetsitter?.serviceVisiting || !self.draftPetsitter.serviceCreche) &&
        (!self.draftPetsitter?.visitingAmenities || !self.draftPetsitter?.crecheAmenities)
      ) {
        state1 = "todo"
      } else if (
        self.draftPetsitter?.address !== "" &&
        (!!self.draftPetsitter?.serviceVisiting || !!self.draftPetsitter.serviceCreche) &&
        (!!self.draftPetsitter?.visitingAmenities || !!self.draftPetsitter?.crecheAmenities)
      ) {
        state1 = "done"
      } else {
        state1 = "progress"
      }

      // draftPetsitter - state2
      if (
        !self.draftPetsitter?.defaultFee &&
        !self.draftPetsitter?.dogMaxUnit &&
        !self.draftPetsitter?.catMaxUnit
      ) {
        state2 = "todo"
      } else if (
        self.draftPetsitter?.defaultFee > 0 &&
        (self.draftPetsitter?.dogMaxUnit !== 0 || self.draftPetsitter?.catMaxUnit !== 0)
      ) {
        state2 = "done"
      } else {
        state2 = "progress"
      }

      // draftPetsitter - state3
      if (!self.draftPetsitter?.title && !self.draftPetsitter?.desc) {
        state3 = "todo"
      } else if (self.draftPetsitter?.title !== "" && self.draftPetsitter?.desc !== "") {
        state3 = "done"
      } else {
        state3 = "progress"
      }

      return { state1, state2, state3 }
    },

    /**
     * 펫시터를 처음 등록하는 유저인지를 판단하는 변수입니다.
     * DB 에 저장된 petsitte 객체가 없고, 임시저장된 petsitte 객체도 없다면
     * 최초로 펫시터를 등록하는 유저로 판단되므로 true 를 반환합니다.
     */
    get isFirstPetsitter() {
      if (self.petsitter === null && self.draftPetsitter === null) {
        return true
      } else {
        return false
      }
    },

    /**
     * 펫시터의 서비스 타입이
     * "방문펫시터" 이면 true 를 반환합니다.
     */
    get 방문펫시터() {
      return self.serviceType === "visiting" || self.draftServiceType === "visiting"
    },

    /**
     * 펫시터의 서비스 타입이
     * "위탁펫시터" 이면 true 를 반환합니다.
     */
    get 위탁펫시터() {
      return self.serviceType === "creche" || self.draftServiceType === "creche"
    },

    /**
     * 강아지를 케어하는 펫시터인지 판단한다.
     * 강아지도 케어하면 true 반환
     */
    get hasDogs() {
      return self.petsitter?.dogMaxUnit > 0
    },

    /**
     * 고양이를 케어하는 펫시터인지 판단한다.
     * 고양이도 케어하면 true 반환
     */
    get hasCats() {
      return self.petsitter?.catMaxUnit > 0
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    /**
     * 이 모델 자체를 리셋합니다.
     * 모든 프로퍼티의 값이 초기화됩니다.
     */
    reset() {
      applySnapshot(self, {})
    },

    setServiceType(value: ServiceType) {
      self.serviceType = value
    },

    setVistingPetsitter(value: VistingPetsitter) {
      this.setPetsitter(value, "visiting")
    },

    setCrechePetsitter(value: CrechePetsitter) {
      this.setPetsitter(value, "creche")
    },

    setPetsitter(value: VistingPetsitter | CrechePetsitter, serviceType: ServiceType) {
      switch (serviceType) {
        case "visiting":
          self.petsitter = {
            ...value,
            serviceCreche: null,
            crecheAmenities: null,
          } as PetsitterModel
          break
        case "creche":
          self.petsitter = {
            ...value,
            serviceVisiting: null,
            visitingAmenities: null,
          } as PetsitterModel
          break
        default:
          break
      }
    },

    setDraftPetsitter(
      value: Partial<VistingPetsitter | CrechePetsitter>,
      serviceType: ServiceType,
    ) {
      switch (serviceType) {
        case "visiting":
          self.setProp("draftPetsitter", {
            ...value,
            images: [],
            promoted: false,
          })
          self.setProp("draftServiceType", "visiting")
          break
        case "creche":
          self.setProp("draftPetsitter", {
            ...value,
            images: value?.images || [],
            promoted: false,
          })
          self.setProp("draftServiceType", "creche")
          break
      }
    },

    resetDraftPetsitter() {
      self.setProp("draftPetsitter", null)
      self.setProp("draftServiceType", null)
    },

    /**
     * DB 에 저장된 petsitter 객체를 요청합니다.
     * 이후, DB 에 객체가 존재하면 이 모델에 petsitter 프로퍼티와 serviceType 프로퍼티에 저장합니다.
     * 존재하지 않는다면, 아무것도 하지 않습니다.
     * 의도된대로 작동하면 true 를 반환합니다.
     */
    async fetchPetsitter() {
      if (self.petsitter) return true // 이미 모델에 petsitter 객체가 저장되어있다면, 더이상 진행하지 않는다.

      const [visitingResult, crecheResult] = await Promise.all([
        getVisitingCareGiver(),
        getCrecheCareGiver(),
      ])

      const isSuccessVisiting = visitingResult.isSuccess
      const visiting = visitingResult?.visiting
      const isSuccessCreche = crecheResult.isSuccess
      const creche = crecheResult?.creche

      if (!isSuccessVisiting) {
        alertModal("Error at PetsitterModel", "방문 펫시터 정보를 불러오는데 실패했습니다.")
        return false
      }

      if (!isSuccessCreche) {
        alertModal("Error at PetsitterModel", "위탁 펫시터 정보를 불러오는데 실패했습니다.")
        return false
      }

      if (visiting || creche) {
        console.log("visiting", visiting)
        console.log("creche", creche)

        if (visiting) {
          this.setServiceType("visiting")
          this.setVistingPetsitter(visiting)
          return true
        }

        if (creche) {
          this.setServiceType("creche")
          this.setCrechePetsitter(creche)
          return true
        }
      } else {
        return false
      }
    },

    /**
     * [케어기버 전용]
     * 보호자와의 채팅방(Channel)을 생성합니다.
     */
    async createChannelWith(otherStreamUserId: string) {
      const rootStore = getRootStore(self)
      const myStreamUserId = rootStore.userStore?.myStreamUserId
      console.log("myStreamUserId >>>", myStreamUserId)
      if (!myStreamUserId) {
        return alertModal(
          "채팅방 생성 실패",
          `myStreamUserId 가 존재하지 않습니다. myStreamUserId: ${myStreamUserId}`,
        )
      }

      // 채팅방 생성
      const channel = streamChatClient.channel("messaging", {
        members: [myStreamUserId, otherStreamUserId],
        // name: parsedEmail,
        // userType: type,
      })
      channel.create()
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type PetsitterStoreType = Instance<typeof PetsitterStoreModel>
export interface PetsitterStore extends PetsitterStoreType {}
type PetsitterStoreSnapshotType = SnapshotOut<typeof PetsitterStoreModel>
export interface PetsitterStoreSnapshot extends PetsitterStoreSnapshotType {}
export const createPetsitterStoreDefaultModel = () => types.optional(PetsitterStoreModel, {})
