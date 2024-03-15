import React, {
  FC,
  useRef,
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
  useMemo,
} from "react"
import {
  View,
  Animated,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { navigate, NavigatorParamList } from "../../../../navigators"
import {
  PreBol18,
  Row,
  Screen,
  DivisionLine,
  SitterProfileCard,
  PetsitterProfileCardPetsitterData,
  SearchSortingButton,
  PreReg12,
  BASIC_BACKGROUND_PADDING_WIDTH,
  PreBol16,
  PressableButton,
  PreMed14,
  BlueCheckbox,
  PreMed16,
  PopReg14,
  PreMed18,
  BOTTOM_TAB_BAR_HEIGHT,
  Footer,
  FOOTER_CONTENT_GAP,
} from "../../../../components"
import {
  palette,
  LBG,
  DEVICE_SCREEN_WIDTH,
  DEVICE_SCREEN_HEIGHT,
  IOS_NOTCH_STATUS_BAR_HEIGHT,
  GIVER_CASUAL_NAVY,
  HEAD_LINE,
  DISABLED,
  SUB_HEAD_LINE,
  LIGHT_LINE,
  BOTTOM_HEIGHT,
} from "../../../../theme"
import { images } from "../../../../../assets/images"
import { AnimatedHeader } from "./animated-header/animated-header"
import {
  HEADER_MARGIN_TOP,
  HEADER_MARGIN_BOTTOM,
  HEADER_AREA,
} from "./animated-header/header-property"
import { useShowBottomTab } from "../../../../utils/hooks"
import {
  Sex,
  getVisitingsSearch,
  Visiting,
  getCrechesSearch,
  Creche,
  VisitingService,
  CrecheService,
  CrecheAmenity,
  VisitingAmenity,
  VisitingsSearchRequest,
  CrechesSearchRequest,
  createFavorite,
  UpdateFavoriteBody,
  deleteFavorite,
} from "#api"
import {
  SearchRequest,
  SearchResultSortOrder,
} from "../../../../services/api/types/creches.visitings.common.types"
import {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet"
import Slider from "@react-native-community/slider"
import _ from "lodash"
import { ratingRound } from "../../../../utils/format"
import { alertModal } from "../../../../utils/alert-modal"

export type VisitingCreche = Visiting & Creche

// 정렬 옵션 리스트 (-> 정렬 문구가 수정될 경우를 대비하여 객체로 관리)
// :: ["가까운 거리순", "최근 등록순", ..]와 같은 형식으로 관리하게 되면, 정렬 문구가 수정될 때마다 코드 내에 수정해야 하는 부분이 증가하기 때문
const optionLabel = {
  distance: "가까운 거리순",
  recent: "최근 등록순",
  ratings: "별점 높은순",
  reviews: "후기 많은순",
}

// 정렬 옵션 리스트의 타입
export type SearchResultSortingOption = typeof optionLabel[keyof typeof optionLabel]

const TEMP_VIS_SEARCH_REQ = {
  amenities: [],
  certifiedOnly: false,
  gender: null,
  lat: 37.2955072, // 위도
  lng: 126.83539,
  page: 1,
  petIds: [28],
  radius: 10,
  services: [],
  sortBy: "distance",
  // @ts-ignore
  sortOrder: "ASC",
  startTime: "2023-11-25 21:00:00",
  endTime: "2023-11-25 22:00:00",

  //
  startDate: null,
  endDate: null,
  address: "테스트중",
}

const TEMP_CRE_SEARCH_REQ = {
  amenities: [],
  certifiedOnly: false,
  gender: null,
  lat: 37.5637312032917,
  lng: 127.191741670397,
  page: 1,
  petIds: [28, 27, 30],
  radius: 10,
  services: [],
  sortBy: "distance",
  // @ts-ignore
  sortOrder: "ASC",
  startDate: "2023-11-29T00:00:00",
  endDate: "2023-11-29T00:00:00",

  //
  startTime: null,
  endTime: null,
  address: "테스트중",
}

const TEMP_ROUTE_PARAMS = {
  // ...TEMP_CRE_SEARCH_REQ,
  // serviceType: "위탁",

  ...TEMP_VIS_SEARCH_REQ,
  serviceType: "방문",
}

export const SearchResultScreen: FC<
  StackScreenProps<NavigatorParamList, "search-result-screen">
> = observer(function SearchResultScreen({ navigation, route }) {
  // 바텀탭 표출
  useShowBottomTab(navigation)
  // 스크린 헤더 설정
  useLayoutEffect(() => {
    navigation.setOptions({
      //@ts-ignore
      title: `${serviceType} 펫시팅`,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // navigation params 로 넘겨받은 API REQUEST BODY 데이터
  const {
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

    // ---- API REQUEST BODY 와는 상관 없는 데이터 ----
    address, // 검색결과 헤더에 보여줄 주소
  } = route.params

  /* const {
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

    // ---- API REQUEST BODY 와는 상관 없는 데이터 ----
    address, // 검색결과 헤더에 보여줄 주소
  } = TEMP_ROUTE_PARAMS */

  const 방문검색 = serviceType === "방문"
  const 위탁검색 = serviceType === "위탁"

  const defaultSearchRequest: SearchRequest = {
    page: 1,
    lat,
    lng,
    petIds,
    radius: 10, //10
    sortBy: "distance", // "distance"
    sortOrder: SearchResultSortOrder.ASC, // "ASC"
    gender: null,
    services: [], //[1, 2]
    amenities: [], // [1, 2]
    certifiedOnly: false,
  }

  /** 검색 API 호출을 위한 request body */
  const [searchRequest, setSearchRequest] = useState<SearchRequest>(defaultSearchRequest)

  /** 검색 필터 바텀시트모달에서 설정한 필터값을 저장하는 임시 변수 */
  const [draftSearchRequest, setDraftSearchRequest] = useState<SearchRequest>(defaultSearchRequest)

  /** 펫시터 */
  const [petsitters, setPetsitters] = useState<VisitingCreche[]>([])
  // console.log("petsitters ♦️", JSON.stringify(petsitters))

  /** 펫시터 검색결과 API 호출 */
  useEffect(() => {
    const visReq: VisitingsSearchRequest = {
      ...searchRequest,
      startTime,
      endTime,
    }

    const creReq: CrechesSearchRequest = {
      ...searchRequest,
      startDate,
      endDate,
    }

    if (방문검색) {
      getVisitingsSearch(visReq).then(setPetsitters)
      return
    }

    if (위탁검색) {
      getCrechesSearch(creReq).then(setPetsitters)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchRequest])

  /** 현재 선택된 검색결과 정렬 옵션 */
  const [sortingOption, setSortingOption] = useState<SearchResultSortingOption>(
    optionLabel.distance,
  )

  /** 정렬 옵션 선택시 실행되는 함수 (-> 선택된 옵션에 알맞게 검색결과(펫시터)의 순서를 재정렬(sort)) */
  const handleSorting = useCallback(
    (optionValue: SearchResultSortingOption) => {
      switch (optionValue) {
        // 1. 가까운 거리순
        // 오름차순 정렬 -> 거리가 가까울 수록 상위 노출
        case optionLabel.distance:
          setPetsitters(_.orderBy(petsitters, "distance", "asc"))
          break

        // 2. 최근 등록순
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

        // 3. 별점 높은 순
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

        // 4. 후기 많은 순
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

      setSortingOption(optionValue)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [petsitters, optionLabel],
  )

  // 필터 바텀시트모달 - ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // 필터 바텀시트모달 - snapPoints
  const snapPoints = useMemo(
    () => [
      "60%",
      // Platform.select({
      //   ios: DEVICE_SCREEN_HEIGHT - IOS_NOTCH_STATUS_BAR_HEIGHT,
      //   android: DEVICE_SCREEN_HEIGHT,
      // }),
    ],
    [],
  )

  /** 필터 바텀시트모달 backdrop */
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0} // backdrop이 등장할 때의 snap point -> snap point가 0이면 backdrop 나타남
        disappearsOnIndex={-1} // backdrop이 사라질 때의 snap point -> snap point가 -1이면 backdrop 사라짐
        pressBehavior={"close"}
      />
    ),
    [],
  )

  /** 필터 바텀시트모달 - 저장 버튼 누를 시 실행되는 함수 */
  const handleSaveFilterButton = useCallback(() => {
    // 임시 저장된 필터값을 현재 필터값으로 설정
    setSearchRequest(draftSearchRequest)
    // 필터 바텀시트모달 닫기
    bottomSheetModalRef.current?.close()
  }, [draftSearchRequest])

  /** 필터 바텀시트모달 Footer - 저장 버튼 렌더링 */
  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={BOTTOM_HEIGHT} style={styles.btnContainer}>
        <TouchableOpacity
          // 임시 저장된 필터값과 현재 필터값이 같으면 (차이가 없으면)
          // 필터 설정을 저장할 필요가 없으므로, 저장 버튼 비활성화
          disabled={_.isEqual(searchRequest, draftSearchRequest)}
          style={
            _.isEqual(searchRequest, draftSearchRequest)
              ? styles.disabledSubmitBtn
              : styles.submitBtn
          }
          onPress={handleSaveFilterButton}
        >
          <PreBol16 text="저장" color={"white"} />
        </TouchableOpacity>
      </BottomSheetFooter>
    ),
    [handleSaveFilterButton, searchRequest, draftSearchRequest],
  )

  /** radius 값을 거리 슬라이더 값으로 변환 */
  const radiusToSliderValue = useCallback(() => {
    switch (draftSearchRequest.radius) {
      case 1:
        return 0
      case 10:
        return 1
      case 20:
        return 2
      case 30:
        return 3
      default:
        return 1
    }
  }, [draftSearchRequest])

  return (
    <Screen style={{ paddingHorizontal: 0 }}>
      <Animated.View
        style={{
          height: HEADER_MARGIN_TOP,
          transform: [{ scaleY: listContainerMarginScale }],
        }}
      />

      {/* //? 검색 필터 박스 */}
      {/* //? 검색 필터 박스를 AnimatedHeader로 설정 -> 스크롤시 위로 올라가면서 사라지는 애니매이션 */}
      <AnimatedHeader
        animatedValue={offset}
        startTime={startTime}
        endTime={endTime}
        startDate={startDate}
        endDate={endDate}
        address={address}
      />

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
        {/* //? title container - 검색 결과 텍스트 + 검색결과 필터 바텀시트모달 버튼 */}
        <Row
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "transparent",
            paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
          }}
        >
          {/* //? title */}
          <PreBol18 text="검색결과" />

          {/* 검색결과 필터 옵션 */}
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              flexDirection: "row",
              paddingVertical: 16,
            }}
            onPress={() => {
              bottomSheetModalRef.current?.present()
            }}
          >
            <PreReg12 text="필터" />
            <Image
              source={images.list_bars}
              style={{
                width: 16,
                height: 16,
                marginLeft: 5,
              }}
            />
          </TouchableOpacity>
        </Row>

        {/* //? divider */}
        <DivisionLine color={LBG} style={{ width: DEVICE_SCREEN_WIDTH, alignSelf: "center" }} />

        {/* 정렬 옵션 */}
        <Row
          style={{
            justifyContent: "space-between",
            backgroundColor: "transparent",
            paddingVertical: 12,
            paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
          }}
        >
          <SearchSortingButton
            sortingOption={optionLabel.distance}
            selectedSortingOption={sortingOption}
            handlePress={handleSorting}
          />
          <SearchSortingButton
            sortingOption={optionLabel.reviews}
            selectedSortingOption={sortingOption}
            handlePress={handleSorting}
          />
          <SearchSortingButton
            sortingOption={optionLabel.ratings}
            selectedSortingOption={sortingOption}
            handlePress={handleSorting}
          />
          <SearchSortingButton
            sortingOption={optionLabel.recent}
            selectedSortingOption={sortingOption}
            handlePress={handleSorting}
          />
        </Row>

        {/* //? sitter profile card list */}
        <View
          style={{
            backgroundColor: palette.white,
            height: "auto",
            // marginTop: 47 + 2,
            // marginBottom: 34,
          }}
        >
          <Animated.FlatList
            style={{
              backgroundColor: palette.white,
              height: "auto",
              // height: "100%",
              // marginBottom: BOTTOM_HEIGHT + BOTTOM_TAB_BAR_HEIGHT,
            }}
            contentContainerStyle={{
              paddingBottom: BOTTOM_HEIGHT + 2.5 * 110,
              // paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
            }}
            showsVerticalScrollIndicator={false}
            // ? 스크롤 이벤트가 발생할 때마다 현재 스크롤 위치(=contentOffset)의 y값을 offset으로 설정(?)
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: offset } } }], {
              useNativeDriver: true,
            })}
            data={petsitters}
            renderItem={({ item: petsitter, index }) => {
              const key = 방문검색 ? "visiting" : "creche"
              return (
                <SitterProfileCard
                  isFavorite={petsitter.isFavorite}
                  sitterData={{
                    crecheId: 위탁검색 ? petsitter[key].id : null,
                    visitingId: 방문검색 ? petsitter[key].id : null,
                    reviewCount: petsitter.reviewCount,
                    userNickname: petsitter.userNickname,
                    title: petsitter[key].title,
                    desc: petsitter[key].desc,
                    star: ratingRound(petsitter[key].star),
                    profileImage: petsitter[key].__careGiver__.__user__?.profileImage,
                    defaultFee: petsitter[key].defaultFee,
                  }}
                  onPress={() => {
                    //? 상세정보 스크린으로 이동
                    //TODO: params 값 추가해줘야 함
                    navigate("caregiver-detail-information-screen", {
                      serviceTypeKorean: serviceType,
                      service: petsitter,
                      selectedPetIds: petIds,
                      selectedTime: {
                        start: (방문검색 && startTime) || (위탁검색 && startDate),
                        end: (방문검색 && endTime) || (위탁검색 && endDate),
                      },
                      address,
                    })
                  }}
                  onLikePress={() => {
                    const body: UpdateFavoriteBody = {}
                    switch (serviceType) {
                      case "위탁":
                        body.crecheId = petsitter.creche.id
                        break
                      case "방문":
                        body.visitingId = petsitter.visiting.id
                        break
                    }
                    // 즐겨찾기 추가
                    if (!petsitter.isFavorite) {
                      createFavorite(body)
                    }
                    // 즐겨찾기 삭제
                    else {
                      deleteFavorite(body)
                    }
                  }}
                  style={
                    index < petsitters.length - 1
                      ? { marginTop: 20, paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }
                      : {
                          marginVertical: 20,
                          paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
                        }
                  }
                  likeStyle={{ right: BASIC_BACKGROUND_PADDING_WIDTH }}
                />
              )
            }}
            ListEmptyComponent={
              <View
                style={{
                  alignSelf: "center",
                  alignItems: "center",
                  paddingTop: 40,
                }}
              >
                <Image source={images.dog_question} style={{ width: 179, height: 192 }} />
                <PreMed18 text="검색된 펫시터가 없어요 😢" />
              </View>
            }
            ListFooterComponent={() => <Footer mt={FOOTER_CONTENT_GAP} />}
          />
        </View>
      </Animated.View>

      {/* 검색 필터 바텀시트모달 */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        footerComponent={renderFooter}
      >
        <BottomSheetScrollView contentContainerStyle={styles.bottomSheetContainer}>
          <Row style={{ height: 30 }}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                bottomSheetModalRef.current?.close()
              }}
            >
              <Image source={images.x_grey} style={{ width: 16, height: 16 }} />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: "center" }}>
              <PreBol18 text="필터" color={HEAD_LINE} />
            </View>
            <TouchableOpacity
              style={{ flex: 1, alignItems: "flex-end" }}
              onPress={() => {
                setDraftSearchRequest(defaultSearchRequest)
              }}
            >
              <PreMed16 text="초기화" color={DISABLED} />
            </TouchableOpacity>
          </Row>

          <DivisionLine color={LBG} mt={4} />

          <PreBol16 text="거리 반경" color={SUB_HEAD_LINE} mt={20} />
          <View
            style={{
              width: DEVICE_SCREEN_WIDTH,
              alignSelf: "center",
              paddingVertical: 10,
              paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
            }}
          >
            <Slider
              style={{ paddingVertical: 10 }}
              minimumTrackTintColor={GIVER_CASUAL_NAVY}
              maximumTrackTintColor={DISABLED}
              thumbImage={Platform.select({ ios: null, android: images.slider_thumb })}
              thumbTintColor={Platform.select({ ios: "white", android: null })}
              tapToSeek={true}
              step={1}
              minimumValue={0}
              maximumValue={3}
              onValueChange={(value) => {
                switch (value) {
                  case 0:
                    setDraftSearchRequest({ ...draftSearchRequest, radius: 1 })
                    break
                  case 1:
                    setDraftSearchRequest({ ...draftSearchRequest, radius: 10 })
                    break
                  case 2:
                    setDraftSearchRequest({ ...draftSearchRequest, radius: 20 })
                    break
                  case 3:
                    setDraftSearchRequest({ ...draftSearchRequest, radius: 30 })
                    break
                }
              }}
              value={radiusToSliderValue()}
            />
            <Row
              style={{
                marginTop: 4,
                paddingHorizontal: 4,
                justifyContent: "space-between",
                backgroundColor: "transparent",
              }}
            >
              <PopReg14 text="1km" color={HEAD_LINE} />
              <PopReg14 text="10km" color={HEAD_LINE} />
              <PopReg14 text="20km" color={HEAD_LINE} />
              <PopReg14 text="30km" color={HEAD_LINE} />
            </Row>
          </View>

          <Row mt={40 - 2}>
            <PreBol16 text="케어기버 인증 펫시터만 보기" color={SUB_HEAD_LINE} />
            <BlueCheckbox
              style={{ paddingVertical: 8 + 2, paddingHorizontal: 8 }}
              imageSize={16}
              value={draftSearchRequest.certifiedOnly}
              onPress={() => {
                setDraftSearchRequest({
                  ...draftSearchRequest,
                  certifiedOnly: !draftSearchRequest.certifiedOnly,
                })
              }}
            />
          </Row>

          <PreBol16 text="펫시터 성별" color={SUB_HEAD_LINE} mt={36 - 2} mb={8} />
          <Row style={{ justifyContent: "space-between" }}>
            <PressableButton
              onPress={() => {
                setDraftSearchRequest({ ...draftSearchRequest, gender: Sex.FEMALE })
              }}
              isPressed={draftSearchRequest.gender === Sex.FEMALE}
              defaultViewStyle={$defaultPressableButton}
              pressedViewStyle={styles.pressedPressableButton}
            >
              <PreMed14 text="여자" color={HEAD_LINE} />
            </PressableButton>
            <PressableButton
              onPress={() => {
                setDraftSearchRequest({ ...draftSearchRequest, gender: Sex.MALE })
              }}
              isPressed={draftSearchRequest.gender === Sex.MALE}
              defaultViewStyle={$defaultPressableButton}
              pressedViewStyle={styles.pressedPressableButton}
            >
              <PreMed14 text="남자" color={HEAD_LINE} />
            </PressableButton>
          </Row>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </Screen>
  )
})

const $defaultPressableButton: ViewStyle = {
  borderWidth: 1,
  borderRadius: 4,
  borderColor: LIGHT_LINE,
  height: 36,
  width: "48%",
  justifyContent: "center",
  alignItems: "center",
}

const $defaultSubmitButton: ViewStyle = {
  marginTop: 20,
  paddingVertical: 18,
  width: "100%",
  borderRadius: 8,
  justifyContent: "center",
  alignItems: "center",
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
  },

  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: BASIC_BACKGROUND_PADDING_WIDTH,
    right: BASIC_BACKGROUND_PADDING_WIDTH,
  },

  submitBtn: {
    ...$defaultSubmitButton,
    backgroundColor: GIVER_CASUAL_NAVY,
  },

  disabledSubmitBtn: {
    ...$defaultSubmitButton,
    backgroundColor: DISABLED,
  },

  pressedPressableButton: {
    ...$defaultPressableButton,
    borderWidth: 2,
    borderColor: GIVER_CASUAL_NAVY,
  },
})
