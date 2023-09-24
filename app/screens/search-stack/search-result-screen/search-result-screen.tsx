import React, { FC, useRef, useEffect, useCallback, useState, useLayoutEffect } from "react"
import { View, Animated } from "react-native"
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
  PetsitterProfileCardPetsitterData,
} from "../../../components"
import { palette, LBG, BOTTOM_HEIGHT } from "../../../theme"
import { images } from "../../../../assets/images"
import { AnimatedHeader } from "./animated-header/animated-header"
import {
  HEADER_MARGIN_TOP,
  HEADER_MARGIN_BOTTOM,
  HEADER_AREA,
} from "./animated-header/header-property"
import { useShowBottomTab } from "../../../utils/hooks"
import {
  Sex,
  getVisitingsSearch,
  Visiting,
  getCrechesSearch,
  Creche,
  VisitingService,
  CrechesService,
  CrecheAmenity,
  VisitingAmenity,
  VisitingsSearchRequest,
  CrechesSearchRequest,
} from "#axios"
import {
  SearchRequest,
  SearchResultSortOrder,
} from "../../../services/axios/types/creches.visitings.common.types"

// export interface Petsitter extends Visiting, Creche {}
// export type Petsitter = Visiting & Creche
export type Petsitter = Visiting | Creche

export type ServiceAmenity = {
  services: CrechesService[] | VisitingService[]
  amenities: CrecheAmenity[] | VisitingAmenity[]
}

export const SearchResultScreen: FC<
  StackScreenProps<NavigatorParamList, "search-result-screen">
