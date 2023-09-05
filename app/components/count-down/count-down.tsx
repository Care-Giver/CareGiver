import React from "react"
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { useTimer } from "react-timer-hook"
import { GIVER_CASUAL_NAVY, GIVER_CASUAL_NAVY_20 } from "#theme"
import { PreBol12, PreReg10, PreReg12 } from "#components"
import { alertModal } from "../../utils/alert-modal"

export interface CountDownProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  /**
   * 카운트 다운 지속시간 (초 단위)
   */
  duration: number
}

/**
 * 간단한 카운트 다운 컴포넌트입니다.
 * react-timer-hook 패키지 작동 테스트용으로 만듦. (참고: https://github.com/amrlabib/react-timer-hook)
 * TODO: 휴대폰번호 인증요청 버튼 핸들링할때 사용할 것
 */
export const CountDown = observer(function CountDown(props: CountDownProps) {
  const { style, duration } = props
  const allStyles = Object.assign({}, styles.root, style)
  const time = new Date()
  time.setSeconds(time.getSeconds() + duration)

  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: time,
    onExpire: () => alertModal("타이머", "카운트다운 종료"),
  })

  return (
    <View style={allStyles}>
      <PreReg10 text="(테스트) 카운트다운" />
      <PreBol12 text={`${hours}시 ${minutes}분 ${seconds} 초`} color={GIVER_CASUAL_NAVY} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 100,
          backgroundColor: GIVER_CASUAL_NAVY_20,
        }}
      >
        <PreReg12 text="중지" onPress={pause} />
        <PreReg12 text="재개" onPress={resume} />
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: GIVER_CASUAL_NAVY,
  },
})
