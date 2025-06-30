import { USE_MOCK_API } from "./api-config"
import { mockApi } from "./mock-api"

// Real API imports
import * as realBooking from "./booking"
import * as realCareGiver from "./care-giver" 
import * as realUser from "./user"
import * as realPets from "./pets"
import * as realCreche from "./creche"
import * as realCreches from "./creches"
import * as realVisiting from "./visiting"
import * as realVisitings from "./visitings"
import * as realFavorite from "./favorite"
import * as realPayment from "./payment"
import * as realPaymentCalculate from "./payment-calculate"
import * as realReview from "./review"
import * as realNotification from "./notification"
import * as realComment from "./comment"
import * as realCrecheDate from "./creche-date"
import * as realVisitingAvailableTime from "./visiting-available-time"
import * as realPetsitter from "./petsitter"

console.log(USE_MOCK_API ? "🚀 Using Mock APIs - Running without backend server" : "🌐 Using Real APIs - Connecting to backend server")

// Booking APIs
export const createCrecheBooking = USE_MOCK_API ? mockApi.booking.createCrecheBooking : realBooking.createCrecheBooking
export const createVisitingBooking = USE_MOCK_API ? mockApi.booking.createVisitingBooking : realBooking.createVisitingBooking
export const getCrechePetsitters = USE_MOCK_API ? mockApi.booking.getCrechePetsitters : realBooking.getCrechePetsitters
export const getCrecheBooking = USE_MOCK_API ? mockApi.booking.getCrecheBooking : realBooking.getCrecheBooking
export const getVisitingPetsitters = USE_MOCK_API ? mockApi.booking.getVisitingPetsitters : realBooking.getVisitingPetsitters
export const getVisitingBooking = USE_MOCK_API ? mockApi.booking.getVisitingBooking : realBooking.getVisitingBooking
export const getCurrentBookings = USE_MOCK_API ? mockApi.booking.getCurrentBookings : realBooking.getCurrentBookings
export const getPreviousBookings = USE_MOCK_API ? mockApi.booking.getPreviousBookings : realBooking.getPreviousBookings
export const getFirstPreviousBooking = USE_MOCK_API ? mockApi.booking.getFirstPreviousBooking : realBooking.getFirstPreviousBooking
export const getMyWaitingBookings = USE_MOCK_API ? mockApi.booking.getMyWaitingBookings : realBooking.getMyWaitingBookings
export const responseCrecheBooking = USE_MOCK_API ? mockApi.booking.responseCrecheBooking : realBooking.responseCrecheBooking
export const responseVisitingBooking = USE_MOCK_API ? mockApi.booking.responseVisitingBooking : realBooking.responseVisitingBooking
export const cancelCrecheBooking = USE_MOCK_API ? mockApi.booking.cancelCrecheBooking : realBooking.cancelCrecheBooking
export const cancelVisitingBooking = USE_MOCK_API ? mockApi.booking.cancelVisitingBooking : realBooking.cancelVisitingBooking

// Care Giver APIs
export const getConfirmedBookings = USE_MOCK_API ? mockApi.careGiver.getConfirmedBookings : realCareGiver.getConfirmedBookings
export const getAllBookings = USE_MOCK_API ? mockApi.careGiver.getAllBookings : realCareGiver.getAllBookings

// User APIs
export const sendSMS = USE_MOCK_API ? mockApi.user.sendSMS : realUser.sendSMS
export const verifySMS = USE_MOCK_API ? mockApi.user.verifySMS : realUser.verifySMS
export const signUp = USE_MOCK_API ? mockApi.user.signUp : realUser.signUp
export const login = USE_MOCK_API ? mockApi.user.login : realUser.login
export const getMe = USE_MOCK_API ? mockApi.user.getMe : realUser.getMe
export const updateUser = USE_MOCK_API ? mockApi.user.updateUser : realUser.updateUser
export const postPushToken = USE_MOCK_API ? mockApi.user.postPushToken : realUser.postPushToken
export const checkUserExists = USE_MOCK_API ? mockApi.user.checkUserExists : realUser.checkUserExists

