import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import {
  CrecheAmenity,
  CrecheService,
  VisitingAmenity,
  VisitingService,
  getCrecheAmenities,
  getCrecheServices,
  getVisitingAmenities,
  getVisitingServices,
} from "#axios"
import { alertModal } from "../../utils/alert-modal"
import _ from "lodash"

type Service = {
  visitingServices: VisitingService[]
  crecheServices: CrecheService[]
}

type Amenity = {
  visitingAmenities: VisitingAmenity[]
  crecheAmenities: CrecheAmenity[]
}

/**
 * 기타 잡다구리 정보를 저장하는 Store
 * TODO: Polling 을 통해 주기적으로 정보를 업데이트 해야 합니다.
 */
export const EtcStoreModel = types
  .model("EtcStore")
  .props({
    /**
     * 케어기버 DB Service 객체
     */
    service: types.frozen<Service>(null),
    /**
     * 케어기버 DB Amenity 객체
     */
    amenity: types.frozen<Amenity>(null),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get hasService() {
      return !!self.service
    },

    get hasAmenity() {
      return !!self.amenity
    },

    get visitingServices() {
      return self.service.visitingServices
    },

    get crecheServices() {
      return self.service.crecheServices
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    /**
     * DB 에 있는 서비스 객체를 가져옵니다.
     * 이후, MST 에 저장합니다.
     * @returns boolean 성공여부
     */
    async fetchService() {
      const [visitingResult, crecheResult] = await Promise.all([
        getVisitingServices(),
        getCrecheServices(),
      ])

      const isSuccessVisiting = visitingResult.isSuccess
      const visitingServices = visitingResult?.visitingServices
      const isSuccessCreche = crecheResult.isSuccess
      const crecheServices = crecheResult?.crecheServices

      if (!isSuccessVisiting) {
        alertModal("Error at EtcStoreModel", "방문 서비스 목록을 불러오는데 실패했습니다.")
        return false
      }

      if (!isSuccessCreche) {
        alertModal("Error at EtcStoreModel", "위탁 서비스 목록을 불러오는데 실패했습니다.")
        return false
      }

      self.setProp("service", {
        visitingServices,
        crecheServices,
      })
      return true
    },

    /**
     * DB 에 있는 편의시설 객체를 가져옵니다.
     * 이후, MST 에 저장합니다.
     * @returns boolean 성공여부
     */
    async fetchAmenity() {
      const [visitingResult, crecheResult] = await Promise.all([
        getVisitingAmenities(),
        getCrecheAmenities(),
      ])

      const isSuccessVisiting = visitingResult.isSuccess
      const visitingAmenities = _.orderBy(visitingResult?.visitingAmenities, "id", "asc")
      const isSuccessCreche = crecheResult.isSuccess
      const crecheAmenities = _.orderBy(crecheResult?.crecheAmenities, "id", "asc")

      if (!isSuccessVisiting) {
        alertModal("Error at EtcStoreModel", "방문 편의시설 목록을 불러오는데 실패했습니다.")
        return false
      }

      if (!isSuccessCreche) {
        alertModal("Error at EtcStoreModel", "위탁 편의시설 목록을 불러오는데 실패했습니다.")
        return false
      }

      self.setProp("amenity", {
        visitingAmenities,
        crecheAmenities,
      })
      return true
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type EtcStoreType = Instance<typeof EtcStoreModel>
export interface EtcStore extends EtcStoreType {}
type EtcStoreSnapshotType = SnapshotOut<typeof EtcStoreModel>
export interface EtcStoreSnapshot extends EtcStoreSnapshotType {}
export const createEtcStoreDefaultModel = () => types.optional(EtcStoreModel, {})
