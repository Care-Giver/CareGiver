import { ConfirmedBookingsModel } from "./confirmed-bookings"

test("can be created", () => {
  const instance = ConfirmedBookingsModel.create({})

  expect(instance).toBeTruthy()
})
