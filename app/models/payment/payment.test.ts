import { PaymentModel } from "./payment"

test("can be created", () => {
  const instance = PaymentModel.create({})

  expect(instance).toBeTruthy()
})
