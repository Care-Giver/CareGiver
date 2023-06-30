export interface CaregiverDataProps {
  visitingId?: number
  crecheId?: number
  petSitterName: string
  ratings: number
  reviewCount: number
  desc: string
  profileImage: string
}

export interface InProgressBookingProfileProps {
  caregiverData: CaregiverDataProps
  style?: Object
}
