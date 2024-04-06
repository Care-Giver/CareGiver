import React, { FC, useEffect, useMemo, useState } from "react"
import { Pressable, View, StyleSheet, Image, ViewStyle, Linking, ScrollView } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  CareSummary,
  CaregiverTypeButton,
  ConditionalButton,
  DivisionLine,
  DivisionLineVertical,
  PreBol14,
  PreBol16,
  PreMed16,
  PreReg12,
  PreReg14,
  RefundNote,
  Row,
  Screen,
} from "#components"
import {
  SHADOW_1,
  DBG,
  GIVER_CASUAL_NAVY,
  HEAD_LINE,
  LIGHT_LINE,
  SUB_HEAD_LINE,
  DISABLED,
  WIDTH,
} from "#theme"
import { images } from "#images"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import {
  BookingStatus,
  Creche,
  PaymentColumns,
  RenamedCrecheBooking,
  RenamedVisitingBooking,
  Visiting,
  getCreche,
  getCrecheBooking,
  getPaymentById,
  getVisiting,
  getVisitingBooking,
} from "#api"
import { profileImageUriHandler } from "../../../../utils/image-format-validate"
import { price as priceFormatter, ratingRound } from "../../../../utils/format"
import { alertModal } from "../../../../utils/alert-modal"
import { useStores } from "#models"
import Popover from "react-native-popover-view"

export const BookingDetailScreen: FC<
  StackScreenProps<NavigatorParamList, "booking-detail-screen">
