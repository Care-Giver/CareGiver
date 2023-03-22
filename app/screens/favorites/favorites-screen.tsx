import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { ScreenRootView } from "#components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

export const FavoritesScreen: FC<
  StackScreenProps<NavigatorParamList, "favorites-screen">
> = observer(function FavoritesScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <ScreenRootView testID="Favorites" preset="fixed">
      {/* 해피코딩^^ */}
    </ScreenRootView>
  )
})
