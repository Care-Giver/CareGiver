import { CurrentBooking } from "#axios"

export interface InProgressBookingProps {
  currentBooking: CurrentBooking
  onPress?: () => void
  style?: Object
}
