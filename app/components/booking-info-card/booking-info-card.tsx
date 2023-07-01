import * as React from "react"
//import { useState } from "react"
import { StyleProp, View, ViewStyle, Image, StyleSheet, Pressable } from "react-native"
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
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  id: string

  /**
   * 클라이언트 이름
   */
  name: string

  /**
   * 서비스 형태(방문/위탁)
   */
  serviceType: "creche" | "visit"

  /**
   * 서비스 종류(펫시터/훈련사)
   */
  caregiverType: "petsitter" | "trainer"

  /**
   * 펫 이름
   */
  petname: string

  /**
   * 펫 종
   */
  species: string

  /**
   * 펫 서비스 산책 등
   */
  petservices: Array<string>

  /**
   * 케어 장소
   */
  address: string
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
      <Row>
        <PreBol16
          text={`${props.name} 님`} // 실제 적용 시에는 props.name으로
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

        <Pressable onPress={handlePress} style={{ marginLeft: "auto" }}>
          <Image source={images.arrow_right} style={styles.image} />
        </Pressable>
      </Row>

      <PreReg12 text={`펫: ${props.petname}`} color={BODY} style={styles.content} />
      <PreReg12 text={`종: ${props.species}`} color={BODY} style={styles.contentDetail} />
      <PreReg12 text={`서비스: ${props.petservices}`} color={BODY} style={styles.contentDetail} />
      <PreReg12 text={`케어 장소: ${props.address}`} color={BODY} style={styles.contentDetail} />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    width: 285,
    height: 148,
    paddingLeft: 22,
    paddingRight: 17,
    paddingTop: 20,
    paddingBottom: 16,
    borderRadius: 8,
    backgroundColor: "white",
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
  },

  contentDetail: {
    marginTop: 4,
  },

  image: {
    width: 16,
    height: 16,
  },
})
