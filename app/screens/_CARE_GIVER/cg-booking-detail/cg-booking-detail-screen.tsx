import React, { FC, useLayoutEffect, useMemo } from "react"
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  CareSummary,
  ConditionalButton,
  DivisionLine,
  PreBol14,
  PreBol18,
  PreMed14,
  PreReg14,
  Row,
  Screen,
} from "#components"
import { BookingStatus } from "#axios"
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

export const CgBookingDetailScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-booking-detail-screen">
> = observer(function CgBookingDetailScreen({ route, navigation }) {
  const { booking, serviceTypeKorean } = route.params

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
    "보호자가 요청한 사항이 없습니다."

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
            <PreReg14 text={requestedMessage} color={SUB_HEAD_LINE} mt={8} />
          </View>
        )}
        ListFooterComponentStyle={{
          marginTop: "auto",
          marginBottom: BOTTOM_HEIGHT,
        }}
        ListFooterComponent={() => (
          <ConditionalButton
            label={label}
            style={buttonStyle}
            labelTextColor={labelTextColor}
            isActivated={false}
            onPress={() => {
              // TODO: PENDING 일때 예약 취소 기능 구현
            }}
          />
        )}
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
