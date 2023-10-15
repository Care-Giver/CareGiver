import React, { Dispatch, SetStateAction } from "react"
import { StyleProp, ViewStyle, View, StyleSheet, Pressable, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { PreBol18, PreMed16, PreReg14, Row, UnderlineText } from "#components"
import { images } from "#images"
import { DISABLED, GIVER_CASUAL_NAVY, HEAD_LINE, MIDDLE_LINE } from "#theme"
import { ServiceTypeKorean } from "./cg-set-address-temp-screen"

export interface CgSetServiceTypeProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>
  serviceType: ServiceTypeKorean
  setServiceType: Dispatch<SetStateAction<ServiceTypeKorean>>
}

export const CgSetServiceType = observer(function CgSetServiceType(props: CgSetServiceTypeProps) {
  const { style, serviceType, setServiceType } = props
  const allStyles = Object.assign({}, styles.root, style)

  return (
    <View style={allStyles}>
      {/* // * 타이틀 */}
      <View style={styles.titleContainer}>
        <UnderlineText>
          <PreBol18 text={"서비스 종류"} />
        </UnderlineText>
        <PreBol18 color={HEAD_LINE} text="를 선택해주세요." />
      </View>

      {/* //* 위탁 | 방문 버튼 */}
      <Row style={{ justifyContent: "space-between" }}>
        {/* // ? 방문 버튼 */}
        <Pressable
          style={[
            styles.radioContainer,
            {
              borderColor: serviceType === "방문" ? GIVER_CASUAL_NAVY : MIDDLE_LINE,
            },
          ]}
          onPress={() => setServiceType("방문")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={serviceType === "방문" ? images.radio_active : images.radio_inactive}
              style={styles.radioImg}
            />
            <PreMed16
              style={{ marginLeft: 6 }}
              text="방문"
              color={serviceType === "방문" ? GIVER_CASUAL_NAVY : DISABLED}
            />
          </View>
        </Pressable>

        {/* // ? 위탁 버튼 */}
        <Pressable
          style={[
            styles.radioContainer,
            {
              borderColor: serviceType === "위탁" ? GIVER_CASUAL_NAVY : MIDDLE_LINE,
            },
          ]}
          onPress={() => setServiceType("위탁")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={serviceType === "위탁" ? images.radio_active : images.radio_inactive}
              style={styles.radioImg}
            />
            <PreMed16
              style={{ marginLeft: 6 }}
              text="위탁"
              color={serviceType === "위탁" ? GIVER_CASUAL_NAVY : DISABLED}
            />
          </View>
        </Pressable>
      </Row>

      {serviceType && (
        <Row mt={10}>
          <Image source={images.right_arrow_grey} style={styles.image} />
          <PreReg14
            text={
              serviceType === "방문"
                ? "회원님이 직접 고객의 집을 방문합니다."
                : "회원님이 등록한 장소에서 고객의 반려동물을 돌봅니다."
            }
            color={DISABLED}
            ml={8}
          />
        </Row>
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  root: {},
  titleContainer: {
    marginVertical: 28,
    height: 21,
    display: "flex",
    flexDirection: "row",
    overflow: "visible",
  },
  image: { width: 16, height: 16, alignSelf: "flex-start" },
  radioContainer: {
    width: 172,
    padding: 14.5,

    justifyContent: "center",
    alignItems: "center",

    borderColor: MIDDLE_LINE,
    borderWidth: 2,
    borderRadius: 9,
  },
  radioImg: {
    width: 16,
    height: 16,
  },
})
