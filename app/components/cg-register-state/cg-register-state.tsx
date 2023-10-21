import * as React from "react"
import { StyleProp, View, ViewStyle, StyleSheet, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import { GIVER_CASUAL_NAVY, GIVER_CASUAL_NAVY_20 } from "#theme"
import { PopSem12 } from "#components"

export type Step = "todo" | "progress" | "done"

export interface CgRegisterStateProps {
  /**
   * padding, margin 을 줌으로써, 추가적인 스타일링을 부여할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  /**
   * 상태를 입력해주세요
   * - "todo"
   * - "progress"
   * - "done"
   */
  state: Step

  /**
   * 몇번째 단계인지 입력해주세요.
   * number 로 입력해주세요.
   */
  number: number

  /**
   * state 의 제목을 입력해주세요
   * progress 단계일때 표시됩니다.
   */
  title: string

  onPress?: () => void
}

export const CgRegisterState = observer(function CgRegisterState(props: CgRegisterStateProps) {
  const { style, state = "todo", number = 1, title = "제목없음", onPress } = props
  const Wrapper = onPress ? Pressable : View

  const Todo = () => {
    const styles = Object.assign({}, _styles.todo, style)
    return (
      <Wrapper style={styles} onPress={onPress}>
        <PopSem12 text={number.toString()} color={GIVER_CASUAL_NAVY_20} />
      </Wrapper>
    )
  }

  const Progress = () => {
    const styles = Object.assign({}, _styles.progress, style)
    return (
      <Wrapper style={styles} onPress={onPress}>
        <PopSem12 text={number.toString()} color={GIVER_CASUAL_NAVY} style={{ marginLeft: 10 }} />
        <PopSem12
          text={title}
          color={GIVER_CASUAL_NAVY}
          style={{ marginLeft: 10, marginRight: 16 }}
        />
      </Wrapper>
    )
  }

  const Done = () => {
    const styles = Object.assign({}, _styles.done, style)
    return (
      <Wrapper style={styles} onPress={onPress}>
        <PopSem12 text={number.toString()} color={"#FFFFFF"} />
      </Wrapper>
    )
  }

  switch (state) {
    case "todo":
      return <Todo />
    case "progress":
      return <Progress />
    case "done":
      return <Done />
  }
})

const _styles = StyleSheet.create({
  done: {
    width: 24,
    height: 24,
    backgroundColor: GIVER_CASUAL_NAVY,
    borderColor: GIVER_CASUAL_NAVY,
    borderWidth: 2,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  progress: {
    width: "auto",
    height: 24,
    borderColor: GIVER_CASUAL_NAVY,
    borderWidth: 2,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start", // == 'display: inline-block'  (ref: https://stackoverflow.com/a/45335695/16673541)
  },

  todo: {
    width: 24,
    height: 24,
    borderColor: "#CBD1E1",
    borderWidth: 2,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
})
