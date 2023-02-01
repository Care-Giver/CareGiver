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
import { images } from "#images"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { GIVER_CASUAL_NAVY } from "#theme"

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
              source={focused ? images.favorite_navy : images.favorite_grey}
              style={{
                width: 28,
                height: 28,
                backgroundColor: "transparent",
                marginTop: 6,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <PreMed12
              text={focused ? "즐겨찾기" : ""}
              color={GIVER_CASUAL_NAVY}
              style={{ marginBottom: 6 }}
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
              source={focused ? images.schedule_navy : images.schedule_grey}
              style={{
                width: 28,
                height: 28,
                backgroundColor: "transparent",
                marginTop: 6,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <PreMed12
              text={focused ? "일정" : ""}
              color={GIVER_CASUAL_NAVY}
              style={{ marginBottom: 6 }}
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
              source={focused ? images.search_navy : images.search_grey}
              style={{
                width: 28,
                height: 28,
                backgroundColor: "transparent",
                marginTop: 6,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <PreMed12
              text={focused ? "검색" : ""}
              color={GIVER_CASUAL_NAVY}
              style={{ marginBottom: 6 }}
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
              source={focused ? images.chatting_navy : images.chatting_grey}
              style={{
                width: 28,
                height: 28,
                backgroundColor: "transparent",
                marginTop: 6,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <PreMed12
              text={focused ? "채팅" : ""}
              color={GIVER_CASUAL_NAVY}
              style={{ marginBottom: 6 }}
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
              source={focused ? images.myinfo_navy : images.myinfo_grey}
              style={{
                width: 28,
                height: 28,
                backgroundColor: "transparent",
                marginTop: 6,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <PreMed12
              text={focused ? "내정보" : ""}
              color={GIVER_CASUAL_NAVY}
              style={{ marginBottom: 6 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
