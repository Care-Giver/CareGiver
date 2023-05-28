import * as React from "react"
import { useState } from "react"
import { StyleProp, View, ViewStyle, Button, StyleSheet } from "react-native"
import { Row } from "../basics/row/row"
import { observer } from "mobx-react-lite"
import { GIVER_CASUAL_NAVY, GIVER_CASUAL_NAVY_20 } from "#theme"
import { PopSem12 } from "#components"

const ROOT: ViewStyle = {
  justifyContent: "center",
  paddingVertical: 10,
  //paddingLeft: 16,
}
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
    justifyContent: "center",
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

export interface CgRegisterStepProps {
  /**
   * padding, margin 을 줌으로써, 추가적인 스타일링을 부여할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>
}

export const CgRegisterStep = observer(function CgRegisterStep(props: CgRegisterStepProps) {
  const { style } = props
  const styles = Object.assign({}, ROOT, style)

  const [step, setStep] = useState(1) // 단계 번호 상태
  const [title, setTitle] = useState("펫시터 서비스 설정") // 단계 제목 상태
  const handleStepChange = (step: number, title: string) => {
    //번호와 제목 한번에 변경
    setStep(step)
    setTitle(title)
  }

  const getStatusComponent = (step: number, currentStep: number) => {
    if (step < currentStep) {
      return <TodoComponent currentStep={currentStep} />
    } else if (step === currentStep) {
      return <ProgressComponent currentStep={currentStep} />
    } else {
      return <DoneComponent currentStep={currentStep} />
    }
  }

  const DoneComponent = ({ currentStep }) => {
    return (
      <View style={_styles.done}>
        <PopSem12 text={currentStep} color={"#FFFFFF"} />
      </View>
    )
  }
  const ProgressComponent = ({ currentStep }) => {
    return (
      <Row style={_styles.progress}>
        <PopSem12 text={currentStep} color={GIVER_CASUAL_NAVY} style={{ marginLeft: 10 }} />
        <PopSem12
          text={title}
          color={GIVER_CASUAL_NAVY}
          style={{ marginLeft: 10, marginRight: 16 }}
        />
      </Row>
    )
  }
  const TodoComponent = ({ currentStep }) => {
    return (
      <View style={_styles.todo}>
        <PopSem12 text={currentStep} color={GIVER_CASUAL_NAVY_20} />
      </View>
    )
  }
  //컴포넌트 내부에서 margin을 주는 방법도 있지만, 뭔가 그렇게되면 모듈화라고 보기 어렵고 헷갈릴 것 같습니다. 그래서 외부에서 margin을 주는 방법을 택했습니다.
  //애초에 Row에서 각 컴포넌트를 margin 10을 주는 것을 찾아보았는데, 없다고 판단되었습니다.

  // 그리고, 값에따라 View가 달라지는 것보다 뭔가 3개의 Component를 생성하여 모듈화가 활성화된게 나은지 고민했는데 전자는 애초에 구현이 좀 힘들어보이고 복잡해서 후자를 택했습니다.
  // Q. PopSem12 같은 CareGiver 내장함수(?)를 사용할 때, Text나 View처럼 다룰 수는 없는 것인지가 좀 궁금합니다. 저렇게 text = 해서 구성해야하는지 꼭 stylesheet안에 담고싶은데 잘 안되어서요..
  return (
    <View style={styles}>
      <Row style={{ flexDirection: "row" }}>
        {getStatusComponent(step, 1)}
        <View style={{ marginRight: 10 }} />
        {getStatusComponent(step, 2)}
        <View style={{ marginRight: 10 }} />
        {getStatusComponent(step, 3)}
      </Row>

      <Button title="1번째 단계입니다." onPress={() => handleStepChange(1, "펫시터 정보 설정")} />
      <Button title="2번째 단계입니다." onPress={() => handleStepChange(2, "펫시터 서비스 설정")} />
      <Button
        title="3번째 단계입니다."
        onPress={() => handleStepChange(3, "가격 및 특이사항 설정")}
      />
    </View>
  )
})
