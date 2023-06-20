import { VisitingAvailableTimesModel } from "./visiting-available-times"

test("can be created", () => {
  const instance = VisitingAvailableTimesModel.create({})

  expect(instance).toBeTruthy()
})
