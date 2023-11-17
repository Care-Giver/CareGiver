import { EtcStoreModel } from "./etc-store"

test("can be created", () => {
  const instance = EtcStoreModel.create({})

  expect(instance).toBeTruthy()
})
