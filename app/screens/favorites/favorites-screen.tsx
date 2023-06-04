import React, {
  FC,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useLayoutEffect,
} from "react"
import { View, Image, Pressable, LayoutAnimation, FlatList, Animated } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
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
  ScreenRootView,
  SelectPetDropdownBox,
  SelectedPetCard,
  ServiceTypeIndicatorHeader,
  SitterProfileCard,
} from "#components"
import { styles } from "./styles"
import { images } from "#images"
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet"
import {
  DISABLED,
  GIVER_CASUAL_NAVY,
  HEAD_LINE,
  MIDDLE_LINE,
  SUB_HEAD_LINE,
  color,
  palette,
} from "#theme"
import { Calendar, DateData } from "react-native-calendars"
import { Pet } from "app/models"
import { petsitters as _petsitters } from "./dummy-data"
import { useShowBottomTab } from "../../utils/hooks"

const DEFAULT_FILTER_TEXT = "전체"
const DEFAULT_FILTER_INFO_TEXT = "원하는 조건으로 보기"

type Service = "visiting" | "creche"

interface FilterCondition {
  serviceType: Service
  startDate?: string
  endDate?: string
  pets?: Array<Pet>
}

export const FavoritesScreen: FC<
  StackScreenProps<NavigatorParamList, "favorites-screen">
