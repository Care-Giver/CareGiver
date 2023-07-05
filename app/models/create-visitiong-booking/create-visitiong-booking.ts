import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { CreateVisitingBookingInput, postVisitingBooking } from "#axios"
import { getPetsitterCreches, getPetsitterVisitings } from "../..//services/axios/petsitter"
import { number } from "mobx-state-tree/dist/internal"

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
    getItem() {
      console.log(self.postVisitingBooking)
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
      //self.postVisitingBooking.totalFee = totalFee
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
        /*
      //TODO api 수정되면 fee, services추가
      const totalFee: number =
        Number((await getPetsitterVisitings(visitingId)).defaultFee) *
        (Number(self.postVisitingBooking.endDate.substring(8, 10)) -
          Number(self.postVisitingBooking.startDate.substring(8, 10))) // + extrafee
      if (self.postVisitingBooking == null) {
        self.init()
      }
    await self.setTotalFee(totalFee)*/
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
