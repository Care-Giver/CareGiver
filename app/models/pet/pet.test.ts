import { PetModel } from "./pet"

test("can be created", () => {
  const instance = PetModel.create({})

  expect(instance).toBeTruthy()
})