> = observer(function FavoritesScreen({ navigation }) {
  useShowBottomTab(navigation)

  const [serviceType, setServiceType] = useState<string>("펫시터")

  const [petsitters, setPetsitters] = useState<Array<any>>([])

  // * filter states
  const [filterServiceType, setFilterServiceType] = useState<Service>()
  const [startDate, setStartDate] = useState<DateData>()
  const [endDate, setEndDate] = useState<DateData>()
  const [filterPet, setFilterPet] = useState<Array<Pet>>([])

  // * filter result
  const [filters, setFilters] = useState<FilterCondition>()
  const [filterText, setFilterText] = useState<string>(DEFAULT_FILTER_TEXT)
  const [filterInfoText, setFilterInfoText] = useState<string>(DEFAULT_FILTER_INFO_TEXT)

  // * UI 관련 states
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)
  const [isPetDropdownOpen, setIsPetDropdownOpen] = useState<boolean>(false)
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false)
  const [bottomSheetIndex, setbottomSheetIndex] = useState<number>(-1)
  const hasSelectedPetsAndDropdownClosed = filterPet.length > 0 && !isPetDropdownOpen

  // * BottomSheet Modal
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ["72.9%", "100%"], [])

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

  // * load petsitters
  useLayoutEffect(() => {
    setPetsitters(_petsitters)
    // setPetsitters([])
  }, [])

  const [bottomSheetAnimatedValue] = useState(new Animated.Value(400))

  const handleSheetChange = useCallback(
    (index: number) => {
      if (index >= 0) {
        setIsBottomSheetOpen(true)
        setbottomSheetIndex(index)
        Animated.timing(bottomSheetAnimatedValue, {
          toValue: index === 0 ? 400 : 600,
          duration: 300,
          useNativeDriver: false,
        }).start()
      } else {
        setIsBottomSheetOpen(false)
        Animated.timing(bottomSheetAnimatedValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start()
      }
    },
    [bottomSheetAnimatedValue],
  )

  // * filter에서 "초기화" 버튼 클릭시 실행되는 함수
  const handleResetPress = useCallback(() => {
    setFilterServiceType(undefined)
    setStartDate(undefined)
    setEndDate(undefined)
    setFilterPet([])
    setFilterText(DEFAULT_FILTER_TEXT)
    setFilterInfoText(DEFAULT_FILTER_INFO_TEXT)
  }, [])

  const [markedDates, setMarkedDates] = useState({})

  // * Callendar - 날짜 선택시 실행되는 함수
  const handleDayPress = useCallback(
    (date: DateData) => {
      // * startDate와 endDate가 모두 설정된 상태에서 date를 입력한 경우 -> 날짜 초기화(startDate부터 다시)
      if ((startDate && endDate) || (startDate === undefined && endDate === undefined)) {
        setStartDate(date)
        setEndDate(undefined)

        const newMarkedDates = {}
        newMarkedDates[date.dateString] = {
          selected: true,
          marked: true,
          selectedColor: "gray",
        }
        setMarkedDates(newMarkedDates)
        return
      }

      // ? 입력한 날짜가 startDate보다 앞서는 경우
      else if (date.timestamp <= startDate.timestamp) {
        setStartDate(date)

        const newMarkedDates = {}
        newMarkedDates[date.dateString] = {
          selected: true,
          marked: true,
          selectedColor: "gray",
        }
        setMarkedDates(newMarkedDates)
        return
      }

      // * 입력된 date가 endDate로 설정되는 경우
      // ? startDate 정보가 존재하면서 입력받은 date가 startDate보다 나중인 경우
      if (startDate && date.timestamp > startDate.timestamp) {
        setEndDate(date)
        setIsCalendarOpen(false)

        const newMarkedDates = { ...markedDates }
        newMarkedDates[date.dateString] = {
          selected: true,
          marked: true,
          selectedColor: "gray",
        }
        setMarkedDates(newMarkedDates)

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

  // * 확인 버튼 누를 시 실행되는 함수
  const handleCheckButton = useCallback(() => {
    // ? 방문 | 위탁은 필수 입력
    if (filterServiceType === undefined) {
      alert("방문 / 위탁 선택은 필수입니다.")
      return
    }

    // TODO: filters 결과 서버에 요청
    console.log("press check btn", filters)

    // ? 필터 적용 결과 텍스트 수정
    let text = `${filterServiceType === "creche" ? "위탁" : "방문"}`

    if (filters.startDate && filters.endDate) {
      text += ` | ${filters.startDate
        .replace("-", ".")
        .replace("-", ".")} - ${filters.endDate.replace("-", ".").replace("-", ".")}`
    }

    if (filters.pets.length > 0) {
      text += ` | ${filters.pets.length}마리`
    }

    setFilterText(text)
    setFilterInfoText("")

    bottomSheetModalRef.current.close()
  }, [filterServiceType, filters])

  return (
    <ScreenRootView testID="Favorites" preset="scroll">
      {/* //* 펫시터 | 훈련사 토글 */}
      <Row style={{ marginTop: 24 }}>
        <ServiceTypeIndicatorHeader
          label={"펫시터"}
          onPress={() => setServiceType("펫시터")}
          state={serviceType}
        />
        <ServiceTypeIndicatorHeader
          label={"훈련사"}
          onPress={() => setServiceType("훈련사")}
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

      {petsitters.length > 0 ? (
        //* 펫시터 목록이 존재하는 경우
        <FlatList
          data={petsitters}
          renderItem={({ item, index }) => (
            <SitterProfileCard
              key={item.id}
              sitterData={item}
              onPress={() => {
                //? 상세정보 스크린으로 이동
                //TODO: params 값 추가해줘야 함
                navigate("caregiver-detail-information-screen", { sitterData: item })
              }}
              style={index < petsitters.length - 1 ? { marginTop: 20 } : { marginVertical: 20 }}
            />
          )}
        />
      ) : (
        //* 펫시터 목록이 없는 경우
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Image source={images.dog_question} style={{ width: 179, height: 192 }} />
          <PreMed18 text="즐겨찾기 한 케어기버가 없어요 😢" color={SUB_HEAD_LINE} />
        </View>
      )}

      {/* //* 바텀시트 bottomSheet */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        enablePanDownToClose={false}
        style={styles.bottomSheetContainer}
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
                  { borderColor: filterServiceType === "creche" ? GIVER_CASUAL_NAVY : MIDDLE_LINE },
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
              inBottomSheet={true}
            />
            {/*//* 선택된 반려동물 */}
            {hasSelectedPetsAndDropdownClosed && (
              <View>
                <PreBol14
                  text="선택된 반려동물"
                  color={SUB_HEAD_LINE}
                  style={{ marginTop: 12, marginLeft: 16 }}
                />
                <View style={isPetDropdownOpen ? styles.hidden : styles.shown}>
                  {/*//* 선택된 반려동물 리스트 */}
                  {filterPet.map((item, index) => (
                    <SelectedPetCard
                      key={index}
                      petData={item}
                      onPress={() => {
                        setFilterPet((pets) => pets.filter((pet) => pet.id !== item.id))
                      }}
                    />
                  ))}
                </View>
              </View>
            )}
          </View>
        </BottomSheetScrollView>
        {/* //* 안내문구 + 확인 버튼 */}
        <Animated.View
          style={[
            styles.btnContainer,
            {
              top: bottomSheetAnimatedValue,
            },
          ]}
        >
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
        </Animated.View>
      </BottomSheetModal>
    </ScreenRootView>
  )
})
