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
        parent.setOptions({
          tabBarStyle: { display: "none" },
        })
        // TODO:
        //~ 시간 차를 만들었으나, 역시 어색함
        //~ 아예 Animated.View 를 사용한 커스텀 바텀탭 을 만들고
        //~ transform 을 통해 부드럽게 높이를 0으로 줄이게 해야 함
        // setTimeout(() => {
        //   parent.setOptions({ tabBarStyle: { display: "none" } })
        // }, 500)
      }
    }, [navigation]),
  )
}
