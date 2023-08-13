import React, { FC, useRef, useEffect, useCallback, useState } from "react"
import { View, Animated, ScrollView, FlatList } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { navigate, NavigatorParamList } from "../../../navigators"
import {
  PreBol18,
  Row,
  Screen,
  DivisionLine,
  SitterProfileCard,
  SelectOptionDropdownBox,
} from "../../../components"
import { palette, LBG } from "../../../theme"
import { images } from "../../../../assets/images"
import { AnimatedHeader } from "./animated-header/animated-header"
import {
  HEADER_MARGIN_TOP,
  HEADER_MARGIN_BOTTOM,
  HEADER_AREA,
} from "./animated-header/header-property"
import { petsitters as _petsitters } from "./dummy-data"
import { useShowBottomTab } from "../../../utils/hooks"
import {
  Sex,
  SearchResultSortOrder,
  getVisitingsSearch,
  Visiting,
  getCrechesSearch,
  Creche,
} from "#axios"

const visitingResponse = [
  {
    isFavorite: false,
    reviewCount: 0,
    userNickname: "오옹",
    userProfile: null,
    visiting: {
      __careGiver__: "[Object]",
      __has_careGiver__: true,
      __has_visitingReviews__: true,
      __visitingReviews__: "[Array]",
      acceptRate: "[Array]",
      address: "경기도 안산시 사동 한양대학로 55 제5공학관 지하1층 창업3실",
      createAt: "2023-07-25T20:24:33.950Z",
      defaultFee: 10000,
      desc: "강아지, 고양이 다 좋아합니다..",
      extraSizeFee: "[Object]",
      handleType: "[Array]",
      hiredNumber: 0,
      id: 3,
      images: "[Array]",
      location: "[Object]",
      maxUnit: 3,
      promoted: false,
      responseRate: "[Array]",
      serviceVisiting: "[Array]",
      star: 0,
      title: "강아지랑 친구하는 펫시터",
      updatedAt: "2023-07-25T20:24:33.950Z",
      visitingAmenities: "[Array]",
    },
  },
]

const crecheResponse = [
  {
    isFavorite: false,
    reviewCount: 6,
    userNickname: "지우",
    userProfile: null,
    creche: {
      __careGiver__: "[Object]",
      __crecheReviews__: "[Array]",
      __has_careGiver__: true,
      __has_crecheReviews__: true,
      acceptRate: "[Array]",
      address: "경기도 안산시 사동 한양대학로 55 제5공학관 지하1층 창업3실",
      createAt: "2023-07-03T17:41:37.235Z",
      crecheAmenities: "[Array]",
      defaultFee: 10000,
      desc: "강아지 3년 기른 경력으로 보살핍니다.",
      extraSizeFee: "[Object]",
      handleType: "[Array]",
      hiredNumber: 0,
      id: 1,
      images: "[Array]",
      location: "[Object]",
      maxUnit: 3,
      promoted: false,
      responseRate: "[Array]",
      serviceCreche: "[Array]",
      star: 4,
      title: "ENFP의 친화력",
      updatedAt: "2023-07-16T11:15:15.837Z",
    },
  },
]

interface Petsitter extends Visiting, Creche {}

export const SearchResultScreen: FC<
  StackScreenProps<NavigatorParamList, "search-result-screen">
> = observer(function SearchResultScreen({ navigation, route }) {
  useShowBottomTab(navigation)

  console.log("route.params", route.params)
  const {
    // API REQUEST BODY 관련
    lat,
    lng,
    petIds,
    // 방문
    startTime,
    endTime,
    //  위탁
    startDate,
    endDate,

    // 그외
    serviceType,
  } = route.params

  //? drop down 클릭 여부
  const [isOpen, setIsOpen] = useState(false)
  const [petsitters, setPetsitters] = useState<Petsitter[]>([])
  const [visitings, setVisitings] = useState<Visiting[]>(null)
  const [creches, setCreches] = useState<Creche[]>(null)

  if (visitings) {
    console.log("visitings \n", visitings)
    console.log("visitings[0]?.location \n", visitings[0]?.location)
  }

  if (creches) {
    console.log("creches \n", creches)
  }

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

  // 검색결과 API 호출
  useEffect(() => {
    const req = {
      page: 1,
      lat,
      lng,
      startTime,
      endTime,
      petIds: [1, 2],
      radius: 10, //10
      sortBy: "distance", // "distance"
      sortOrder: SearchResultSortOrder.ASC, // "ASC"
      gender: Sex.MALE,
      services: [], //[1, 2]
      amenities: [], // [1, 2]
      certifiedOnly: false,
    }
    const visReq = {
      ...req,
      startTime,
      endTime,
    }

    const creReq = {
      ...req,
      startDate,
      endDate,
    }
    // console.log("req", req)

    if (serviceType === "방문") {
      getVisitingsSearch(visReq).then(setPetsitters)
    } else {
      getCrechesSearch(creReq).then(setPetsitters)
    }
  }, [])

  // 스크린 헤더 설정
  useEffect(() => {
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
      var _service = "펫시팅"
      var _serviceType = serviceType
    }

    //? Header, 이름 설정
    navigation.setOptions({
      title: _service + " - " + _serviceType,
    })
  }, [])

  return (
    // <Screen statusBar="dark-content">
    <Screen>
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
            paddingVertical: 12,
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
          />
        </Row>

        {/* //? divider */}
        {/* <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: LBG,
            position: "absolute",
            top: 47,
          }}
        /> */}
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
            renderItem={({ item: petsitter, index }) => {
              const sitterData = {
                crecheId: serviceType === "위탁" ? petsitter.creche.id : null,
                visitingId: serviceType === "방문" ? petsitter.visiting.id : null,
                image:
                  serviceType === "위탁"
                    ? petsitter.creche.__careGiver__.__user__?.profileImage
                    : petsitter.visiting.__careGiver__.__user__?.profileImage,
                userNickname: petsitter.userNickname,
                title: serviceType === "위탁" ? petsitter.creche.title : petsitter.visiting.title,
                reviewCount: petsitter.reviewCount,
                rating: serviceType === "위탁" ? petsitter.creche.star : petsitter.visiting.star,
                desc: serviceType === "위탁" ? petsitter.creche.desc : petsitter.visiting.desc,
              }

              const images =
                serviceType === "위탁" ? petsitter.creche.images : petsitter.visiting.images

              return (
                <SitterProfileCard
                  isFavorite={petsitter.isFavorite}
                  sitterData={sitterData}
                  onPress={() => {
                    //? 상세정보 스크린으로 이동
                    //TODO: params 값 추가해줘야 함
                    navigate("caregiver-detail-information-screen", {
                      sitterData,
                      serviceType,
                      images,
                      selectedPets: petIds,
                      beginDate: serviceType === "방문" ? startTime : null,
                      endTime: serviceType === "방문" ? endTime : null,
                    })
                  }}
                  // TODO: 찜하기 기능 구현
                  onLikePress={() => {}}
                  style={index < petsitters.length - 1 ? { marginTop: 20 } : { marginVertical: 20 }}
                />
              )
            }}
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
    </Screen>
  )
})
