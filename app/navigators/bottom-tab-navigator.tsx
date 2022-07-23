import React from "react"
import { Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import {
  WritingCommentScreen,
  HomeScreen,
  TestMapScreen,
  AllCommentsScreen,
  AllReviewsScreen,
} from "../screens"
import { PreMed12 } from "../components"
import IMAGES from "~/assets/images"
import { HEIGHT, WIDTH } from "../theme"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { GIVER_CASUAL_NAVY } from "../theme/palette"

//TODO: BottomTabNavigatorProps 작성
type BottomTabNavigatorProps = {}

const Tab = createBottomTabNavigator()

//* bottom-tab-navigator 코드
export const BottomTabNavigator = (props: BottomTabNavigatorProps) => {
  const navigation = useNavigation()

  return (
    <Tab.Navigator
      initialRouteName="home-screen"
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: {
          // backgroundColor: "pink",
          // justifyContent: "center",
          // alignItems: "center",
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      {/* //* 즐겨찾기 스택 */}
      <Tab.Screen
        name="favorite"
        component={AllCommentsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? IMAGES.favorite_navy : IMAGES.favorite_grey}
              style={{
                width: WIDTH * 28,
                height: HEIGHT * 28,
                backgroundColor: "transparent",
                marginTop: HEIGHT * 6,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <PreMed12
              text={focused ? "즐겨찾기" : ""}
              color={GIVER_CASUAL_NAVY}
              style={{ marginBottom: HEIGHT * 6 }}
            />
          ),
          // tabBarBadge: 3,
        }}
      />

      {/* //* 일정 스택 */}
      <Tab.Screen
        name="schedule"
        component={TestMapScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? IMAGES.schedule_navy : IMAGES.schedule_grey}
              style={{
                width: WIDTH * 28,
                height: HEIGHT * 28,
                backgroundColor: "transparent",
                marginTop: HEIGHT * 6,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <PreMed12
              text={focused ? "일정" : ""}
              color={GIVER_CASUAL_NAVY}
              style={{ marginBottom: HEIGHT * 6 }}
            />
          ),
          // tabBarBadge: 3,
        }}
      />

      {/* //* 검색 스택 */}
      <Tab.Screen
        name="home-screen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? IMAGES.search_navy : IMAGES.search_grey}
              style={{
                width: WIDTH * 28,
                height: HEIGHT * 28,
                backgroundColor: "transparent",
                marginTop: HEIGHT * 6,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <PreMed12
              text={focused ? "검색" : ""}
              color={GIVER_CASUAL_NAVY}
              style={{ marginBottom: HEIGHT * 6 }}
            />
          ),
        }}
      />

      {/* //* 채팅 스택 */}
      <Tab.Screen
        name="chatting"
        component={WritingCommentScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? IMAGES.chatting_navy : IMAGES.chatting_grey}
              style={{
                width: WIDTH * 28,
                height: HEIGHT * 28,
                backgroundColor: "transparent",
                marginTop: HEIGHT * 6,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <PreMed12
              text={focused ? "채팅" : ""}
              color={GIVER_CASUAL_NAVY}
              style={{ marginBottom: HEIGHT * 6 }}
            />
          ),
        }}
      />

      {/* //* 내정보 스택 */}
      <Tab.Screen
        name="myinfo"
        component={AllReviewsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? IMAGES.myinfo_navy : IMAGES.myinfo_grey}
              style={{
                width: WIDTH * 28,
                height: HEIGHT * 28,
                backgroundColor: "transparent",
                marginTop: HEIGHT * 6,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <PreMed12
              text={focused ? "내정보" : ""}
              color={GIVER_CASUAL_NAVY}
              style={{ marginBottom: HEIGHT * 6 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
