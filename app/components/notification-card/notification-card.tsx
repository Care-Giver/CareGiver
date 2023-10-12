import React from "react"
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { PreBol16, PreReg12 } from "../basics/custom-texts/custom-texts"
import { BODY } from "#theme"
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
        <View style={[styles.dot, { backgroundColor: isChecked ? "red" : "black" }]}></View>

        <Row style={{ justifyContent: "space-between" }}>
          <View>
            <PreBol16 text={title} mb={4} />
            <PreReg12 text={subtitle} color={BODY} />
          </View>

          <PreReg12 text={time} color={BODY} />
        </Row>
      </View>

      <DivisionLine />
    </View>
  )
})
