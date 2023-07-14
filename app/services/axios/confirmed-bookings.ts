import axios from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"

export interface Species {
  id: number
  createAt: string
  updatedAt: string
  name: string
  familyType: string
}
export interface Pet {
  id: number
  createAt: string
  updatedAt: string
  name: string
  speciesId: number
  age: number
  sex: string
  images: null
  weight: number
  petType: string
  isNeutralizated: boolean
  birthday: string
  desc: string
  species: Species
}

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
    const response = await axios.get<confirmedBookingssResponse>(
      `${BASE_URL}/care-giver/bookings`,
      CONFIG,
    )

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
