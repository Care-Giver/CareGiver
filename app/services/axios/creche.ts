import axios, { AxiosError, AxiosResponse } from "axios"
import { BASE_URL, CONFIG, GeneralResponse } from "./axios-config"
import { Platform } from "react-native"
import { CharacterApi } from "../api/character-api"
import { Api } from "../api/api"

interface ExtraSizeFee {
  SMALL: number
  MEDIUM: number
  LARGE: number
}

interface Creche {
  title: string
  address: string
  location: "(127, 38)"
  totalFee: number
  desc: string
  maxUnit: number
  handleType: string[]
  roomType: string
  services: string[]
  images: {
    imageUrl: string
    desc: string
  }
  hiredNumber: number
  star: number
  defaultFee: number
  extraSizeFee: ExtraSizeFee
  promoted: boolean
}

interface NewCreche {
  userId: number
  title: string
  address: string
  detailAddress: string
  desc: string
  maxUnit: number
  handleType: string[]
  roomType: string
  services: string[]
  images: {
    imageUrl: string
    desc: string
  }
  defaultFee: number
  extraSizeFee: ExtraSizeFee
  promoted: boolean
  facilities: string[]
}

interface CrecheResponse extends GeneralResponse {
  creche: Creche
}

interface NewCrecheResponse extends GeneralResponse {
  crecheId: number
}

/**
 * 입력받은 위탁장소 id에 맞는 위탁장소 정보를 리턴한다.
 * @returns {Promise<Creche>}
 */
export const getCreche = async (crecheId: number): Promise<Creche> => {
  try {
    const response = await axios.get<CrecheResponse>(`${BASE_URL}/creche/${crecheId}`, CONFIG)
    if (!response.data.ok) {
      const error = response.data.error
      console.error("response.data.error 에러!!!", error)
      // @ts-ignore
      return null
    }
    console.log("response", response)
    console.log("response.data", response.data)
    console.log("response.data.creche", response.data.creche)
    return response.data.creche
  } catch (error) {
    console.error("Evoked on", Platform.OS)
    console.error("ERROR MSG", error.message)
    console.error("catch 에러!!!", error.toJSON())
    return null
  }

  // axios - ver2
  /*   axios
    .get<CrecheResponse>(`${BASE_URL}/creche/${crecheId}`, {
      headers: { "x-jwt": USER_TOKEN, Accept: "Application/json" },
      data: undefined,
    })
    .then((response: AxiosResponse) => {
      console.log("Evoked on", Platform.OS)
      console.log("RESPONSE DATA", response.data)
      return response.data.creche
    })
    .catch((error: AxiosError) => {
      console.error("Evoked on", Platform.OS)
      console.error("ERROR CAUSE", error.cause)
      console.error("ERROR MSG", error.message)
      console.error("ERROR MSG", error.toJSON())
    }) */

  // fetch
  /*  const headers = {
    "x-jwt": "USER_TOKEN",
    Accept: "Application/json",
  }

  fetch(`${BASE_URL}/creche/${crecheId}`, { headers })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then((data) => {
      console.log("fetch | Evoked on", Platform.OS)
      console.log("RESPONSE DATA", data)
      return data.creche
    })
    .catch((error) => {
      console.error("fetch | Evoked on", Platform.OS)
      console.error("ERROR CAUSE", error)
      console.error("ERROR MSG", error.message)
    }) */

  // apisauce
  /*  const api = new Api()
  api.setup()
  api.getCreche(crecheId) */
}

/**
 * 펫시팅 서비스를 진행할 위탁장소의 정보를 입력하고 등록한다.
 * @returns {Promise<number>} 생성된 위탁장소의 id (crecheId) 를 리턴한다.
 */
export const createCreche = async (creche: NewCreche): Promise<number> => {
  try {
    // console.log("creche", creche)
    const response = await axios.post<NewCrecheResponse>(
      `${BASE_URL}/creche`,
      //   JSON.stringify(creche),
      creche,
      CONFIG,
    )
    console.log("response", response)

    if (!response.data.ok) {
      const error = response.data.error
      console.error("response.data.error 에러!!!", error)
      // @ts-ignore
      return null
    }

    // console.log("response", response)
    console.log("response.data", response.data)
    console.log("response.data.crecheId", response.data.crecheId)
    return response.data.crecheId
  } catch (error) {
    console.error("catch 에러!!!", error)
    return null
  }
}
