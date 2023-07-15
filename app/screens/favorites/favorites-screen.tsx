import React, {
  FC,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useLayoutEffect,
} from "react"
import { View, Image, Pressable, LayoutAnimation, FlatList, Platform, Alert } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "../../navigators"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  PreBol14,
  PreBol16,
  PreBol18,
  PreMed16,
  PreMed18,
  PreReg12,
  Row,
  RowRoundedButton,
  Screen,
  SelectPetDropdownBox,
  SelectedPetCard,
  ServiceTypeIndicatorHeader,
  SitterProfileCard,
} from "../../components"
import { styles } from "./styles"
import { images } from "../../../assets/images"
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetFooter,
} from "@gorhom/bottom-sheet"
import {
  DEVICE_SCREEN_HEIGHT,
  DISABLED,
  GIVER_CASUAL_NAVY,
  HEAD_LINE,
  IOS_NOTCH_STATUS_BAR_HEIGHT,
  MIDDLE_LINE,
  SUB_HEAD_LINE,
  color,
  palette,
} from "../../theme"
import { Calendar, DateData } from "react-native-calendars"
import { Pet, useStores } from "../../models"
import { petsitters as _petsitters } from "./dummy-data"
import { useShowBottomTab } from "../../utils/hooks"

const DEFAULT_FILTER_TEXT = "전체"
const DEFAULT_FILTER_INFO_TEXT = "원하는 조건으로 보기"

type FilterInfoText = "" | typeof DEFAULT_FILTER_INFO_TEXT

type Service = "visiting" | "creche"

interface FilterCondition {
  serviceType?: Service | null
  startDate?: string
  endDate?: string
  pets?: Pet[]
}

interface OnLikePressProp {
  serviceType: Service
  id: number
}

export const FavoritesScreen: FC<
  StackScreenProps<NavigatorParamList, "favorites-screen">
