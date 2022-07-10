import { FlatList } from "react-native"
import React, { FC } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../../navigators"
import { observer } from "mobx-react-lite"
import { ScreenRootView } from "../../../custom-components"
import { commentsDummy } from "./dummy-data"

export const AllCommentsScreen: FC<
  StackScreenProps<NavigatorParamList, "all-comments-screen">
> = observer(({ navigation, route }) => {
  return (
    <ScreenRootView preset={"scroll"} showsVerticalScrollIndicator={false}>
      {/* //? 댓글 리스트 */}
      <FlatList
        data={commentsDummy}
        renderItem={({ item, index }) => <Comment commentData={item} />}
      />
    </ScreenRootView>
  )
})
