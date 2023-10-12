import React from "react"
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { PreBol16, PreReg12 } from "../basics/custom-texts/custom-texts"
import { BODY, CARE_NATURAL_BLUE } from "#theme"
import { Row } from "../basics/row/row"
import { DivisionLine } from "../division-line/division-line"
import { styles } from "./styles"
export interface NotificationCardProps {
  title: string
  subtitle: string
  time: string
  isChecked: boolean
  style?: StyleProp<ViewStyle>
}

export const NotificationCard = observer(function NotificationCard(props: NotificationCardProps) {
  const { style } = props
  const { title, subtitle, time, isChecked } = props
  return (
    <View>
      <View style={styles.root}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Row style={{ width: "auto" }}>
            <View
              style={[styles.dot, { backgroundColor: isChecked ? null : CARE_NATURAL_BLUE }]}
            ></View>
            <PreBol16 text={title} ml={4} mb={4} />
          </Row>
          <PreReg12 text={time} color={BODY} />
        </View>
        <PreReg12 ml={10} text={subtitle} color={BODY} />
      </View>
      <DivisionLine />
    </View>
  )
})
