import { useEffect, useState } from "react"
import { getDevicePermission } from "../../_CLIENT/search-stack/search-screen/getDevicePermission"
import Geolocation from "react-native-geolocation-service"
import { getCrecheAvgPrice, getVisitingAvgPrice } from "#api"
import { alertModal } from "../../../utils/alert-modal"
import { ServiceTypeKorean } from "#models"

/**
 * 이 지역 주변의 평균가 정보를 요청합니다.
 * DB 에 데이터가 부족하여, 평균가가 존재하지 않을 경우
 * 방문은 10,000 원, 위탁은 50,000 원을 기본값으로 반환합니다.
 */
export const useFetchAvgPrice = (serviceTypeKorean: ServiceTypeKorean) => {
  const [avgPriceData, setAvgPriceData] = useState<{
    minAvgPrice: number
    avgPrice: number
    maxAvgPrice: number
  }>(null)

  useEffect(() => {
    const ERROR_PRICES = {
      minAvgPrice: 0,
      avgPrice: 0,
      maxAvgPrice: 0,
    }
    const DEFAULT_PRICES = {
      minAvgPrice: serviceTypeKorean === "방문" ? 10000 : 50000,
      avgPrice: serviceTypeKorean === "방문" ? 10000 : 50000,
      maxAvgPrice: serviceTypeKorean === "방문" ? 10000 : 50000,
    }

    // 현재 위치좌표를 얻어내고, 평균가 API 를 호출한다
    const avgPriceHandler = async () => {
      // 위치 권한 요청
      getDevicePermission(
        "location",
        // 성공시, 현 위치를 좌표로 설정
        () => {
          Geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords
              const getAvgPrice =
                serviceTypeKorean === "방문" ? getVisitingAvgPrice : getCrecheAvgPrice
              getAvgPrice({
                lat: latitude,
                lng: longitude,
              }).then(({ isSuccess, prices, reason }) => {
                if (isSuccess) {
                  setAvgPriceData(prices)
                } else {
                  alertModal("API 호출 실패", "평균 기본 요금 정보를 요청하는 것에 실패하였습니다.")
                  setAvgPriceData(ERROR_PRICES)
                }
              })
            },
            (error) => {
              console.log("error", error)
              alertModal("위치 정보 수집 실패", error.message)
              setAvgPriceData(ERROR_PRICES)
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          )
        },
        // 권한 요청 실패시,
        () => {
          setAvgPriceData(DEFAULT_PRICES)
          alertModal(
            "위치 권한 없음",
            "내 주변 평균 기본 요금를 표시하기 위해 위치 권한이 필요합니다.",
          )
        },
      )
    }

    avgPriceHandler()
  }, [serviceTypeKorean])

  return avgPriceData
}
