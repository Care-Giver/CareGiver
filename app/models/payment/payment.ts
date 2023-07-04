import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../extensions/with-set-prop-action"
import { CreatePaymentInput, postPayment } from "../../services/axios/payment"
/**
 * TypeScript 힌트를 위해, Model 에 대한 설명을 여기에 작성해주세요.
 */
export const PaymentModel = types
  .model("Payment")
  .props({ payment: types.optional(types.frozen<CreatePaymentInput | null>(), null) })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setResponse(response: CreatePaymentInput) {
      self.payment = response
    },
  }))
  .actions((self) => ({
    async setPayment(paymentInput: CreatePaymentInput) {
      // const CrecheDays = await getCrecheDays(crecheId)
      // self.CrecheDays = CrecheDays
      await postPayment(paymentInput)
        .then((res) => {
          self.setResponse(res)
          console.log("res: " + self.payment)
        })
        .catch((res) => console.error(res))
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type PaymentType = Instance<typeof PaymentModel>
export interface Payment extends PaymentType {}
type PaymentSnapshotType = SnapshotOut<typeof PaymentModel>
export interface PaymentSnapshot extends PaymentSnapshotType {}
export const createPaymentDefaultModel = () => types.optional(PaymentModel, {})
