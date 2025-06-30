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
  address: "Mock Address",
  profileImage: "https://example.com/profile.jpg",
  desc: "Mock user description",
  maxDistance: 10,
  pushToken: "mock-push-token",
  role: "CLIENT",
  clientStreamToken: "mock-stream-token",
  marketingConsent: true,
  locationBasedServiceConsent: true,
  privacyPolicyConsent: true,
  termsOfServiceConsent: true,
  nicknameLastUpdated: "2023-10-28T00:00:00",
  realName: "Mock Real Name"
})

const generateMockPet = (id = 1): MockPet => ({
  id,
  createAt: new Date(),
  updatedAt: new Date(),
  name: `MockPet${id}`,
  speciesId: 1,
  species: {
    id: 1,
    createAt: new Date(),
    updatedAt: new Date(),
    name: "Golden Retriever",
    familyType: FamilyType.DOG
  },
  age: 3,
  sex: PetSex.MALE,
  images: ["https://example.com/pet1.jpg"],
  weight: 25.5,
  petType: "SMALL",
  isNeutralizated: true,
  birthday: "2020-01-01",
  desc: "Friendly and playful"
})

const generateMockBooking = (id = 1) => ({
  id,
  createAt: "2023-01-01T10:00:00Z",
  updatedAt: "2023-01-01T10:00:00Z",
  status: BookingStatus.PENDING,
  reviewStatus: "Possible" as ReviewStatus,
  visitingId: 0,
  request: "Please take good care of my pet",
  crecheId: 1,
  name: "Mock Petsitter",
  image: "https://example.com/petsitter.jpg",
  reviewCount: 5,
  location: "Mock Location",
  startDate: "2023-01-15T00:00:00Z",
  endDate: "2023-01-17T00:00:00Z",
  petIds: [1, 2],
  fee: 50000
})

