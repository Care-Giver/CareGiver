import { Booking } from "../../models"

export interface ReserveDataProps {
  // ? 위탁
  crecheId?: number
  // ? 방문
  visitId?: number

  // ? 펫시터
  petsitterId?: number
  // ? 훈련사
  trainerId?: number

  //   // ? 방문 / 위탁
  //   serviceType: string
  startDate: string
  endDate: string
}

export interface InProgressBookingProps {
  // TODO: 타입..?
  reserveData: any
  onPress?: () => void
  style?: Object
}
