import React from "react"
import { useFocusEffect } from "@react-navigation/native"
import { ViewStyle } from "react-native"
import { BOTTOM_TAB_NAVIGATOR } from "#theme"
import { useStores } from "#models"

const $tabBarStyleAndroid: ViewStyle = {
  backgroundColor: "white",
  borderTopWidth: 0,
  height: BOTTOM_TAB_NAVIGATOR,
}

const $tabBarStyleIOS: ViewStyle = {
  backgroundColor: "white",
}

// TODO: navigation param 는 사라질 예정
export const useShowBottomTab = (navigation) => {
  const {
    uiStore: { showBottomTab, hideBottomTab, showingBottomTab },
  } = useStores()

  // console.log(`useShowBottomTab EVOKED ///showingBottomTab >>>`, showingBottomTab)
  useFocusEffect(
    React.useCallback(() => {
      showBottomTab()

      return () => {
        hideBottomTab()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showingBottomTab]),
  )
}
