import * as React from "react"
//import { useState } from "react"
import { StyleProp, View, ViewStyle, Image, StyleSheet, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import {
  PreBol16,
  PreReg12,
  PreBol12,
  Row,
  BASIC_BACKGROUND_PADDING_WIDTH,
  DivisionLine,
  PreReg14,
  PreMed12,
} from "#components" //묵 추가
import {
  SUB_HEAD_LINE,
  SHADOW_1,
  GIVER_CASUAL_NAVY,
  palette,
  BODY,
  CARE_NATURAL_BLUE,
  LIGHT_LINE,
  SUCCESS_BLUE,
} from "#theme" // 묵 추가
import { images } from "#images"
import { TouchableOpacity } from "react-native-gesture-handler"
import { PressableButton } from "../_BUTTON/pressable-button/pressable-button"
import { CgBooking } from "#axios"
import { format, parseISO } from "date-fns"
import { ServiceTypeKorean } from "#models"
import { ko } from "date-fns/locale"
import { navigate } from "#navigators"

const ROOT: ViewStyle = {
  justifyContent: "center",
}

export interface BookingInfoCardProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  booking: CgBooking

  visOrCre: ServiceTypeKorean | "ERR"
}

export const BookingInfoCard = observer(function BookingInfoCard(props: BookingInfoCardProps) {
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
  const names = pets.map((v) => {
    //console.log("pet >>>>", v)
    return {
      petName: v?.name,
      speciesName: v?.species.name,
    }
  })
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

  return (
    <View
      style={[
        styles.root,
        SHADOW_1,
        style,
        {
          borderWidth: status === "케어 진행중" ? 2 : null,
          borderColor: status === "케어 진행중" ? CARE_NATURAL_BLUE : palette.white,
        },
      ]}
    >
      <Row style={styles.header}>
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
        <TouchableOpacity
          style={styles.goToDetail}
          onPress={() => {
            navigate("cg-booking-detail-screen", {
              booking,
              serviserviceTypeKoreanceTypeKorean: visOrCre,
            })
          }}
        >
          <PreMed12 text="내역상세" color={SUB_HEAD_LINE} />
        </TouchableOpacity>
      </Row>

      <DivisionLine mv={8} />
      <PreBol16 text={`${name} 님`} color={SUB_HEAD_LINE} />
      <PreReg14 text={`펫: ${petsName}`} color={BODY} style={styles.content} />
      <PreReg14 text={`종: ${speciesName}`} color={BODY} style={styles.contentDetail} />
      <PreReg14 text={`케어 방식: ${visOrCre} 펫시팅`} color={BODY} style={styles.contentDetail} />
      <PreReg14 text={`케어 장소: ${address}`} color={BODY} style={styles.contentDetail} />
      <PreReg14 text={`케어 일정: ${schedule}`} color={BODY} style={styles.contentDetail} />
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    width: 285,
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
