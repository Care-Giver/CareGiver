import { CalendarModel } from "./calendar-store"

test("can be created", () => {
  const instance = CalendarModel.create({})

  expect(instance).toBeTruthy()
})
