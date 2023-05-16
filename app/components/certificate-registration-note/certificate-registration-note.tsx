import * as React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { PreBol14, PreReg12, PopSem12 } from "#components"
import { GIVER_CASUAL_NAVY, LBG } from "#theme"

const ROOT: ViewStyle = {
  backgroundColor: LBG,
  paddingVertical: 12,
  paddingHorizontal: 16,
}

export interface CertificateRegistrationNoteProps {
  /**
   * padding, margin 을 줌으로써, 추가적인 스타일링을 부여할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>
}

export const CertificateRegistrationNote = observer(function CertificateRegistrationNote(
  props: CertificateRegistrationNoteProps,
) {
  const { style } = props
  const styles = Object.assign({}, ROOT, style)

  return (
    <View style={styles}>
      <PreBol14 text="자격증 등록 전, 잠깐!" color={GIVER_CASUAL_NAVY} />
      <View style={{ marginTop: 9 }}>
        <PreReg12>
          개인/민감 정보는
          <PopSem12> 직접 삭제 후 등록</PopSem12>
          해야 하며, 등록된 정보가 허위 사실일 경우 발생하는
          <PopSem12> 모든 책임은 본인</PopSem12>
          에게 있습니다.{"\n"}
          자격증 확인에는
          <PopSem12> 평균 1~2일</PopSem12>
          정도 걸리며, 자체적인 심사 후 등록이 완료됩니다.
        </PreReg12>
      </View>
    </View>
  )
})
