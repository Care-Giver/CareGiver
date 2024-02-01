import React, { FC, ReactNode, useState } from "react"
import {
  FlatList,
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  Image,
  Alert,
} from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, goBack, navigate } from "#navigators"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  DeclineOrConfirmButton,
  DivisionLine,
  PreBol16,
  PreMed12,
  PreMed16,
  PreReg12,
  PreReg14,
  PreMed18,
  Row,
  Screen,
} from "#components"
import { ServiceTypeKorean, useStores } from "#models"
import {
  BODY,
  BOTTOM_HEIGHT,
  CARE_NATURAL_BLUE,
  DISABLED,
  LIGHT_LINE,
  SHADOW_1,
  SUB_HEAD_LINE,
} from "#theme"
import { CgBooking, responseCrecheBooking, responseVisitingBooking } from "#api"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { HEADER_ROOT } from "../../../components/_SCREEN_HEADER/common-styles"
import { images } from "#images"
import { formatSchedule } from "../../../utils/format"
import _ from "lodash"

export const CgBookingListScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-booking-list-screen">
> = observer(function CgBookingListScreen() {
  const {
    cgBookingStore: {
      setBookings,
      waitingBookings,
      rejectedBookings,
      rejectResponse,
      confirmResponse,
    },
    petsitterStore: { serviceType, createChannelWith },
  } = useStores()

  const [mode, setMode] = useState<Mode>("신청")

  const bookingIdProp = serviceType === "creche" ? "crecheBookingId" : "visitingBookingId"
  const responsor = serviceType === "creche" ? responseCrecheBooking : responseVisitingBooking
  const bookings = mode === "신청" ? waitingBookings : rejectedBookings

  return (
    <Screen testID="CgBookingList" style={{ paddingHorizontal: 0 }}>
      <ScreenHeader
        mode={mode}
        onToggle={() => {
          setMode(mode === "신청" ? "거절" : "신청")
        }}
      />
      {/* 카드 */}
      <FlatList
        data={_.orderBy<CgBooking>(bookings, ["createAt"], ["desc"])}
        renderItem={({ item, index }) => {
          const bookingId = item[bookingIdProp]
          const serviceTypeKorean = item?.crecheBookingId ? "위탁" : "방문"
          return (
            <BookingInfoCardWithButton
              onPressBookingDetail={() => {
                navigate("cg-booking-detail-screen", { booking: item, serviceTypeKorean })
              }}
              booking={item}
              serviceTypeKorean={serviceTypeKorean}
              style={{
                marginTop: index === 0 ? 0 : 20,
              }}
              mode={mode}
              buttonComponent={
                mode === "신청" ? (
                  <DeclineOrConfirmButton
                    size="m"
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
                                isSuccess && rejectResponse(bookingId)
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
                          createChannelWith(item.clientStreamToken)
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
                ) : null
              }
              index={index}
            />
          )
        }}
        ListEmptyComponent={
          <View
            style={{
              alignSelf: "center",
              alignItems: "center",
              marginVertical: "50%",
            }}
          >
            <Image source={images.dog_question} style={{ width: 179, height: 192 }} />
            <PreMed18 text={`${mode}한 예약이 내역이 없어요.`} />
          </View>
        }
        style={{
          width: "100%",
          height: "100%",
          //
          // backgroundColor: "red",
        }}
        contentContainerStyle={{
          paddingTop: 8,
          paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
          paddingBottom: BOTTOM_HEIGHT + 8,
        }}
      />
    </Screen>
  )
})
const styles = StyleSheet.create({
  // root: {},
  goBackButton: {
    width: 28,
    height: 28,
  },
})

