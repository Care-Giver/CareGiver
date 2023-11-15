import React, { Dispatch, SetStateAction } from "react"
import { StyleProp, ViewStyle, View, StyleSheet, ScrollView } from "react-native"
import { observer } from "mobx-react-lite"
import { DISABLED, HEAD_LINE } from "#theme"
import {
  BOTTOM_TAB_BAR_HEIGHT,
  PreBol16,
  PreBol18,
  PreMed14,
  Row,
  UnderlineText,
  RegisterButtonsContainer,
} from "#components"
import { CrecheAmenity, VisitingAmenity } from "#axios"

export interface CgSetAmenityProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  amenities: Array<VisitingAmenity | CrecheAmenity>
  selectedAmenities: Array<VisitingAmenity | CrecheAmenity>
  handleOptionPress: Dispatch<SetStateAction<Array<VisitingAmenity | CrecheAmenity>>>
  handleXPress: (option) => void
}

export const CgSetAmenity = observer(function CgSetAmenity(props: CgSetAmenityProps) {
  const { style, amenities, selectedAmenities, handleOptionPress, handleXPress } = props
  const allStyles = Object.assign({}, styles.root, style)

  return (
    <ScrollView
      style={allStyles}
      contentContainerStyle={{
        paddingBottom: BOTTOM_TAB_BAR_HEIGHT,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* // * 타이틀 */}
      <View style={styles.titleContainer}>
        <Row>
          <UnderlineText>
            <PreBol18 text={"추가로"} />
          </UnderlineText>
          <PreBol18 color={HEAD_LINE} text=" 제공 가능한" />
        </Row>
        <PreBol18 color={HEAD_LINE} text={`편의사항을 선택해주세요.`} mt={6} />
      </View>

      {/* 편의사항 */}
      <Row mt={28}>
        <PreBol16 text="추가로 어떤 케어가 가능한가요?" color={HEAD_LINE} />
        <PreMed14 text="중복 선택 가능" color={DISABLED} ml={4} />
      </Row>

      {/* 추가 서비스 */}
      <RegisterButtonsContainer
        services={amenities}
        selectedOptions={selectedAmenities}
        handleOptionPress={handleOptionPress}
        handleXPress={handleXPress}
      />
    </ScrollView>
  )
})

const styles = StyleSheet.create({
  root: {},
  titleContainer: {
    marginTop: 24,
  },
})
