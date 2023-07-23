import React, { useEffect, useRef } from "react"
import {
  StyleProp,
  ViewStyle,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
} from "react-native"
import { observer } from "mobx-react-lite"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { BOTTOM_TAB_NAVIGATOR, DEVICE_SCREEN_WIDTH, IOS_BOTTOM_HOME_BAR_HEIGHT } from "#theme"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useStores } from "#models"

const BOTTOM_TAB_BAR_HEIGHT = Platform.select({
  android: BOTTOM_TAB_NAVIGATOR,
  ios: BOTTOM_TAB_NAVIGATOR + IOS_BOTTOM_HOME_BAR_HEIGHT,
})

const IOS_BOTTOM_PADDING = 0

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
  // console.log("showingBottomTab >>>", showingBottomTab)

  const animHeight = useRef(new Animated.Value(BOTTOM_TAB_BAR_HEIGHT)).current

  useEffect(() => {
    handleBottomTabVisiblity()
  }, [showingBottomTab])

  const handleBottomTabVisiblity = () => {
    Animated.timing(animHeight, {
      toValue: showingBottomTab ? BOTTOM_TAB_BAR_HEIGHT : 0,
      duration: 300,
      useNativeDriver: false, // Use `false` for Android support
    }).start()
  }

  const allStyles = Object.assign(
    {},
    styles.root,
    {
      height: animHeight,
    },
    style,
  )

  return (
    <Animated.View style={allStyles}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

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
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ["selected"] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
            key={index}
          >
            <BottomMenuItem isFocused={isFocused} image={label.toString()} />
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
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: "absolute",
    bottom: 0,

    // 그림자 효과
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.0,
    elevation: 10,
  },
})

type Props = {
  image: string
  isFocused?: boolean
}

export const BottomMenuItem = ({ image, isFocused }: Props) => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons
        name={image}
        size={24}
        style={{ color: isFocused ? "blue" : "grey" }}
      />
    </View>
  )
}
