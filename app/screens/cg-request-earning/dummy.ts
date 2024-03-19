import { ServiceType } from "#components"
import { ServiceTypeKorean } from "#models"

export type BookingType = {
  visOrCre: ServiceTypeKorean
  startTime?: string
  endTime?: string
  fee: number
  isCanceled: boolean
}
export type PaymentType = {
  date: string
  bookings: BookingType[]
}

export const bookings: PaymentType[] = [
  {
    date: "2023-01-01",
    bookings: [
      {
        visOrCre: "방문",
        startTime: "2023-01-01T10:00:00",
        endTime: "2023-01-01T14:00:00",
        fee: 30000,
        isCanceled: false,
      },
      {
        visOrCre: "방문",
        startTime: "2023-01-01T11:00:00",
        endTime: "2023-01-01T13:00:00",
        fee: 25000,
        isCanceled: false,
      },
    ],
  },
  {
    date: "2023-01-02",
    bookings: [
      {
        visOrCre: "방문",
        startTime: "2023-01-02T10:00:00",
        endTime: "2023-01-02T14:00:00",
        fee: 30000,
        isCanceled: true,
      },
    ],
  },
  {
    date: "2023-01-03",
    bookings: [
      {
        visOrCre: "방문",
        startTime: "2023-01-03T10:00:00",
        endTime: "2023-01-03T14:00:00",
        fee: 30000,
        isCanceled: false,
      },
      {
        visOrCre: "위탁",
        startTime: "",
        endTime: "",
        fee: 25000,
        isCanceled: false,
      },
      {
        visOrCre: "방문",
        startTime: "2023-01-03T11:00:00",
        endTime: "2023-01-03T13:00:00",
        fee: 25000,
        isCanceled: false,
      },
    ],
  },
]
