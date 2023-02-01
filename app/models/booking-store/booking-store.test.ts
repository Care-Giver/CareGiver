import { BookingStoreModel } from "./booking-store"

test("can be created", () => {
  const instance = BookingStoreModel.create({})

  expect(instance).toBeTruthy()
})
