import { FlatList, View, Text, TextInput, StyleSheet, KeyboardAvoidingView } from "react-native"
import React, { FC, useLayoutEffect, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../../navigators"
import { observer } from "mobx-react-lite"
import { FilterHeader } from "../../../custom-components/filter-header/filter-header"
import { LBG, white } from "../../../theme/palette"
import { HEIGHT, WIDTH } from "../../../theme"
import { PublicPrivateSwitchButton } from "../../../custom-components"
//import { styles } from "../../../custom-components"

export const WriteCommentScreen: FC<
  StackScreenProps<NavigatorParamList, "write-comment-screen">
> = observer(({ navigation, route }) => {
  // * 헤더 타이틀 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "댓글 작성",
    })
  }, [])

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#FFFFFF" }}>
        <TextInput style={styles.input} multiline placeholder="" />
        <Text>hihihihihihihihihihi</Text>
      </View>
    </KeyboardAvoidingView>
  )
})

const styles = StyleSheet.create({
  input: {
    marginTop: HEIGHT * 10,
    marginLeft: WIDTH * 16,
    marginRight: WIDTH * 12,
    width: WIDTH * 362,
    height: HEIGHT * 646,
    backgroundColor: LBG,
    borderRadius: 8,
  },
})
