import * as React from "react"
//import { useState } from "react"
import { StyleProp, View, ViewStyle, Image, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { PreBol16, PreReg12, PreBol12, Row, BASIC_BACKGROUND_PADDING_WIDTH } from "#components" //묵 추가
import { SUB_HEAD_LINE, SHADOW_1, GIVER_CASUAL_NAVY, palette, BODY } from "#theme" // 묵 추가
import { images } from "#images"
import { TouchableOpacity } from "react-native-gesture-handler"
import { PressableButton } from "../buttons/pressable-button/pressable-button"

const ROOT: ViewStyle = {
  justifyContent: "center",
}

export interface BookingInfoCardProps {
  /**
   * name: 클라이언트 이름
   * serviceType: 서비스 형태(방문/위탁)
   * caregiverType: 서비스 종류(펫시터/훈련사)
   * petname: 펫 이름
   * species: 펫 종
   * petservices: 펫 서비스 산책 등
   * address: 케어 장소
   */
  id: string
  name: string
  serviceType: "creche" | "visit"
  caregiverType: "petsitter" | "trainer"
  petname: string
  species: string
  petservices: Array<string>
  address: string
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
  //const [careGiverReserve, setCareGiverReserve] = useState(CareGiverReserveDummy)

  const handlePress = () => {
    alert("버튼 클릭됨")
  }

  return (
    <View style={[styles.container, SHADOW_1, style]}>
      {
        <Row
          style={{
            paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
          }}
        >
          <PreBol16
            text={props.name + " 님"} // 실제 적용 시에는 props.name으로
            color={SUB_HEAD_LINE}
            style={{ marginRight: 20 }}
          />

          <PressableButton
            defaultViewStyle={styles.serviceTypeStyle}
            children={() => (
              <PreBol12
                color={palette.white}
                text={props.serviceType === "creche" ? "방문" : "위탁"}
              />
            )}
          />

          <PressableButton
            defaultViewStyle={styles.caregiverTypeStyle}
            children={() => (
              <PreBol12
                color={palette.white}
                text={props.caregiverType === "petsitter" ? "펫시터" : "훈련사"}
              />
            )}
          />
          <TouchableOpacity onPress={handlePress}>
            <Image source={images.arrow_left} style={styles.image} />
          </TouchableOpacity>
        </Row>
      }
      {<PreReg12 text={"펫: " + props.petname} color={BODY} style={styles.content} />}
      {<PreReg12 text={"종: " + props.species} color={BODY} style={styles.contentDetail} />}
      {<PreReg12 text={"서비스: " + props.petservices} color={BODY} style={styles.contentDetail} />}
      {<PreReg12 text={"케어 장소: " + props.address} color={BODY} style={styles.contentDetail} />}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    width: 285,
    height: 148,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    borderRadius: 8,
    backgroundColor: "white",
    marginLeft: 20,
    marginRight: 20,
  },

  serviceTypeStyle: {
    width: 36,
    height: 21,
    borderRadius: 3,
    backgroundColor: GIVER_CASUAL_NAVY,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    marginRight: 3,
  },

  caregiverTypeStyle: {
    width: 46,
    height: 21,
    borderRadius: 3,
    backgroundColor: GIVER_CASUAL_NAVY,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    marginRight: 3,
  },

  content: {
    marginTop: 12,
    marginLeft: 17,
  },

  contentDetail: {
    marginTop: 4,
    marginLeft: 17,
  },

  image: {
    width: 16,
    height: 16,
    marginLeft: 50,
  },
})
