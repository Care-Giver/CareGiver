import { Keyboard, TextInput, LayoutAnimation, Platform, UIManager } from "react-native"
import React, { FC, useLayoutEffect, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { observer } from "mobx-react-lite"
import {
  BODY,
  LBG,
  DEVICE_SCREEN_HEIGHT,
  HEADER_HEIGHT,
  ADNROID_STATUS_BAR_HEIGHT,
  ADNROID_BOTTOM_NAVIGATION_HEIGHT,
} from "#theme"
import { PublicPrivateSwitchButton, Screen, PopSem14, PopReg14, Row } from "#components"
import { useKeyboard } from "@react-native-community/hooks"
import { PRETENDARD_REGULAR } from "#fonts"

export const WritingCommentScreen: FC<
  StackScreenProps<NavigatorParamList, "writing-comment-screen">
> = observer(({ navigation, route }) => {
  //*키보드 나타남 여부 판단 변수
  const [keyboardStatus, setKeyboardStatus] = useState(undefined)
  //*공개 / 비공개 컴포넌트에 쓰임
  const [isPublicComment, setIsPublicComment] = useState(true)
  //* textInput 안의 입력되는 댓글 저장용
  const [comment, setComment] = useState("")
  //*입력된 댓글의 단어 수 세는 변수
  const [wordLength, setWordLength] = useState(0)
  //*키보드
  const keyboard = useKeyboard()

  if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }

  // * 헤더 타이틀 설정 (사용자가 댓글을 입력할때마다 단어수에 따라 헤더의 등록 글자 색 달라짐.)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "댓글 작성",
      wordsCount: wordLength,
    })
  }, [wordLength])

  //* 에니메이션 쓸 때 android용 처리

  //*ios 에서 부드러운 텍스트 입력 창 에니메이션을 사용하기 위해 키보드가 나타날것을 미리 감지할 필요성 있음
  //*(keyboard,keyboardShown 은 키보드가 다 나타난 후에 상태가 바뀌어 에니메이션 실행을 키보드가 올라온 후에 하도록 만듦 -> 키보드 올라온 후에야 텍스트 입력창 올라감 )
  //*keyboardWillShow 를 사용해 이 문제 해결

  useLayoutEffect(() => {
    const keyboardUp = Keyboard.addListener("keyboardWillShow", () => {
      //?어떻게 쓰는지 모르겠음 ㅜㅜ Keyboard.scheduleLayoutAnimation()=>
      setKeyboardStatus("Keyboard will Show")
    })
    const keyboardDown = Keyboard.addListener("keyboardWillHide", () => {
      // LayoutAnimation.configureNext(LayoutAnimation.create(100000, "keyboard", "opacity"))
      setKeyboardStatus("Keyboard hidden")
    })

    return () => {
      keyboardUp.remove()
      keyboardDown.remove()
    }
  }, [])

  //* 사용자 os 에 따라 댓글 입력창 의 높이를 조절하기 위한 코드
  //*ios 에선 키보드가 나타났을 때 키보드에 컴포넌트들이 가리는것 방지
  //*android 에선 키보드가 없을 때 스크린의 길이가 짧아 컴포넌트들이 스크린 밖으로 넘어가는것 방지
  const handleHeight = () => {
    let height = 0

    switch (Platform.OS) {
      case "android":
        //?안드로이드에서만 이상하게 layoutAnimation 오류가 남. duration 을 0 으로 하거나 effect 를 "keyboard" 나 "spring" 을 쓰거나 하면 바로 오류가 남
        //? 아무리 구글링을 해봐도 이유를 모르겠음. "keyboard" effect 를 쓰고 싶은데... 일단은 이 에니메이션에서 멈추겠음
        //setImmediate(() => LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut));
        LayoutAnimation.configureNext(LayoutAnimation.create(1, "easeInEaseOut", "scaleY"))

        //*android 에선 keyboardWillShow 사용 못함
        if (keyboard.keyboardShown) {
          height = 377
          return height
          //LayoutAnimation.configureNext(LayoutAnimation.create(1, "spring", "scaleY"))
          //LayoutAnimation.configureNext(LayoutAnimation.create(1, "spring", "scaleY"))
        } else {
          //LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
          height =
            646 -
            (HEADER_HEIGHT +
              ADNROID_BOTTOM_NAVIGATION_HEIGHT +
              ADNROID_STATUS_BAR_HEIGHT +
              95 + //*디자인 상에서 댓글창부터 화면 끝까지의 하단 여백(85)과 헤더 전 까지 상단 여백(10)의 합이 95
              646 -
              // DEVICE_SCREEN_HEIGHT  //*디자인 상 사용자 기기에 들어가야 하는 총 높이(네비게이션바높이,상단바높이,헤더높이,댓글창높이,댓글창 위아래 여백높이의 합 ) 와 실제 기계 스크린 높이의 차이를 댓글창 높이 646 에서 빼줌
              DEVICE_SCREEN_HEIGHT) //FEEDBACK: DEVICE_SCREEN_ 상수에는 WIDTH, HEIGHT 상수를 곱해주면 안 됩니다
          return height
        }

      case "ios":
        if (keyboardStatus === "Keyboard will Show") {
          LayoutAnimation.configureNext(LayoutAnimation.create(0, "keyboard", "opacity")) //*댓글 입력 창 크기 전환 애니메이션
          height = 377 - (keyboard.keyboardHeight - 303) //* 디자인 상 댓글창 높이 - (기기 키보드 높이 - 디자인상 키보드 높이)
          return height
        } else {
          LayoutAnimation.configureNext(LayoutAnimation.create(0, "keyboard", "opacity"))
          height = 646
          return height
        }

      case "web":
        height = 646
        return height
    }
  }

  return (
    <Screen preset="fixed">
      {/*//*댓글 입력할 수 있는 textInput box */}
      <TextInput
        style={{
          marginTop: 10,
          width: 358,
          backgroundColor: LBG,
          borderRadius: 8,
          textAlignVertical: "top",
          fontFamily: PRETENDARD_REGULAR,
          fontSize: 14, //*폰트 패밀리로 쓸때는 size 에 HEIGHT 을 곱해줘야 함
          lineHeight: 20, //* lineHeight 에도 마찬가지
          paddingTop: 20,
          paddingHorizontal: 20,
          height: handleHeight(),
        }}
        multiline
        maxLength={300}
        autoFocus={true}
        placeholder={
          "댓글 작성 시 주의사항\n1. 욕설, 비방, 음란성, 도배글 등 다른 사용자들에게 불쾌감을 주는 글은 사전고지 없이 삭제될 수 있습니다.\n2. 게시된 글의 저작권은 글을 작성한 사용자에게 있으며, 이로 인해 발생하는 문제는 본인에게 책임이 있습니다.\n3. 댓글에 본인의 개인정보가 포함되지 않도록 주의해 주시기 바랍니다."
        }
        onSubmitEditing={Keyboard.dismiss}
        //*사용자가 댓글 입력시 입력 내용 저장, 입력 길이 계산
        onChangeText={(texts) => {
          setComment(texts)
          setWordLength(texts.length)
        }}
        value={comment}
      />

      {/* //* 공개/비공개 컴포넌트 + 단어 수 세는 컴포넌트  */}
      <Row style={{ marginTop: 10 }}>
        {/*//*공개/비공개 컴포넌트 */}
        <PublicPrivateSwitchButton
          state={isPublicComment}
          setState={setIsPublicComment}
          // style={{ marginRight: 233 }}
          //FEEDBACK: "가능한 최대" margin, padding 값은 아래처럼 "auto" 를 사용하면 됩니다. (안드로이드 스튜디오에서 ConstraintLayout 과 유사한 개념입니다)
          style={{ marginRight: "auto" }}
        />
        {/*//*사용자가 입력한 단어 수 */}
        <PopSem14 color={BODY} text={`${wordLength}`} style={{ marginRight: 2 }} />
        {/*//* max 단어수 (여기선 300) */}
        <PopReg14 color={BODY} text={`/300`} />
      </Row>
    </Screen>
  )
})
