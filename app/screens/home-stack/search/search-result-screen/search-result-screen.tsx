import React, { FC, useRef, useLayoutEffect, useCallback, useState } from "react"
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
import { AnimatedHeader } from "./animated-header"
import DropDownPicker from "react-native-dropdown-picker"

export const SearchResultScreen: FC<
  StackScreenProps<NavigatorParamList, "search-result">
> = observer(({ navigation, route }) => {
  //! drop down picker 기본 props 설정 -> state 값으로 관리
  const [open, setOpen] = useState(false)
  const [optionValue, setOptionValue] = useState(null)
  const [sortOptions, setSortOptions] = useState([
    { label: "가까운 거리순", value: "near" },
    { label: "최근 등록순", value: "recent" },
    { label: "별점 높은순", value: "high-rating" },
    { label: "리뷰 많은순", value: "most-reviews" },
  ])

  //! drop down에서 정렬 옵션 선택시 실행되는 함수
  //? -> 선택된 옵션에 알맞게 펫시터의 순서를 재정렬(sort)
  const onSortPick = useCallback((optionValue: string) => {
    //? 최근 등록순
    if (optionValue === "recent") {
      petsitters.sort((a, b) => {
        //? 내림차순 정렬 -> 최근 등록된 펫시터 상위 노출
        console.log(Date.parse(a.createdAt))
        return Date.parse(b.createdAt) - Date.parse(a.createdAt)
      })
    }
    //? 별점 높은 순
    else if (optionValue === "high-rating") {
      petsitters.sort((a, b) => {
        //? 내림차순 정렬 -> 높은 별점을 상위 노출
        return Number(b.rating * 10) - Number(a.rating * 10)
      })
    }
    //? 리뷰 많은 순
    else if (optionValue === "most-reviews") {
      petsitters.sort((a, b) => {
        //? 내림차순 정렬 -> 리뷰 많은 펫시터 상위 노출
        return b.review - a.review
      })
    }
  }, [])

  //? FlatList에서 스크롤 이벤트가 발생할 때마다
  const offset = useRef(new Animated.Value(0)).current

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
      {/* //? 검색 필터 박스를 AnimatedHeader로 설정 -> 스크롤시 위로 올라가면서 사라지는 애니매이션 */}
      <AnimatedHeader animatedValue={offset} />
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
        <DropDownPicker
          open={open}
          value={optionValue}
          items={sortOptions}
          setOpen={setOpen}
          setValue={setOptionValue}
          setItems={setSortOptions}
          onSelectItem={(item) => onSortPick(item.value)}
          style={{
            borderWidth: 0,
            width: 68,
          }}
          showArrowIcon={false}
        />
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
      <FlatList
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
          //TODO: 없애기
          marginTop: 200,
        }}
        //? 스크롤 이벤트가 발생할 때마다 현재 스크롤 위치(=contentOffset)의 y값을 offset으로 설정(?)
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: offset } } }], {
          useNativeDriver: false,
        })}
      />
    </ScreenRootView>
  )
})
