import axios from "axios"
import { BASE_URL, GeneralResponse } from "./axios-config"
import { alertModal } from "../../utils/alert-modal"
import { Pet, PetDetail } from "./pets"

export enum BookingStatus {
  WAITING = "Waiting", // 승인 대기
  PENDING = "Pending", // 승인 허가 이후 서비스 전까지
  PROCEEDING = "Proceeding", // 서비스 진행중
  COMPLETE = "Complete", // 서비스 완료
  CANCEL = "Cancel", // 유저가 예약 승낙 이후 취소한 경우
  ERASE = "Erase", // 위탁 장소 삭제됨
  REJECT = "Reject", // 예약을 거절한 경우
}

export type CgBooking = {
  // 공통 속성
  name: string
  services: string[]
  pets: PetDetail[]
  address: string
  status: BookingStatus
} & {
  // 위탁 전용
  crecheBookingId: number
  startDate: string
  endDate: string
} & {
  // 방문 전용
  visitingBookingId: number
  startTime: string
  endTime: string
}

type ReceivedBooking = CgBooking

export type ConfirmedBooking = Omit<CgBooking, "status"> & {
  status: BookingStatus.PENDING | BookingStatus.PROCEEDING
}

export type WaitingBooking = Omit<CgBooking, "status"> & {
  status: BookingStatus.WAITING
}

export type RejectedBooking = Omit<CgBooking, "status"> & {
  status: BookingStatus.REJECT
}

interface GetConfirmedBookingsResponse extends GeneralResponse {
  confirmedBookings: ConfirmedBooking[] | []
}
type GetConfirmedBookingsResult =
  | {
      isSuccess: true // 성공
      confirmedBookings: ConfirmedBooking[]
    }
  | {
      isSuccess: false // 실패
      confirmedBookings: []
    }
/**
 * [케어기버 전용 API]
 * 현재 로그인한 펫시터 유저의 예약 목록 중에서,
 * (Pending - 수락함, Proceeding - 진행중) 에 해당하는 "확정된 예약" 목록을 가져옵니다.
 */
export const getConfirmedBookings = async (): Promise<GetConfirmedBookingsResult> => {
  try {
    const response = await axios.get<GetConfirmedBookingsResponse>(
      `${BASE_URL}/care-giver/confirmed-bookings`,
    )
    if (!response.data.ok) {
      alertModal("수락한 예약 목록을 읽어오는데 실패했습니다.", `${response.data.error}`)
      return { isSuccess: false, confirmedBookings: [] }
    }
    return { isSuccess: true, confirmedBookings: response.data.confirmedBookings }
  } catch (error) {
    console.error("catch 에러!!!", error)
    alertModal("수락한 예약 목록을 읽어오는데 실패했습니다.", `catch: ${error?.message}`)
    return { isSuccess: false, confirmedBookings: [] }
  }
}

interface GetAllBookingsResponse extends GeneralResponse {
  receivedBookings: ReceivedBooking[] | []
}
type GetAllBookingsResult =
  | {
      isSuccess: true // 성공
      receivedBookings: ReceivedBooking[]
    }
  | {
      isSuccess: false // 실패
      receivedBookings: []
    }
/**
 * [케어기버 전용 API]
 * 현재 로그인한 펫시터 유저가 받은 "모든" 예약 목록을 가져옵니다.
 */
export const getAllBookings = async (): Promise<GetAllBookingsResult> => {
  try {
    const response = await axios.get<GetAllBookingsResponse>(
      `${BASE_URL}/care-giver/all-bookings`,
      { headers: { "Cache-Control": "no-store" } }, //! DO NOT REMOVE@
    )
    if (!response.data.ok) {
      alertModal("모든 예약 목록을 읽어오는데 실패했습니다.", `${response.data.error}`)
      return { isSuccess: false, receivedBookings: [] }
    }
    return { isSuccess: true, receivedBookings: response.data.receivedBookings }
  } catch (error) {
    console.error("catch 에러!!!", error)
    alertModal("모든 예약 목록을 읽어오는데 실패했습니다.", `catch: ${error?.message}`)
    return { isSuccess: false, receivedBookings: [] }
  }
}
