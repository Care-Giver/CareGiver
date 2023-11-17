import { StyleProp, ViewStyle } from "react-native"

export interface CaregiverDataProps {
  visitingId?: number
  crecheId?: number
  petSitterName: string
  ratings: number
  reviewCount: number
  desc: string
  profileImage: string | null
}

export interface InProgressBookingProfileProps {
  caregiverData: CaregiverDataProps
  style?: StyleProp<ViewStyle>
}
