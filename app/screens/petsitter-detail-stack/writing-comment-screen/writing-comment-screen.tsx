import { Keyboard, View, TextInput, LayoutAnimation, Platform, UIManager } from "react-native"
import React, { FC, useLayoutEffect, useState /*useEffect*/ } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, RootNavigation } from "../../../navigators"
import { observer } from "mobx-react-lite"
import { BODY, LBG } from "../../../theme/palette"
import { HEIGHT, WIDTH } from "../../../theme"
import { PublicPrivateSwitchButton, ScreenRootView } from "../../../custom-components"
import { PopSem14, PopReg14 } from "../../../custom-components"
import { styles } from "./styles"
import { Row } from "../../../custom-components"
import { useKeyboard } from "@react-native-community/hooks"

//*style sheet imports 잠시 꺼내옴
// import { LBG } from "../../../theme/palette"
import { PRETENDARD_REGULAR } from "../../../../assets/fonts"

//import { TouchableWithoutFeedback } from "react-native-gesture-handler"

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

  console.log("keyboard isKeyboardShow: ", keyboard.keyboardShown)
  console.log("keyboard keyboardHeight: ", keyboard.keyboardHeight)

  // const keyboard = useKeyboard()

  console.log("keyboard isKeyboardShow: ", keyboard.keyboardShown)
  console.log("keyboard keyboardHeight: ", keyboard.keyboardHeight)
  //let textBoxHeight = 0

  // * 헤더 타이틀 설정 (사용자가 댓글을 입력할때마다 단어수에 따라 헤더의 등록 글자 색 달라짐.)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "댓글 작성",
      wordsCount: wordLength,
    })
  }, [wordLength])

  //* 에니메이션 쓸 때 android용 처리
  if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  console.log(keyboard)

  //*키보드 나타날 때 사라질 때 감지 + 에니메이션 (키보드 나타나면 축소된 textInput 사용, 키보드 사라지면 확대된 textInput 사용)
  //? useLayoutEffect 가 useEffect 보다 부드러워 보여서 사용했는데 효율적인 운영 측면에서 useEffect 가 더 나은 선택인지 아니면 상관 없는지?
  //FEEDBACK: 여기서는, useLayoutEffect 가 더 효율적입니다. useLayoutEffect 과 useEffect 의 차이는 DOM LifeCycle 을 공부하시면
  //FEEDBACK: 이해에 큰 도움이 될 것 같습니다. 이 문서 꼭 정독해보시길 바랍니다 :) https://blog.logrocket.com/useeffect-vs-uselayouteffect-examples/

  //? 아래 코드를 keyboard = useKeyboard()를 사용해 더 간단하게 표기할 수 있나? 그리고 그 방법은..?

  useLayoutEffect(() => {
    const showSmallView = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown")
      //Platform.OS === "ios"? (textBoxHeight = flex:1 - keyboard.keyboardHeight - HEIGHT * 20)
      //: (textBoxHeight = HEIGHT * 377)*
      LayoutAnimation.configureNext(LayoutAnimation.create(100, "easeInEaseOut", "opacity"))
    })
    const showBigView = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard hidden")
      //textBoxHeight = HEIGHT * 646
      LayoutAnimation.configureNext(LayoutAnimation.create(100, "easeInEaseOut", "opacity"))
    })

    return () => {
      showSmallView.remove()
      showBigView.remove()
    }
  }, [])

  //* 화면의 빈 부분을 만질 떄 키보드 없어지는것 구현위한 함수. (아이폰에서 키보드 내려가는 버튼이 없어서 만듦 )
  //? 그러나 과연 이것이 필요한 기능일지 모르겠음. TouchableWithoutFeedback 을 통해 사용하는데
  //? 리엑트 공식 문서에는 꼭 필요한 경우 아니면 사용을 권장하지 않고 있음
  //? 게다가 헤더에는 이게 적용이 안되어 (방법 궁금) 애매하게 빈 좁은 공간들을 터치해야 먹힘
  //? + screenRootView 사용시 아예 인식/사용이 안되는것을 발견. 못쓰는 기능일듯.
  const hideKeyboardOnTouch = () => {
    Keyboard.dismiss()
    setKeyboardStatus("Keyboard hidden")
    //console.log("touched")
  }

  const handleHeight = () => {
    let height
    if (keyboard.keyboardShown) {
      if (Platform.OS === "ios") height = HEIGHT * 377 - (keyboard.keyboardHeight - HEIGHT * 303)
      else height = HEIGHT * 377
    } else {
      height = HEIGHT * 646
    }
    return height
  }

  //*화면 빈 공간을 만질 때 키보드 없어지는것 구현 위한 TouchableWithoutFeedback
  //? 왜 ScreenRootView 를 사용하면 화면이 오른쪽으로 밀리는가..? View 대신 얘를 사용해야 하는데..
  return (
    //<TouchableWithoutFeedback onPress={hideKeyboardOnTouch}>
    <ScreenRootView preset="fixed">
      {/*//*댓글 입력할 수 있는 textInput box */}
      <TextInput
        style={{
          marginTop: HEIGHT * 10,
          //marginLeft: WIDTH * 16,
          //marginRight: WIDTH * 12,
          width: WIDTH * 358,
          //height: HEIGHT * 646,
          backgroundColor: LBG,
          borderRadius: 8,
          textAlignVertical: "top",
          fontFamily: PRETENDARD_REGULAR,
          fontSize: HEIGHT * 14, //FEEDBACK: fontSize, lineHeight 모두 HEIGHT 를 곱해줘야 합니다
          lineHeight: HEIGHT * 20,
          paddingTop: HEIGHT * 20,
          paddingHorizontal: WIDTH * 20,

          //! 여기가 ios 에 따라 텍스트 인풋의 높이를 조절하려고 하는 부분입니답 ..!
          //!xd 상의 작은 textInput 세로 높이 377 에서 (유저 키보드 높이 - xd 상 키보드 높이인 303 ) 을 빼면 되지 않을까.. 라는 생각이었습니다.

          //FEEDBACK: 논리는 정확합니다. 다만 문법이 문제였습니다
          //FEEDBACK: RN 컴포넌트 영역(JSX: https://ko.reactjs.org/docs/introducing-jsx.html)내에서는
          //FEEDBACK: if-else 문을 쓸 수 없습니다!!
          //height:  if(isKeyboardShow){
          //   Platform.OS === 'ios' ? HEIGHT*377 - (keyboard.keyboardHeight - HEIGHT * 303 ) : HEIGHT * 377
          // } else {
          //   HEIGHT * 646
          // },

          //FEEDBACK: 아래처럼, ternary(삼항연산자)로 작성해야 합니다
          //FEEDBACK: [조건] ? [참일때 실행] : [거짓일때 실행]
          // height: keyboard.keyboardShown
          //   ? Platform.OS === "ios"
          //     ? HEIGHT * 377 - (keyboard.keyboardHeight - HEIGHT * 303)
          //     : HEIGHT * 377
          //   : HEIGHT * 646,

          //FEEDBACK: if-else 를 쓰고 싶으면 아예 아래처럼, 따로 함수로 빼서 사용
          height: handleHeight(),
          //keyboardStatus === "Keyboard Shown" ?  styles.smallTextBox : styles.root
        }}
        multiline
        maxLength={300}
        placeholder={
          "댓글 작성 시 주의사항\n1. 욕설, 비방, 음란성, 도배글 등 다른 사용자들에게 불쾌감을 주는 글은 사전고지 없이 삭제될 수 있습니다.\n2. 게시된 글의 저작권은 글을 작성한 사용자에게 있으며, 이로 인해 발생하는 문제는 본인에게 책임이 있습니다.\n3. 댓글에 본인의 개인정보가 포함되지 않도록 주의해 주시기 바랍니다."
        }
        //? 아래의 코드 (onSubmitEditing) 를 사용해야 할지 말아야 할지를 모르겠음
        //? 아이폰에서 엔터를 눌렀을 때 저장되며 키보드 내려가는 효과 줌 . 하지만
        //? 사용자에게 줄바꿈을 위해 shift + enter 를 눌러야 하는 불편을 줌..
        //? TouchableWithoutFeedback과 이 onSubmitEditing 중에 하나를 선택하고 싶음
        onSubmitEditing={Keyboard.dismiss}
        //*사용자가 댓글 입력시 입력 내용 저장, 입력 길이 계산
        onChangeText={(texts) => {
          setComment(texts)
          setWordLength(texts.length)
        }}
        value={comment}
      />

      {/* //* 공개/비공개 컴포넌트 + 단어 수 세는 컴포넌트  */}
      <Row style={{ marginTop: HEIGHT * 10 }}>
        {/*//*공개/비공개 컴포넌트 */}
        <PublicPrivateSwitchButton
          state={isPublicComment}
          setState={setIsPublicComment}
          style={{ marginRight: WIDTH * 233 }}
        />
        {/*//*사용자가 입력한 단어 수 */}
        <PopSem14 color={BODY} text={`${wordLength}`} style={{ marginRight: WIDTH * 2 }} />
        {/*//* max 단어수 (여기선 300) */}
        <PopReg14 color={BODY} text={`/300`} />
      </Row>
    </ScreenRootView>
    //</View>
    //</TouchableWithoutFeedback>
  )
})
