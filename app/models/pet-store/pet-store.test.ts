import { PetStoreModel } from "./pet-store"

test("can be created", () => {
  const instance = PetStoreModel.create({})

  expect(instance).toBeTruthy()
})
