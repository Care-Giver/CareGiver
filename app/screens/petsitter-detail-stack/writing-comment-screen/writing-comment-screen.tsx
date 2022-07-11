import {
  Keyboard,
  View,
  Text,
  TextInput,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native"
import React, { FC, useLayoutEffect, useState, useEffect } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../../navigators"
import { observer } from "mobx-react-lite"
import { FilterHeader } from "../../../custom-components/filter-header/filter-header"
import { LBG, white } from "../../../theme/palette"
import { HEIGHT, WIDTH } from "../../../theme"
import { PublicPrivateSwitchButton, ScreenRootView } from "../../../custom-components"
import { PRETENDARD_MEDIUM } from "../../../../assets/fonts"
import { RegisterButton } from "../../../custom-components"
//import { styles } from "../../../custom-components"

export const WritingCommentScreen: FC<
  StackScreenProps<NavigatorParamList, "writing-comment-screen">
> = observer(({ navigation, route }) => {
  const [keyboardStatus, setKeyboardStatus] = useState(undefined)
  const [isPublicComment, setIsPublicComment] = useState(true)
  const [wordLength, setWordLength] = useState(null)

  // * 헤더 타이틀 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "댓글 작성",
      wordsCount: wordLength,
    })
  }, [wordLength])

  //let  wordsLength: number

  //const wordCount = (words: string) => {
  //setWordLength(words.length)
  //return wordsLength
  //}

  if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  useEffect(() => {
    const showSmallView = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown")
      LayoutAnimation.configureNext(LayoutAnimation.create(100, "easeInEaseOut", "opacity"))
    })
    const showBigView = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard hidden")
      LayoutAnimation.configureNext(LayoutAnimation.create(100, "easeInEaseOut", "opacity"))
    })

    return () => {
      showSmallView.remove()
      showBigView.remove()
    }
  }, [])

  return (
    <ScreenRootView preset="fixed">
      <TextInput
        style={[styles.basic, keyboardStatus === "Keyboard Shown" ? styles.small : styles.basic]}
        multiline
        maxLength={300}
        placeholder={
          "댓글 작성 시 주의사항\n1. 욕설, 비방, 음란성, 도배글 등 다른 사용자들에게 불쾌감을 주는 글은 사전고지 없이 삭제될 수 있습니다.\n2. 게시된 글의 저작권은 글을 작성한 사용자에게 있으며, 이로 인해 발생하는 문제는 본인에게 책임이 있습니다.\n3. 댓글에 본인의 개인정보가 포함되지 않도록 주의해 주시기 바랍니다."
        }
        onSubmitEditing={Keyboard.dismiss}
        onChangeText={(texts) => setWordLength(texts.length)}
      />
      <Text> {wordLength}</Text>
      <PublicPrivateSwitchButton
        state={isPublicComment}
        setState={setIsPublicComment}
        style={{ marginLeft: WIDTH * 16, marginTop: HEIGHT * 10 }}
      />
    </ScreenRootView>
  )
})

const styles = StyleSheet.create({
  basic: {
    marginTop: HEIGHT * 10,
    marginLeft: WIDTH * 16,
    marginRight: WIDTH * 12,
    width: WIDTH * 362,
    height: HEIGHT * 646,
    backgroundColor: LBG,
    borderRadius: 8,
    textAlignVertical: "top",
    fontFamily: PRETENDARD_MEDIUM,
    fontSize: 14,
    lineHeight: 20,
  },
  small: {
    height: HEIGHT * 377,
  },
})
