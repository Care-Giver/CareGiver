import * as React from "react"
import { useState } from "react"
import { StyleProp, View, ViewStyle, Text, Pressable, Image, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { PreBol18, PreBol14, PreBol12, Row, BASIC_BACKGROUND_PADDING_WIDTH } from "#components" //묵 추가
import { SUB_HEAD_LINE, SHADOW_1, WIDTH, GIVER_CASUAL_NAVY, palette } from "#theme" // 묵 추가
//import { bookstyles } from "./styles"
import { images } from "#images"
import { TouchableOpacity } from "react-native-gesture-handler"
import { PressableButton } from "../buttons/pressable-button/pressable-button"

const ROOT: ViewStyle = {
  justifyContent: "center",
}

export interface BookingInfoCardProps {
  /**
   * padding, margin 을 줌으로써, 추가적인 스타일링을 부여할 수 있습니다.
   */
  id: string
  name: string //클라이언트 이름
  serviceType: "creche" | "visit" //서비스 형태(방문/위탁)
  caregiverType: "petsitter" | "trainer" //서비스 종류(펫시터/훈련사)
  petname: string //펫 이름
  species: string // 펫 종
  petservices: Array<string> // 펫 서비스 산책 등
  address: string // 케어 장소
  style?: StyleProp<ViewStyle>
}

//테스트용 더미 데이터
export const CareGiverReserveDummy: BookingInfoCardProps = {
  id: "1",
  name: "강영묵",
  serviceType: "visit",
  caregiverType: "trainer",
  petname: "봉봉이",
  species: "푸들",
  petservices: ["산책, 목욕, 미용"],
  address: "경기도 성남시 판교동",
}

export const BookingInfoCard = observer(function BookingInfoCard(props: BookingInfoCardProps) {
  const { style } = props
  //테스트용 useState
  const [careGiverReserve, setCareGiverReserve] = useState(CareGiverReserveDummy)

  const handlePress = () => {
    alert("버튼 클릭됨")
  }

  return (
    <View style={[styles.container, SHADOW_1, style]}>
      {
        <Row
          style={{
            marginTop: 5,
            width: "100%",
            paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
          }}
        >
          <PreBol18
            text={careGiverReserve.name + " 님"} // 실제 적용 시에는 props.name으로}
            color={SUB_HEAD_LINE}
            style={{ marginRight: "6%" }}
          />

          <PressableButton
            defaultViewStyle={styles.bookgingchoicestyle}
            children={() => (
              <PreBol12
                color={palette.white}
                text={careGiverReserve.serviceType === "creche" ? "방문" : "위탁"}
              />
            )}
          />

          <PressableButton
            defaultViewStyle={styles.bookgingchoicestyle}
            children={() => (
              <PreBol12
                color={palette.white}
                text={careGiverReserve.caregiverType === "petsitter" ? "펫시터" : "훈련사"}
              />
            )}
          />

          <TouchableOpacity onPress={handlePress}>
            <Image source={images.arrow_left} style={styles.image} />
          </TouchableOpacity>
        </Row>
      }
      {
        <PreBol14
          text={"펫: " + careGiverReserve.petname}
          color={"#999999"}
          style={{ marginTop: "5%", marginLeft: "6%" }}
        />
      }
      {
        <PreBol14
          text={"종: " + careGiverReserve.species}
          color={"#999999"}
          style={{ marginTop: "1%", marginLeft: "6%" }}
        />
      }
      {
        <PreBol14
          text={"서비스: " + careGiverReserve.petservices}
          color={"#999999"}
          style={{ marginTop: "1%", marginLeft: "6%" }}
        />
      }
      {
        <PreBol14
          text={"케어 장소: " + careGiverReserve.address}
          color={"#999999"}
          style={{ marginTop: "1%", marginLeft: "6%" }}
        />
      }
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    borderRadius: 8,
    backgroundColor: "white",
    marginLeft: 20,
    marginRight: 20,
  },

  bookgingchoicestyle: {
    width: 36,
    height: 21,
    borderRadius: 3,
    backgroundColor: GIVER_CASUAL_NAVY,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    marginRight: 3,
  },

  image: {
    width: 16,
    height: 16,
    marginLeft: 100,
  },
})
