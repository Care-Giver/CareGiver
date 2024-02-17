import { CgBookingStoreModel } from "./cg-booking-store"

test("can be created", () => {
  const instance = CgBookingStoreModel.create({})

  expect(instance).toBeTruthy()
})
