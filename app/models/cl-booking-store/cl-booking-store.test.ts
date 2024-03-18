import { ClBookingStoreModel } from "./cl-booking-store"

test("can be created", () => {
  const instance = ClBookingStoreModel.create({})

  expect(instance).toBeTruthy()
})
