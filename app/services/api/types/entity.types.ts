/* eslint-disable camelcase */
export interface CareGiverEntity {
  id: number
  createAt: string
  updatedAt: string
  careGiverStreamToken: string | null
  __user__: UserEntity
  __has_user__: boolean
}

export interface UserEntity {
  id: number
  createAt: string
  updatedAt: string
  email: string
  role: string
  nickname: string
  phoneNumber: string | null
  sex: string
  birthday: string | null
  provider: string
  address: string | null
  desc: string | null
  profileImage: string | null
  isCertified: boolean
  pushToken: string | null
  clientStreamToken: string | null
  maxDistance: number
  privacyPolicyConsent: boolean
  termsOfServiceConsent: boolean
  marketingConsent: boolean
  locationBasedServiceConsent: boolean
}

export interface CrecheReviewEntity {
  id: number
  createAt: string
  updatedAt: string
  desc: string
  star: number
  images: string[]
  hasReply: boolean
  reviewReply: string | null
}

export interface VisitingReviewEntity {}
