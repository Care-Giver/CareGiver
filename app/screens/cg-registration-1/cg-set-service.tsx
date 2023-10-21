import React, { Dispatch, SetStateAction } from "react"
import { StyleProp, ViewStyle, View, StyleSheet, ScrollView } from "react-native"
import { observer } from "mobx-react-lite"
import { HEAD_LINE } from "#theme"
import {
  BOTTOM_TAB_BAR_HEIGHT,
  PreBol16,
  PreBol18,
  Row,
  UnderlineText,
  RegisterButtonsContainer,
} from "#components"
import { CrecheService, VisitingService } from "#axios"

export interface CgSetServiceProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  defaultServices: Array<VisitingService | CrecheService>
  additionalServices: Array<VisitingService | CrecheService>
  selectedOptions: Array<VisitingService | CrecheService>
  handleOptionPress: Dispatch<SetStateAction<Array<VisitingService | CrecheService>>>
  handleXPress: (option) => void
}

export const CgSetService = observer(function CgSetService(props: CgSetServiceProps) {
  const {
    style,
    defaultServices,
    additionalServices,

    selectedOptions,
    handleOptionPress,
    handleXPress,
  } = props
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
        <PreBol18 color={HEAD_LINE} text={`제공 가능한`} />
        <Row mt={6}>
          <UnderlineText>
            <PreBol18 text={"서비스 정보"} />
          </UnderlineText>
          <PreBol18 color={HEAD_LINE} text="를 추가해주세요." />
        </Row>
      </View>

      {/* 기본 서비스 */}
      <PreBol16 text="기본 서비스" color={HEAD_LINE} mt={28} />
      <RegisterButtonsContainer key={0} services={defaultServices} alwaysActive={true} />

      {/* 추가 서비스 */}
      <PreBol16 text="추가 서비스" color={HEAD_LINE} mt={48} />
      <RegisterButtonsContainer
        key={1}
        services={additionalServices}
        selectedOptions={selectedOptions}
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
