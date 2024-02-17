import React, { ReactElement } from "react"
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { PreBol12, PreReg12 } from "../_BASIC/custom-texts/custom-texts"
import { SUB_HEAD_LINE, palette } from "#theme"

export interface TopTipBoxProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  /**
   * 설명 텍스트
   */
  desc: string

  /**
   * 설명 텍스트 중에서, bold 처리 할 텍스트들
   */
  boldTexts?: string[]
}

export const TopTipBox = observer(function TopTipBox(props: TopTipBoxProps) {
  const { style, desc, boldTexts = [] } = props
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
      <PreReg12 color={palette.black} style={{ lineHeight: 18 }}>
        {components}
      </PreReg12>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    width: "100%",
    minHeight: 35,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#F1F1F4",
    borderRadius: 8,
  },
})
