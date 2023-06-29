import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { Species, useStores } from "../../models"

// * id = 7인 유저 토큰
const USER_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjY4NDUzMTAzfQ.Px0I5t4fzhfyEHGHZxjEFyP8g4P6-kw08FMZ2Iqe0d0`

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

  private speciesFormatter(data) {
    return {
      id: data.id,
      familyId: data.familyId,
      name: data.name,
    }
  }

  async getSpeciesNames(): Promise<Species[]> {
    this.apisauce.setHeaders({
      ...this.apisauce.headers,
      "x-jwt": USER_TOKEN,
    })
    const response: any = await this.apisauce.get(`species`)

    // response.ok
    // response.data.ok
    const { data } = response
    if (!data.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // console.log("ok", data?.ok)
    // console.log("species", data?.species)

    // data?.species
    /* Array [
      Object {
        "createAt": "2022-05-31T06:13:52.669Z",
        "familyId": 1,
        "id": 1,
        "name": "시츄",
        "updatedAt": "2022-05-31T06:13:52.669Z",
      },
      Object {
        "createAt": "2022-05-31T06:14:14.131Z",
        "familyId": 1,
        "id": 2,
        "name": "말티즈",
        "updatedAt": "2022-05-31T06:14:14.131Z",
      },
      Object {
        "createAt": "2022-07-06T08:04:17.628Z",
        "familyId": 1,
        "id": 3,
        "name": "포메라니안",
        "updatedAt": "2022-07-06T08:04:17.628Z",
      },
    ] */

    // formattedData
    /* Array [
      Object {
        "familyId": 1,
        "id": 1,
        "name": "시츄",
      },
      Object {
        "familyId": 1,
        "id": 2,
        "name": "말티즈",
      },
      Object {
        "familyId": 1,
        "id": 3,
        "name": "포메라니안",
      },
    ] */

    const formattedData = data?.species.map((value) => this.speciesFormatter(value))
    return formattedData
  }

  //* SpeciesStoreModel 안에 setSpecies() 함수로 가져오는것으로 바꾸었음 :)
  // // ! 마이페이지 - 펫 목록
  // private getSpeciesName(speciesId) {
  //   // const speciesNamesAndIds = []
  //   // const { 모델스토어이름} = useStores()
  //   // const speciesNamesAndIds = 모델스토어이름.가져오는함수

  //   return speciesNamesAndIds.find(value == speciesId)
  // }

  // private getFamilyName() {}

  // * pet formatter
  private petDataFormatter(data: Types.PetResultProps): Types.FormattedPetData {
    let familyName: "Dog" | "Cat"
    switch (data.familyId) {
      case 1:
        familyName = "Dog"
        break
      case 2:
        familyName = "Cat"
        break
    }

    const getSpeciesName = (speciesId) => {
      const { speciesStoreModel } = useStores() //! 아.. MST
      const species = speciesStoreModel.getSpecies //! 아.. MST

      const speciesObj = species.find((item, index) => speciesId === item.id)
      const { name } = speciesObj
      return name
    }

    return {
      petId: data.pet.id,
      name: data.pet.name,
      image: data.pet.image,
      age: data.pet.age,
      sex: data.pet.sex,
      petType: data.pet.petType,
      // TODO: speciesId로 name 추출
      // species: "시츄",
      species: getSpeciesName(speciesId),
      familyName: familyName,
    }
  }

  // * 나의 모든 펫 정보 가져오기
  async getMyPets(): Promise<Types.GetMyPetResult> {
    this.apisauce.setHeaders({
      ...this.apisauce.headers,
      "x-jwt": USER_TOKEN,
    })

    const response: ApiResponse<any> = await this.apisauce.get(`pets`)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const pets: Array<Types.FormattedPetData> = response.data.petResults.map((data) =>
        this.petDataFormatter(data),
      )
      return { kind: "ok", pets }
    } catch {
      return { kind: "bad-data" }
    }
  }

  //! TODO: Will be removed
  async getAuthKakao(): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.get(`/auth/kakao`)
    console.log("getAuthKakao response", response)
  }

  //! TODO: Will be removed
  async getAuthGoogle(): Promise<any> {
    const response: ApiResponse<any> = await this.apisauce.get(`/auth/google`)
    // console.log("getAuthGoogle response", response)
    const html = response?.data

    return html
  }
}
