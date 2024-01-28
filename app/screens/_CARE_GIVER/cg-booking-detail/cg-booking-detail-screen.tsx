import React, { FC, useLayoutEffect, useMemo, useState } from "react"
import { Alert, FlatList, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  CareSummary,
  ConditionalButton,
  DeclineOrConfirmButton,
  DivisionLine,
  PreBol14,
  PreBol18,
  PreMed14,
  PreReg14,
  Row,
  Screen,
} from "#components"
import {
  BookingStatus,
  cancelCrecheBooking,
  cancelVisitingBooking,
  responseCrecheBooking,
  responseVisitingBooking,
} from "#axios"
import {
  BOTTOM_HEIGHT,
  DBG,
  DISABLED,
  GIVER_CASUAL_NAVY,
  HEAD_LINE,
  LBG,
  SUB_HEAD_LINE,
  SUCCESS_BLUE,
} from "#theme"
import { useStores } from "#models"

export const CgBookingDetailScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-booking-detail-screen">
> = observer(function CgBookingDetailScreen({ route, navigation }) {
  const {
    cgBookingStore: { rejectResponse, confirmResponse },
    petsitterStore: { createChannelWith },
  } = useStores()

  const { booking, serviceTypeKorean } = route.params

  const [isCancelBookingActivated, setIsCancelBookingActivated] = useState(
    booking?.status === BookingStatus.PENDING,
  )

  // ? 헤더 타이틀 설정
  useLayoutEffect(() => {
    let status = ""
    switch (booking?.status) {
      case BookingStatus.WAITING:
        status = "신청"
        break
      case BookingStatus.REJECT:
        status = "거절"
        break
      case BookingStatus.PENDING:
      case BookingStatus.PROCEEDING:
      case BookingStatus.COMPLETE:
        status = "예약"
        break
    }

    navigation.setOptions({ title: `${status} 내역 상세` })
  }, [navigation, booking])

  const startProp = serviceTypeKorean === "위탁" ? "startDate" : "startTime"
  const endProp = serviceTypeKorean === "위탁" ? "endDate" : "endTime"

  const requestedMessage =
    (booking?.services && booking?.services.length !== 0 && booking?.services.join("\n")) ||
    `보호자가 요청한 사항이 없어요.\n케어 진행 관련 궁금한 점이 있으면 보호자님께 메시지를 보내보세요!`

  const { buttonStyle, labelTextColor, label } = useMemo(() => {
    let byStatus = {} as ViewStyle
    let textColor = "transparent"
    let labelText = ""
    switch (booking?.status) {
      case BookingStatus.PROCEEDING:
      case BookingStatus.COMPLETE:
        byStatus = { borderColor: DBG }
        textColor = DISABLED
        labelText = booking?.status === BookingStatus.PROCEEDING ? "케어 진행중" : "케어 완료"
        break
      case BookingStatus.PENDING:
        byStatus = { borderColor: GIVER_CASUAL_NAVY }
        textColor = GIVER_CASUAL_NAVY
        labelText = "예약 취소하기"
        break
      default:
        byStatus = { width: 0, height: 0, borderWidth: 0 }
        textColor = "transparent"
        labelText = ""
    }

    return {
      buttonStyle: Object.assign({}, styles.button, byStatus),
      labelTextColor: textColor,
      label: labelText,
    }
  }, [booking?.status])

  const responsor = serviceTypeKorean === "위탁" ? responseCrecheBooking : responseVisitingBooking
  const idProp = serviceTypeKorean === "위탁" ? "crecheBookingId" : "visitingBookingId"
  const bookingId = booking[idProp]
  const canceler = serviceTypeKorean === "위탁" ? cancelCrecheBooking : cancelVisitingBooking

  return (
    <Screen testID="CgBookingDetail">
      <FlatList
        data={Array.from({ length: 1 })}
        // style={{ width: "100%", height: "100%", backgroundColor: "red", flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
        renderItem={() => (
          <View>
            <Row style={{ justifyContent: "space-between" }}>
              <PreBol18 text={`${booking?.name} 님`} />
              <BookingStatusBadge status={booking?.status} />
            </Row>
            <DivisionLine mt={10} mb={12} />
            <CareSummary
              address={booking?.address}
              start={booking[startProp]}
              end={booking[endProp]}
              petIds={booking?.pets ? booking?.pets.map((v) => v.id) : []}
              serviceTypeKorean={serviceTypeKorean}
              showServiceType={true}
            />
            <PreBol14 text={"요청 사항"} color={SUB_HEAD_LINE} mt={36} />
            <PreReg14
              text={requestedMessage}
              color={SUB_HEAD_LINE}
              mt={8}
              style={{ lineHeight: 20 }}
            />
          </View>
        )}
        ListFooterComponentStyle={{
          marginTop: "auto",
          marginBottom: BOTTOM_HEIGHT,
        }}
        ListFooterComponent={() => {
          // "신청 내역 상세" 일때
          if (booking?.status === BookingStatus.WAITING) {
            return (
              <DeclineOrConfirmButton
                size="l"
                declineText={"거절하기"}
                onDeclinePress={() => {
                  // 거절
                  Alert.alert(
                    "해당 신청을 정말 거절하시겠어요?",
                    `예약을 거절하면 해당 예약을 진행하실 수 없어요.\n(UI 개발중🏗️ - TODO: Modal, BottomSheet 으로 수정)`,
                    [
                      {
                        text: "취소",
                        // onPress: () => console.log("취소"),
                      },
                      {
                        text: "거절하기",
                        //@ts-ignore
                        onPress: () => {
                          responsor(bookingId, { response: false }).then(({ isSuccess }) => {
                            if (isSuccess) {
                              rejectResponse(bookingId)
                              navigation.goBack()
                            }
                          })
                        },
                      },
                    ],
                    { cancelable: true },
                  )
                }}
                confirmText={"수락하기"}
                onConfirmPress={() => {
                  // 수락
                  responsor(bookingId, { response: true }).then(({ isSuccess }) => {
                    if (isSuccess) {
                      confirmResponse(bookingId)
                      createChannelWith(booking?.clientStreamToken)
                      Alert.alert(
                        "예약 수락 완료!",
                        `보호자와의 채팅방이 생성되었습니다.\n채팅 탭에서 확인해보세요!`,
                        [
                          {
                            text: "취소",
                            // onPress: () => console.log("취소"),
                          },
                          {
                            text: "이동하기",
                            //@ts-ignore
                            onPress: () => navigate("Chats"),
                          },
                        ],
                        { cancelable: true },
                      )
                    }
                  })
                }}
                style={{ alignSelf: "flex-end", marginTop: 20 }}
              />
            )
          }

          // 그 외 전부
          return (
            <ConditionalButton
              label={label}
              style={buttonStyle}
              labelTextColor={labelTextColor}
              isActivated={isCancelBookingActivated}
              onPress={() => {
                // 예약 취소
                if (booking?.status === BookingStatus.PENDING) {
                  Alert.alert(
                    "수락한 예약을 정말 취소하시겠어요?",
                    `예약을 취소할 경우 정책에 따라 패널티가 부과됩니다.\n자세한 내용은 FAQ를 참조해주세요.\n(기능 개발중🏗️) - TODO: API 연결)`,
                    [
                      {
                        text: "취소",
                        // onPress: () => console.log("취소"),
                      },
                      {
                        text: "예약 취소하기",
                        onPress: () => {
                          //@ts-ignore
                          canceler({
                            [idProp]: bookingId,
                            reason: "API 작동 테스트",
                            isPetSitterCancel: true,
                          }).then((res) => {
                            if (res?.isSuccess) {
                              setIsCancelBookingActivated(false)
                              // TODO: 예약취소 성공 모달
                            }
                          })
                        },
                      },
                    ],
                    { cancelable: true },
                  )
                }
              }}
            />
          )
        }}
      />
    </Screen>
  )
})

const styles = StyleSheet.create({
  // root: {},
  button: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 2,
  },
})

interface BookingStatusBadgeProps {
  status: BookingStatus
  style?: StyleProp<ViewStyle>
}
const BookingStatusBadge = observer(function BookingStatusBadge(props: BookingStatusBadgeProps) {
  const { status, style } = props

  let statusText = ""
  let backgroundColor = "transparent"
  let color = "transparent"
  switch (status) {
    case BookingStatus.WAITING:
      statusText = "예정"
      backgroundColor = LBG
      color = HEAD_LINE
      break
    case BookingStatus.PROCEEDING:
      statusText = "진행중"
      backgroundColor = LBG
      color = DISABLED
      break
    case BookingStatus.COMPLETE:
      statusText = "완료"
      backgroundColor = SUCCESS_BLUE
      color = "white"
      break
  }

  const allStyles = Object.assign({}, styles2.root, { backgroundColor }, style)
  return (
    <View style={allStyles}>
      <PreMed14 text={`케어 ${statusText}`} color={color} />
    </View>
  )
})

const styles2 = StyleSheet.create({
  root: {
    backgroundColor: LBG,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
})
