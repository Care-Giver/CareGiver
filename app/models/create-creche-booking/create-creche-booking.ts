import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { CreateCrecheBookingInput, postCrecheBooking } from "#axios"
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
      }
    },
    setDatePets(startTime: string, endTime: string, pets: number[]) {
      self.postCrecheBooking.startTime = startTime
      self.postCrecheBooking.endTime = endTime
      self.postCrecheBooking.petIds = pets
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
    async setCrechePetsitter(crecheId: number) {},
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
    async setCrecheFee() {},
  }))
  .actions((self) => ({
    async setCrecheFee() {},
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type CreateCrecheBookingType = Instance<typeof CreateCrecheBookingModel>
export interface CreateCrecheBooking extends CreateCrecheBookingType {}
type CreateCrecheBookingSnapshotType = SnapshotOut<typeof CreateCrecheBookingModel>
export interface CreateCrecheBookingSnapshot extends CreateCrecheBookingSnapshotType {}
export const createCreateCrecheBookingDefaultModel = () =>
  types.optional(CreateCrecheBookingModel, {})
