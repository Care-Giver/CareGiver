import { FlatList, Platform } from "react-native"
import React, { FC } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { observer } from "mobx-react-lite"
import { Comment, DivisionLine, Screen, FilterHeader } from "#components"
import { commentsDummy } from "./dummy-data"
import { DEVICE_SCREEN_WIDTH, IOS_BOTTOM_HOME_BAR_HEIGHT, LBG } from "#theme"

export const AllCommentsScreen: FC<
  StackScreenProps<NavigatorParamList, "all-comments-screen">
> = observer(({ navigation, route }) => {
  return (
    <Screen preset={"fixed"}>
      <FilterHeader
        title={"전체"}
        number={commentsDummy.length < 1000 ? `${commentsDummy.length}` : "999+"}
        // seletedOption={seletedOption}
      />

      <DivisionLine
        color={LBG}
        style={{
          alignSelf: "center",
          width: DEVICE_SCREEN_WIDTH,
        }}
      />

      {/* //? 댓글 리스트 */}
      <FlatList
        data={commentsDummy}
        renderItem={({ item, index }) => <Comment commentData={item} style={{ marginTop: -1 }} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: Platform.select({
            ios: 2 + IOS_BOTTOM_HOME_BAR_HEIGHT,
            android: 2,
          }),
        }}
      />
    </Screen>
  )
})