// Mock API implementations
export const mockApi = {
  // Booking APIs
  booking: {
    createCrecheBooking: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    createVisitingBooking: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    getCrechePetsitters: async (userId: number) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return [generateMockBooking(1), generateMockBooking(2)]
    },

    getCrecheBooking: async (crecheBookingId: number) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      const booking = generateMockBooking(crecheBookingId)
      return {
        ...booking,
        start: booking.startDate!,
        end: booking.endDate!
      }
    },

    getVisitingPetsitters: async (userId: number) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return [{
        ...generateMockBooking(1),
        visitingId: 1,
        startTime: "2023-01-15T10:00:00Z",
        endTime: "2023-01-15T12:00:00Z"
      }]
    },

    getVisitingBooking: async (visitingBookingId: number) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return {
        id: visitingBookingId,
        createAt: "2023-01-01T10:00:00Z",
        updatedAt: "2023-01-01T10:00:00Z",
        status: BookingStatus.PENDING,
        reviewStatus: "Possible" as ReviewStatus,
        visitingId: 1,
        request: "Mock request",
        name: "Mock Petsitter",
        image: "https://example.com/petsitter.jpg",
        reviewCount: 5,
        location: "Mock Location",
        start: "2023-01-15T10:00:00Z",
        end: "2023-01-15T12:00:00Z",
        petIds: [1],
        fee: 30000
      }
    },

    getCurrentBookings: async () => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return [{
        paymentId: 1,
        startDate: "2023-01-15T00:00:00Z",
        endDate: "2023-01-17T00:00:00Z",
        petSitterName: "Mock Petsitter",
        ratings: 4.5,
        reviewCount: 10,
        desc: "Experienced pet sitter",
        profileImage: "https://example.com/profile.jpg",
        crecheId: 1,
        crecheBookingId: 1
      }]
    },

    getPreviousBookings: async () => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return [{
        paymentId: 1,
        petSitterName: "Mock Petsitter",
        desc: "Great service",
        profileImage: "https://example.com/profile.jpg",
        isCanceled: false,
        isFavorite: true,
        reviewStatus: "Complete" as ReviewStatus,
        crecheBookingId: 1,
        crecheId: 1,
        startDate: "2023-01-01T00:00:00Z",
        endDate: "2023-01-03T00:00:00Z"
      }]
    },

    getFirstPreviousBooking: async () => {
      const bookings = await mockApi.booking.getPreviousBookings()
      return bookings.length > 0 ? bookings[0] : null
    },

    getMyWaitingBookings: async () => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return {
        isSuccess: true,
        waitingBookings: [{
          paymentId: 1,
          petSitterName: "Mock Petsitter", 
          ratings: 4.5,
          reviewCount: 5,
          desc: "Waiting for approval",
          profileImage: "https://example.com/profile.jpg",
          crecheBookingId: 1,
          crecheId: 1,
          startDate: "2023-01-20T00:00:00Z",
          endDate: "2023-01-22T00:00:00Z"
        }]
      }
    },

    responseCrecheBooking: async (crecheBookingId: number, post: any) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    responseVisitingBooking: async (visitingBookingId: number, post: any) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    cancelCrecheBooking: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    cancelVisitingBooking: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { isSuccess: true }
    }
  },

  // Care Giver APIs
  careGiver: {
    getConfirmedBookings: async () => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return {
        isSuccess: true,
        confirmedBookings: [{
          name: "Mock Client",
          clientStreamToken: "mock-stream-token",
          services: ["Pet Walking", "Pet Sitting"],
          pets: [generateMockPet(1)],
          address: "Mock Address",
          status: BookingStatus.PENDING,
          createAt: "2023-01-01T10:00:00Z",
          crecheBookingId: 1,
          startDate: "2023-01-15T00:00:00Z",
          endDate: "2023-01-17T00:00:00Z",
          visitingBookingId: 0,
          startTime: "",
          endTime: ""
        }]
      }
    },

    getAllBookings: async () => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return {
        isSuccess: true,
        receivedBookings: [{
          name: "Mock Client",
          clientStreamToken: "mock-stream-token", 
          services: ["Pet Walking"],
          pets: [generateMockPet(1)],
          address: "Mock Address",
          status: BookingStatus.WAITING,
          createAt: "2023-01-01T10:00:00Z",
          crecheBookingId: 1,
          startDate: "2023-01-15T00:00:00Z",
          endDate: "2023-01-17T00:00:00Z",
          visitingBookingId: 0,
          startTime: "",
          endTime: ""
        }]
      }
    }
  },

  // User APIs
  user: {
    sendSMS: async (post: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return true
    },

    verifySMS: async (post: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return post.inputCode === "123456" // Mock verification
    },

    signUp: async (post: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return { isSuccess: true }
    },

    login: async (post: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return {
        isSuccess: true,
        token: "mock-jwt-token-12345"
      }
    },

    getMe: async (token: string) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return {
        isSuccess: true,
        userDetail: {
          id: 1,
          nickname: "MockUser",
          phoneNumber: "010-1234-5678",
          sex: "MALE",
          birthday: "1990-01-01",
          address: "Mock Address",
          profileImage: "https://example.com/profile.jpg",
          pushToken: "mock-push-token",
          nicknameLastUpdated: "2023-10-28T00:00:00",
          clientStreamToken: "mock-stream-token",
          realName: "Mock Real Name"
        }
      }
    },

    updateUser: async (post: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return { isSuccess: true }
    },

    postPushToken: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    checkUserExists: async (post: any, provider: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return {
        ok: true,
        token: "mock-social-token",
        isUserExists: true
      }
    }
  },

  // Pet APIs
  pets: {
    getPets: async () => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return {
        isSuccess: true,
        petsDetail: [generateMockPet(1), generateMockPet(2)]
      }
    },

    updatePet: async (id: number, body: any) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    createPet: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    deletePet: async (id: number) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { isSuccess: true }
    }
  },

  // Creche APIs
  creche: {
    createCreche: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return { isSuccess: true }
    },

    updateCreche: async (id: number, body: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return { isSuccess: true }
    },

    getCreche: async (crecheId: number) => {
      await new Promise(resolve => setTimeout(resolve, 300))
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
          reviewCount: 10
        }
      }
    },

    getCrecheCareGiver: async () => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { isSuccess: true, creche: null }
    },

    getCrecheServices: async () => {
      await new Promise(resolve => setTimeout(resolve, 200))
      return ["Pet Sitting", "Pet Walking", "Pet Grooming", "Pet Training"]
    },

    getCrecheAmenities: async () => {
      await new Promise(resolve => setTimeout(resolve, 200))
      return ["WiFi", "Air Conditioning", "Pet Playground", "Camera Monitoring"]
    },

    getCrecheAvgPrice: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { avgPrice: 35000 }
    }
  },

  // Creches APIs (search)
  creches: {
    getCrechesSearch: async (requestBody: any) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        name: `Mock Creche ${i + 1}`,
        desc: `Description for creche ${i + 1}`,
        location: `Location ${i + 1}`,
        ratings: 4.0 + (i * 0.2),
        reviewCount: 5 + i,
        distance: 1.5 + i,
        fee: 30000 + (i * 5000),
        profileImage: `https://example.com/creche${i + 1}.jpg`
      }))
    }
  },

  // Visiting APIs
  visiting: {
    createVisiting: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return { isSuccess: true }
    },

    updateVisiting: async (id: number, body: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return { isSuccess: true }
    },

    getVisiting: async (visitingId: number) => {
      await new Promise(resolve => setTimeout(resolve, 300))
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
          reviewCount: 15
        }
      }
    },

    getVisitingCareGiver: async () => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { isSuccess: true, visiting: null }
    },

    getVisitingServices: async () => {
      await new Promise(resolve => setTimeout(resolve, 200))
      return ["Home Visit", "Pet Walking", "Pet Feeding", "Pet Playtime"]
    },

    getVisitingAmenities: async () => {
      await new Promise(resolve => setTimeout(resolve, 200))
      return ["Flexible Schedule", "Emergency Contact", "Photo Updates", "GPS Tracking"]
    },

    getVisitingAvgPrice: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { avgPrice: 25000 }
    }
  },

  // Visitings APIs (search)
  visitings: {
    getVisitingsSearch: async (requestBody: any) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        name: `Mock Visiting Service ${i + 1}`,
        desc: `Description for visiting service ${i + 1}`,
        location: `Location ${i + 1}`,
        ratings: 4.2 + (i * 0.15),
        reviewCount: 8 + i,
        distance: 2.0 + i,
        hourlyFee: 15000 + (i * 2000),
        profileImage: `https://example.com/visiting${i + 1}.jpg`
      }))
    }
  },

  // Favorite APIs
  favorite: {
    getFavorites: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return [{
        id: 1,
        name: "Favorite Petsitter",
        desc: "My favorite petsitter",
        location: "Favorite Location",
        ratings: 5.0,
        reviewCount: 20,
        profileImage: "https://example.com/favorite.jpg"
      }]
    },

    createFavorite: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { favoriteId: Math.floor(Math.random() * 1000) }
    },

    deleteFavorite: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { isSuccess: true }
    }
  },

  // Payment APIs
  payment: {
    calculateVisitingBooking: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return {
        subTotalFee: 50000,
        totalFee: 55000,
        petTypeExtraFee: [{
          petType: "LARGE",
          extraFee: 5000,
          count: 1
        }]
      }
    },

    calculateCrecheBooking: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return {
        subTotalFee: 80000,
        totalFee: 90000,
        petTypeExtraFee: [{
          petType: "MEDIUM",
          extraFee: 10000,
          count: 2
        }]
      }
    },

    createPayment: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return {
        isSuccess: true,
        paymentId: Math.floor(Math.random() * 10000)
      }
    },

    getSettlement: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return {
        settlementAmount: 45000,
        commission: 5000,
        netAmount: 40000
      }
    },

    getPaymentById: async (paymentId: number) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return {
        id: paymentId,
        amount: 50000,
        status: "COMPLETED",
        createdAt: "2023-01-15T10:00:00Z"
      }
    },

    verifyBankHolder: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return { isVerified: true }
    },

    preRegister: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return { isSuccess: true }
    }
  },

  // Review APIs
  review: {
    uploadURIS: async (images: any[]) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return images.map((_, i) => `https://example.com/uploaded${i + 1}.jpg`)
    },

    postVisitingReview: async (userId: number, body: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return { isSuccess: true }
    },

    postCrecheReview: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return { isSuccess: true }
    },

    getVisitingReview: async (bookingId: number) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return {
        id: bookingId,
        rating: 5,
        desc: "Excellent service!",
        images: ["https://example.com/review1.jpg"],
        createdAt: "2023-01-10T10:00:00Z"
      }
    },

    getCrecheReview: async (bookingId: number) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return {
        id: bookingId,
        rating: 4,
        desc: "Good experience",
        images: ["https://example.com/review2.jpg"],
        createdAt: "2023-01-12T10:00:00Z"
      }
    },

    getVisitingReviews: async (visitingId: number) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return Array.from({ length: 3 }, (_, i) => ({
        id: i + 1,
        rating: 4 + (i * 0.3),
        desc: `Review ${i + 1} for visiting service`,
        images: [`https://example.com/review${i + 1}.jpg`],
        createdAt: `2023-01-${10 + i}T10:00:00Z`,
        userName: `User${i + 1}`
      }))
    }
  },

  // Notification APIs
  notification: {
    getNotificationsBy: async (type: string) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        title: `Mock Notification ${i + 1}`,
        content: `This is mock notification content ${i + 1}`,
        createdAt: `2023-01-${15 + i}T10:00:00Z`,
        isRead: i % 2 === 0
      }))
    }
  },

  // Comment APIs  
  comment: {
    createVisitingComment: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { commentId: Math.floor(Math.random() * 1000) }
    },

    getVisitingComments: async (visitingId: number) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return Array.from({ length: 3 }, (_, i) => ({
        id: i + 1,
        content: `Mock comment ${i + 1} for visiting service`,
        createdAt: `2023-01-${10 + i}T10:00:00Z`,
        commentator: {
          id: i + 1,
          nickname: `Commenter${i + 1}`,
          profileImage: `https://example.com/commenter${i + 1}.jpg`
        }
      }))
    },

    updateVisitingComment: async (id: number, body: any) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { isSuccess: true }
    }
  },

  // Available Time APIs (simplified, would need more detailed implementation)
  visitingAvailableTime: {
    getVisitingAvailableTimes: async (visitingId: number) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return Array.from({ length: 7 }, (_, i) => ({
        id: i + 1,
        date: `2023-01-${15 + i}`,
        startTime: "09:00",
        endTime: "18:00",
        fee: 20000,
        isAvailable: true
      }))
    },

    getAvailableTimesByDate: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return {
        [body.date]: [{
          id: 1,
          startTime: "09:00",
          endTime: "12:00",
          fee: 20000,
          isAvailable: true
        }]
      }
    },

    createVisitingAvailableTime: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    updateVisitingAvailableTime: async (visitingId: number, body: any) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    deleteVisitingAvailableTime: async (visitingAvailableTimeId: number) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    disableVisitingAvailableTime: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    restoreVisitingAvailableTime: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { isSuccess: true }
    }
  },

  // Creche Date APIs (simplified)
  crecheDate: {
    getCrecheDates: async (crecheId: number) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        date: `2023-01-${15 + i}`,
        fee: 30000,
        isAvailable: true,
        bookingStatus: "AVAILABLE"
      }))
    },

    createCrecheDate: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    updateCrecheDate: async (crecheAvailableDateId: number, body: any) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    disableCrecheDate: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { isSuccess: true }
    },

    restoreCrecheDate: async (body: any) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { isSuccess: true }
    }
  },

  // Petsitter APIs (deprecated but still used)
  petsitter: {
    getPetsitterVisitings: async (visitingId: number) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return {
        id: visitingId,
        name: "Mock Visiting Petsitter",
        desc: "Experienced in home visits",
        services: ["Pet Walking", "Pet Feeding"],
        amenities: ["Flexible Schedule", "Photo Updates"]
      }
    },

    getPetsitterCreches: async (crecheId: number) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return {
        id: crecheId,
        name: "Mock Creche Petsitter",
        desc: "Professional pet boarding",
        services: ["Pet Boarding", "Pet Grooming"],
        amenities: ["24/7 Monitoring", "Play Area"]
      }
    }
  }
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
  cancelVisitingBooking
} = mockApi.booking

export const {
  getConfirmedBookings,
  getAllBookings
} = mockApi.careGiver

export const {
  sendSMS,
  verifySMS,
  signUp,
  login,
  getMe,
  updateUser,
  postPushToken,
  checkUserExists
} = mockApi.user

export const {
  getPets,
  updatePet,
  createPet,
  deletePet
} = mockApi.pets

// Export the entire mock API object for easy replacement
export default mockApi