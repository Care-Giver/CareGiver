// Mock API implementation that matches all the real API interfaces
// This allows the app to run without a backend server

// Re-export common types and enums needed for the mock
export enum BookingStatus {
  WAITING = "Waiting",
  PENDING = "Pending",
  PROCEEDING = "Proceeding",
  COMPLETE = "Complete",
  CANCEL = "Cancel",
  ERASE = "Erase",
  REJECT = "Reject",
}

export enum PetSex {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum FamilyType {
  DOG = "DOG",
  CAT = "CAT",
}

export type ReviewStatus = "Waiting" | "Possible" | "Complete" | "Expired"

export type AuthProvider = "google" | "naver" | "kakao" | "apple"

// Type definitions for mock API - simplified versions of the real types
type MockUser = {
  id: number
  provider: AuthProvider
  email: string
  nickname: string
  phoneNumber: string
  sex: string
  birthday: string
  address: string | null
  profileImage: string | null
  desc: string | null
  maxDistance: number
  pushToken: string | null
  role: string
  clientStreamToken: string | null
  marketingConsent: boolean
  locationBasedServiceConsent: boolean
  privacyPolicyConsent: boolean
  termsOfServiceConsent: boolean
  nicknameLastUpdated: string
  realName?: string
}

type MockPet = {
  id: number
  createAt: Date
  updatedAt: Date
  name: string
  speciesId: number
  species: {
    id: number
    createAt: Date
    updatedAt: Date
    name: string
    familyType: FamilyType
  }
  age: number
  sex: PetSex
  images: string[]
  weight: number
  petType: string
  isNeutralizated: boolean
  birthday: string
  desc: string
}

// Mock data generators
const generateMockUser = (id = 1): MockUser => ({
  id,
  provider: "google" as AuthProvider,
  email: `user${id}@example.com`,
  nickname: `MockUser${id}`,
  phoneNumber: "010-1234-5678",
  sex: "MALE",
  birthday: "1990-01-01",
  address: `서울특별시 강남구 테헤란로 ${400 + id}`,
  profileImage: `https://picsum.photos/150/150?random=${id + 100}`,
  desc: `Mock user ${id} description - 반려동물을 사랑하는 유저입니다`,
  maxDistance: 10,
  pushToken: `mock-push-token-${id}`,
  role: "CLIENT",
  clientStreamToken: `mock-stream-token-${id}`,
  marketingConsent: true,
  locationBasedServiceConsent: true,
  privacyPolicyConsent: true,
  termsOfServiceConsent: true,
  nicknameLastUpdated: "2023-10-28T00:00:00.000Z",
  realName: `김유저${id}`,
})

const generateMockPet = (id = 1): MockPet => ({
  id,
  createAt: new Date(),
  updatedAt: new Date(),
  name: `반려동물${id}`,
  speciesId: id,
  species: {
    id: id,
    createAt: new Date(),
    updatedAt: new Date(),
    name: id % 2 === 0 ? "골든리트리버" : "페르시안",
    familyType: id % 2 === 0 ? FamilyType.DOG : FamilyType.CAT,
  },
  age: 2 + (id % 8),
  sex: id % 2 === 0 ? PetSex.MALE : PetSex.FEMALE,
  images: [
    `https://picsum.photos/300/300?random=${200 + id}`,
    `https://picsum.photos/300/300?random=${300 + id}`,
  ],
  weight: 15.0 + id * 2.5,
  petType: id % 3 === 0 ? "LARGE" : id % 3 === 1 ? "MEDIUM" : "SMALL",
  isNeutralizated: id % 2 === 0,
  birthday: `202${1 + (id % 3)}-0${1 + (id % 9)}-15`,
  desc: `사랑스럽고 활발한 반려동물입니다. 산책을 좋아하고 사람들과 놀기를 즐겨합니다.`,
})

const generateMockBooking = (id = 1) => ({
  id,
  createAt: "2023-01-01T10:00:00.000Z",
  updatedAt: "2023-01-01T10:00:00.000Z",
  status: BookingStatus.PENDING,
  reviewStatus: "Possible" as ReviewStatus,
  visitingId: id % 2 === 0 ? id + 10 : 0,
  request: `반려동물을 잘 돌봐주세요. 특별한 요청사항: ${id}번 예약입니다.`,
  crecheId: id,
  name: `펫시터${id}`,
  image: `https://picsum.photos/200/200?random=${400 + id}`,
  reviewCount: 5 + (id % 20),
  location: `서울특별시 ${id % 2 === 0 ? "강남구" : "서초구"} 테헤란로 ${400 + id}`,
  startDate: `2024-0${1 + (id % 9)}-${10 + (id % 20)}T00:00:00.000Z`,
  endDate: `2024-0${1 + (id % 9)}-${12 + (id % 20)}T00:00:00.000Z`,
  petIds: [id, id + 1],
  fee: 30000 + id * 5000,
})

// Mock API implementations
export const mockApi = {
  // Booking APIs
  booking: {
    createCrecheBooking: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    createVisitingBooking: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    getCrechePetsitters: async (userId: number) => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return Array.from({ length: 2 }, (_, i) => ({
        // BookingKeys interface
        id: i + 1,
        createAt: "2023-01-01T10:00:00.000Z",
        updatedAt: "2023-01-01T10:00:00.000Z",
        status: BookingStatus.PENDING,
        reviewStatus: "Possible" as ReviewStatus,
        visitingId: 0, // Should be 0 for creche bookings
        request: `위탁 돌봄을 부탁드립니다. 요청사항: ${i + 1}번째 예약입니다.`,

        // CrecheBooking specific
        crecheId: i + 1,
        name: `위탁펫시터${i + 1}`,
        image: `https://picsum.photos/200/200?random=${400 + i}`,
        reviewCount: 10 + i * 3,
        location: `서울특별시 ${i % 2 === 0 ? "강남구" : "서초구"} 테헤란로 ${400 + i * 10}`,
        startDate: `2024-0${1 + (i % 9)}-${10 + i}T00:00:00.000Z`,
        endDate: `2024-0${1 + (i % 9)}-${12 + i}T00:00:00.000Z`,
        petIds: [i + 1, i + 2],
        fee: 35000 + i * 10000,
      }))
    },

    getCrecheBooking: async (crecheBookingId: number) => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      const booking = generateMockBooking(crecheBookingId)
      return {
        ...booking,
        start: booking.startDate!,
        end: booking.endDate!,
      }
    },

