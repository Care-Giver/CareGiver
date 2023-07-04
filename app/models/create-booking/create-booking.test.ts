import { CreateBookingModel } from "./create-booking"

test("can be created", () => {
  const instance = CreateBookingModel.create({})

  expect(instance).toBeTruthy()
})
