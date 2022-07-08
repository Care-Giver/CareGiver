import { FlatList, View, Text } from "react-native"
import React, { FC, useLayoutEffect, useState } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../../navigators"
import { observer } from "mobx-react-lite"

export const WriteCommentScreen : FC<
StackScreenProps<NavigatorParamList, "write-comment-screen">
> = observer(({navigation, route}) => {

  // ? 헤더 타이틀 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "댓글 작성",
    })
  }, [])

  return (
    <View>
      <Text>hi</Text>
    </View>
  )

})
