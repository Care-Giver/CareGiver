import { ClBookingModel } from "./cl-booking"

test("can be created", () => {
  const instance = ClBookingModel.create({})

  expect(instance).toBeTruthy()
})
