import { FavoriteModel } from "./favorite"

test("can be created", () => {
  const instance = FavoriteModel.create({})

  expect(instance).toBeTruthy()
})
