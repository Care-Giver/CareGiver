import { FlatList } from "react-native"
import React, { FC } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../../navigators"
import { observer } from "mobx-react-lite"
import { Comment, DivisionLine, ScreenRootView } from "../../../custom-components"
import { commentsDummy } from "./dummy-data"
import { HEIGHT, IOS_BOTTOM_HOME_BAR_HEIGHT } from "../../../theme"
import { FilterHeader } from "../../../custom-components/filter-header/filter-header"
import { LBG } from "../../../theme/palette"
import { Platform } from "expo-modules-core"

export const AllCommentsScreen: FC<
  StackScreenProps<NavigatorParamList, "all-comments-screen">
> = observer(({ navigation, route }) => {
  return (
    <ScreenRootView preset={"fixed"}>
      <FilterHeader
        title={"전체"}
        number={commentsDummy.length < 1000 ? `${commentsDummy.length}` : "999+"}
        // seletedOption={seletedOption}
      />

      <DivisionLine color={LBG} />

      {/* //? 댓글 리스트 */}
      <FlatList
        data={commentsDummy}
        renderItem={({ item, index }) => (
          <Comment
            key={item.userId}
            // style={{ marginTop: index === 0 ? HEIGHT * -1 : 0 }}
            commentData={item}
          />
        )}
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: Platform.select({
            ios: HEIGHT * 2 + IOS_BOTTOM_HOME_BAR_HEIGHT,
            android: HEIGHT * 2,
          }),
        }}
      />
    </ScreenRootView>
  )
})