    getVisitingPetsitters: async (userId: number) => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return Array.from({ length: 2 }, (_, i) => ({
        // BookingKeys interface
        id: i + 1,
        createAt: "2023-01-01T10:00:00.000Z",
        updatedAt: "2023-01-01T10:00:00.000Z",
        status: BookingStatus.PENDING,
        reviewStatus: "Possible" as ReviewStatus,
        visitingId: i + 1,
        request: `방문 돌봄을 부탁드립니다. 요청사항: ${i + 1}번째 방문 예약입니다.`,

        // VisitingBooking specific (no crecheId field)
        name: `방문펫시터${i + 1}`,
        image: `https://picsum.photos/200/200?random=${450 + i}`,
        reviewCount: 8 + i * 2,
        location: `서울특별시 ${i % 2 === 0 ? "송파구" : "강동구"} ${
          i % 2 === 0 ? "잠실로" : "천호대로"
        } ${300 + i * 15}`,
        startTime: `2024-01-${15 + i}T${9 + i}:00:00.000Z`,
        endTime: `2024-01-${15 + i}T${12 + i}:00:00.000Z`,
        petIds: [i + 1],
        fee: 25000 + i * 5000,
      }))
    },

    getVisitingBooking: async (visitingBookingId: number) => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return {
        id: visitingBookingId,
        createAt: "2023-01-01T10:00:00Z",
        updatedAt: "2023-01-01T10:00:00Z",
        status: BookingStatus.PENDING,
        reviewStatus: "Possible" as ReviewStatus,
        visitingId: 1,
        request: "Mock request",
        name: "Mock Petsitter",
        image: "https://picsum.photos/200/200?random=4",
        reviewCount: 5,
        location: "Mock Location",
        start: "2023-01-15T10:00:00Z",
        end: "2023-01-15T12:00:00Z",
        petIds: [1],
        fee: 30000,
      }
    },

    getCurrentBookings: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      // Import ratingRound function for consistent rating display
      const { ratingRound } = require("../../utils/format")

      return Array.from({ length: 2 }, (_, i) => {
        const baseBooking = {
          paymentId: i + 1,
          petSitterName: i % 2 === 0 ? `김위탁펫시터${i + 1}` : `이방문펫시터${i + 1}`,
          ratings: ratingRound(4.2 + i * 0.4), // Apply same ratingRound as real API
          reviewCount: 8 + i * 3,
          desc:
            i % 2 === 0
              ? "안전하고 편안한 위탁 돌봄을 제공합니다. 24시간 케어 가능합니다."
              : "집에서 편안하게 방문 돌봄을 받으세요. 전문적인 케어를 약속드립니다.",
          profileImage: `https://picsum.photos/150/150?random=${500 + i}`,
        }

        // Return creche or visiting booking based on index
        if (i % 2 === 0) {
          return {
            ...baseBooking,
            crecheId: i + 1,
            crecheBookingId: i + 1,
            startDate: `2024-01-${15 + i}T00:00:00.000Z`,
            endDate: `2024-01-${17 + i}T00:00:00.000Z`,
          }
        } else {
          return {
            ...baseBooking,
            visitingId: i + 1,
            visitingBookingId: i + 1,
            startTime: `2024-01-${15 + i}T${9 + i}:00:00.000Z`,
            endTime: `2024-01-${15 + i}T${12 + i}:00:00.000Z`,
          }
        }
      })
    },

    getPreviousBookings: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return Array.from({ length: 3 }, (_, i) => {
        const baseBooking = {
          paymentId: i + 1,
          petSitterName: i % 2 === 0 ? `박위탁펫시터${i + 1}` : `최방문펫시터${i + 1}`,
          desc:
            i % 2 === 0
              ? "완벽한 위탁 서비스였습니다. 반려동물이 스트레스받지 않고 잘 지냈어요."
              : "친절하고 세심한 방문 서비스였습니다. 믿고 맡길 수 있는 펫시터예요.",
          profileImage: `https://picsum.photos/150/150?random=${600 + i}`,
          isCanceled: i === 2, // Make last one canceled
          isFavorite: i % 2 === 0,
          reviewStatus: i === 0 ? "Complete" : i === 1 ? "Possible" : ("Waiting" as ReviewStatus),
        }

        // Return creche or visiting booking based on discriminated union
        if (i % 2 === 0) {
          return {
            ...baseBooking,
            crecheBookingId: i + 1,
            crecheId: i + 1,
            startDate: `2023-${11 + i}-${15 + i}T00:00:00.000Z`,
            endDate: `2023-${11 + i}-${17 + i}T00:00:00.000Z`,
          }
        } else {
          return {
            ...baseBooking,
            visitingBookingId: i + 1,
            visitingId: i + 1,
            startTime: `2023-${11 + i}-${15 + i}T${9 + i}:00:00.000Z`,
            endTime: `2023-${11 + i}-${15 + i}T${12 + i}:00:00.000Z`,
          }
        }
      })
    },

    getFirstPreviousBooking: async () => {
      const bookings = await mockApi.booking.getPreviousBookings()
      return bookings.length > 0 ? bookings[0] : null
    },

    getMyWaitingBookings: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return {
        isSuccess: true,
        waitingBookings: [
          {
            paymentId: 1,
            petSitterName: "박펫시터",
            ratings: 4.5,
            reviewCount: 5,
            desc: "반려동물 돌봄 전문가입니다. 3년 경력으로 안전하게 보살핍니다.",
            profileImage: "https://picsum.photos/150/150?random=7",
            crecheBookingId: 1,
            crecheId: 1,
            startDate: "2024-02-20T00:00:00.000Z",
            endDate: "2024-02-22T00:00:00.000Z",
          },
        ],
      }
    },

    responseCrecheBooking: async (crecheBookingId: number, post: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    responseVisitingBooking: async (visitingBookingId: number, post: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    cancelCrecheBooking: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    cancelVisitingBooking: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { isSuccess: true }
    },
  },

  // Care Giver APIs
  careGiver: {
    getConfirmedBookings: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return {
        isSuccess: true,
        confirmedBookings: [
          {
            name: "김고객",
            clientStreamToken: "mock-stream-token-client",
            services: ["반려동물 돌봄", "산책 서비스"],
            pets: [generateMockPet(1), generateMockPet(2)],
            address: "서울특별시 강남구 테헤란로 427",
            status: BookingStatus.PENDING,
            createAt: "2024-01-01T10:00:00.000Z",
            crecheBookingId: 1,
            startDate: "2024-01-15T00:00:00.000Z",
            endDate: "2024-01-17T00:00:00.000Z",
            visitingBookingId: 0,
            startTime: "10:00",
            endTime: "18:00",
            request: "반려동물을 잘 부탁드립니다",
            phoneNumber: "010-1234-5678",
            userId: 1,
          },
        ],
      }
    },

    getAllBookings: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return {
        isSuccess: true,
        receivedBookings: [
          {
            name: "이고객",
            clientStreamToken: "mock-stream-token-client2",
            services: ["반려동물 산책"],
            pets: [generateMockPet(1)],
            address: "서울특별시 서초구 강남대로 123",
            status: BookingStatus.WAITING,
            createAt: "2024-01-01T10:00:00.000Z",
            crecheBookingId: 1,
            startDate: "2024-01-15T00:00:00.000Z",
            endDate: "2024-01-17T00:00:00.000Z",
            visitingBookingId: 0,
            startTime: "09:00",
            endTime: "11:00",
            request: "새로운 예약 요청입니다",
            phoneNumber: "010-9876-5432",
            userId: 2,
          },
        ],
      }
    },
  },

  // User APIs
  user: {
    sendSMS: async (post: any) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return true
    },

    verifySMS: async (post: any) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return post.inputCode === "123456" // Mock verification
    },

    signUp: async (post: any) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { isSuccess: true }
    },

    login: async (post: any) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return {
        isSuccess: true,
        token: "mock-jwt-token-12345",
      }
    },

    getMe: async (token: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return {
        isSuccess: true,
        userDetail: {
          id: 1,
          nickname: "케어기버유저",
          phoneNumber: "010-1234-5678",
          sex: "MALE",
          birthday: "1990-05-15",
          address: "서울특별시 강남구 테헤란로 427",
          profileImage: "https://picsum.photos/150/150?random=8",
          desc: "반려동물을 사랑하는 케어기버 유저입니다",
          maxDistance: 10,
          pushToken: "mock-push-token-12345",
          role: "CLIENT",
          provider: "google",
          email: "caregiver@example.com",
          marketingConsent: true,
          locationBasedServiceConsent: true,
          privacyPolicyConsent: true,
          termsOfServiceConsent: true,
          nicknameLastUpdated: "2023-10-28T00:00:00.000Z",
          clientStreamToken: "mock-client-stream-token",
          realName: "김케어기버",
        },
      }
    },

    updateUser: async (post: any) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { isSuccess: true }
    },

    postPushToken: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    checkUserExists: async (post: any, provider: any) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return {
        ok: true,
        token: "mock-social-token",
        isUserExists: true,
      }
    },
  },

  // Pet APIs
  pets: {
    getPets: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return {
        isSuccess: true,
        petsDetail: [generateMockPet(1), generateMockPet(2)],
      }
    },

    updatePet: async (id: number, body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    createPet: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    deletePet: async (id: number) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { isSuccess: true }
    },
  },

  // Creche APIs
  creche: {
    createCreche: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { isSuccess: true }
    },

    updateCreche: async (id: number, body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { isSuccess: true }
    },

    getCreche: async (crecheId: number) => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return {
        isSuccess: true,
        creche: {
          id: crecheId,
          name: "Mock Creche",
          desc: "Mock creche description",
          location: "Mock Location",
          services: ["Pet Care", "Pet Walking"],
          amenities: ["WiFi", "AC"],
          ratings: 4.5,
          reviewCount: 10,
        },
      }
    },

    getCrecheCareGiver: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return { isSuccess: true, creche: null }
    },

    getCrecheServices: async () => {
      await new Promise((resolve) => setTimeout(resolve, 200))
      return {
        isSuccess: true,
        crecheServices: [
          {
            id: 1,
            createAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
            name: "반려동물 돌봄",
            desc: "24시간 안전한 돌봄 서비스",
          },
          {
            id: 2,
            createAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
            name: "놀이 활동",
            desc: "반려동물의 활발한 활동과 놀이",
          },
          {
            id: 3,
            createAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
            name: "급식 관리",
            desc: "정해진 시간에 맞춘 급식 서비스",
          },
          {
            id: 4,
            createAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
            name: "건강 체크",
            desc: "일일 건강 상태 확인 및 관리",
          },
        ],
      }
    },

    getCrecheAmenities: async () => {
      await new Promise((resolve) => setTimeout(resolve, 200))
      return {
        isSuccess: true,
        crecheAmenities: [
          {
            id: 1,
            createAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
            name: "에어컨",
            desc: "쾌적한 환경 유지를 위한 냉난방 시설",
          },
          {
            id: 2,
            createAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
            name: "CCTV",
            desc: "24시간 실시간 모니터링 시스템",
          },
          {
            id: 3,
            createAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
            name: "놀이 공간",
            desc: "반려동물 전용 실내 놀이터",
          },
          {
            id: 4,
            createAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
            name: "WiFi",
            desc: "보호자 연락을 위한 인터넷 환경",
          },
        ],
      }
    },

    getCrecheAvgPrice: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return { avgPrice: 35000 }
    },
  },

  // Creches APIs (search)
  creches: {
    getCrechesSearch: async (requestBody: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return Array.from({ length: 5 }, (_, i) => ({
        // UserRelatedData
        isFavorite: i % 2 === 0,
        reviewCount: 5 + i,
        userNickname: `펫시터${i + 1}`,
        userProfile: `https://picsum.photos/150/150?random=${100 + i}`,
        distance: `${1.5 + i}`,

        // Creche data
        creche: {
          // CareGiverPetsitter (extends CareGiverRelatedData, Petsitter)
          __careGiver__: {
            id: i + 1,
            createAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
            careGiverStreamToken: `mock-stream-${i + 1}`,
            __user__: {
              id: i + 1,
              createAt: "2023-01-01T00:00:00.000Z",
              updatedAt: "2023-01-01T00:00:00.000Z",
              email: `petsitter${i + 1}@example.com`,
              role: "CARE_GIVER",
              nickname: `펫시터${i + 1}`,
              phoneNumber: `010-${1000 + i}-${5678 + i}`,
              sex: "FEMALE",
              birthday: "1990-01-01",
              provider: "google",
              address: `서울특별시 ${i % 2 === 0 ? "강남구" : "서초구"} 테헤란로 ${400 + i * 10}`,
              desc: `경험이 풍부한 반려동물 전문가입니다`,
              profileImage: `https://picsum.photos/150/150?random=${100 + i}`,
              isCertified: true,
              pushToken: `mock-push-${i + 1}`,
              clientStreamToken: `mock-client-${i + 1}`,
              maxDistance: 10,
              privacyPolicyConsent: true,
              termsOfServiceConsent: true,
              marketingConsent: true,
              locationBasedServiceConsent: true,
            },
            __has_user__: true,
          },
          __crecheReviews__: [
            {
              id: i + 1,
              createAt: "2023-01-01T00:00:00.000Z",
              updatedAt: "2023-01-01T00:00:00.000Z",
              desc: "훌륭한 서비스였습니다",
              star: 5,
              images: [`https://picsum.photos/300/200?random=${200 + i}`],
              hasReply: false,
              reviewReply: null,
            },
          ],
          __has_careGiver__: true,
          __has_crecheReviews__: true,

          // Petsitter properties
          id: i + 1,
          createAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z",
          title: `안전한 위탁 돌봄 ${i + 1}`,
          desc: `${3 + i}년 경력의 전문 위탁 펫시터입니다. 반려동물을 가족처럼 돌봅니다.`,
          address: `서울특별시 ${i % 2 === 0 ? "강남구" : "서초구"} 테헤란로 ${400 + i * 10}`,
          detailAddress: `${i + 1}층`,
          defaultFee: 30000 + i * 5000,
          hiredNumber: 50 + i * 10,
          star: 4.0 + i * 0.2,
          location: {
            coordinates: [126.834393 + i * 0.001, 37.298004 + i * 0.001],
            type: "Point",
          },
          dogMaxUnit: 3,
          catMaxUnit: 2,
          handleType: ["SMALL", "MEDIUM", "LARGE"],
          images: [
            `https://picsum.photos/400/300?random=${300 + i}`,
            `https://picsum.photos/400/300?random=${400 + i}`,
          ],
          extraSizeFee: {
            Small: 0,
            Medium: 5000,
            Large: 10000,
          },
          promoted: false,
          responseRate: [0.9, 1, 4],
          acceptRate: [0.8, 1, 4],
          timeWithPet: 3 + i,

          // Creche specific
          serviceCreche: [
            {
              id: 1,
              createAt: "2023-01-01T00:00:00.000Z",
              updatedAt: "2023-01-01T00:00:00.000Z",
              name: "반려동물 돌봄",
              desc: "24시간 안전한 돌봄 서비스",
            },
            {
              id: 2,
              createAt: "2023-01-01T00:00:00.000Z",
              updatedAt: "2023-01-01T00:00:00.000Z",
              name: "급식 서비스",
              desc: "정해진 시간에 맞춘 급식",
            },
          ],
          crecheAmenities: [
            {
              id: 1,
              createAt: "2023-01-01T00:00:00.000Z",
              updatedAt: "2023-01-01T00:00:00.000Z",
              name: "에어컨",
              desc: "쾌적한 환경 유지",
            },
            {
              id: 2,
              createAt: "2023-01-01T00:00:00.000Z",
              updatedAt: "2023-01-01T00:00:00.000Z",
              name: "CCTV",
              desc: "24시간 모니터링",
            },
          ],
        },
      }))
    },
  },

  // Visiting APIs
  visiting: {
    createVisiting: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { isSuccess: true }
    },

    updateVisiting: async (id: number, body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { isSuccess: true }
    },

    getVisiting: async (visitingId: number) => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return {
        isSuccess: true,
        visiting: {
          id: visitingId,
          name: "Mock Visiting Service",
          desc: "Mock visiting description",
          location: "Mock Location",
          services: ["Home Visit", "Pet Walking"],
          amenities: ["Flexible Schedule", "Emergency Contact"],
          ratings: 4.7,
          reviewCount: 15,
        },
      }
    },

    getVisitingCareGiver: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return { isSuccess: true, visiting: null }
    },

    getVisitingServices: async () => {
      await new Promise((resolve) => setTimeout(resolve, 200))
      return {
        isSuccess: true,
        visitingServices: [
          {
            id: 1,
            createAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
            name: "방문 돌봄",
            desc: "집에서 편안하게 받는 전문 돌봄 서비스",
          },
          {
            id: 2,
            createAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
            name: "산책 서비스",
            desc: "건강한 운동과 스트레스 해소를 위한 산책",
          },
          {
            id: 3,
            createAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
            name: "급식 관리",
            desc: "정해진 시간에 맞춘 체계적인 급식 관리",
          },
          {
            id: 4,
            createAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
            name: "놀이 활동",
            desc: "실내외 다양한 놀이를 통한 스트레스 해소",
          },
        ],
      }
    },

    getVisitingAmenities: async () => {
      await new Promise((resolve) => setTimeout(resolve, 200))
      return {
        isSuccess: true,
        visitingAmenities: [
          {
            id: 1,
            createAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
            name: "유연한 스케줄",
            desc: "고객의 일정에 맞춘 유연한 서비스 시간",
          },
          {
            id: 2,
            createAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
            name: "응급 연락",
            desc: "24시간 응급상황 대응 연락체계",
          },
          {
            id: 3,
            createAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
            name: "사진 업데이트",
            desc: "실시간 사진으로 반려동물 상황 전달",
          },
          {
            id: 4,
            createAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
            name: "GPS 추적",
            desc: "산책 경로 및 위치 실시간 추적",
          },
        ],
      }
    },

    getVisitingAvgPrice: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return { avgPrice: 25000 }
    },
  },

  // Visitings APIs (search)
  visitings: {
    getVisitingsSearch: async (requestBody: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return Array.from({ length: 5 }, (_, i) => ({
        // UserRelatedData
        isFavorite: i % 3 === 0,
        reviewCount: 8 + i,
        userNickname: `방문펫시터${i + 1}`,
        userProfile: `https://picsum.photos/150/150?random=${150 + i}`,
        distance: `${2.0 + i}`,

        // Visiting data
        visiting: {
          // CareGiverPetsitter (extends CareGiverRelatedData, Petsitter)
          __careGiver__: {
            id: i + 10,
            createAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
            careGiverStreamToken: `mock-visiting-stream-${i + 1}`,
            __user__: {
              id: i + 10,
              createAt: "2023-01-01T00:00:00.000Z",
              updatedAt: "2023-01-01T00:00:00.000Z",
              email: `visiting${i + 1}@example.com`,
              role: "CARE_GIVER",
              nickname: `방문펫시터${i + 1}`,
              phoneNumber: `010-${2000 + i}-${1234 + i}`,
              sex: "MALE",
              birthday: "1988-05-15",
              provider: "naver",
              address: `서울특별시 ${i % 3 === 0 ? "강남구" : i % 3 === 1 ? "서초구" : "송파구"} ${
                i % 2 === 0 ? "테헤란로" : "강남대로"
              } ${500 + i * 10}`,
              desc: `방문 전문 펫시터입니다`,
              profileImage: `https://picsum.photos/150/150?random=${150 + i}`,
              isCertified: true,
              pushToken: `mock-visiting-push-${i + 1}`,
              clientStreamToken: `mock-visiting-client-${i + 1}`,
              maxDistance: 15,
              privacyPolicyConsent: true,
              termsOfServiceConsent: true,
              marketingConsent: true,
              locationBasedServiceConsent: true,
            },
            __has_user__: true,
          },
          __crecheReviews__: [], // visiting은 creche reviews가 없음
          __has_careGiver__: true,
          __has_crecheReviews__: false,

          // Petsitter properties
          id: i + 10,
          createAt: "2023-01-01T00:00:00.000Z",
          updatedAt: "2023-01-01T00:00:00.000Z",
          title: `믿을 수 있는 방문 돌봄 ${i + 1}`,
          desc: `${4 + i}년 경력의 전문 방문 펫시터입니다. 집으로 찾아가 안전하게 돌봅니다.`,
          address: `서울특별시 ${i % 3 === 0 ? "강남구" : i % 3 === 1 ? "서초구" : "송파구"} ${
            i % 2 === 0 ? "테헤란로" : "강남대로"
          } ${500 + i * 10}`,
          detailAddress: "",
          defaultFee: 15000 + i * 2000,
          hiredNumber: 30 + i * 8,
          star: 4.2 + i * 0.15,
          location: {
            coordinates: [126.834393 + i * 0.002, 37.298004 + i * 0.002],
            type: "Point",
          },
          dogMaxUnit: 2,
          catMaxUnit: 3,
          handleType: ["SMALL", "MEDIUM"],
          images: [
            `https://picsum.photos/400/300?random=${500 + i}`,
            `https://picsum.photos/400/300?random=${600 + i}`,
          ],
          extraSizeFee: {
            Small: 0,
            Medium: 3000,
            Large: 8000,
          },
          promoted: false,
          responseRate: [0.85, 1, 4],
          acceptRate: [0.75, 1, 4],
          timeWithPet: 4 + i,

          // Visiting specific
          serviceVisiting: [
            {
              id: 3,
              createAt: "2023-01-01T00:00:00.000Z",
              updatedAt: "2023-01-01T00:00:00.000Z",
              name: "방문 돌봄",
              desc: "집으로 찾아가는 돌봄 서비스",
            },
            {
              id: 4,
              createAt: "2023-01-01T00:00:00.000Z",
              updatedAt: "2023-01-01T00:00:00.000Z",
              name: "산책 서비스",
              desc: "건강한 산책과 운동",
            },
          ],
          visitingAmenities: [
            {
              id: 3,
              createAt: "2023-01-01T00:00:00.000Z",
              updatedAt: "2023-01-01T00:00:00.000Z",
              name: "유연한 스케줄",
              desc: "원하는 시간에 맞춘 서비스",
            },
            {
              id: 4,
              createAt: "2023-01-01T00:00:00.000Z",
              updatedAt: "2023-01-01T00:00:00.000Z",
              name: "사진 업데이트",
              desc: "실시간 사진 전송",
            },
          ],
        },
      }))
    },
  },

  // Favorite APIs
  favorite: {
    getFavorites: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      console.log("🔷 Mock getFavorites called with body:", body)

      return {
        isSuccess: true,
        favoritePetsitters: Array.from({ length: 3 }, (_, i) => ({
          crecheId: i % 2 === 0 ? i + 1 : undefined,
          visitingId: i % 2 === 1 ? i + 1 : undefined,
          image: `https://picsum.photos/200/200?random=${40 + i}`,
          userNickname: `즐겨찾기펫시터${i + 1}`,
          title: i % 2 === 0 ? `안전한 위탁 돌봄 ${i + 1}` : `믿을 수 있는 방문 돌봄 ${i + 1}`,
          reviewCount: 15 + i * 5,
          rating: 4.7 + i * 0.1,
          desc:
            i % 2 === 0
              ? "즐겨찾기한 위탁 펫시터입니다. 안전하고 편안한 환경을 제공합니다."
              : "즐겨찾기한 방문 펫시터입니다. 집에서 편안하게 돌봄을 받을 수 있어요.",
        })),
      }
    },

    createFavorite: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { favoriteId: Math.floor(Math.random() * 1000) }
    },

    deleteFavorite: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { isSuccess: true }
    },
  },

  // Payment APIs
  payment: {
    calculateVisitingBooking: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return {
        subTotalFee: 50000,
        totalFee: 55000,
        petTypeExtraFee: [
          {
            petType: "LARGE",
            extraFee: 5000,
            count: 1,
          },
        ],
      }
    },

    calculateCrecheBooking: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return {
        subTotalFee: 80000,
        totalFee: 90000,
        petTypeExtraFee: [
          {
            petType: "MEDIUM",
            extraFee: 10000,
            count: 2,
          },
        ],
      }
    },

    createPayment: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return {
        isSuccess: true,
        paymentId: Math.floor(Math.random() * 10000),
      }
    },

    getSettlement: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return {
        settlementAmount: 45000,
        commission: 5000,
        netAmount: 40000,
      }
    },

    getPaymentById: async (paymentId: number) => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return {
        id: paymentId,
        amount: 50000,
        status: "COMPLETED",
        createdAt: "2023-01-15T10:00:00Z",
      }
    },

    verifyBankHolder: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { isVerified: true }
    },

    preRegister: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { isSuccess: true }
    },
  },

  // Review APIs
  review: {
    uploadURIS: async (images: any[]) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return images.map((_, i) => `https://picsum.photos/400/300?random=${50 + i}`)
    },

    postVisitingReview: async (userId: number, body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { isSuccess: true }
    },

    postCrecheReview: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { isSuccess: true }
    },

    getVisitingReview: async (bookingId: number) => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return {
        id: bookingId,
        rating: 5,
        desc: "Excellent service!",
        images: ["https://picsum.photos/400/300?random=60"],
        createdAt: "2023-01-10T10:00:00Z",
      }
    },

    getCrecheReview: async (bookingId: number) => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return {
        id: bookingId,
        rating: 4,
        desc: "Good experience",
        images: ["https://picsum.photos/400/300?random=61"],
        createdAt: "2023-01-12T10:00:00Z",
      }
    },

    getVisitingReviews: async (visitingId: number) => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return Array.from({ length: 3 }, (_, i) => ({
        id: i + 1,
        rating: 4 + i * 0.3,
        desc: `Review ${i + 1} for visiting service`,
        images: [`https://picsum.photos/400/300?random=${70 + i}`],
        createdAt: `2023-01-${10 + i}T10:00:00Z`,
        userName: `User${i + 1}`,
      }))
    },
  },

  // Notification APIs
  notification: {
    getNotificationsBy: async (type: any) => {
      await new Promise((resolve) => setTimeout(resolve, 300))

      console.log(`🔷 Mock getNotificationsBy called with type: ${type}`)

      // Generate notifications based on type (CLIENT or CARE_GIVER)
      const isClient = type === "CLIENT"
      const isCaregiver = type === "CARE_GIVER"

      const mockNotifications = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        createAt: `2023-01-${15 + i}T10:00:00.000Z`,
        updatedAt: `2023-01-${15 + i}T10:00:00.000Z`,
        title: `${isClient ? "예약 알림" : "새로운 예약 요청"} ${i + 1}`,
        content: `${
          isClient ? "펫시터가 예약을 확인했습니다" : "새로운 예약 요청이 도착했습니다"
        } - 알림 내용 ${i + 1}`,
        senderName: `${isClient ? "펫시터" : "보호자"}${i + 1}`,
        needToPush: true,
        adAtNight: false,
        // Set receiver ID based on type - only one should be set
        careGiverReceiverId: isCaregiver ? 100 + i : null,
        clientReceiverId: isClient ? 200 + i : null,
      }))

      console.log(
        `🔷 Mock getNotificationsBy returning ${mockNotifications.length} notifications for ${type}`,
      )
      return mockNotifications
    },
  },

  // Comment APIs
  comment: {
    createVisitingComment: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { commentId: Math.floor(Math.random() * 1000) }
    },

    getVisitingComments: async (visitingId: number) => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return Array.from({ length: 3 }, (_, i) => ({
        id: i + 1,
        content: `Mock comment ${i + 1} for visiting service`,
        createdAt: `2023-01-${10 + i}T10:00:00Z`,
        commentator: {
          id: i + 1,
          nickname: `Commenter${i + 1}`,
          profileImage: `https://picsum.photos/150/150?random=${80 + i}`,
        },
      }))
    },

    updateVisitingComment: async (id: number, body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { isSuccess: true }
    },
  },

  // Available Time APIs (simplified, would need more detailed implementation)
  visitingAvailableTime: {
    getVisitingAvailableTimes: async (visitingId: number) => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return Array.from({ length: 7 }, (_, i) => ({
        id: i + 1,
        date: `2023-01-${15 + i}`,
        startTime: "09:00",
        endTime: "18:00",
        fee: 20000,
        isAvailable: true,
      }))
    },

    getAvailableTimesByDate: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return {
        [body.date]: [
          {
            id: 1,
            startTime: "09:00",
            endTime: "12:00",
            fee: 20000,
            isAvailable: true,
          },
        ],
      }
    },

    createVisitingAvailableTime: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    updateVisitingAvailableTime: async (visitingId: number, body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    deleteVisitingAvailableTime: async (visitingAvailableTimeId: number) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    disableVisitingAvailableTime: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    restoreVisitingAvailableTime: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { isSuccess: true }
    },
  },

  // Creche Date APIs (simplified)
  crecheDate: {
    getCrecheDates: async (crecheId: number) => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        date: `2023-01-${15 + i}`,
        fee: 30000,
        isAvailable: true,
        bookingStatus: "AVAILABLE",
      }))
    },

    createCrecheDate: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    updateCrecheDate: async (crecheAvailableDateId: number, body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    disableCrecheDate: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    restoreCrecheDate: async (body: any) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { isSuccess: true }
    },
  },

  // Petsitter APIs (deprecated but still used)
  petsitter: {
    getPetsitterVisitings: async (visitingId: number) => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return {
        id: visitingId,
        name: "Mock Visiting Petsitter",
        desc: "Experienced in home visits",
        services: ["Pet Walking", "Pet Feeding"],
        amenities: ["Flexible Schedule", "Photo Updates"],
      }
    },

    getPetsitterCreches: async (crecheId: number) => {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return {
        id: crecheId,
        name: "Mock Creche Petsitter",
        desc: "Professional pet boarding",
        services: ["Pet Boarding", "Pet Grooming"],
        amenities: ["24/7 Monitoring", "Play Area"],
      }
    },
  },
}

// Export individual functions to match original API structure
export const {
  createCrecheBooking,
  createVisitingBooking,
  getCrechePetsitters,
  getCrecheBooking,
  getVisitingPetsitters,
  getVisitingBooking,
  getCurrentBookings,
  getPreviousBookings,
  getFirstPreviousBooking,
  getMyWaitingBookings,
  responseCrecheBooking,
  responseVisitingBooking,
  cancelCrecheBooking,
  cancelVisitingBooking,
} = mockApi.booking

export const { getConfirmedBookings, getAllBookings } = mockApi.careGiver

export const {
  sendSMS,
  verifySMS,
  signUp,
  login,
  getMe,
  updateUser,
  postPushToken,
  checkUserExists,
} = mockApi.user

export const { getPets, updatePet, createPet, deletePet } = mockApi.pets

// Export the entire mock API object for easy replacement
export default mockApi
