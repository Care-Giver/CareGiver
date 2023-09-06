import React, { useEffect, useRef } from "react"
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
} from "react-native"
import { observer } from "mobx-react-lite"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { BOTTOM_TAB_NAVIGATOR, DEVICE_SCREEN_WIDTH, IOS_BOTTOM_HOME_BAR_HEIGHT } from "#theme"
import { useStores } from "#models"
import { images } from "#images"
import { TabBarItem } from "../tab-bar-item/tab-bar-item"
import { tabLabel } from "#navigators"

export const BOTTOM_TAB_BAR_HEIGHT = Platform.select({
  android: BOTTOM_TAB_NAVIGATOR,
  ios: 52 + IOS_BOTTOM_HOME_BAR_HEIGHT,
})

const BOTTOM_TAB_BAR_ITEM_IMAGE_HEIGHT = 28

const IOS_BOTTOM_PADDING = IOS_BOTTOM_HOME_BAR_HEIGHT

export interface CustomTabBarProps extends BottomTabBarProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>
}

export const CustomTabBar = observer(function CustomTabBar(props: CustomTabBarProps) {
  const { style, state, descriptors, navigation } = props

  const {
    uiStore: { showingBottomTab },
  } = useStores()

  const animatedBottomTabBarHeight = useRef(new Animated.Value(BOTTOM_TAB_BAR_HEIGHT)).current
  const animatedBottomTabBarItemImageHeight = useRef(
    new Animated.Value(BOTTOM_TAB_BAR_ITEM_IMAGE_HEIGHT),
  ).current

  useEffect(() => {
    handleBottomTabVisiblity()
  }, [showingBottomTab])

  const handleBottomTabVisiblity = () => {
    Animated.timing(animatedBottomTabBarHeight, {
      toValue: showingBottomTab ? BOTTOM_TAB_BAR_HEIGHT : 0,
      duration: 300,
      useNativeDriver: false, // Use `false` for Android support
    }).start()

    Animated.timing(animatedBottomTabBarItemImageHeight, {
      toValue: showingBottomTab ? BOTTOM_TAB_BAR_ITEM_IMAGE_HEIGHT : 0,
      duration: 300,
      useNativeDriver: false, // Use `false` for Android support
    }).start()
  }

  // 그림자 효과 - 바텀탭이 보여질 때만 그림자 효과를 줍니다.
  const shadowStyle = {
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.0,
    elevation: 10,
  }

  const allStyles = Object.assign(
    {},
    styles.root,
    { height: animatedBottomTabBarHeight },
    showingBottomTab && shadowStyle,
    style,
  )

  return (
    <Animated.View style={allStyles}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const label = options.tabBarLabel
        const isFocused = state.index === index

        let activeImage = ""
        let inactiveImage = ""
        switch (label) {
          //  CL
          case tabLabel.favortie:
            activeImage = images.favorite_navy
            inactiveImage = images.favorite_grey
            break
          case tabLabel.schedule:
            activeImage = images.schedule_navy
            inactiveImage = images.schedule_grey
            break
          case tabLabel.search:
            activeImage = images.search_navy
            inactiveImage = images.search_grey
            break
          case tabLabel.chatting:
            activeImage = images.chatting_navy
            inactiveImage = images.chatting_grey
            break
          case tabLabel.myinfo:
            activeImage = images.myinfo_navy
            inactiveImage = images.myinfo_grey
            break

          // CG
          case tabLabel.statistics:
            activeImage = images.statistics_navy
            inactiveImage = images.statistics_grey
            break
          case tabLabel.manage_booking:
            activeImage = images.schedule_navy // DO NOT CHANGE THIS
            inactiveImage = images.schedule_grey // DO NOT CHANGE THIS
            break
          case tabLabel.manage_schedule:
            activeImage = images.manage_schedule_navy
            inactiveImage = images.manage_schedule_grey
            break
        }

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          })
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          })

          //  LongPress 기획 있을 경우, 아래에 로직 작성
          // console.log("LONG PRESS DETECTED")
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            //@ts-ignore
            accessibilityStates={isFocused ? ["selected"] : []}
            accessibilityLabel={options?.tabBarAccessibilityLabel}
            testID={options?.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
            key={index}
          >
            {/* <BottomMenuItem  image={label.toString()} /> */}
            {showingBottomTab && (
              <TabBarItem
                //@ts-ignore
                image={isFocused ? activeImage : inactiveImage}
                //@ts-ignore
                label={label}
                isFocused={isFocused}
                showingBottomTab={showingBottomTab}
                imageHeight={animatedBottomTabBarItemImageHeight}
              />
            )}
          </TouchableOpacity>
        )
      })}
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    width: DEVICE_SCREEN_WIDTH,
    height: BOTTOM_TAB_BAR_HEIGHT,
    paddingBottom: Platform.select({
      android: 0,
      ios: IOS_BOTTOM_PADDING,
    }),

    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
  },
})