> = observer(function SearchResultScreen({ navigation, route }) {
  useShowBottomTab(navigation)

  // console.log("route.params", route.params)
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

  const 방문검색 = serviceType === "방문"
  const 위탁검색 = serviceType === "위탁"

  //? drop down 클릭 여부
  const [isOpen, setIsOpen] = useState(false)
  const [petsitters, setPetsitters] = useState<Petsitter[]>([])
  console.log("petsitters ♦️", petsitters)

  //? 정렬 옵션 리스트 (-> 정렬 문구가 수정될 경우를 대비하여 객체로 관리)
  //? :: ["가까운 거리순", "최근 등록순", ..]와 같은 형식으로 관리하게 되면, 정렬 문구가 수정될 때마다 코드 내에 수정해야 하는 부분이 증가하기 때문
  const optionLabel = {
    distance: "가까운 거리순",
    recent: "최근 등록순",
    ratings: "별점 높은순",
    reviews: "리뷰 많은순",
  }

  //? 현재 선택된 필터 옵션
  const [currentOption, setCurrentOption] = useState(optionLabel.distance)

  //? dropdown에서 정렬 옵션 선택시 실행되는 함수 (-> 선택된 옵션에 알맞게 펫시터의 순서를 재정렬(sort))
  const handlePress = useCallback(
    (optionValue: string) => {
      switch (optionValue) {
        // 1. 최근 등록순
        // 내림차순 정렬 -> 최근 등록된 펫시터 상위 노출
        case optionLabel.recent:
          if (방문검색) {
            const visitings = petsitters as Visiting[]
            visitings.sort((a, b) => {
              return Date.parse(b.visiting.createAt) - Date.parse(a.visiting.createAt)
            })
            setPetsitters(visitings)
          }
          if (위탁검색) {
            const creches = petsitters as Creche[]
            creches.sort((a, b) => {
              return Date.parse(b.creche.createAt) - Date.parse(a.creche.createAt)
            })
            setPetsitters(creches)
          }
          break

        // 2. 별점 높은 순
        // 내림차순 정렬 -> 높은 별점을 상위 노출
        case optionLabel.ratings:
          if (방문검색) {
            const visitings = petsitters as Visiting[]
            visitings.sort((a, b) => {
              return Number(b.visiting.star * 10) - Number(a.visiting.star * 10)
            })
            setPetsitters(visitings)
          }
          if (위탁검색) {
            const creches = petsitters as Creche[]
            creches.sort((a, b) => {
              return Number(b.creche.star * 10) - Number(a.creche.star * 10)
            })
            setPetsitters(creches)
          }
          break

        // 리뷰 많은 순
        // 내림차순 정렬 -> 리뷰 많은 펫시터 상위 노출
        case optionLabel.reviews:
          if (방문검색) {
            const visitings = petsitters as Visiting[]
            visitings.sort((a, b) => {
              return b.reviewCount - a.reviewCount
            })
            setPetsitters(visitings)
          }
          if (위탁검색) {
            const creches = petsitters as Creche[]
            creches.sort((a, b) => {
              return b.reviewCount - a.reviewCount
            })
            setPetsitters(creches)
          }
          break
      }

      setIsOpen(false)
      setCurrentOption(optionValue)
    },
    [petsitters, optionLabel],
  )

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

  // 스크린 헤더 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      //@ts-ignore
      title: `펫시팅 - ${serviceType}`,
    })
  }, [])

  // 검색결과 API 호출
  useEffect(() => {
    const req: SearchRequest = {
      page: 1,
      lat,
      lng,
      petIds: [1, 2],
      radius: 10, //10
      sortBy: "distance", // "distance"
      sortOrder: SearchResultSortOrder.ASC, // "ASC"
      gender: Sex.MALE,
      services: [], //[1, 2]
      amenities: [], // [1, 2]
      certifiedOnly: false,
    }
    const visReq: VisitingsSearchRequest = {
      ...req,
      startTime,
      endTime,
    }

    const creReq: CrechesSearchRequest = {
      ...req,
      startDate,
      endDate,
    }
    // console.log("req", req)

    if (방문검색) {
      getVisitingsSearch(visReq).then(setPetsitters)
      return
    }

    if (위탁검색) {
      getCrechesSearch(creReq).then(setPetsitters)
    }
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
            labels={Object.values(optionLabel)}
            handlePress={handlePress}
            currentOption={currentOption}
            style={{
              // backgroundColor: palette.white,
              alignSelf: "flex-start",
            }}
          />
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
            renderItem={({ item: petsitter, index }) => {
              let sitterData: PetsitterProfileCardPetsitterData
              let serviceAmenity: ServiceAmenity
              let images: string[]

              if (방문검색) {
                const visiting = petsitter as Visiting
                sitterData = {
                  crecheId: null,
                  visitingId: visiting.visiting.id,
                  reviewCount: visiting.reviewCount,
                  userNickname: visiting.userNickname,
                  title: visiting.visiting.title,
                  desc: visiting.visiting.desc,
                  star: visiting.visiting.star,
                  profileImage: visiting.visiting.__careGiver__.__user__?.profileImage,
                }
                serviceAmenity = {
                  services: visiting.visiting.serviceVisiting,
                  amenities: visiting.visiting.visitingAmenities,
                }
                images = visiting.visiting.images
              }

              if (위탁검색) {
                const creche = petsitter as Creche
                sitterData = {
                  crecheId: creche.creche.id,
                  visitingId: null,
                  reviewCount: creche.reviewCount,
                  userNickname: creche.userNickname,
                  title: creche.creche.title,
                  desc: creche.creche.desc,
                  star: creche.creche.star,
                  profileImage: creche.creche.__careGiver__.__user__?.profileImage,
                }
                serviceAmenity = {
                  services: creche.creche.serviceCreche,
                  amenities: creche.creche.crecheAmenities,
                }
                images = creche.creche.images
              }

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
                      serviceAmenity,
                      images,
                      selectedPets: petIds,

                      // 방문
                      startTime: 방문검색 ? startTime : null,
                      endTime: 방문검색 ? endTime : null,

                      // 위탁
                      startDate: 위탁검색 ? startDate : null,
                      endDate: 위탁검색 ? endDate : null,
                    })
                  }}
                  // TODO: 찜하기 기능 구현
                  onLikePress={() => {
                    //
                  }}
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
            contentContainerStyle={{
              paddingBottom: 150,
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
