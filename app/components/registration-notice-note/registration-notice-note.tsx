import React, { ReactElement } from "react"
import { StyleProp, View, ViewStyle, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { PreBol14, PreReg12, PreBol12 } from "#components"
import { BODY, GIVER_CASUAL_NAVY, SUB_HEAD_LINE } from "#theme"

export interface RegistrationNoticeNoteProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  /**
   * 제목 텍스트
   */
  title: string

  /**
   * 설명 텍스트
   */
  desc: string

  /**
   * 설명 텍스트 중에서, bold 처리 할 텍스트들
   */
  boldTexts?: string[]
}

export const RegistrationNoticeNote = observer(function RegistrationNoticeNote(
  props: RegistrationNoticeNoteProps,
) {
  const { style, title, desc, boldTexts = [] } = props

  const allStyles = Object.assign({}, styles.root, style)

  // desc 에 있는 문자열 중에 '\' 를 개행문자 '\n' 로 대체합니다.
  const cleanedDesc = desc.replace(/\\/g, "\n")

  /**
   * [로직 설명]
   * components 변수는 boldTexts 배열을 reduce 메서드를 사용하여 순회하면서 구성됩니다.
   * 각 대상 텍스트 (boldTexts 배열에 있는 문자열) 에 대해 <PreBol12> 컴포넌트를 사용한 JSX 요소가 생성됩니다. (replacer)
   * replacer 는 acc 문자열에서 해당 대상 텍스트를 대체하는 데 사용됩니다.
   * 최종적으로, components 배열은 문자열과 JSX 요소의 조합을 포함하게 됩니다.
   * */
  const components: (string | ReactElement)[] = boldTexts.reduce(
    (acc, target, index) => {
      const replacer = (
        <PreBol12 color={SUB_HEAD_LINE} key={index}>
          {target}
        </PreBol12>
      )

      return acc.flatMap((part) =>
        //  JSX 요소 인지, string 인지에 따라 구분
        typeof part === "string"
          ? part.split(target).flatMap((subPart, subIndex, arr) =>
              //  이 부분이 이해되지 않는다면, map 과 flatMap 의 차이를 공부해보시길 바랍니다 :)
              subIndex === arr.length - 1 ? subPart : [subPart, replacer],
            )
          : part,
      )
    },
    [cleanedDesc],
  )

  return (
    <View style={allStyles}>
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
