import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { CreateVisitingBookingInput, postVisitingBooking } from "#axios"
import { PetsitterVisiting, getPetsitterVisitings } from "../..//services/axios/petsitter"

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
      self.postVisitingBooking.startTime = startTime
      self.postVisitingBooking.endTime = endTime
      self.postVisitingBooking.petIds = pets
    },
    setPetsitter(visitingId: number) {
      self.postVisitingBooking.visitingId = visitingId
    },
    setTotalFee(totalFee: number) {
      //? totalFee가 빠질예정입니다.
      //self.postVisitingBooking.totalFee = totalFee
    },
    setServices(services: string) {
      self.postVisitingBooking.services.push(services)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async setVisitingBooking(paymentInput: CreateVisitingBookingInput) {
      // const CrecheDays = await getCrecheDays(crecheId)
      // self.CrecheDays = CrecheDays
      await postVisitingBooking(paymentInput)
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
        //* ???왜 undefinde 뜨지?
        const arr = visiting.serviceVisiting.map((item) => {
          console.log(item)
          self.setServices(item.name)
        })
        console.log(arr)
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
