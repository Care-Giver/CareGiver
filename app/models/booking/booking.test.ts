import { BookingModel } from "./booking"

test("can be created", () => {
  const instance = BookingModel.create({})

  expect(instance).toBeTruthy()
})
