import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { PreBol12, PreBol14, PreReg12 } from "../basics/custom-texts/custom-texts"
import { GIVER_CASUAL_NAVY, BODY, SUB_HEAD_LINE } from "#theme"

const ROOT: ViewStyle = {
  justifyContent: "center",
}

export interface PhotoRegistrationNoteProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>
}

export const PhotoRegistrationNote = observer(function PhotoRegistrationNote(
  props: PhotoRegistrationNoteProps,
) {
  const { style } = props
  const styles = Object.assign({}, ROOT, style)

  // jsx

  // React, RN 에서 Component 의 prop 에 값을 넘겨줄때
  // (정의)
  // prorp이름={값}
  //    >> 여기서 { } 은 그냥, 정의를 지키기위한 도구

  // <PreBol14 style={{marginBottom:15}} />
  //    >> 가장 바깥 { } 그냥, 정의를 지키기위한 도구
  //      >> 그 안에 있는 { } == {marginBottom:15} 얘는, js 내에서 객체를 표기하는데 쓰이는 { }

  // var justObj = {
  //   "key": "value",
  //   "name": "hyeri",
  // }

  return (
    <View style={{ width: 390, height: 124, marginTop: 184 }}>
      <View
        style={{
          width: 358,
          height: 100,
          marginVertical: 12,
          marginHorizontal: 16,
          backgroundColor: "#F8F8FA",
        }}
      >
        <View style={{ marginHorizontal: 16, marginVertical: 12 }}>
          <PreBol14 text="사진 등록 전, 잠깐!" color={GIVER_CASUAL_NAVY} mb={8} />
          <PreReg12 color={BODY} style={{ lineHeight: 18 }}>
            사진은 최대
            <PreBol12 text="&nbsp;10장" color={SUB_HEAD_LINE} />
            까지 등록 가능합니다.
          </PreReg12>
          <PreReg12
            color={BODY}
            style={{ lineHeight: 18 }}
            text="위탁 장소의 여러 공간을 보여줄수록, 사진의 화질이 좋을 수록 매칭  확률이 올라갑니다!"
          />
        </View>
      </View>
    </View>
  )
})
