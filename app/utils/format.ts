/**
 금액(number)을 원화 표기(string)로 바꿔준다
*/
export const won = (number: number) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원"

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
