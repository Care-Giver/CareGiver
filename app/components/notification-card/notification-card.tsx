import React from "react"
import { StyleProp, ViewStyle, View, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { PreBol16, PreReg12 } from "../_BASIC/custom-texts/custom-texts"
import { BODY, CARE_NATURAL_BLUE } from "#theme"
import { Row } from "../_BASIC/row/row"
import { DivisionLine } from "../_BASIC/division-line/division-line"
import { styles } from "./styles"
import _ from "lodash"

interface NotificationCardProps {
  title: string
  subtitle: string
  time: string
  isChecked: boolean
  check: () => void
  style?: StyleProp<ViewStyle>
}
export const NotificationCard = observer(function NotificationCard(props: NotificationCardProps) {
  const { style, title, subtitle, time, isChecked, check } = props
  return (
    <TouchableOpacity style={style} onPress={_.debounce(check, 300)} disabled={isChecked}>
      <View style={styles.root}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Row style={{ width: "auto" }}>
            <View style={[styles.dot, { backgroundColor: isChecked ? null : CARE_NATURAL_BLUE }]} />
            <PreBol16 text={title} ml={4} mb={4} />
          </Row>
          <PreReg12 text={time} color={BODY} />
        </View>
        <PreReg12 ml={10} text={subtitle} color={BODY} />
      </View>
      <DivisionLine />
    </TouchableOpacity>
  )
})