> = observer(function BookingDetailScreen({ navigation, route }) {
  const { serviceType, crecheBookingId, visitingBookingId, paymentId } = route.params
  const {
    petStore: { getPetsByIds },
  } = useStores()

  const [booking, setBooking] = useState<RenamedCrecheBooking & RenamedVisitingBooking>(null)
  const [petsitter, setPetsitter] = useState<Creche & Visiting>(null)
  const [payment, setPayment] = useState<PaymentColumns>(null)
  const [showPopover, setShowPopover] = useState<boolean>(false)

  useEffect(() => {
    const id = serviceType === "creche" ? crecheBookingId : visitingBookingId
    const getBooking = serviceType === "creche" ? getCrecheBooking : getVisitingBooking
    //@ts-ignore
    getBooking(id).then(setBooking)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getPaymentById(paymentId).then(setPayment)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!booking) return
    const id = serviceType === "creche" ? booking?.crecheId : booking?.visitingId
    const getPetsitter = serviceType === "creche" ? getCreche : getVisiting
    //@ts-ignore
    getPetsitter(id).then(setPetsitter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking])

  const serviceTypeKorean = serviceType === "creche" ? "위탁" : "방문"

  const isChatActivated =
    booking?.status === BookingStatus.PENDING || booking?.status === BookingStatus.PROCEEDING

  const byStatus = useMemo(() => {
    switch (booking?.status) {
      case BookingStatus.PROCEEDING:
      case BookingStatus.COMPLETE:
      case BookingStatus.PENDING:
        return { borderColor: DBG } as ViewStyle
      case BookingStatus.WAITING:
        return { borderColor: GIVER_CASUAL_NAVY } as ViewStyle
      default:
        return { width: 0, height: 0, borderWidth: 0 } as ViewStyle
    }
  }, [booking?.status])
  const buttonStyle = Object.assign({}, styles.button, byStatus)
  const labelTextColor = useMemo(() => {
    switch (booking?.status) {
      case BookingStatus.PROCEEDING:
      case BookingStatus.COMPLETE:
      case BookingStatus.PENDING:
        return DISABLED
      case BookingStatus.WAITING:
        return GIVER_CASUAL_NAVY
      default:
        return ""
    }
  }, [booking?.status])
  const label = useMemo(() => {
    switch (booking?.status) {
      case BookingStatus.PROCEEDING:
        return "케어 진행중"
      case BookingStatus.COMPLETE:
        return "케어 완료"
      case BookingStatus.PENDING:
        return "케어 예정"
      case BookingStatus.WAITING:
        return "예약 취소하기"
      default:
        return ""
    }
  }, [booking?.status])

  return (
    <Screen testID="BookingDetail" style={{ paddingHorizontal: 0 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          {
            // paddingBottom: 4 * BOTTOM_HEIGHT,
          }
        }
      >
        {booking && petsitter && (
          <View>
            <Row style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}>
              <Image
                style={styles.profileImage}
                source={profileImageUriHandler(
                  images.default_pet_image_60,
                  "small",
                  petsitter?.userProfile,
                )}
              />

              <View
                style={{
                  height: "100%",
                  width: "74%",
                  marginLeft: 12,
                }}
              >
                <Row>
                  <PreMed16 text={petsitter?.userNickname} color={HEAD_LINE} />
                  <Row
                    style={{
                      width: "auto",
                      marginLeft: "auto",
                    }}
                  >
                    <CaregiverTypeButton text={serviceTypeKorean} />
                    <CaregiverTypeButton text={"펫시터"} style={{ marginLeft: 4 }} />
                  </Row>
                </Row>

                <Row mt={4}>
                  <Image style={styles.star} source={images.rating_star} />

                  <PreReg12
                    text={`(${ratingRound(petsitter[serviceType].star)})`}
                    color={SUB_HEAD_LINE}
                    style={{ marginLeft: 4 }}
                  />

                  <DivisionLineVertical
                    color={DBG}
                    width={1}
                    height={14}
                    style={{ marginLeft: 8, marginRight: 8 }}
                  />

                  <PreReg12
                    text={`후기 ${petsitter?.reviewCount}개`}
                    color={GIVER_CASUAL_NAVY}
                    // style={{ marginLeft: 4 }}
                  />
                </Row>

                <Row mt={12} style={{ justifyContent: "space-between" }}>
                  {booking?.status === BookingStatus.WAITING ? (
                    <Popover
                      backgroundStyle={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
                      popoverStyle={{ backgroundColor: "#F1F1F4", padding: 10 }}
                      isVisible={showPopover}
                      onRequestClose={() => setShowPopover(false)}
                      from={
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                          <Pressable
                            style={[$pressableBox, SHADOW_1, { marginLeft: 10 * WIDTH }]}
                            onPress={() => setShowPopover(true)}
                          >
                            <PreReg14 text={"메시지 보내기"} color={DISABLED} />
                          </Pressable>
                        </View>
                      }
                    >
                      <PreReg12 text="케어기버가 예약을 승인하면 활성화됩니다." />
                    </Popover>
                  ) : (
                    <Pressable
                      style={[$pressableBox, SHADOW_1]}
                      onPress={() => {
                        if (!isChatActivated) {
                          alertModal(
                            "예약이 시작되기 전에는 메시지를 보낼 수 없습니다.",
                            "펫시터가 예약을 수락할 때 까지 기다려 주세요.",
                          )
                          return
                        }
                        //@ts-ignore
                        navigate("Chats")
                      }}
                    >
                      <PreReg14
                        text={"메시지 보내기"}
                        color={isChatActivated ? HEAD_LINE : DISABLED}
                      />
                    </Pressable>
                  )}

                  {/* <Pressable
                    style={[$pressableAlarmBox, SHADOW_1]}
                    onPress={() => {
                      alertModal("개발중 🏗️", "신고 기능은 준비중입니다.")
                    }}
                  >
                    <MaterialCommunityIcons
                      name="alarm-light-outline"
                      size={24}
                      color={"#707070"}
                    />
                  </Pressable> */}
                </Row>
              </View>
            </Row>

            <DivisionLine mv={16} />

            <CareSummary
              address={booking?.location}
              start={booking.start}
              end={booking.end}
              pets={getPetsByIds(booking?.petIds)}
              serviceTypeKorean={serviceTypeKorean}
              showServiceType={true}
              style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}
            />
          </View>
        )}

        {/* // TODO: 할인 합계 정보 구현*/}
        {payment && (
          <View style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}>
            <PreBol14 text={"결제 정보"} color={SUB_HEAD_LINE} mt={36} />

            <Row style={{ justifyContent: "space-between" }} mt={16}>
              <PreReg14 text={`상품합계(${serviceTypeKorean}-펫시터)`} color={SUB_HEAD_LINE} />
              <PreReg14
                text={`${priceFormatter(payment?.totalFee?.toString())}원`}
                color={SUB_HEAD_LINE}
              />
            </Row>

            <Row style={{ justifyContent: "space-between" }} mt={10}>
              <PreReg14 text={"할인 합계"} color={SUB_HEAD_LINE} />
              <PreReg14
                // text={`${priceFormatter(payment?.totalFee?.toString())}원`}
                text={`0원`}
                color={SUB_HEAD_LINE}
              />
            </Row>

            <DivisionLine mv={12} />

            <Row style={{ justifyContent: "space-between" }}>
              <PreBol16 text={"총 결제 금액"} color={SUB_HEAD_LINE} />
              <PreBol16
                text={`${priceFormatter(payment?.totalFee?.toString())}원`}
                color={SUB_HEAD_LINE}
              />
            </Row>
          </View>
        )}

        {booking && (
          <View
            style={{
              width: "100%",
              paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <ConditionalButton
              label={label}
              style={buttonStyle}
              labelTextColor={labelTextColor}
              isActivated={false}
              onPress={() => {
                // TODO: WAITING 일때 예약 취소 기능 구현
              }}
            />
            {/* 환불 안내 */}
            <RefundNote style={{ marginBottom: 148 }} />
          </View>
        )}
      </ScrollView>
    </Screen>
  )
})

const $pressableBox: ViewStyle = {
  width: "auto",
  height: "auto",
  paddingHorizontal: 22,
  paddingVertical: 8,
  borderRadius: 4,
  backgroundColor: "white",
}

const $pressableAlarmBox: ViewStyle = {
  width: "auto",
  height: "auto",
  paddingHorizontal: 6,
  paddingVertical: 6,
  borderRadius: 6,
  backgroundColor: "white",
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: 60,
  },
  profileImage: {
    width: 84,
    height: 84,
    borderRadius: 84,
    borderWidth: 2,
    borderColor: LIGHT_LINE,
    resizeMode: "cover",
  },
  star: {
    width: 13.12,
    height: 12,
  },
  rightArrow: { width: 16, height: 16 },
  button: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 2,
    marginBottom: 42,
  },
})
