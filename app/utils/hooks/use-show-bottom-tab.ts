import React from "react"
import { useFocusEffect } from "@react-navigation/native"
import { Platform, ViewStyle } from "react-native"
import { BOTTOM_TAB_NAVIGATOR } from "#theme"

const $tabBarStyleAndroid: ViewStyle = {
  backgroundColor: "white",
  borderTopWidth: 0,
  height: BOTTOM_TAB_NAVIGATOR,
}

const $tabBarStyleIOS: ViewStyle = {
  backgroundColor: "white",
}

export const useShowBottomTab = (navigation) => {
  useFocusEffect(
    React.useCallback(() => {
      const parent = navigation.getParent()
      parent.setOptions({
        tabBarStyle: {
          ...Platform.select({
            android: $tabBarStyleAndroid,
            ios: $tabBarStyleIOS,
          }),
          display: "flex",
        },

        tabBarLabelStyle: {
          paddingBottom: Platform.select({
            android: 8,
            ios: 0,
          }),
        },
      })

      return () => {
        parent.setOptions({ tabBarStyle: { display: "none" } })
      }
    }, [navigation]),
  )
}
