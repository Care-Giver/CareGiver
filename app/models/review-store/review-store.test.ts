import { ReviewStoreModel } from "./review-store"

test("can be created", () => {
  const instance = ReviewStoreModel.create({})

  expect(instance).toBeTruthy()
})
