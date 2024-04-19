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
import { alertModal } from "../../../utils/alert-modal"

export const BOTTOM_TAB_BAR_HEIGHT = Platform.select({
  android: BOTTOM_TAB_NAVIGATOR,
  ios: 52 + IOS_BOTTOM_HOME_BAR_HEIGHT,
})

const BOTTOM_TAB_BAR_ITEM_IMAGE_HEIGHT = 56

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
    userStore: { userAuth },
  } = useStores()

  const animatedBottomTabBarHeight = useRef(new Animated.Value(BOTTOM_TAB_BAR_HEIGHT)).current
  const animatedBottomTabBarItemImageHeight = useRef(
    new Animated.Value(BOTTOM_TAB_BAR_ITEM_IMAGE_HEIGHT),
  ).current

  useEffect(() => {
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
    handleBottomTabVisiblity()
  }, [animatedBottomTabBarHeight, animatedBottomTabBarItemImageHeight, showingBottomTab])

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
          // case tabLabel.favortie:
          //   activeImage = images.favorite_navy
          //   inactiveImage = images.favorite_grey
          //   break
          case tabLabel.schedule:
            activeImage = images.schedule_active
            inactiveImage = images.schedule_disabled
            break
          case tabLabel.search:
            activeImage = images.search_active
            inactiveImage = images.search_disabled
            break
          case tabLabel.chatting:
            activeImage = images.message_active
            inactiveImage = images.message_disabled
            break
          case tabLabel.myinfo:
            activeImage = images.myinfo_active
            inactiveImage = images.myinfo_disabled
            break

          // CG
          // case tabLabel.statistics:
          //   activeImage = images.statistics_navy
          //   inactiveImage = images.statistics_grey
          //   break
          case tabLabel.manage_booking:
            activeImage = images.cg_booking_active
            inactiveImage = images.cg_booking_disabled
            break
          case tabLabel.manage_schedule:
            activeImage = images.schedule_active
            inactiveImage = images.schedule_disabled
            break
        }

        const onPress = () => {
          // 아직 미구현된 탭들 핸들링 - 채팅(CG, CL) 탭, 통계(CG) 탭
          switch (label) {
            //  채팅(CG, CL) 탭
            case tabLabel.chatting:
              if (userAuth.provider === "apple") {
                alertModal(
                  "개발중 🏗️",
                  "아쉽게도 현재, 애플계정으로 회원가입 한 유저는 이메일 정보를 받아올 수 없으므로 채팅 기능을 사용할 수 없습니다.",
                )
                return
              }
              break

            // // 예약관리(CG) 탭
            // case tabLabel.manage_booking:
            //   alertModal("MVP", "예약관리 기능은 아직 개발중입니다 🐈")
            //   return

            // 통계(CG) 탭
            case tabLabel.statistics:
              alertModal("MVP", "통계 기능은 아직 개발중입니다 🐈")
              return
          }

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
