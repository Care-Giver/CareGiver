import React, { FC, useRef, useLayoutEffect, useCallback, useState, useMemo } from "react"
import { View, Animated, ScrollView, FlatList, Pressable, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { navigate, NavigatorParamList } from "#navigators"
import {
  PreBol18,
  Row,
  ScreenRootView,
  DivisionLine,
  SitterProfileCard,
  SelectOptionDropdownBox,
  PreReg12,
  PreMed16,
} from "#components"
import { palette, LBG, DISABLED } from "#theme"
import { images } from "#images"
import { AnimatedHeader } from "./animated-header/animated-header"
import {
  HEADER_MARGIN_TOP,
  HEADER_MARGIN_BOTTOM,
  HEADER_AREA,
} from "./animated-header/header-property"
import { petsitters as _petsitters } from "./dummy-data"
import { styles } from "./styles"
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet"

export const SearchResultScreen: FC<
  StackScreenProps<NavigatorParamList, "search-result">
> = observer(({ navigation, route }) => {
  //? drop down 클릭 여부
  const [isOpen, setIsOpen] = useState(false)
  const [petsitters, setPetsitters] = useState([])
  const [filterInfoText, setFilterInfoText] = useState<string>("가까운 거리순")

  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ["52.4%", "100%"], [])

  const handleBottomSheetChange = useCallback((index: number) => {
    console.log("index: ", index)
  }, [])

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior={"close"}
      />
    ),
    [],
  )

  useLayoutEffect(() => {
    setPetsitters(_petsitters)
  }, [])

  // //? 정렬 옵션 리스트 (-> 정렬 문구가 수정될 경우를 대비하여 객체로 관리)
  // //? :: ["가까운 거리순", "최근 등록순", ..]와 같은 형식으로 관리하게 되면, 정렬 문구가 수정될 때마다 코드 내에 수정해야 하는 부분이 증가하기 때문
  // const optionLabels = {
  //   distance: "가까운 거리순",
  //   recent: "최근 등록순",
  //   ratings: "별점 높은순",
  //   reviews: "리뷰 많은순",
  // }

  // //? 현재 선택된 필터 옵션
  // const [currentOption, setCurrentOption] = useState(optionLabels.distance)

  // //? dropdown에서 정렬 옵션 선택시 실행되는 함수 (-> 선택된 옵션에 알맞게 펫시터의 순서를 재정렬(sort))
  // const handlePress = useCallback((optionValue: string) => {
  //   switch (optionValue) {
  //     //? 최근 등록순
  //     case optionLabels.recent:
  //       _petsitters.sort((a, b) => {
  //         //? 내림차순 정렬 -> 최근 등록된 펫시터 상위 노출
  //         return Date.parse(b.createdAt) - Date.parse(a.createdAt)
  //       })
  //       break

  //     //? 별점 높은 순
  //     case optionLabels.ratings:
  //       _petsitters.sort((a, b) => {
  //         //? 내림차순 정렬 -> 높은 별점을 상위 노출
  //         return Number(b.rating * 10) - Number(a.rating * 10)
  //       })
  //       break

  //     //? 리뷰 많은 순
  //     case optionLabels.reviews:
  //       _petsitters.sort((a, b) => {
  //         //? 내림차순 정렬 -> 리뷰 많은 펫시터 상위 노출
  //         return b.review - a.review
  //       })
  //       break
  //   }

  //   setIsOpen(false)
  //   setPetsitters(_petsitters)
  //   setCurrentOption(optionValue)
  // }, [])

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
    //? case1. 바텀탭으로 넘어오는경우
    if (!route.params) {
      // console.error("params 가 없습니다. 정상적인 screen-flow 인지 확인 바랍니다.")
      var _service = "펫시팅"
      var _serviceType = "위탁"

      // if (!route.params.service) console.error("home-screen 에서 service 가 선택되지 않았습니다.")
      // if (!route.params.serviceType)
      //   console.error("home-screen 에서 serviceType 이 선택되지 않았습니다.")
    }
    //? case2. 서치스크린 이후 넘어오는 경우
    else {
      //? service 할당
      var _service = route.params.service === "펫시팅" ? "펫시팅" : "훈련"
      var _serviceType = route.params.serviceType === "방문" ? "방문" : "위탁"
    }

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

      {/* //* 검색 필터 박스 */}
      {/* //? 검색 필터 박스를 AnimatedHeader로 설정 -> 스크롤시 위로 올라가면서 사라지는 애니매이션 */}
      <AnimatedHeader animatedValue={offset} />

      {/* //- margin */}
      {/* //? nativeDriver를 사용할 때는 레이아웃 css(ex 마진) 사용 불가능 :: 마진만큼의 높이를 가진 뷰로 대체 */}
      <Animated.View
        style={{
          height: HEADER_MARGIN_BOTTOM,
          transform: [{ scaleY: listContainerMarginScale }],
        }}
      />

      {/* //* 검색 결과 리스트를 담는 뷰 */}
      <Animated.View
        style={{
          transform: [{ translateY: animateTranslateY }],
        }}
      >
        {/* //? title container - 검색 결과 텍스트 + 정렬옵션 드롭다운 */}
        <Row
          style={{
            paddingVertical: 12,
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            zIndex: 1,
            backgroundColor: null,
          }}
        >
          {/* //* title */}
          <PreBol18 text="검색결과" style={{ alignSelf: "flex-start" }} />

          {/* //* 검색 필터 */}
          <Pressable
            style={styles.filterTextContainer}
            onPress={() => bottomSheetRef.current?.present()}
          >
            <PreReg12 text={filterInfoText} />
            <Image source={images.list_bars} style={[{ marginLeft: 5 }, styles.filterImg]} />
          </Pressable>

          {/* <SelectOptionDropdownBox
            onPress={() => {
              setIsOpen(!isOpen)
            }}
            isOpen={isOpen}
            logoSrc={images.list_bars}
            logoStyle={{
              width: 16,
              height: 16,
              marginLeft: 5,
            }}
            labels={Object.values(optionLabels)}
            handlePress={handlePress}
            currentOption={currentOption}
            style={{
              // backgroundColor: palette.white,
              alignSelf: "flex-start",
            }}
          />  */}
        </Row>

        {/* //? divider */}
        <DivisionLine
          color={LBG}
          style={{
            position: "absolute",
            top: 47,
          }}
        />

        {/* //? sitter profile card list */}
        <View
          style={{
            backgroundColor: palette.white,
            height: "auto",
            marginTop: 47 + 2,
            // marginBottom: 34,
          }}
        >
          <Animated.FlatList
            data={petsitters}
            renderItem={({ item, index }) => (
              <SitterProfileCard
                // key={item.id}
                // name={item.name}
                // image={item.image}
                // rating={item.rating}
                // review={item.review}
                // title={item.title}
                // desc={item.desc}
                sitterData={item}
                onPress={() => {
                  //? 상세정보 스크린으로 이동
                  //TODO: params 값 추가해줘야 함
                  navigate("caregiver-detail-information-screen", { sitterData: item })
                }}
                style={index < petsitters.length - 1 ? { marginTop: 20 } : { marginVertical: 20 }}
              />
            )}
            showsVerticalScrollIndicator={false}
            style={{
              backgroundColor: palette.white,
              height: "auto",
              marginBottom: 34,
            }}
            // ? 스크롤 이벤트가 발생할 때마다 현재 스크롤 위치(=contentOffset)의 y값을 offset으로 설정(?)
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: offset } } }], {
              useNativeDriver: true,
            })}
          />
        </View>
      </Animated.View>

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleBottomSheetChange}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={false}
      >
        <BottomSheetScrollView style={styles.bottomSheetContainer}>
          <Row style={styles.bottomSheetTitleBox}>
            {/* // ? "X" close button */}
            <Pressable onPress={() => bottomSheetRef.current?.close()} style={{ flex: 1 }}>
              <Image source={images.x_grey} style={{ width: 16, height: 16 }} />
            </Pressable>

            {/* //? "필터" title text */}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PreBol18 text="필터" />
            </View>

            {/* //? "초기화" reset button */}
            <Pressable style={{ flex: 1 }}>
              <PreMed16 text="초기화" color={DISABLED} style={{ marginLeft: "auto" }} />
            </Pressable>
          </Row>

          {/* //* division line */}
          <View style={styles.divisionLine} />
        </BottomSheetScrollView>
      </BottomSheetModal>
    </ScreenRootView>
  )
})
