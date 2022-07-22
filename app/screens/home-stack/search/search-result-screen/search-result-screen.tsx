import React, { FC, useRef, useLayoutEffect, useCallback, useState } from "react"
import { View, Animated } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../../../navigators"
import { SitterProfileCard } from "~/app/custom-components/sitter-profile-card/sitter-profile-card"
import { petsitters as _petsitters } from "~/app/screens/home-stack/search/search-result-screen/dummy-data"
import { HEIGHT, WIDTH, palette } from "~/app/theme"
import { PreBol18, Row, ScreenRootView } from "~/app/custom-components"
import { LBG } from "~/app/theme/palette"
import IMAGES from "~/assets/common-images"
import { AnimatedHeader } from "./animated-header/animated-header"
import {
  HEADER_MARGIN_TOP,
  HEADER_MARGIN_BOTTOM,
  HEADER_AREA,
} from "./animated-header/header-property"
import { SelectOptionDropdownBox } from "../../../../custom-components/dropdown-boxes/select-option-button/select-option-dropdown-box"
import { DivisionLine } from "../../../../custom-components"

export const SearchResultScreen: FC<
  StackScreenProps<NavigatorParamList, "search-result">
> = observer(({ navigation, route }) => {
  //? drop down 클릭 여부
  const [isOpen, setIsOpen] = useState(false)
  const [petsitters, setPetsitters] = useState([])

  useLayoutEffect(() => {
    setPetsitters(_petsitters)
  }, [])

  //? 정렬 옵션 리스트 (-> 정렬 문구가 수정될 경우를 대비하여 객체로 관리)
  //? :: ["가까운 거리순", "최근 등록순", ..]와 같은 형식으로 관리하게 되면, 정렬 문구가 수정될 때마다 코드 내에 수정해야 하는 부분이 증가하기 때문
  const optionLabels = {
    distance: "가까운 거리순",
    recent: "최근 등록순",
    ratings: "별점 높은순",
    reviews: "리뷰 많은순",
  }

  //? 현재 선택된 필터 옵션
  const [currentOption, setCurrentOption] = useState(optionLabels.distance)

  //? dropdown에서 정렬 옵션 선택시 실행되는 함수 (-> 선택된 옵션에 알맞게 펫시터의 순서를 재정렬(sort))
  const handlePress = useCallback((optionValue: string) => {
    switch (optionValue) {
      //? 최근 등록순
      case optionLabels.recent:
        _petsitters.sort((a, b) => {
          //? 내림차순 정렬 -> 최근 등록된 펫시터 상위 노출
          return Date.parse(b.createdAt) - Date.parse(a.createdAt)
        })
        break

      //? 별점 높은 순
      case optionLabels.ratings:
        _petsitters.sort((a, b) => {
          //? 내림차순 정렬 -> 높은 별점을 상위 노출
          return Number(b.rating * 10) - Number(a.rating * 10)
        })
        break

      //? 리뷰 많은 순
      case optionLabels.reviews:
        _petsitters.sort((a, b) => {
          //? 내림차순 정렬 -> 리뷰 많은 펫시터 상위 노출
          return b.review - a.review
        })
        break
    }

    setIsOpen(false)
    setPetsitters(_petsitters)
    setCurrentOption(optionValue)
  }, [])

  //! 스크롤 애니메이션에 사용할 animation value -> 리렌더링 방지를 위해 useRef를 사용
  const offset = useRef(new Animated.Value(0)).current

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

      {/* //? 검색 필터 박스 */}
      {/* //? 검색 필터 박스를 AnimatedHeader로 설정 -> 스크롤시 위로 올라가면서 사라지는 애니매이션 */}
      <AnimatedHeader animatedValue={offset} />

      {/* //? margin */}
      {/* //? nativeDriver를 사용할 때는 레이아웃 css(ex 마진) 사용 불가능 :: 마진만큼의 높이를 가진 뷰로 대체 */}
      <Animated.View
        style={{
          height: HEADER_MARGIN_BOTTOM,
          transform: [{ scaleY: listContainerMarginScale }],
        }}
      />

      {/* //? 검색 결과 리스트를 담는 뷰 */}
      <Animated.View
        style={{
          transform: [{ translateY: animateTranslateY }],
        }}
      >
        {/* //? title container - 검색 결과 텍스트 + 정렬옵션 드롭다운 */}
        <Row
          style={{
            paddingVertical: HEIGHT * 12,
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            zIndex: 1,
            backgroundColor: null,
          }}
        >
          {/* //? title */}
          <PreBol18 text="검색결과" style={{ alignSelf: "flex-start" }} />

          {/* //? sort button */}
          <SelectOptionDropdownBox
            onPress={() => {
              setIsOpen(!isOpen)
            }}
            isOpen={isOpen}
            logoSrc={IMAGES.list_bars}
            logoStyle={{
              width: WIDTH * 16,
              height: HEIGHT * 16,
              marginLeft: WIDTH * 5,
            }}
            labels={Object.values(optionLabels)}
            handlePress={handlePress}
            currentOption={currentOption}
            style={{
              // backgroundColor: palette.white,
              alignSelf: "flex-start",
            }}
          />
        </Row>

        {/* //? divider */}
        {/* <View
          style={{
            width: "100%",
            height: HEIGHT * 2,
            backgroundColor: LBG,
            position: "absolute",
            top: HEIGHT * 47,
          }}
        /> */}
        <DivisionLine
          color={LBG}
          style={{
            position: "absolute",
            top: HEIGHT * 47,
          }}
        />

        {/* //? sitter profile card list */}
        <View
          style={{
            backgroundColor: palette.white,
            height: "auto",
            marginTop: HEIGHT * (47 + 2),
            // marginBottom: HEIGHT * 34,
          }}
        >
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
                onPress={() => {
                  //? 상세정보 스크린으로 이동
                  //TODO: params 값 추가해줘야 함
                  navigate("petsitter-detail-information-screen", null)
                }}
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
              // height: 500,
              height: "auto",
              marginBottom: HEIGHT * 34,
            }}
            // ? 스크롤 이벤트가 발생할 때마다 현재 스크롤 위치(=contentOffset)의 y값을 offset으로 설정(?)
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: offset } } }], {
              useNativeDriver: true,
            })}
          />
        </View>
      </Animated.View>
    </ScreenRootView>
  )
})
