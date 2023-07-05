import { CreateCrecheBookingModel } from "./create-creche-booking"

test("can be created", () => {
  const instance = CreateCrecheBookingModel.create({})

  expect(instance).toBeTruthy()
})
