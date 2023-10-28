import _ from "lodash"

const KOR_LAT_MIN = 33
const KOR_LAT_MAX = 39

const KOR_LNG_MIN = 125
const KOR_LNG_MAX = 132

type Coordinates = {
  lat: number
  lng: number
}

/**
 * 입력된 좌표가 한국 내 좌표인지 확인한다.
 * *참고: (TODO) 더 나은 알고리즘:https://velog.io/@altmshfkgudtjr/%EC%A2%8C%ED%91%9C%EB%A5%BC-%ED%86%B5%ED%95%B4%EC%84%9C-%EA%B5%AD%EB%82%B4%EC%99%B8-%ED%8C%90%EB%B3%84, https://stackoverflow.com/questions/10962379/how-to-check-if-a-point-is-inside-a-rectangle
 * @param
 * @returns 한국 내 좌표이면 true 반환
 */
export const isInKorea = ({ lat, lng }: Coordinates): boolean => {
  return _.inRange(KOR_LAT_MIN, lat, KOR_LAT_MAX) && _.inRange(KOR_LNG_MIN, lng, KOR_LNG_MAX)
}
