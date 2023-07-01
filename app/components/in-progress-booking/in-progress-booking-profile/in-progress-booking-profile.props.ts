export interface CaregiverDataProps {
  id: number
  name: string
  ratings: number
  reviews: number
  introduce: string
  profileImg: string
  // ? 방문 / 위탁
  serviceType: string
  // ? 펫시터 / 훈련사
  caregiverType: string
}

export interface InProgressBookingProfileProps {
  caregiverData: CaregiverDataProps
  style?: Object
}
