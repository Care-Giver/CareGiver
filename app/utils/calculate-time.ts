import { SelectedTime } from "#navigators"

/**
 * [방문] selectedTime의 start ~ end 간격을 시간 단위로 계산하여 반환하는 함수
 * @param selectedTime
 * @returns
 */
export const calculateHour = (selectedTime: SelectedTime): number => {
  const endTime = new Date(selectedTime.end).getTime()
  const startTime = new Date(selectedTime.start).getTime()
  return Math.ceil((endTime - startTime) / (1000 * 60 * 60))
}

/**
 * [위탁] selectedTime의 start ~ end 간격을 일 단위로 계산하여 반환하는 함수
 * @param selectedTime
 * @returns
 */
export const calculateDay = (selectedTime: SelectedTime): number => {
  const endTime = new Date(selectedTime.end).getTime()
  const startTime = new Date(selectedTime.start).getTime()
  return Math.ceil((endTime - startTime) / (1000 * 60 * 60 * 24)) + 1
}
