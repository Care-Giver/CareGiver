import React, { FC, useEffect, useState } from "react"
import { FlatList, Pressable, View, StyleSheet, Image, ViewStyle, Linking } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  CareSummary,
  CaregiverTypeButton,
  DivisionLine,
  DivisionLineVertical,
  PreBol14,
  PreBol16,
  PreMed16,
  PreReg12,
  PreReg14,
  Row,
  Screen,
  SelectedPetCard,
} from "#components"
import { SHADOW_1, DBG, GIVER_CASUAL_NAVY, HEAD_LINE, LIGHT_LINE, SUB_HEAD_LINE } from "#theme"
import { images } from "#images"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import {
  Creche,
  CrecheBooking,
  Visiting,
  VisitingBooking,
  getCreche,
  getCrecheBooking,
  getVisiting,
  getVisitingBooking,
} from "#axios"
import { profileImageUriHandler } from "../../../../utils/image-format-validate"

const paymentData = {
  price: 42000,
  discount: -8000,
  totalPrice: 34000,
}

export const BookingDetailScreen: FC<
  StackScreenProps<NavigatorParamList, "booking-detail-screen">
> = observer(function BookingDetailScreen({ navigation, route }) {
  const { serviceType, crecheBookingId, visitingBookingId } = route.params

  const [booking, setBooking] = useState<CrecheBooking & VisitingBooking>(null)
  const [petsitter, setPetsitter] = useState<Creche & Visiting>(null)
  const [payment, setPayment] = useState(null)

  useEffect(() => {
    const id = serviceType === "creche" ? crecheBookingId : visitingBookingId
    const getBooking = serviceType === "creche" ? getCrecheBooking : getVisitingBooking
    //@ts-ignore
    getBooking(id).then(setBooking)
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

  const serviceTypeKorean = serviceType === "creche" ? "방문" : "위탁"

  return (
    <Screen testID="BookingDetail" style={{ paddingHorizontal: 0 }}>
      {booking && (
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
                  text={`(${booking?.ratings})`}
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
                <Pressable
                  style={[$pressableBox, SHADOW_1]}
                  onPress={() => {
                    Linking.openURL(
                      `tel:+${petsitter[serviceType].__careGiver__.__user__.phoneNumber}`,
                    )
                  }}
                >
                  <PreReg14 text={"전화하기"} color={HEAD_LINE} />
                </Pressable>
                <Pressable
                  style={[$pressableBox, SHADOW_1]}
                  onPress={() => {
                    //@ts-ignore
                    navigate("Chats")
                  }}
                >
                  <PreReg14 text={"메시지 보내기"} color={HEAD_LINE} />
                </Pressable>

                <Pressable
                  style={[$pressableAlarmBox, SHADOW_1]}
                  onPress={() => {
                    alert("신고 기능은 준비중입니다.")
                  }}
                >
                  <MaterialCommunityIcons name="alarm-light-outline" size={24} color={"#707070"} />
                </Pressable>
              </Row>
            </View>
          </Row>

          <DivisionLine mv={16} />

          <CareSummary
            address={booking?.location}
            start={booking.createAt}
            end={booking.createAt}
            petIds={booking?.petIds}
            serviceTypeKorean={serviceTypeKorean}
            showServiceType={true}
            style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}
          />
        </View>
      )}

      {/* // TODO: paymentId 로 fetch 한 response 로 결제 정보 UI 완성 */}
      {/* {payment && (
        <View style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}>
          <PreBol14 text={"결제 정보"} color={SUB_HEAD_LINE} mt={36} />

          <Row style={{ justifyContent: "space-between" }} mt={16}>
            <PreReg14
              text={`상품합계(${serviceTypeKorean}-${펫시터})`}
              color={SUB_HEAD_LINE}
            />
            <PreReg14 text={won(price)} color={SUB_HEAD_LINE} />
          </Row>

          <Row style={{ justifyContent: "space-between" }} mt={10}>
            <PreReg14 text={"할인 합계"} color={SUB_HEAD_LINE} />
            <PreReg14 text={won(discount)} color={SUB_HEAD_LINE} />
          </Row>

          <DivisionLine mv={12} />

          <Row style={{ justifyContent: "space-between" }}>
            <PreBol16 text={"총 결제 금액"} color={SUB_HEAD_LINE} />
            <PreBol16 text={won(totalPrice)} color={SUB_HEAD_LINE} />
          </Row>
        </View>
      )} */}
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
})
