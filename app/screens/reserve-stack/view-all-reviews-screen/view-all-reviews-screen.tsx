import { View } from "react-native"
import React, { FC } from "react"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../../navigators"
import { observer } from "mobx-react-lite"
import { ScreenRootView } from "../../../custom-components"

export const ViewAllReviewsScreen: FC<
  StackScreenProps<NavigatorParamList, "view-all-reviews-screen">
> = observer(({ navigation, route }) => {
  return <ScreenRootView preset={"scroll"}></ScreenRootView>
})
