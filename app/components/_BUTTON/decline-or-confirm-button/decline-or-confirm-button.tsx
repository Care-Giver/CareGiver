import React from "react"
import { StyleProp, ViewStyle, View, StyleSheet, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { PreBol14 } from "../../_BASIC/custom-texts/custom-texts"
import { GIVER_CASUAL_NAVY, color } from "#theme"
import _ from "lodash"

export interface DeclineOrConfirmButtonProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  /** 버튼의 높이를 결정합니다. */
  size: "m" | "l"

  /**
   * 좌측버튼 텍스트
   */
  declineText: string

  /**
   * 우측 텍스트
   */
  confirmText: string

  /**
   * 좌측버튼 클릭시 액션
   */
  onDeclinePress: () => any

  /**
   * 우측버튼 클릭시 액션
   */
  onConfirmPress: () => any
}

/**
 * 두가지 선택권이 있는 버튼입니다.
 * - 왼쪽(Decline)은 우리 앱의 의도와는 다른 의도의 행동을 할 수 있는 버튼 입니다. - 비권장 행위.
 * - 오른쪽(Confirm)은 우리 의도대로 하는 버튼 입니다. - 권장 행위.
 */
export const DeclineOrConfirmButton = observer(function DeclineOrConfirmButton(
  props: DeclineOrConfirmButtonProps,
) {
  const {
    style,
    size = "m",
    declineText = "DECLINE",
    confirmText = "CONFIRM",
    onDeclinePress: handleYesPress,
    onConfirmPress: handleNoPress,
  } = props

  let height = 49
  switch (size) {
    case "m":
      height = 49
      break
    case "l":
      height = 56
      break
  }

  const allStyles = Object.assign({}, styles.root, { height }, style)
  return (
    <View style={allStyles}>
      <TouchableOpacity style={styles.declineButton} onPress={_.debounce(handleYesPress, 300)}>
        <PreBol14 text={declineText} color={GIVER_CASUAL_NAVY} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.confirmButton} onPress={_.debounce(handleNoPress, 300)}>
        <PreBol14 text={confirmText} color={color.palette.white} />
      </TouchableOpacity>
    </View>
  )
})

const $button: StyleProp<ViewStyle> = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 2,
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    flexDirection: "row",
  },
  declineButton: {
    ...$button,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderColor: GIVER_CASUAL_NAVY,
  },
  confirmButton: {
    ...$button,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: GIVER_CASUAL_NAVY,
    backgroundColor: GIVER_CASUAL_NAVY,
  },
})
