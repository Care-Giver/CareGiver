import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { CreateVisitingBookingInput, postVisitingBooking } from "#axios"
import { PetsitterVisiting, getPetsitterVisitings } from "../..//services/axios/petsitter"
// import { delay } from "../"
/**
 * TypeScript 힌트를 위해, Model 에 대한 설명을 여기에 작성해주세요.
 */
export const CreateVisitiongBookingModel = types
  .model("CreateVisitiongBooking")
  .props({
    postVisitingBooking: types.optional(types.frozen<CreateVisitingBookingInput | null>(), null),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    getItem(item: PetsitterVisiting) {
      console.log("item", item)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setResponse(response: CreateVisitingBookingInput) {
      self.postVisitingBooking = response
    },
    init() {
      self.postVisitingBooking = {
        visitingId: null,
        userId: null,
        request: "",
        services: [],
        destination: "",
        startTime: [""],
        endTime: [""],
        petIds: [],
        paymentId: null,
        petToolsLocInfo: "",
        avoidFoodInfo: "",
        bondingTipsInfo: "",
      }
    },
    setDatePets(startTime: string[], endTime: string[], pets: number[]) {
      const updatedPostVisitingBooking: CreateVisitingBookingInput = {
        startTime: startTime,
        endTime: endTime,
        petIds: pets,
        visitingId: self.postVisitingBooking.visitingId,
        userId: self.postVisitingBooking.userId,
        request: self.postVisitingBooking.request,
        services: self.postVisitingBooking.services,
        destination: self.postVisitingBooking.destination,
        paymentId: self.postVisitingBooking.paymentId,
        petToolsLocInfo: self.postVisitingBooking.petToolsLocInfo,
        avoidFoodInfo: self.postVisitingBooking.avoidFoodInfo,
        bondingTipsInfo: self.postVisitingBooking.bondingTipsInfo,
      }
      self.postVisitingBooking = updatedPostVisitingBooking
    },
    setPetsitter(visitingId: number) {
      const updatedPostVisitingBooking: CreateVisitingBookingInput = {
        visitingId: visitingId,
        userId: self.postVisitingBooking.userId,
        request: self.postVisitingBooking.request,
        services: self.postVisitingBooking.services,
        destination: self.postVisitingBooking.destination,
        startTime: self.postVisitingBooking.startTime,
        endTime: self.postVisitingBooking.endTime,
        petIds: self.postVisitingBooking.petIds,
        paymentId: self.postVisitingBooking.paymentId,
        petToolsLocInfo: self.postVisitingBooking.petToolsLocInfo,
        avoidFoodInfo: self.postVisitingBooking.avoidFoodInfo,
        bondingTipsInfo: self.postVisitingBooking.bondingTipsInfo,
      }
      self.postVisitingBooking = updatedPostVisitingBooking
    },
    setTotalFee(totalFee: number) {
      //? totalFee가 빠질예정입니다.
      //self.postVisitingBooking.totalFee = totalFee
    },
    setServices(services: string[]) {
      const updatedPostVisitingBooking: CreateVisitingBookingInput = {
        visitingId: self.postVisitingBooking.visitingId,
        userId: self.postVisitingBooking.userId,
        request: self.postVisitingBooking.request,
        services: services,
        destination: self.postVisitingBooking.destination,
        startTime: self.postVisitingBooking.startTime,
        endTime: self.postVisitingBooking.endTime,
        petIds: self.postVisitingBooking.petIds,
        paymentId: self.postVisitingBooking.paymentId,
        petToolsLocInfo: self.postVisitingBooking.petToolsLocInfo,
        avoidFoodInfo: self.postVisitingBooking.avoidFoodInfo,
        bondingTipsInfo: self.postVisitingBooking.bondingTipsInfo,
      }
      self.postVisitingBooking = updatedPostVisitingBooking
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async setVisitingBooking(visitingInput: CreateVisitingBookingInput) {
      // const CrecheDays = await getCrecheDays(crecheId)
      // self.CrecheDays = CrecheDays
      await postVisitingBooking(visitingInput)
        .then((res) => {
          self.setResponse(res)
          console.log("res: " + self.postVisitingBooking)
        })
        .catch((res) => console.error(res))
    },
  }))
  .actions((self) => ({
    async setVisitingPetsitter(visitingId: number) {
      if (self.postVisitingBooking == null) {
        self.init()
      }
      await self.setPetsitter(visitingId)
    },
  }))
  .actions((self) => ({
    async setVisitingDatePets(startTime: string[], endTime: string[], pets: number[]) {
      if (self.postVisitingBooking == null) {
        self.init()
      }
      await self.setDatePets(startTime, endTime, pets)
    },
  }))
  .actions((self) => ({
    setVisitingRequest() {},
  }))
  .actions((self) => ({
    async setVisitingFeeServices(visitingId: number) {
      {
        const visiting: PetsitterVisiting = await getPetsitterVisitings(visitingId)

        //await delay(1000)

        console.log("visiting on MST", visiting)

        self.getItem(visiting)

        //TODO api 수정되면 fee관련 삭제해야합니다.
        {
          /*const totalFee: number =
          Number((await getPetsitterVisitings(visitingId)).defaultFee) *
          (Number(self.postVisitingBooking.endTime[0].substring(8, 10)) -
      Number(self.postVisitingBooking.startTime[0].substring(8, 10)))*/
        } // + extrafee
        if (self.postVisitingBooking == null) {
          self.init()
        }
        //await self.setTotalFee(totalFee)
        //* sevices 객체중 serviceName만 모델에 update
        //TODO 아직까지 undefined error 해결하지 못했습니다,,
        const services: string[] = visiting.serviceVisiting?.map((item) => {
          console.log(item)
          return item.name
        })
        self.setServices(services)
      }
    },
  }))
  .actions((self) => ({
    set() {},
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type CreateVisitiongBookingType = Instance<typeof CreateVisitiongBookingModel>
export interface CreateVisitiongBooking extends CreateVisitiongBookingType {}
type CreateVisitiongBookingSnapshotType = SnapshotOut<typeof CreateVisitiongBookingModel>
export interface CreateVisitiongBookingSnapshot extends CreateVisitiongBookingSnapshotType {}
export const createCreateVisitiongBookingDefaultModel = () =>
  types.optional(CreateVisitiongBookingModel, {})
