import { StyleProp, ViewStyle } from "react-native"

type ServiceType = "visiting" | "creche"

export interface PastBookingProps {
  profileImage: string | null
  serviceType: ServiceType
  petSitterName: string
  // ? 여기서는 creche | visiting 모두 Date로 통일한다.
  startDate: string
  endDate: string
  isCanceled: boolean
  //   isFavorite: boolean
  style?: StyleProp<ViewStyle>
}
