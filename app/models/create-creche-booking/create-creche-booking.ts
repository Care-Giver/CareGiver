import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { CreateCrecheBookingInput, postCrecheBooking } from "#axios"
import { getPetsitterCreches } from "../../services/axios/petsitter"
/**
 * TypeScript 힌트를 위해, Model 에 대한 설명을 여기에 작성해주세요.
 */
export const CreateCrecheBookingModel = types
  .model("CreateCrecheBooking")
  .props({
    postCrecheBooking: types.optional(types.frozen<CreateCrecheBookingInput | null>(), null),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    getItem() {
      console.log(self.postCrecheBooking)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setResponse(response: CreateCrecheBookingInput) {
      self.postCrecheBooking = response
    },
    init() {
      self.postCrecheBooking = {
        crecheId: null,
        userId: null,
        request: "",
        services: [],
        startDate: "",
        endDate: "",
        totalFee: null,
        defalutFee: null,
        petIds: [],
        paymentId: null,
        petToolsLocInfo: "",
        avoidFoodInfo: "",
        bondingTipsInfo: "",
      }
    },

    setDatePets(startDate: string, endDate: string, pets: number[]) {
      const updatedpostCrecheBooking: CreateCrecheBookingInput = {
        startDate: startDate,
        endDate: endDate,
        petIds: pets,
        crecheId: self.postCrecheBooking.crecheId,
        userId: self.postCrecheBooking.userId,
        request: self.postCrecheBooking.request,
        services: self.postCrecheBooking.services,
        paymentId: self.postCrecheBooking.paymentId,
        petToolsLocInfo: self.postCrecheBooking.petToolsLocInfo,
        avoidFoodInfo: self.postCrecheBooking.avoidFoodInfo,
        bondingTipsInfo: self.postCrecheBooking.bondingTipsInfo,
        totalFee: null,
        defalutFee: null,
      }
      self.postCrecheBooking = updatedpostCrecheBooking
    },
    setPetsitter(crecheId: number) {
      const updatedpostCrecheBooking: CreateCrecheBookingInput = {
        crecheId: crecheId,
        userId: self.postCrecheBooking.userId,
        request: self.postCrecheBooking.request,
        services: self.postCrecheBooking.services,
        startDate: self.postCrecheBooking.startDate,
        endDate: self.postCrecheBooking.endDate,
        petIds: self.postCrecheBooking.petIds,
        paymentId: self.postCrecheBooking.paymentId,
        petToolsLocInfo: self.postCrecheBooking.petToolsLocInfo,
        avoidFoodInfo: self.postCrecheBooking.avoidFoodInfo,
        bondingTipsInfo: self.postCrecheBooking.bondingTipsInfo,
        totalFee: null,
        defalutFee: null,
      }
      self.postCrecheBooking = updatedpostCrecheBooking
    },
    setTotalFee(totalFee: number) {
      //? totalFee가 빠질예정입니다.
      //self.postCrecheBooking.totalFee = totalFee
    },
    setServices(services: string[]) {
      const updatedpostCrecheBooking: CreateCrecheBookingInput = {
        crecheId: self.postCrecheBooking.crecheId,
        userId: self.postCrecheBooking.userId,
        request: self.postCrecheBooking.request,
        services: services,
        startDate: self.postCrecheBooking.startDate,
        endDate: self.postCrecheBooking.endDate,
        petIds: self.postCrecheBooking.petIds,
        paymentId: self.postCrecheBooking.paymentId,
        petToolsLocInfo: self.postCrecheBooking.petToolsLocInfo,
        avoidFoodInfo: self.postCrecheBooking.avoidFoodInfo,
        bondingTipsInfo: self.postCrecheBooking.bondingTipsInfo,
        totalFee: null,
        defalutFee: null,
      }
      self.postCrecheBooking = updatedpostCrecheBooking
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async setCrecheBooking(paymentInput: CreateCrecheBookingInput) {
      // const CrecheDays = await getCrecheDays(crecheId)
      // self.CrecheDays = CrecheDays
      await postCrecheBooking(paymentInput)
        .then((res) => {
          self.setResponse(res)
          console.log("res: " + self.postCrecheBooking)
        })
        .catch((res) => console.error(res))
    },
  }))
  .actions((self) => ({
    async setCrechePetsitter(crecheId: number) {
      if (self.postCrecheBooking == null) {
        // self.init()
      }
      await self.setPetsitter(crecheId)
    },
  }))
  .actions((self) => ({
    async setCrecheDatePets(startDate: string, endDate: string, pets: number[]) {
      if (self.postCrecheBooking == null) {
        self.init()
      }
      await self.setDatePets(startDate, endDate, pets)
    },
  }))
  .actions((self) => ({
    async setCrecheRequest() {},
  }))
  .actions((self) => ({
    async setCrecheFeeServices(crecheId) {
      const creche = await getPetsitterCreches(crecheId)
      //TODO api 수정되면 fee관련 삭제해야합니다.
      if (self.postCrecheBooking == null) {
        self.init()
      }
      await self.setTotalFee(creche.defaultFee)

      //* sevices 객체중 serviceName만 모델에 update
      //TODO 아직까지 undefined error 해결하지 못했습니다,,
      const services: string[] = creche.serviceCreche?.map((item) => {
        console.log(item)
        return item.name
      })
      self.setServices(services)
      //await self.setServices(creche.serviceCreche)
    },
  }))
  .actions((self) => ({
    async setUser() {},
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type CreateCrecheBookingType = Instance<typeof CreateCrecheBookingModel>
export interface CreateCrecheBooking extends CreateCrecheBookingType {}
type CreateCrecheBookingSnapshotType = SnapshotOut<typeof CreateCrecheBookingModel>
export interface CreateCrecheBookingSnapshot extends CreateCrecheBookingSnapshotType {}
export const createCreateCrecheBookingDefaultModel = () =>
  types.optional(CreateCrecheBookingModel, {})
