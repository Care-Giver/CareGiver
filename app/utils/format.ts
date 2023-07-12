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
 toLocaleString 은 android 에서 작동하지 않는 문제 때문에, 이 함수를 대신 사용한다.
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
 serviceType 값을 한글표기(방문 || 위탁)로 바꿔준다
*/
export const korSvcType = (serviceType: "visit" | "creche") => {
  if (serviceType === "visit") return "방문"
  else if (serviceType === "creche") return "위탁"
  else return null
}

/**
 caregiverType 값을 한글표기(펫시터 || 훈련사)로 바꿔준다
*/
export const korCgType = (caregiverType: "petsitter" | "trainer") => {
  if (caregiverType === "petsitter") return "펫시터"
  else if (caregiverType === "trainer") return "훈련사"
  else return null
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
  return Number.parseFloat(rating.toFixed(1))
}
