import { PetsitterStoreModel } from "./petsitter-store"

test("can be created", () => {
  const instance = PetsitterStoreModel.create({})

  expect(instance).toBeTruthy()
})