// Pet APIs
export const getPets = USE_MOCK_API ? mockApi.pets.getPets : realPets.getPets
export const updatePet = USE_MOCK_API ? mockApi.pets.updatePet : realPets.updatePet
export const createPet = USE_MOCK_API ? mockApi.pets.createPet : realPets.createPet
export const deletePet = USE_MOCK_API ? mockApi.pets.deletePet : realPets.deletePet

// Creche APIs
export const createCreche = USE_MOCK_API ? mockApi.creche.createCreche : realCreche.createCreche
export const updateCreche = USE_MOCK_API ? mockApi.creche.updateCreche : realCreche.updateCreche
export const getCreche = USE_MOCK_API ? mockApi.creche.getCreche : realCreche.getCreche
export const getCrecheCareGiver = USE_MOCK_API ? mockApi.creche.getCrecheCareGiver : realCreche.getCrecheCareGiver
export const getCrecheServices = USE_MOCK_API ? mockApi.creche.getCrecheServices : realCreche.getCrecheServices
export const getCrecheAmenities = USE_MOCK_API ? mockApi.creche.getCrecheAmenities : realCreche.getCrecheAmenities
export const getCrecheAvgPrice = USE_MOCK_API ? mockApi.creche.getCrecheAvgPrice : realCreche.getCrecheAvgPrice

// Creches APIs (search)
export const getCrechesSearch = USE_MOCK_API ? mockApi.creches.getCrechesSearch : realCreches.getCrechesSearch

// Visiting APIs
export const createVisiting = USE_MOCK_API ? mockApi.visiting.createVisiting : realVisiting.createVisiting
export const updateVisiting = USE_MOCK_API ? mockApi.visiting.updateVisiting : realVisiting.updateVisiting
export const getVisiting = USE_MOCK_API ? mockApi.visiting.getVisiting : realVisiting.getVisiting
export const getVisitingCareGiver = USE_MOCK_API ? mockApi.visiting.getVisitingCareGiver : realVisiting.getVisitingCareGiver
export const getVisitingServices = USE_MOCK_API ? mockApi.visiting.getVisitingServices : realVisiting.getVisitingServices
export const getVisitingAmenities = USE_MOCK_API ? mockApi.visiting.getVisitingAmenities : realVisiting.getVisitingAmenities
export const getVisitingAvgPrice = USE_MOCK_API ? mockApi.visiting.getVisitingAvgPrice : realVisiting.getVisitingAvgPrice

// Visitings APIs (search)
export const getVisitingsSearch = USE_MOCK_API ? mockApi.visitings.getVisitingsSearch : realVisitings.getVisitingsSearch

// Favorite APIs
export const getFavorites = USE_MOCK_API ? mockApi.favorite.getFavorites : realFavorite.getFavorites
export const createFavorite = USE_MOCK_API ? mockApi.favorite.createFavorite : realFavorite.createFavorite
export const deleteFavorite = USE_MOCK_API ? mockApi.favorite.deleteFavorite : realFavorite.deleteFavorite

// Payment APIs
export const calculateVisitingBooking = USE_MOCK_API ? mockApi.payment.calculateVisitingBooking : realPaymentCalculate.calculateVisitingBooking
export const calculateCrecheBooking = USE_MOCK_API ? mockApi.payment.calculateCrecheBooking : realPaymentCalculate.calculateCrecheBooking
export const createPayment = USE_MOCK_API ? mockApi.payment.createPayment : realPayment.createPayment
export const getSettlement = USE_MOCK_API ? mockApi.payment.getSettlement : realPayment.getSettlement
export const getPaymentById = USE_MOCK_API ? mockApi.payment.getPaymentById : realPayment.getPaymentById
export const verifyBankHolder = USE_MOCK_API ? mockApi.payment.verifyBankHolder : realPayment.verifyBankHolder
export const preRegister = USE_MOCK_API ? mockApi.payment.preRegister : realPayment.preRegister

