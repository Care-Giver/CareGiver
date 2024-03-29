import React from "react"
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import Postcode from "@actbase/react-daum-postcode"
import { OnCompleteParams } from "@actbase/react-daum-postcode/lib/types"
import { alertModal } from "../../../utils/alert-modal"
import { SUB_HEAD_LINE } from "#theme"
import { PreBol12, RegistrationNoticeNote } from "#components"

export interface CgSearchAddressProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>
  onSelected: (data: OnCompleteParams) => void
  previousAddress?: string
}

export const CgSearchAddress = observer(function CgSearchAddress(props: CgSearchAddressProps) {
  const { style, onSelected, previousAddress } = props
  const allStyles = Object.assign({}, styles.root, style)

  return (
    <View style={allStyles}>
      <RegistrationNoticeNote
        style={{ marginTop: 16 }}
        title="위치 등록 전, 잠깐!"
        desc="등록해주신 위치를 기반으로 최대 30km 이내의 반려인 분들이 펫시터님을 검색할 수 있습니다!"
      />

      {!!previousAddress && (
        <PreBol12 text={`등록된 주소: ${previousAddress}`} color={SUB_HEAD_LINE} mt={8} ml={12} />
      )}

      <Postcode
        style={{ width: "100%", height: "80%", paddingVertical: 20 }}
        jsOptions={{
          animation: true,
          useBannerLink: false,
        }}
        onSelected={onSelected}
        onError={(error) => {
          console.log("우편주소 서비스 에러 - error", error)
          alertModal(
            "우편주소 서비스 에러",
            "예상치 못한 문제가 발생했습니다. 잠시후 다시 시도해주세요.",
          )
        }}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  root: {},
})
