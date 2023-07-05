import { CreateVisitiongBookingModel } from "./create-visitiong-booking"

test("can be created", () => {
  const instance = CreateVisitiongBookingModel.create({})

  expect(instance).toBeTruthy()
})
