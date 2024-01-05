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
} from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, goBack } from "#navigators"
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
import { CgBooking, responseCrecheBooking, responseVisitingBooking } from "#axios"
import { format, parseISO } from "date-fns"
import { ko } from "date-fns/locale"
import { HEADER_ROOT } from "../../../components/_SCREEN_HEADER/common-styles"
import { images } from "#images"

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
    petsitterStore: { serviceType },
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
        //@ts-ignore
        data={bookings}
        renderItem={({ item, index }) => {
          const bookingId = item[bookingIdProp]
          const visOrCre = item?.crecheBookingId ? "위탁" : item?.visitingBookingId ? "방문" : "ERR"
          return (
            <BookingInfoCardWithButton
              booking={item}
              visOrCre={visOrCre}
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
                      responsor(bookingId, { response: false }).then(({ isSuccess }) => {
                        isSuccess && rejectResponse(bookingId)
                      })
                    }}
                    confirmText={"수락하기"}
                    onConfirmPress={() => {
                      // 수락
                      responsor(bookingId, { response: true }).then(({ isSuccess }) => {
                        if (isSuccess) {
                          confirmResponse(bookingId)
                          // createChannel({
                          //   myStreamUserId,
                          //   other: item?.보호자_streamUserId
                          // })
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
  root: {},
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
  visOrCre: ServiceTypeKorean | "ERR"
  mode: Mode
  style?: StyleProp<ViewStyle>
}
const BookingInfoCardWithButton = observer(function BookingInfoCardWithActionButton(
  props: BookingInfoCardWithActionButtonProps,
) {
  const { booking, buttonComponent, index, visOrCre, mode, style } = props
  const { pets, address, name } = booking

  const names = pets.map((v) => ({
    petName: v.name,
    speciesName: v.species.name,
  }))
  const postedAt = format(new Date(), "yyyy.MM.dd(eee) HH:mm", { locale: ko }) //TODO: 현재 시간이 아니라, createAt 칼럼 값으로 수정 할 것.
  const petsName = names.map((v) => v.petName).join(" / ")
  const speciesName = names.map((v) => v.speciesName).join(" / ")
  let schedule = ""
  switch (visOrCre) {
    case "위탁":
      //! replace("Z", "+09:00") 는 현재 케어기버 DB 에 Time Zone Offset 이 없기 때문에 추가해준 것이다.
      //TODO: DB 규칙 바뀌면, 코드 수정할 것.
      schedule = `${format(parseISO(booking?.startDate.replace("Z", "+09:00")), "yyyy.MM.dd(eee)", {
        locale: ko,
      })} - ${format(parseISO(booking?.endDate.replace("Z", "+09:00")), "yyyy.MM.dd(eee)", {
        locale: ko,
      })}`
      break
    case "방문":
      schedule = `${format(
        parseISO(booking?.startTime.replace("Z", "+09:00")),
        "yyyy.MM.dd(eee) HH:mm",
        {
          locale: ko,
        },
      )} - ${format(parseISO(booking?.endTime.replace("Z", "+09:00")), "HH:mm", {
        locale: ko,
      })}`
      break
    default:
      schedule = "ERR"
      break
  }

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
        <TouchableOpacity style={styles2.goToDetail}>
          <PreMed12 text="내역상세" color={SUB_HEAD_LINE} />
        </TouchableOpacity>
      </Row>

      <DivisionLine mv={8} />
      <PreBol16 text={`${name} 님`} color={SUB_HEAD_LINE} />
      <PreReg14 text={`펫: ${petsName}`} color={BODY} style={styles2.content} />
      <PreReg14 text={`종: ${speciesName}`} color={BODY} style={styles2.contentDetail} />
      <PreReg14 text={`케어 방식: ${visOrCre} 펫시팅`} color={BODY} style={styles2.contentDetail} />
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
