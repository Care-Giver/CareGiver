import { OnCompleteParams } from "@actbase/react-daum-postcode/lib/types"
import { alertModal } from "../../utils/alert-modal"
import axios from "axios"

const KAKAO_REST_API_KEY = "b46e34c330f9952e16cfa4a7a75030e3" // 카카오 케어기버 앱 REST API KEY

/**
 * 카카오 MAP API 를 사용하여,
 * 한글 주소정보로 위도(lat)와 경도(long)를 불러오는 함수
 * @param addressEnglish 영문주소 OnCompleteParams 객체의 addressEnglish 프로퍼티를 사용할 것
 * @returns
 */
export async function addressToCoordinates(address: OnCompleteParams["address"]) {
  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`
  const headers = { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` }

  try {
    const response = await axios.get(url, { headers })
    if (!response.data) {
      alertModal("주소 변환 에러 001", "예상치 못한 문제가 발생했습니다. 잠시후 다시 시도해주세요.")
      return { latitude: 37.2955072, longitude: 126.83539 } //! 에러시, 한양대 에리카 주소 반환
    }

    const { x, y } = response.data.documents[0].address
    const latitude = parseFloat(y) // 위도
    const longitude = parseFloat(x) // 경도
    return { latitude, longitude }
  } catch (error) {
    console.error(error)
    alertModal("주소 변환 에러 002", "예상치 못한 문제가 발생했습니다. 잠시후 다시 시도해주세요.")
    return { latitude: 37.2955072, longitude: 126.83539 } //! 에러시, 한양대 에리카 주소 반환
  }
}
