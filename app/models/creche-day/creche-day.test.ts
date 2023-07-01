import { CrecheDayModel } from "./creche-day"

test("can be created", () => {
  const instance = CrecheDayModel.create({})

  expect(instance).toBeTruthy()
})
