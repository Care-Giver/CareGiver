import { ServiceType, ServiceTypeKorean } from "#models"
import { format, parseISO } from "date-fns"
import { ko } from "date-fns/locale"

/**
 금액(number)을 원화 표기(string)로 바꿔준다
 ex: 27000 -> 27,000원
 input: number, output: string
 TextField 컴포넌트에 사용하지말것! Text 컴포넌트에만 사용할것!
*/
export const won = (number: number): string =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"

/**
 숫자 문자열(number string) 에 세자리마다 "," 를 삽입한다.
 ex: 27000 -> 27,000
 input, output 모두 string 임을 주의할 것.
 Number.toLocaleString() 은 android 에서 작동하지 않는 문제 때문에, 이 함수를 대신 사용한다.
*/
export const price = (_numberString: string): string => {
  //* 값에 이미 comma (,) 가 포함되어 있다면, 모두 제거
  const numberString = _numberString.replace(/,/g, "")

  //* 정규표현식
  //? This regex is used to match every digit that is followed by groups of 3 digits (except the last group) and replace it with that digit followed by a comma.
  const regex = /(\d)(?=(\d{3})+(?!\d))/g

  //* 사용자가 숫자 문자열 (number string) 값만 입력했는지 확인
  //? -> 만약 number string 이 아닌 string 을 입력한 경우에는, "" (empty string) 리턴
  if (!/^-?\d+$/.test(numberString)) return ""

  //? $1 refers to the matched group of digits. The `,` is a literal comma that is inserted between the matched group of digits and the following group of digits (if any). So $1, means that the matched group of digits should be followed by a comma.
  return numberString.replace(regex, "$1,")
}

/**
 *
 * @param millisecond UTC millisecond 값. 예) 1686787200000
 * @return YYYY-MM-DDTHH:MM:SS 문자열. 예) 2023-06-15T00:00:00
 */
export function msToTimestamp(millisecond: number): string {
  const date = new Date(millisecond)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const seconds = String(date.getSeconds()).padStart(2, "0")

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
}

/**
 *
 * @param rating 별점을 나타내는 실수
 * @return 소숫점 아래 둘째 자리에서 반올림한 결과. 예) 2.5712 -> 2.6
 */
export function ratingRound(rating: number): number {
  if (typeof rating !== "number") return 0

  return Number.parseFloat(rating.toFixed(1))
}

// 맨 마지막 글자에 받침이 있는지 찾아서 있다면 true, 없다면 false 를 반환
function isEndWithConsonant(korStr: string) {
  const finalChrCode = korStr.charCodeAt(korStr.length - 1)
  // 0 = 받침 없음, 그 외 = 받침 있음
  const finalConsonantCode = (finalChrCode - 44032) % 28
  return finalConsonantCode !== 0
}

/**
 * 을/를 덧붙히기
 * @param korStr "한글" 스트링!
 * @returns "을" 또는 "를"이 더해진 한글 스트링. 예) "밥" -> "밥을", "바다" -> "바다를"
 */
export function appendEulReul(korStr: string) {
  return korStr + (isEndWithConsonant(korStr) ? "을" : "를")
}

/**
 * Date object 를
 * YY.MM.DD 형태 날짜 표기의 string 으로 변환 한다.
 */
export const formatDate = (date: Date): string => {
  const formatted =
    date.getFullYear().toString().slice(2) +
    "." +
    (date.getMonth() + 1 < 10 ? "0" : "") +
    (date.getMonth() + 1).toString() +
    "." +
    (date.getDate() < 10 ? "0" : "") +
    date.getDate().toString()
  return formatted
}

type FormatScheduleProps = {
  start: string // 케어 시작 시각 ISO date string: "2022-12-31T23:59:59.999Z"
  end: string // 케어 종료 시각 ISO date string: "2022-12-31T23:59:59.999Z"
  serviceType?: ServiceType
  serviceTypeKorean?: ServiceTypeKorean
}
/**
 * 케어 일정을 변환 해줍니다.
 * 예)
 * - 인풋
 *   start: "2022-09-26T10:00:00.000Z"
 *   end: "2022-09-26T14:00:00.000Z"
 *   serviceTypeKorean: "방문"
 *
 * - 결과
 *   23.09.26(월) 10시-14시
 */
export const formatSchedule = (props: FormatScheduleProps) => {
  const { start, end, serviceType, serviceTypeKorean } = props
  let schedule = ""
  switch (serviceType || serviceTypeKorean) {
    case "creche":
    case "위탁":
      //! replace("Z", "+09:00") 는 현재 케어기버 DB 에 Time Zone Offset 이 없기 때문에 추가해준 것이다.
      //TODO: DB 규칙 바뀌면, 코드 수정할 것.
      schedule = `${format(parseISO(start.replace("Z", "+09:00")), "yy.MM.dd(eee)", {
        locale: ko,
      })} - ${format(parseISO(end.replace("Z", "+09:00")), "yy.MM.dd(eee)", {
        locale: ko,
      })}`
      break
    case "visiting":
    case "방문":
      schedule = `${format(parseISO(start.replace("Z", "+09:00")), "yy.MM.dd(eee) HH:mm", {
        locale: ko,
      })} - ${format(parseISO(end.replace("Z", "+09:00")), "HH:mm", {
        locale: ko,
      })}`
      break
    default:
      schedule = "ERR"
      break
  }
  return schedule
}
