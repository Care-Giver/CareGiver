import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"

// * id = 7인 유저 토큰
const USER_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU3MDkzNDk1fQ.r_GkgcEjy-AD_uFVlgEjkmWVLUZzYcodhFNN-oz3rwY`

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  /**
   * Gets a list of users.
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertUser = (raw) => {
      return {
        id: raw.id,
        name: raw.name,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data
      const resultUsers: Types.User[] = rawUsers.map(convertUser)
      return { kind: "ok", users: resultUsers }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a single user by ID
   */

  async getUser(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        name: response.data.name,
      }
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }

  //! 테스트
  async getCreche(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response = await this.apisauce.get(`/creche/${id}`)
    console.log("response", response)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      return { kind: "ok", response: response }
    } catch {
      return { kind: "bad-data" }
    }
  }

  // * 위탁 - 펫시터 예약
  //? 위탁 - 펫시터 예약 props 포맷팅
  private crechePetsitterFormatter(
    data: Types.ReserveCrecheResponse,
  ): Types.FormattedPetsitterReserve {
    const formatData: Types.FormattedPetsitterReserve = {
      serviceType: "creche",
      caregiverType: "petsitter",
      reserveId: data.crecheId,
      startDate: data.startDay,
      endDate: data.endDay,
    }
    return formatData
  }

  //? 위탁 - 펫시터 예약 내역 불러오기
  async getCrechePetsitters(userId: number): Promise<Types.GetCrechePetsittersResult> {
    // TODO1: header 설정 여기서 하는거 맞나..?? store 파일에서 해야하나?
    // TODO2: 현재 로그인 중인 유저의 토큰 어떻게 발급 받는지?
    this.apisauce.setHeaders({
      ...this.apisauce.headers,
      "x-jwt": USER_TOKEN,
    })
    const response: ApiResponse<any> = await this.apisauce.get(`reserve/creche?userId=${userId}`)
    console.log(response)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const reserves: Array<Types.FormattedPetsitterReserve> = response.data.crecheReserves.map(
        (data: Types.ReserveCrecheResponse) => this.crechePetsitterFormatter(data),
      )
      return { kind: "ok", reserves }
    } catch {
      return { kind: "bad-data" }
    }
  }
  // * ---------------

  // * 방문 - 펫시터 예약
  //? 방문 - 펫시터 예약 props 포맷팅
  private visitPetsitterFormatter(
    data: Types.ReservePetSitterResponse,
  ): Types.FormattedPetsitterReserve {
    const formatData: Types.FormattedPetsitterReserve = {
      serviceType: "visit",
      caregiverType: "petsitter",
      reserveId: data.petSitterId,
      startDate: data.startTime,
      endDate: data.endTime,
    }
    return formatData
  }

  //? 방문 - 펫시터 예약 내역 불러오기
  async getVisitPetsitters(userId: number) {
    this.apisauce.setHeaders({
      ...this.apisauce.headers,
      "x-jwt": USER_TOKEN,
    })
    const response: ApiResponse<any> = await this.apisauce.get(
      `reserve/pet-sitter?userId=${userId}`,
    )
    console.log("== getVisitPetsitters ==")
    console.log(response)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const reserves: Array<Types.FormattedPetsitterReserve> = response.data.petSitterReserves.map(
        (data: Types.ReservePetSitterResponse) => this.visitPetsitterFormatter(data),
      )
      return { kind: "ok", reserves }
    } catch {
      return { kind: "bad-data" }
    }
  }
  // * ---------------
}
