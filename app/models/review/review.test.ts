import { ReviewModel } from "./review"

test("can be created", () => {
  const instance = ReviewModel.create({})

  expect(instance).toBeTruthy()
})
