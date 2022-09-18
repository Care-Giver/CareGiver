import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"

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
  setup(jwt: string) {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        "x-jwt": jwt,
      },
    })
  }

  /**
   Gets a single user by ID 
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

  /**
   *  입력받은 id의 예약 정보를 한개 읽어온다.
   */
  async getCreche(id: number): Promise<Types.GetCrecheResult> {
    const response: ApiResponse<any> = await this.apisauce.get(`/creche/${id}`)

    //? 예외 처리
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    //? response 데이터 가공
    //TODO: 이 작업이 정말 필요할까...?
    try {
      const resultCreche: Types.Creche = {
        id: response.data.id,
        createAt: response.data.createAt,
        updatedAt: response.data.updatedAt,
        title: response.data.title,
        address: response.data.address,
        location: response.data.location,
        desc: response.data.desc,
        maxUnit: response.data.maxUnit,
        handleType: response.data.handleType,
        roomType: response.data.roomType,
        facilities: response.data.facilities,
        services: response.data.services,
        images: response.data.images,
        hiredNumber: response.data.hiredNumber,
        star: response.data.star,
        CareGiverId: response.data.CareGiverId,
        dist: response.data.dist,
      }
      return { kind: "ok", creche: resultCreche }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   *  입력받은 위치 근처의 위탁장소들을 가져온다.
   */
  async getCreches(lat: number, lng: number): Promise<Types.GetUserResult> {
    const response: ApiResponse<any> = await this.apisauce.get(`/creches?lat=${lat}&lng=${lng}`)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      const resultCreches: Types.Creche[] = {
        // ? 작성예정
      }
      return { kind: "ok", creches: resultCreches }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   *  카카오 로그인 서비스에 접근한다.
   */
  async signInKakao(): Promise<Types.GetUserResult> {
    const response = await await this.apisauce.get(`/auth/kakao`)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return { kind: "ok", response: response }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * 현재 로그인한 유저의 정보를 가져온다.
   */
  async getMe(): Promise<Types.GetUserResult> {
    const response: ApiResponse<any> = await this.apisauce.get(`/user/me`)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      return { kind: "ok", response: response }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
