import React, { FC, useRef, useLayoutEffect } from "react"
import { View, Pressable, Image, Animated } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../../../navigators"
import { SitterProfileCard } from "caregiver/app/custom-components/sitter-profile-card/sitter-profile-card"
import { FlatList } from "react-native-gesture-handler"
import { petsitters } from "caregiver/app/screens/home-stack/search/search-result-screen/dummy-data"
import { HEIGHT, WIDTH } from "caregiver/app/theme"
import { PreBol18, PreReg12, Row, ScreenRootView } from "caregiver/app/custom-components"
import { LBG } from "caregiver/app/theme/palette"
import { palette } from "caregiver/app/theme"
import IMAGES from "caregiver/assets/common-images"
import { AnimatedHeader } from "./animated-header/animated-header"
import {
  HEADER_HEIGHT,
  HEADER_MARGIN_TOP,
  HEADER_MARGIN_BOTTOM,
  HEADER_AREA,
  OPACITY_MIN,
} from "./animated-header/header-property"

export const SearchResultScreen: FC<
  StackScreenProps<NavigatorParamList, "search-result">
> = observer(({ navigation, route }) => {
  //? FlatList에서 스크롤 이벤트가 발생할 때마다

  const offset = useRef(new Animated.Value(0)).current

  const headerOpacity = offset.interpolate({
    inputRange: [OPACITY_MIN, 100],
    outputRange: [1, OPACITY_MIN * 0.01],
    extrapolate: "clamp",
  })

  const animateTranslateY = offset.interpolate({
    inputRange: [0, HEADER_AREA],
    outputRange: [0, -1 * HEADER_AREA],
    extrapolate: "clamp",
  })

  const listContainerMarginScale = offset.interpolate({
    inputRange: [0, HEADER_AREA],
    outputRange: [1.0, 0],
    extrapolate: "clamp",
  })

  useLayoutEffect(() => {
    if (!route.params) {
      console.error("params 가 없습니다. 정상적인 screen-flow 인지 확인 바랍니다.")
      if (!route.params.service) console.error("home-screen 에서 service 가 선택되지 않았습니다.")
      if (!route.params.serviceType)
        console.error("home-screen 에서 serviceType 이 선택되지 않았습니다.")
    }
    //? service 할당
    let _service = route.params.service === "펫시팅" ? "펫시팅" : "훈련"
    let _serviceType = route.params.serviceType === "방문" ? "방문" : "위탁"

    //? Header, 이름 설정
    navigation.setOptions({
      title: _service + " - " + _serviceType,
    })
  }, [])

  return (
    // <ScreenRootView statusBar="dark-content">
    <ScreenRootView>
      <Animated.View
        style={{
          height: HEADER_MARGIN_TOP,
          transform: [{ scaleY: listContainerMarginScale }],
        }}
      />

      {/* //? 검색 필터 박스를 AnimatedHeader로 설정 -> 스크롤시 위로 올라가면서 사라지는 애니매이션 */}
      <AnimatedHeader animatedValue={offset} />

      <Animated.View
        style={{
          height: HEADER_MARGIN_BOTTOM,
          transform: [{ scaleY: listContainerMarginScale }],
        }}
      />

      <Animated.View
        style={{
          transform: [{ translateY: animateTranslateY }],
        }}
      >
        {/* //? title container */}
        <Row
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: palette.white,
            marginTop: HEIGHT * 14,
          }}
        >
          {/* //? title */}
          <PreBol18 text="검색결과" />
          {/* //? sort button */}
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => console.warn("clicked sort btn")}
          >
            <PreReg12 text="가까운 거리 순" />
            <Image
              source={IMAGES.list_bars}
              style={{
                width: WIDTH * 16,
                height: HEIGHT * 16,
                marginLeft: WIDTH * 5,
              }}
            />
          </Pressable>
        </Row>
        {/* //? divider */}
        <View
          style={{
            width: "100%",
            height: HEIGHT * 2,
            backgroundColor: LBG,
            marginTop: HEIGHT * 12,
          }}
        />
        {/* //? sitter profile card list */}
        <Animated.FlatList
          data={petsitters}
          renderItem={({ item, index }) => (
            <SitterProfileCard
              key={item.id}
              name={item.name}
              image={item.image}
              rating={item.rating}
              review={item.review}
              title={item.title}
              desc={item.desc}
              onPress={() => console.warn("Hello")}
              style={
                index < petsitters.length - 1
                  ? { marginTop: HEIGHT * 20 }
                  : { marginVertical: HEIGHT * 20 }
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: palette.white,
          }}
          // ? 스크롤 이벤트가 발생할 때마다 현재 스크롤 위치(=contentOffset)의 y값을 offset으로 설정(?)
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: offset } } }], {
            useNativeDriver: true,
          })}
        />
      </Animated.View>
    </ScreenRootView>
  )
})