// Review APIs
export const uploadURIS = USE_MOCK_API ? mockApi.review.uploadURIS : realReview.uploadURIS
export const postVisitingReview = USE_MOCK_API ? mockApi.review.postVisitingReview : realReview.postVisitingReview
export const postCrecheReview = USE_MOCK_API ? mockApi.review.postCrecheReview : realReview.postCrecheReview
export const getVisitingReview = USE_MOCK_API ? mockApi.review.getVisitingReview : realReview.getVisitingReview
export const getCrecheReview = USE_MOCK_API ? mockApi.review.getCrecheReview : realReview.getCrecheReview
export const getVisitingReviews = USE_MOCK_API ? mockApi.review.getVisitingReviews : realReview.getVisitingReviews

// Notification APIs
export const getNotificationsBy = USE_MOCK_API ? mockApi.notification.getNotificationsBy : realNotification.getNotificationsBy

// Comment APIs
export const createVisitingComment = USE_MOCK_API ? mockApi.comment.createVisitingComment : realComment.createVisitingComment
export const getVisitingComments = USE_MOCK_API ? mockApi.comment.getVisitingComments : realComment.getVisitingComments
export const updateVisitingComment = USE_MOCK_API ? mockApi.comment.updateVisitingComment : realComment.updateVisitingComment

// Creche Date APIs
export const getCrecheDates = USE_MOCK_API ? mockApi.crecheDate.getCrecheDates : realCrecheDate.getCrecheDates
export const createCrecheDate = USE_MOCK_API ? mockApi.crecheDate.createCrecheDate : realCrecheDate.createCrecheDate
export const updateCrecheDate = USE_MOCK_API ? mockApi.crecheDate.updateCrecheDate : realCrecheDate.updateCrecheDate
export const disableCrecheDate = USE_MOCK_API ? mockApi.crecheDate.disableCrecheDate : realCrecheDate.disableCrecheDate
export const restoreCrecheDate = USE_MOCK_API ? mockApi.crecheDate.restoreCrecheDate : realCrecheDate.restoreCrecheDate

// Visiting Available Time APIs
export const getVisitingAvailableTimes = USE_MOCK_API ? mockApi.visitingAvailableTime.getVisitingAvailableTimes : realVisitingAvailableTime.getVisitingAvailableTimes
export const getAvailableTimesByDate = USE_MOCK_API ? mockApi.visitingAvailableTime.getAvailableTimesByDate : realVisitingAvailableTime.getAvailableTimesByDate
export const createVisitingAvailableTime = USE_MOCK_API ? mockApi.visitingAvailableTime.createVisitingAvailableTime : realVisitingAvailableTime.createVisitingAvailableTime
export const updateVisitingAvailableTime = USE_MOCK_API ? mockApi.visitingAvailableTime.updateVisitingAvailableTime : realVisitingAvailableTime.updateVisitingAvailableTime
export const deleteVisitingAvailableTime = USE_MOCK_API ? mockApi.visitingAvailableTime.deleteVisitingAvailableTime : realVisitingAvailableTime.deleteVisitingAvailableTime
export const disableVisitingAvailableTime = USE_MOCK_API ? mockApi.visitingAvailableTime.disableVisitingAvailableTime : realVisitingAvailableTime.disableVisitingAvailableTime
export const restoreVisitingAvailableTime = USE_MOCK_API ? mockApi.visitingAvailableTime.restoreVisitingAvailableTime : realVisitingAvailableTime.restoreVisitingAvailableTime

// Petsitter APIs (deprecated)
export const getPetsitterVisitings = USE_MOCK_API ? mockApi.petsitter.getPetsitterVisitings : realPetsitter.getPetsitterVisitings
export const getPetsitterCreches = USE_MOCK_API ? mockApi.petsitter.getPetsitterCreches : realPetsitter.getPetsitterCreches

// Re-export types from real APIs (they should be the same regardless of mock/real)
export * from "./booking"
export * from "./care-giver"
export * from "./user"
export * from "./pets"
export * from "./axios-config"