import * as React from "react"
import { StyleProp, View, ViewStyle, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { GIVER_CASUAL_NAVY, GIVER_CASUAL_NAVY_20 } from "#theme"
import { PopSem12 } from "#components"

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

type Step = "todo" | "progress" | "done"

export interface CgRegisterStepProps {
  /**
   * padding, margin 을 줌으로써, 추가적인 스타일링을 부여할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  /**
   * 단계를 입력해주세요
   * - "todo"
   * - "progress"
   * - "done"
   */
  step: Step

  /**
   * 몇번째 단계인지 입력해주세요.
   * number 로 입력해주세요.
   * (TODO: stepNumber 에 따른 logic 분기)
   */
  number: number

  /**
   * step 의 제목을 입력해주세요
   * progress 단계일때 표시됩니다.
   */
  title: string
}

export const CgRegisterStep = observer(function CgRegisterStep(props: CgRegisterStepProps) {
  const { style, step = "todo", number = 1, title = "제목없음" } = props

  const Todo = () => {
    const styles = Object.assign({}, _styles.todo, style)
    return (
      <View style={styles}>
        <PopSem12 text={number.toString()} color={GIVER_CASUAL_NAVY_20} />
      </View>
    )
  }

  const Progress = () => {
    const styles = Object.assign({}, _styles.progress, style)
    return (
      <View style={styles}>
        <PopSem12 text={number.toString()} color={GIVER_CASUAL_NAVY} style={{ marginLeft: 10 }} />
        <PopSem12
          text={title}
          color={GIVER_CASUAL_NAVY}
          style={{ marginLeft: 10, marginRight: 16 }}
        />
      </View>
    )
  }

  const Done = () => {
    const styles = Object.assign({}, _styles.done, style)
    return (
      <View style={styles}>
        <PopSem12 text={number.toString()} color={"#FFFFFF"} />
      </View>
    )
  }

  //컴포넌트 내부에서 margin을 주는 방법도 있지만, 뭔가 그렇게되면 모듈화라고 보기 어렵고 헷갈릴 것 같습니다. 그래서 외부에서 margin을 주는 방법을 택했습니다.
  //애초에 Row에서 각 컴포넌트를 margin 10을 주는 것을 찾아보았는데, 없다고 판단되었습니다.

  // 그리고, 값에따라 View가 달라지는 것보다 뭔가 3개의 Component를 생성하여 모듈화가 활성화된게 나은지 고민했는데 전자는 애초에 구현이 좀 힘들어보이고 복잡해서 후자를 택했습니다.
  // Q. PopSem12 같은 CareGiver 내장함수(?)를 사용할 때, Text나 View처럼 다룰 수는 없는 것인지가 좀 궁금합니다. 저렇게 text = 해서 구성해야하는지 꼭 stylesheet안에 담고싶은데 잘 안되어서요..

  switch (step) {
    case "todo":
      return <Todo />
    case "progress":
      return <Progress />
    case "done":
      return <Done />
  }
})
