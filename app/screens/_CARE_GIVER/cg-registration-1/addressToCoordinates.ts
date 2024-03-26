import { OnCompleteParams } from "@actbase/react-daum-postcode/lib/types"
import { alertModal } from "../../../utils/alert-modal"
import axios from "axios"
import Config from "react-native-config"

/**
 * 카카오 MAP API 를 사용하여,
 * 한글 주소정보로 위도(lat)와 경도(long)를 불러오는 함수
 * @param addressEnglish 영문주소 OnCompleteParams 객체의 addressEnglish 프로퍼티를 사용할 것
 * @returns
 */
export async function addressToCoordinates(address: OnCompleteParams["address"]) {
  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`
  const headers = { Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}` }

  try {
    const response = await axios.get(url, { headers })
    if (!response.data) {
      alertModal(
        "주소➡️좌표 변환 에러 001",
        "예상치 못한 문제가 발생했습니다. 잠시후 다시 시도해주세요.",
      )
      return { latitude: 37.2955072, longitude: 126.83539 } //! 에러시, 한양대 에리카 주소 반환
    }

    if (response.data.documents.length === 0) {
      alertModal(
        "주소➡️좌표 변환 에러 003",
        "예상치 못한 문제로 인해, 해당 주소의 좌표를 알 수 없습니다. 다른 주소를 입력해주세요.",
      )
      return { latitude: 37.2955072, longitude: 126.83539 } //! 에러시, 한양대 에리카 주소 반환
    }

    const { x, y } = response.data.documents[0].address
    const latitude = parseFloat(y) // 위도
    const longitude = parseFloat(x) // 경도
    return { latitude, longitude }
  } catch (error) {
    console.error(error)
    alertModal(
      "주소➡️좌표 변환 에러 002",
      "예상치 못한 문제가 발생했습니다. 잠시후 다시 시도해주세요.",
    )
    return { latitude: 37.2955072, longitude: 126.83539 } //! 에러시, 한양대 에리카 주소 반환
  }
}

interface Location {
  lat: number
  lng: number
}
/**
 * 카카오 MAP API 를 사용하여,
 * 위도(lat)와 경도(long) 좌표 정보로 한글 주소정보를 불러오는 함수
 * @param body Location
 * @return 한글 주소
 */
export async function coordinatesToAddress(body: Location) {
  const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${body.lng}&y=${body.lat}`
  const headers = { Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}` }

  try {
    const response = await axios.get(url, { headers })
    console.log("response", response)
    if (!response.data) {
      alertModal(
        "좌표➡️주소 변환 에러 001",
        "예상치 못한 문제가 발생했습니다. 잠시후 다시 시도해주세요.",
      )
      return "한양대학로 55" //! 에러시, 한양대 에리카 주소 반환
    }

    if (response.data.documents.length === 0) {
      alertModal(
        "좌표➡️주소 변환 에러 003",
        "예상치 못한 문제로 인해, 현재 좌표의 주소를 알 수 없습니다. 다른 주소를 입력해주세요.",
      )
      return "한양대학로 55" //! 에러시, 한양대 에리카 주소 반환
    }

    return response.data.documents[0].address_name
  } catch (error) {
    console.error(error)
    alertModal(
      "좌표➡️주소 변환 에러 002",
      "예상치 못한 문제가 발생했습니다. 잠시후 다시 시도해주세요.",
    )
    return "한양대학로 55" //! 에러시, 한양대 에리카 주소 반환
  }
}
