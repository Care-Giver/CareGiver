import { PetsitterType, ServiceType } from "#models"
import { StyleProp, ViewStyle } from "react-native"

export interface PastBookingProps {
  profileImage: string | null
  serviceType: ServiceType
  petsitterType: PetsitterType
  petsitterId: number
  bookingId: number
  petsitterName: string
  desc: string
  // ? 여기서는 creche | visiting 모두 Date로 통일한다.
  startDate: string
  endDate: string
  isCanceled: boolean
  //   isFavorite: boolean
  style?: StyleProp<ViewStyle>
}
