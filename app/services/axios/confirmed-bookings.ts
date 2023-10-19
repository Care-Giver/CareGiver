import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"
import { Pet } from "./pets"

export interface ConfirmedBookings {
  bookingId: number
  startTime: string
  endTime: string
  name: string
  services: string[]
  pets: Pet[]
  address: string
}

interface confirmedBookingssResponse extends GeneralResponse {
  confirmedBookings: ConfirmedBookings[]
}

/**
 * 로그인한 유저의 모든 위탁 예약을 읽어온다.
 * @returns {Promise<confirmedBookingss>}
 */
export const getconfirmedBookings = async (): Promise<ConfirmedBookings[]> => {
  try {
    const response = await axios.get<confirmedBookingssResponse>(`${BASE_URL}/care-giver/bookings`)

    if (!response.data.ok) {
      const error = response.data.error
      console.error("response.data.error 에러!!!", error)
      // @ts-ignore
      return error
    }

    // console.log("response", response)
    console.log("response.data", response.data)
    // console.log("response.data.confirmedBookingss", response.data.confirmedBookingss)
    return response.data.confirmedBookings
  } catch (error) {
    console.error("catch 에러!!!", error)
    return []
  }
}
