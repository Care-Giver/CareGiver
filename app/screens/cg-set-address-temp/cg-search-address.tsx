import React from "react"
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import Postcode from "@actbase/react-daum-postcode"
import { OnCompleteParams } from "@actbase/react-daum-postcode/lib/types"
import { alertModal } from "../../utils/alert-modal"

export interface CgSearchAddressProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>
  onSelected: (data: OnCompleteParams) => void
}

export const CgSearchAddress = observer(function CgSearchAddress(props: CgSearchAddressProps) {
  const { style, onSelected } = props
  const allStyles = Object.assign({}, styles.root, style)

  return (
    <View style={allStyles}>
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