type Mode = "거절" | "신청"
interface ScreenHeaderProps {
  mode: Mode
  onToggle: () => void
}
const ScreenHeader = (props: ScreenHeaderProps) => {
  const { mode, onToggle } = props
  return (
    <View
      style={[
        HEADER_ROOT,
        { justifyContent: "space-between", paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH },
      ]}
    >
      {/* 뒤로가기 버튼 */}
      <Pressable onPress={goBack} style={{ flexDirection: "row", alignItems: "center" }}>
        <Image style={styles.goBackButton} source={images.go_back} />
        <PreMed18 text={`${mode} 내역`} ml={12} />
      </Pressable>

      {/* 거절 OR 신청내역 토글 */}
      <TouchableOpacity onPress={onToggle}>
        <PreMed16 text={mode === "신청" ? "거절 내역 보기" : "신청 내역 보기"} color={DISABLED} />
      </TouchableOpacity>
    </View>
  )
}

interface BookingInfoCardWithActionButtonProps {
  booking: CgBooking
  buttonComponent?: ReactNode
  index: number
  serviceTypeKorean: ServiceTypeKorean
  mode: Mode
  onPressBookingDetail: () => void
  style?: StyleProp<ViewStyle>
}
const BookingInfoCardWithButton = observer(function BookingInfoCardWithActionButton(
  props: BookingInfoCardWithActionButtonProps,
) {
  const {
    booking,
    buttonComponent,
    index,
    serviceTypeKorean,
    mode,
    onPressBookingDetail,
    style,
  } = props
  const { pets, address, name, createAt } = booking

  const names = pets.map((v) => ({
    petName: v.name,
    speciesName: v.species.name,
  }))
  const postedAt = format(new Date(createAt), "yyyy.MM.dd(eee) HH:mm", { locale: ko })
  const petsName = names.map((v) => v.petName).join(" / ")
  const speciesName = names.map((v) => v.speciesName).join(" / ")

  const startProp = serviceTypeKorean === "위탁" ? "startDate" : "startTime"
  const endProp = serviceTypeKorean === "위탁" ? "endDate" : "endTime"
  const schedule = formatSchedule({
    start: booking[startProp],
    end: booking[endProp],
    serviceTypeKorean: serviceTypeKorean,
  })

  const allStyles = Object.assign(
    {},
    styles2.root,
    SHADOW_1,
    // 첫번째 인덱스는 외곽 강조선
    index === 0 &&
      mode === "신청" && {
        borderColor: CARE_NATURAL_BLUE,
        borderWidth: 2,
        padding: BASIC_BACKGROUND_PADDING_WIDTH - 2,
      },
    style,
  )

  return (
    <View style={allStyles}>
      {/* 첫번째 인덱스만 블루닷 */}
      {index === 0 && mode === "신청" && <View style={styles2.blueDot} />}

      <Row>
        <PreReg12 text={`${postedAt}`} color={DISABLED} />
        <TouchableOpacity style={styles2.goToDetail} onPress={onPressBookingDetail}>
          <PreMed12 text="내역상세" color={SUB_HEAD_LINE} />
        </TouchableOpacity>
      </Row>

      <DivisionLine mv={8} />
      <PreBol16 text={`${name} 님`} color={SUB_HEAD_LINE} />
      <PreReg14 text={`펫: ${petsName}`} color={BODY} style={styles2.content} />
      <PreReg14 text={`종: ${speciesName}`} color={BODY} style={styles2.contentDetail} />
      <PreReg14
        text={`케어 방식: ${serviceTypeKorean} 펫시팅`}
        color={BODY}
        style={styles2.contentDetail}
      />
      <PreReg14 text={`케어 장소: ${address}`} color={BODY} style={styles2.contentDetail} />
      <PreReg14 text={`케어 일정: ${schedule}`} color={BODY} style={styles2.contentDetail} />

      {buttonComponent}
    </View>
  )
})

const styles2 = StyleSheet.create({
  root: {
    width: "100%",
    height: "auto",
    padding: BASIC_BACKGROUND_PADDING_WIDTH,
    borderRadius: 8,
    backgroundColor: "white",
  },

  blueDot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: CARE_NATURAL_BLUE,

    position: "absolute",
    left: 10,
    top: 10,
    zIndex: 2,
  },

  goToDetail: {
    width: "auto",
    height: 24,
    paddingHorizontal: 8,
    borderColor: LIGHT_LINE,
    borderWidth: 2,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
  },

  content: {
    marginTop: 12,
  },
  contentDetail: {
    marginTop: 6,
  },
})
