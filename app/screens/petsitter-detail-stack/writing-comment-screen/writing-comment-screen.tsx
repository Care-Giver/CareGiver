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
//import { styles } from "../../../custom-components"

export const WritingCommentScreen: FC<
  StackScreenProps<NavigatorParamList, "writing-comment-screen">
> = observer(({ navigation, route }) => {
  // * 헤더 타이틀 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "댓글 작성",
    })
  }, [])

  const [keyboardStatus, setKeyboardStatus] = useState(undefined)

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
    //<ScreenRootView preset="fixed">
    <View style={{ backgroundColor: "#FFFFFF" }}>
      <TextInput
        style={[styles.basic, keyboardStatus === "Keyboard Shown" ? styles.small : styles.basic]}
        multiline
        maxLength={300}
        placeholder="hi"
        onSubmitEditing={Keyboard.dismiss}
      />
      <Text>hihihihihihihihihihi</Text>
    </View>

    //</ScreenRootView>
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
  },
  big: {
    height: HEIGHT * 646,
  },
})
