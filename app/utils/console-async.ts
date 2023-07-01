import { delay } from "./delay"

/**
 * 비동기 console.log 함수 입니다 :)
 * @param message 콘솔 메시지
 * @param ms 지연시간 (밀리세컨드)
 */
export const consoleLogAsync = async (message: string, ms: number) => {
  await delay(ms)
  console.log(message)
}

/**
 * 비동기 console.info 함수 입니다 :)
 * @param message 콘솔 메시지
 * @param ms 지연시간 (밀리세컨드)
 */
export const consoleInfoAsync = async (message: string, ms: number) => {
  await delay(ms)
  console.info(message)
}

/**
 * 비동기 console.warn 함수 입니다 :)
 * @param message 콘솔 메시지
 * @param ms 지연시간 (밀리세컨드)
 */
export const consoleWarnAsync = async (message: string, ms: number) => {
  await delay(ms)
  console.warn(message)
}
