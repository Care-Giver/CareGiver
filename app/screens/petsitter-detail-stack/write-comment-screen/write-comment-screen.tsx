import { FlatList, View, Text, TextInput, StyleSheet } from "react-native"
import React, { FC, useLayoutEffect, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../../navigators"
import { observer } from "mobx-react-lite"
import { FilterHeader } from "../../../custom-components/filter-header/filter-header"
import { LBG } from "../../../theme/palette"
import { HEIGHT, WIDTH } from "../../../theme"
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
    <View>
      <TextInput style={styles.input} multiline />
    </View>
  )
})

const styles = StyleSheet.create({
  input: {
    marginLeft: WIDTH * 16,
    marginRight: WIDTH * 12,
    width: WIDTH * 362,
    height: HEIGHT * 646,
    backgroundColor: LBG,
    borderRadius: 8,
  },
})
