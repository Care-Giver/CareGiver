import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { PreBol14, PreReg12, PopSem12, PreBol12, styles } from "#components"
import { BODY, GIVER_CASUAL_NAVY, LBG } from "#theme"

const ROOT: ViewStyle = {
  justifyContent: "center",
  width: 358,
  height: 100,
  backgroundColor: "#F8F8FA",
  paddingVertical: 16,
  paddingHorizontal: 12,

  marginTop: 100,
}

export interface RegistrationNoticeNoteProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  /* 제목 */
  title: string
  /* 설명 */
  desc: string
  boldTexts?: string[]
}

export const RegistrationNoticeNote = observer(function RegistrationNoticeNote(
  props: RegistrationNoticeNoteProps,
) {
  const { style, title, desc, boldTexts = [] } = props
  const styles = Object.assign({}, ROOT, style)

  const components = desc.split("").map((char, index) => {
    if (boldTexts.some((text) => text.includes(char))) {
      return <PopSem12 key={index}>{char}</PopSem12>
    } else {
      return <PreReg12 key={index}>{char}</PreReg12>
    }
  })

  return (
    <View style={styles}>
      <PreBol14 text={title} color={GIVER_CASUAL_NAVY} mb={8} />

      <PreReg12 text={desc} color={BODY} style={{ lineHeight: 18 }}></PreReg12>
      <PreReg12 text={desc} color={BODY} style={{ lineHeight: 18 }} />
    </View>
  )
})
