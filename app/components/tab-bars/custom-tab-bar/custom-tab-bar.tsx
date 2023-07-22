import React from "react"
import { StyleProp, ViewStyle, View, StyleSheet, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { DEVICE_SCREEN_WIDTH } from "#theme"

export interface CustomTabBarProps extends BottomTabBarProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>
}

export const CustomTabBar = observer(function CustomTabBar(props: CustomTabBarProps) {
  const { style, state, descriptors, navigation } = props
  const allStyles = Object.assign({}, styles.root, style)

  return (
    <View style={allStyles}>
      <View style={{ flexDirection: "row" }}>
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
              <BottomMenuItem isFocused={isFocused} image={icon} />
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    width: DEVICE_SCREEN_WIDTH,
    height: 60,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.0,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 10,
    position: "absolute",
    bottom: 0,
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
      <AntDesign name={image} size={32} style={{ color: isFocused ? blue : grey }} />
    </View>
  )
}
