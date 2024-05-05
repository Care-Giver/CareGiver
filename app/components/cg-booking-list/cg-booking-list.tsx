import React from "react"
import { StyleProp, ViewStyle, View, FlatList, Image, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import {
  DEVICE_WINDOW_HEIGHT,
  HEIGHT,
  SUB_HEAD_LINE,
  SHADOW_1,
  palette,
  BODY,
  CARE_NATURAL_BLUE,
  LIGHT_LINE,
  SUCCESS_BLUE,
} from "#theme"
import { CgBooking } from "#api"
import { BOTTOM_TAB_BAR_HEIGHT } from "../_BOTTOM_TAB_BAR/custom-tab-bar/custom-tab-bar"
import { images } from "#images"
import {
  PreBol16,
  Row,
  BASIC_BACKGROUND_PADDING_WIDTH,
  DivisionLine,
  PreReg14,
  PreMed12,
  PreMed18,
} from "#components"
import { TouchableOpacity } from "react-native-gesture-handler"
import { format, parseISO } from "date-fns"
import { ServiceTypeKorean } from "#models"
import { ko } from "date-fns/locale"
import { navigate } from "#navigators"

export interface CgBookingListProps {
  style?: StyleProp<ViewStyle>
  /**
   * 예약 객체 배열
   */
  bookings: CgBooking[]
}
export const CgBookingList = observer(function CgBookingList(props: CgBookingListProps) {
  const { bookings = [], style } = props
  const allStyles = Object.assign({}, styles1.root, style)
  return (
    <FlatList
      style={allStyles}
      contentContainerStyle={{
        paddingBottom: BOTTOM_TAB_BAR_HEIGHT,
        paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
      }}
      showsVerticalScrollIndicator={false}
      data={bookings}
      renderItem={({ item, index }) => {
        if (item === null || item === undefined) {
          //TODO: 빈 날짜일 경우 UI 처리
          console.log("item is null or undefined:", `${JSON.stringify(item)}`)
          return <PreBol16 text={JSON.stringify(item)} />
        }
        const visOrCre = item?.crecheBookingId ? "위탁" : item?.visitingBookingId ? "방문" : "ERR"
        const dateOrTime =
          visOrCre === "방문" ? item.startTime : visOrCre === "위탁" ? item.startDate : null
        const startProp = visOrCre === "방문" ? "startTime" : "startDate"
        const endProp = visOrCre === "방문" ? "endTime" : "endDate"

        return (
          <View
            style={{ display: "flex", flexDirection: "row" }}
            key={(item?.crecheBookingId || item?.visitingBookingId) + 100 * index}
          >
            {/* 좌측 시간대 표기 UI */}
            {/* <View
                style={{
                  marginVertical: 16,
                  marginRight: 8,
                  paddingRight: 5,
                  justifyContent: "space-between",
                  borderRightWidth: 2,
                  borderColor: "#F8F8FA",
                }}
              >
                <PreBol16 color={GIVER_CASUAL_NAVY}>{item[startProp].substring(11, 16)}</PreBol16>
                <PreBol16 color={GIVER_CASUAL_NAVY}>{item[endProp].substring(11, 16)}</PreBol16>
              </View> */}

            {/* 예약 요약 카드 */}
            <CgBookingInfoCard
              style={{ marginVertical: 8, marginTop: index === 0 ? 0 : 8 }}
              booking={item}
              visOrCre={visOrCre}
            />
          </View>
        )
      }}
      ListEmptyComponent={() => (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            height: (DEVICE_WINDOW_HEIGHT - BOTTOM_TAB_BAR_HEIGHT - 200) * HEIGHT,
          }}
        >
          <Image source={images.dog_question} style={{ width: 179, height: 192 }} />
          <PreMed18 text={`진행 중 이거나 완료한 예약이 없습니다`} />
        </View>
      )}
    />
  )
})

const styles1 = StyleSheet.create({
  root: { flex: 1, width: "100%", height: "100%" },
})

export interface CgBookingInfoCardProps {
  style?: StyleProp<ViewStyle>
  booking: CgBooking
  visOrCre: ServiceTypeKorean | "ERR"
}
const CgBookingInfoCard = observer(function BookingInfoCard(props: CgBookingInfoCardProps) {
  const { style, booking, visOrCre } = props
  //테스트용 useState
  //const [careGiverReserve, setCareGiverReserve] = useState(CareGiverReserveDummy)

  const { pets, address, name } = booking
  //* 예약 상태
  const status =
    booking.status === "Pending"
      ? "케어 예정"
      : booking.status === "Proceeding"
      ? "케어 진행중"
      : "ERR"
  //TODO 객체타입 확인 필요
  const names = pets?.map((v) => {
    //console.log("pet >>>>", v)
    return {
      petName: v?.name,
      speciesName: v?.species.name,
    }
  })
  const petsName = names?.map((v) => v.petName).join(" / ")
  const speciesName = names?.map((v) => v.speciesName).join(" / ")

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

  return (
    <TouchableOpacity
      onPress={() => {
        navigate("cg-booking-detail-screen", {
          booking,
          serviceTypeKorean: visOrCre,
        })
      }}
      style={[
        styles2.root,
        SHADOW_1,
        style,
        {
          borderWidth: status === "케어 진행중" ? 2 : null,
          borderColor: status === "케어 진행중" ? CARE_NATURAL_BLUE : palette.white,
        },
      ]}
    >
      <Row style={styles2.header}>
        <PreMed12
          text={status} // 실제 적용 시에는 props.name으로
          color={
            status === "케어 예정"
              ? SUB_HEAD_LINE
              : status === "케어 진행중"
              ? SUCCESS_BLUE
              : palette.white
          }
          style={{ marginRight: 20 }}
        />
        <View style={styles2.goToDetail}>
          <PreMed12 text="내역상세" color={SUB_HEAD_LINE} />
        </View>
      </Row>

      <DivisionLine mv={8} />
      <PreBol16 text={`${name} 님`} color={SUB_HEAD_LINE} />
      <PreReg14 text={`펫: ${petsName}`} color={BODY} style={styles2.content} />
      <PreReg14 text={`종: ${speciesName}`} color={BODY} style={styles2.contentDetail} />
      <PreReg14 text={`케어 방식: ${visOrCre} 펫시팅`} color={BODY} style={styles2.contentDetail} />
      <PreReg14 text={`케어 장소: ${address}`} color={BODY} style={styles2.contentDetail} />
      <PreReg14 text={`케어 일정: ${schedule}`} color={BODY} style={styles2.contentDetail} />
    </TouchableOpacity>
  )
})

const styles2 = StyleSheet.create({
  root: {
    width: "100%",
    height: "auto",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderRadius: 8,
    backgroundColor: "white",
  },
  header: {
    justifyContent: "space-between",
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
