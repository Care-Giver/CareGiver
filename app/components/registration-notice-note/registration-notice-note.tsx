import * as React from "react"
import { StyleProp, View, ViewStyle, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { PreBol14, PreReg12, PopSem12, PreBol12 } from "#components"
import { BODY, GIVER_CASUAL_NAVY, LBG, SUB_HEAD_LINE } from "#theme"

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

  const ROOT = Object.assign({}, styles.root, style)

  //desc 문자열을 하나하나 봄 각 문자열 char,index
  //char 문자에 boldTexts에 있는 문자열에 있따면
  const components = desc.split("").map((char, index) => {
    if (boldTexts.some((text) => text.includes(char))) {
      return (
        <PreBol12 color={SUB_HEAD_LINE} key={index}>
          {char}
        </PreBol12>
      )
    } else if (char === "\\") {
      return "\n"
    } else {
      return char
    }
  })

  return (
    <View style={ROOT}>
      <PreBol14 text={title} color={GIVER_CASUAL_NAVY} mb={8} />
      <PreReg12 color={BODY} style={{ lineHeight: 18 }}>
        {components}
      </PreReg12>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    width: 358,
    backgroundColor: "#F8F8FA",
    paddingVertical: 16,
    paddingHorizontal: 12,
    justifyContent: "center",
    top: 100,
  },
})