> = observer(function FavoritesScreen({ navigation }) {
  useShowBottomTab(navigation)
  // * favorite model
  const {
    FavoriteModel: {
      setFavorites,
      cancelFavorite,
      favoritePetsitters,
      favoriteTrainers,
      isEmptyFavoritePetsitters,
      isEmptyFavoriteTrainers,
    },
  } = useStores()

  // * 현재 선택된 서비스 유형 - 펫시터 | 훈련사
  const [serviceType, setServiceType] = useState<"펫시터" | "훈련사">("펫시터")

  // * filter states
  const [filterServiceType, setFilterServiceType] = useState<Service | null>(null)
  const [startDate, setStartDate] = useState<DateData | null>(null)
  const [endDate, setEndDate] = useState<DateData | null>(null)
  const [filterPet, setFilterPet] = useState<Pet[]>([])

  // * filter result
  const [filters, setFilters] = useState<FilterCondition>({})
  const [filterText, setFilterText] = useState<string>(DEFAULT_FILTER_TEXT)
  const [filterInfoText, setFilterInfoText] = useState<FilterInfoText>(DEFAULT_FILTER_INFO_TEXT)

  // * UI 관련 states
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)
  const [isPetDropdownOpen, setIsPetDropdownOpen] = useState<boolean>(false)
  const hasSelectedPetsAndDropdownClosed = filterPet.length > 0 && !isPetDropdownOpen

  // * BottomSheet Modal
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(
    () => [
      "73%",
      Platform.select({
        ios: DEVICE_SCREEN_HEIGHT - IOS_NOTCH_STATUS_BAR_HEIGHT,
        android: DEVICE_SCREEN_HEIGHT,
      }),
    ],
    [],
  )

  // * bottomSheet backdrop
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

  // * filter에서 "초기화" 버튼 클릭시 실행되는 함수
  const handleResetPress = useCallback(() => {
    setFilterServiceType(null)
    setStartDate(null)
    setEndDate(null)
    setFilterPet([])
    // ? 초기화 버튼 클릭시 필터 초기화 즉시 적용
    setFilterText(DEFAULT_FILTER_TEXT)
    setFilterInfoText(DEFAULT_FILTER_INFO_TEXT)
    setFavorites({})
  }, [])

  const [markedDates, setMarkedDates] = useState({})

  // * Callendar - 날짜 선택시 실행되는 함수
  // NOTE: 스타일링 코드는 대부분 필요없어질 것  - 호중님 작업분으로 대체
  // NOTE: 로직 코드는 (시간데이터 조작) 유지될 것으로 보임
  const handleDayPress = useCallback(
    (date: DateData) => {
      // * startDate와 endDate가 모두 설정된 상태에서 date를 입력한 경우 -> 날짜 초기화(startDate부터 다시)
      if ((startDate && endDate) || (!startDate && !endDate)) {
        const currentDate = new Date(`${date.year}-${date.month}-${date.day}T00:00:00`)
        console.log(`[CALENDAR] current date: ${currentDate}`)

        setStartDate(date)
        setEndDate(null)

        const newMarkedDates = {}
        newMarkedDates[date.dateString] = {
          startingDay: true,
          color: "gray",
          textColor: "white",
        }
        setMarkedDates(newMarkedDates)
        return
      }

      // ? startDate가 아직 입력 전이거나, startDate가 존재하지만 현재 입력한 날짜가 startDate보다 앞서는 경우
      else if (!startDate || date.timestamp <= startDate.timestamp) {
        setStartDate(date)

        const newMarkedDates = {}
        newMarkedDates[date.dateString] = {
          startingDay: true,
          color: "gray",
          textColor: "white",
        }
        setMarkedDates(newMarkedDates)
        return
      }

      // * 입력된 date가 endDate로 설정되는 경우
      // ? startDate 정보가 존재하면서 입력받은 date가 startDate보다 나중인 경우
      else if (startDate && date.timestamp > startDate.timestamp) {
        // ? endDate state값 갱신
        setEndDate(date)
        // ? endDate를 Date type으로 변환
        const lastDate = new Date(
          `${date.year}-${date.month < 10 ? "0" + date.month : date.month}-${
            date.day < 10 ? "0" + date.day : date.day
          }T12:00:00`,
        )

        // ? 기존 startDate 정보 복사
        const newMarkedDates = { ...markedDates }

        // ? newMarkedDates에 추가할 date
        const currentDate = new Date(
          `${startDate.year}-${startDate.month < 10 ? "0" + startDate.month : startDate.month}-${
            startDate.day < 10 ? "0" + startDate.day : startDate.day
          }T12:00:00`,
        )
        currentDate.setDate(currentDate.getDate() + 1)

        // ? endDate까지 추가한다
        while (currentDate.getTime() <= lastDate.getTime()) {
          newMarkedDates[currentDate.toISOString().split("T")[0]] = {
            // ? last_date인 경우에만 true로 설정
            endingDay: currentDate.getTime() === lastDate.getTime(),
            color: "gray",
            textColor: "white",
          }
          currentDate.setDate(currentDate.getDate() + 1)
        }

        setMarkedDates(newMarkedDates) // Calendar 컴포넌트에 입력될 markedDate 설정
        setIsCalendarOpen(false) // Calendar 종료

        LayoutAnimation.configureNext(LayoutAnimation.create(170, "easeIn", "opacity"))
        // eslint-disable-next-line no-useless-return
        return
      }
    },
    [startDate, endDate],
  )

  // * filters state 값 설정
  useEffect(() => {
    setFilters({
      serviceType: filterServiceType,
      startDate: startDate?.dateString,
      endDate: endDate?.dateString,
      pets: filterPet,
    })
  }, [filterServiceType, startDate, endDate, filterPet])

  // * load petsitters
  useLayoutEffect(() => {
    setFavorites({})
    console.log("[FAVORITES SCREEN] favoritePetsitters:", favoritePetsitters)
  }, [])

  // * 확인 버튼 누를 시 실행되는 함수
  const handleCheckButton = useCallback(() => {
    // * filters 결과 서버에 요청
    // ? post body 만들기
    let postBody = {}
    if (filters.startDate) {
      postBody = { ...postBody, startTime: filters.startDate }
    }

    if (filters.endDate) {
      postBody = { ...postBody, endTime: filters.endDate }
    }

    if (filters.pets && filters.pets.length > 0) {
      postBody = { ...postBody, petIds: filters.pets.map((value) => value.id) }
    }

    if (filters.serviceType) {
      postBody = { ...postBody, petSitterType: filters.serviceType }
    }

    // console.log("in handleCheckButton postBody >>>", postBody)
    // console.log("favoritePetsitters:", favoritePetsitters)

    // * 필터 조건이 존재하는 경우에만 텍스트 변경
    // ? - 필터 조건이 없는 상태는 초기상태 혹은 초기화 버튼을 누른 경우밖에 없으므로, 텍스트를 수정하거나 결과를 수정할 필요가 없음
    if (Object.keys(postBody).length > 0) {
      // ? 필터 적용 결과 텍스트 수정
      let text = ""
      if (filters.serviceType) {
        text = `${filterServiceType === "creche" ? "위탁" : "방문"}`
      }

      if (filters.startDate && filters.endDate) {
        text += ` | ${filters.startDate
          .replace("-", ".")
          .replace("-", ".")} - ${filters.endDate.replace("-", ".").replace("-", ".")}`
      }

      if (filters.pets && filters.pets.length > 0) {
        text += ` | ${filters.pets.length}마리`
      }

      setFilterText(text)
      setFilterInfoText("")
      // ? 필터 적용하여 favorite 목록 갱신
      setFavorites(postBody)
    }
    bottomSheetModalRef.current?.close()
  }, [filters])

  // * BottomSheet Footer - 확인 버튼
  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={24} style={styles.btnContainer}>
        <PreReg12
          text="즐겨찾기 한 펫시터 중 해당 조건에 가능한 사람만 보여집니다."
          color={DISABLED}
          style={{
            backgroundColor: palette.white,
          }}
        />
        <Pressable style={styles.submitBtn} onPress={handleCheckButton}>
          <PreBol16 text="확인" color={color.palette.white} />
        </Pressable>
      </BottomSheetFooter>
    ),
    [filters],
  )

  // * 펫시터 목록 혹은 훈련사 목록이 empty인지 확인
  const isEmptyResult =
    (serviceType === "펫시터" && isEmptyFavoritePetsitters) ||
    (serviceType === "훈련사" && isEmptyFavoriteTrainers)

  // * 펫시터 프로필의 찜 버튼을 누를 때 실행되는 함수 - 찜 해제
  const onLikePress = useCallback((info: OnLikePressProp) => {
    cancelFavorite(info)
  }, [])

  return (
    <Screen testID="Favorites">
      {/* //* 펫시터 | 훈련사 토글 */}
      <Row style={{ marginTop: 24, justifyContent: "space-between" }}>
        <ServiceTypeIndicatorHeader
          label={"펫시터"}
          onPress={() => setServiceType("펫시터")}
          state={serviceType}
        />
        <ServiceTypeIndicatorHeader
          label={"훈련사"}
          onPress={() => {
            Alert.alert("안내", "훈련사 서비스는 추후 업데이트 될 예정입니다 ☺️")
            // setServiceType("훈련사")
          }}
          state={serviceType}
        />
      </Row>

      {/* //* filter box */}
      <Pressable onPress={() => bottomSheetModalRef.current?.present()} style={styles.filterBox}>
        <PreReg12 text={filterText} color={GIVER_CASUAL_NAVY} />
        <View style={{ flexDirection: "row" }}>
          <PreReg12 text={filterInfoText} />
          <Image source={images.list_bars} style={styles.filterImg} />
        </View>
      </Pressable>

      {/* //* division line */}
      <View
        style={[styles.divisionLine, { marginHorizontal: -1 * BASIC_BACKGROUND_PADDING_WIDTH }]}
      />

      {isEmptyResult ? (
        //* 펫시터 목록이 없는 경우 - 디폴트 화면 띄우기
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Image source={images.dog_question} style={{ width: 179, height: 192 }} />
          <PreMed18 text="즐겨찾기 한 케어기버가 없어요 😢" color={SUB_HEAD_LINE} />
        </View>
      ) : (
        // TODO: serviceType이 훈련사이면서 훈련사 목록이 존재하는 경우 - 훈련사 목록 띄우기
        //* 펫시터 목록이 존재하는 경우 - 목록 띄우기
        <FlatList
          data={favoritePetsitters}
          renderItem={({ item, index }) => {
            const serviceType: Service = item.crecheId ? "creche" : "visiting"
            const id = item.crecheId ? item.crecheId : item.visitingId

            const info: OnLikePressProp = {
              serviceType,
              id,
            }

            return (
              <SitterProfileCard
                key={item.crecheId ? item.crecheId : item.visitingId}
                sitterData={item}
                onPress={() => {
                  //? 상세정보 스크린으로 이동
                  navigate("caregiver-detail-information-screen", { sitterData: item })
                }}
                isFavorite={true}
                style={
                  index < favoritePetsitters.length - 1 ? { marginTop: 20 } : { marginVertical: 20 }
                }
                onLikePress={() => onLikePress(info)}
              />
            )
          }}
        />
      )}

      {/* //* 바텀시트 bottomSheet */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        style={styles.bottomSheetContainer}
        footerComponent={renderFooter}
      >
        <BottomSheetScrollView>
          {/* //? filters container */}
          <View>
            <Row style={styles.bottomSheetTitleBox}>
              {/* // ? "X" close button */}
              <Pressable onPress={() => bottomSheetModalRef.current?.close()} style={{ flex: 1 }}>
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
              <Pressable style={{ flex: 1 }} onPress={handleResetPress}>
                <PreMed16 text="초기화" color={DISABLED} style={{ marginLeft: "auto" }} />
              </Pressable>
            </Row>

            {/* //* division line */}
            <View style={styles.divisionLine} />

            {/* //* 위탁 | 방문 버튼 */}
            <Row style={{ marginTop: 12, justifyContent: "space-between" }}>
              {/* // ? 방문 버튼 */}
              <Pressable
                style={[
                  styles.radioContainer,
                  {
                    borderColor: filterServiceType === "visiting" ? GIVER_CASUAL_NAVY : MIDDLE_LINE,
                  },
                ]}
                onPress={() => setFilterServiceType("visiting")}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={
                      filterServiceType === "visiting" ? images.radio_active : images.radio_inactive
                    }
                    style={styles.radioImg}
                  />
                  <PreMed16
                    style={{ marginLeft: 6 }}
                    text="방문"
                    color={filterServiceType === "visiting" ? GIVER_CASUAL_NAVY : DISABLED}
                  />
                </View>
              </Pressable>

              {/* // ? 위탁 버튼 */}
              <Pressable
                style={[
                  styles.radioContainer,
                  {
                    borderColor: filterServiceType === "creche" ? GIVER_CASUAL_NAVY : MIDDLE_LINE,
                  },
                ]}
                onPress={() => setFilterServiceType("creche")}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={
                      filterServiceType === "creche" ? images.radio_active : images.radio_inactive
                    }
                    style={styles.radioImg}
                  />
                  <PreMed16
                    style={{ marginLeft: 6 }}
                    text="위탁"
                    color={filterServiceType === "creche" ? GIVER_CASUAL_NAVY : DISABLED}
                  />
                </View>
              </Pressable>
            </Row>

            {/* //* 날짜 선택 */}
            {isCalendarOpen ? (
              <Calendar
                onDayPress={(date) => handleDayPress(date)}
                style={{
                  marginTop: 36,
                  backgroundColor: "#F0F0F6",
                  padding: 4,
                  borderRadius: 8,
                }}
                markedDates={markedDates}
                markingType="period"
              />
            ) : (
              <RowRoundedButton
                onPress={() => {
                  setIsCalendarOpen(true)
                  LayoutAnimation.configureNext(LayoutAnimation.create(170, "easeOut", "opacity"))
                }}
                image={images.calendar}
                text={
                  startDate && endDate
                    ? `${startDate.dateString
                        .replace("-", ".")
                        .replace("-", ".")} - ${endDate.dateString
                        .replace("-", ".")
                        .replace("-", ".")}`
                    : "날짜를 선택해주세요"
                }
                textColor={HEAD_LINE}
                style={{ marginTop: 12 }}
              />
            )}

            {/* //* select pet (반려동물 선택) */}
            <SelectPetDropdownBox
              style={{ marginTop: 12 }}
              placeholder="반려동물 선택"
              isOpen={isPetDropdownOpen}
              onPress={() => {
                setIsPetDropdownOpen((prev) => !prev)
                LayoutAnimation.configureNext(
                  LayoutAnimation.create(170, "easeInEaseOut", "opacity"),
                )
              }}
              selectedPets={filterPet}
              setSelectedPets={setFilterPet}
              inBottomSheet
            />
            {/*//* 선택된 반려동물 */}
            {hasSelectedPetsAndDropdownClosed && (
              <View>
                <PreBol14
                  text="선택된 반려동물"
                  color={SUB_HEAD_LINE}
                  style={{ marginTop: 12, marginLeft: 16 }}
                />
                <View
                  style={[isPetDropdownOpen ? styles.hidden : styles.shown, { height: 78 * 3 }]}
                >
                  {/*//* 선택된 반려동물 리스트 */}
                  <BottomSheetFlatList
                    data={filterPet}
                    renderItem={({ item, index }) => (
                      <SelectedPetCard
                        key={index}
                        petData={{
                          id: item.id,
                          name: item.name,
                          species: item.species,
                          age: item.age,
                          sex: item.sex,
                          size: item.petType,
                        }}
                        onPress={() => {
                          setFilterPet((pets) => pets.filter((pet) => pet.id !== item.id))
                        }}
                      />
                    )}
                  />
                </View>
              </View>
            )}
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </Screen>
  )
})
