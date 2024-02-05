import React, { FC, useState, useRef, useCallback, useMemo } from "react"
import { Image, View, LayoutAnimation, Platform, UIManager, ScrollView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Screen,
  Row,
  PreReg14,
  SelectedPetCard,
  ServiceTypeIndicatorHeader,
  PreBol14,
  ConditionalButton,
  RowRoundedButton,
  SelectPetDropdownBox,
  TimePicker,
  ClientCalendar,
  BOTTOM_TAB_BAR_HEIGHT,
  timeText,
  BASIC_BACKGROUND_PADDING_WIDTH,
  Footer,
  FOOTER_CONTENT_GAP,
} from "#components"
import { navigate, NavigatorParamList } from "#navigators"
import {
  DISABLED,
  HEAD_LINE,
  SUB_HEAD_LINE,
  BOTTOM_HEIGHT,
  LIGHT_LINE,
  GIVER_CASUAL_NAVY,
  DEVICE_SCREEN_HEIGHT,
  HEIGHT,
} from "#theme"
import { images } from "#images"
import { styles } from "./styles"
import { DateData } from "react-native-calendars"
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetModal,
} from "@gorhom/bottom-sheet"
import { useReducedMotion } from "react-native-reanimated"
import { useShowBottomTab } from "../../../../utils/hooks"
import { subMinutes } from "date-fns"
import { useStores, ServiceTypeKorean } from "#models"
import Geolocation from "react-native-geolocation-service"
import { getDevicePermission } from "./getDevicePermission"
import { alertModal } from "../../../../utils/alert-modal"
import Postcode from "@actbase/react-daum-postcode"
import { OnCompleteParams } from "@actbase/react-daum-postcode/lib/types"
import {
  addressToCoordinates,
  coordinatesToAddress,
} from "../../../_CARE_GIVER/cg-registration-1/addressToCoordinates"
import { isInKorea } from "../../../../utils/is-in-korea"
import dayjs from "dayjs"
import { Pet } from "#api"

const POSTCODE_HEIGHT = 2200 //TODO: 만약, 우편검색 결과가 짤리는 디바이스가 발견된다면, 크기를 더 늘려야 한다.

const nowInUTCZero = new Date()
const now = subMinutes(nowInUTCZero, nowInUTCZero.getTimezoneOffset())

// const minutesPassed = now.getMinutes()

// // Calculate how many minutes remain to reach the nearest multiple of 5
// const remainder = minutesPassed % 5
// // 지금 시간으로 부터 가장 가까운 5분단위 과거 시간
// nearestPastTime.setMinutes(minutesPassed - remainder)

// Subtract the remainder from the current minutes to get the nearest past time in 5-minute intervals
// const nearestPastTime = new Date(now)

// 지금 시간으로 부터 가장 가까운 정시
const nearestPastTime = dayjs(new Date(now)).minute(0).second(0).millisecond(0).toDate()

// "지금 시간으로 부터 가장 가까운 정시" 에서 딱 1시간 뒤
const oneHourAfterNearestPastTime = new Date(nearestPastTime.getTime() + 60 * 60 * 1000)

export interface AddressLocation {
  lat: number
  lng: number
}

export const SearchScreen: FC<StackScreenProps<NavigatorParamList, "search-screen">> = observer(
  ({ navigation, route }) => {
    useShowBottomTab(navigation)

    const {
      userStore: { cacheSearchRequest, cachedSearchRequest },
    } = useStores()

    //* 서비스 형태
    const [serviceType, setServiceType] = useState<ServiceTypeKorean>("방문") //? 방문 or 위탁
    // const [service, setService] = useState<"펫시팅" |"훈련">(null) //? 펫시팅 or 훈련
    const service = "펫시팅"

    //* 날짜선택 - 달력 - Calendar
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const [date, setDate] = useState<DateData>(null) //? 선택된 날짜
    const [dateRange, setDateRange] = useState<DateData[]>([]) //? 선택된 날짜 범위
    const calendarButtonText = () => {
      // 방문
      if (serviceType === "방문") {
        return date ? `${date?.dateString?.replace(/-/g, ".")}` : "날짜를 선택해주세요"
      }

      // 위탁
      switch (dateRange.length) {
        case 0:
          return "날짜 범위를 선택해주세요"
        case 1:
          return `${dateRange[0]?.dateString?.replace(/-/g, ".")} ~ `
        case 2:
          return `${dateRange[0]?.dateString?.replace(
            /-/g,
            ".",
          )} ~ ${dateRange[1]?.dateString?.replace(/-/g, ".")}`
      }
    }
    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true)
      }
    }

    //* 시간선택 - TimePicker
    const [startTime, setStartTime] = useState<Date>(nearestPastTime) // `지금 시간으로 부터 가장 가까운 정시` 로 초기값 세팅
    const [endTime, setEndTime] = useState<Date>(oneHourAfterNearestPastTime) // `"지금 시간으로 부터 가장 가까운 정시" 에서 딱 1시간 뒤`로 초기값 세팅
    const [selectedTimeText, setSelectedTimeText] = useState("방문시간을 선택해주세요")

    const scrollViewRef = useRef<ScrollView>(null)

    // 시간선택 바텀시트모달 - ref
    const bottomSheetModalRefTimePicker = useRef<BottomSheetModal>(null)

    /** 시간선택 바텀시트모달 backdrop */
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

    /** 시간선택 바텀시트모달 Footer - 확인 버튼 클릭시 작동 */
    const closeBottomSheet = useCallback(() => {
      const beginDateText = timeText(startTime)
      const endDateText = timeText(endTime)
      setSelectedTimeText(`${beginDateText} - ${endDateText}`)
      bottomSheetModalRefTimePicker.current?.close()
    }, [startTime, endTime])

    /** 시간선택 바텀시트모달 Footer - 확인 버튼 렌더링 */
    const renderFooter = useCallback(
      (props) => (
        <BottomSheetFooter {...props} bottomInset={BOTTOM_HEIGHT} style={styles.btnContainer}>
          <ConditionalButton label={"확인"} isActivated onPress={closeBottomSheet} />
        </BottomSheetFooter>
      ),
      [closeBottomSheet],
    )

    //* 위치선택
    const [address, setAddress] = useState(cachedSearchRequest?.address || "주소를 입력해주세요") // 주소
    const [location, setLocation] = useState<AddressLocation>(cachedSearchRequest?.location) // 좌표

    const reducedMotion = useReducedMotion()

    // 주소입력 바텀시트모달 - ref
    const bottomSheetModalRefAddress = useRef<BottomSheetModal>(null)
    const bottomSheetModalRefAddressSnapPoints = useMemo(() => ["60%", "100%"], [])
    const onPressLocation = async () => {
      bottomSheetModalRefAddress.current?.present()

      // // 위치 권한 요청
      // getDevicePermission(
      //   "location",
      //   // 성공시, 현 위치를 좌표로 설정
      //   () => {
      //     Geolocation.getCurrentPosition(
      //       (position) => {
      //         const { latitude, longitude } = position.coords
      //         if (isInKorea({ lat: latitude, lng: longitude })) {
      //           setLocation({ lat: latitude, lng: longitude })
      //           coordinatesToAddress({ ...location }).then(setAddress)
      //         } else {
      //           bottomSheetModalRefAddress.current?.present()
      //         }
      //       },
      //       (error) => {
      //         console.log("error", error)
      //         alertModal("위치 정보 수집 실패", error.message)
      //       },
      //       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      //     )
      //   },
      //   // 실패시, 주소 바텀시트모달 표출
      //   () => {
      //     bottomSheetModalRefAddress.current?.present()
      //   },
      // )
    }

    const onAddressSelected = (data: OnCompleteParams) => {
      setAddress(data.address)
      addressToCoordinates(data.address).then(({ latitude, longitude }) => {
        setLocation({ lat: latitude, lng: longitude })
      })
      bottomSheetModalRefAddress.current?.close()
    }

    //* 반려동물선택 - 선택된 반려동물
    const [selectedPets, setSelectedPets] = useState<Pet[]>([])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const hasSelectedPetsAndDropdownClosed = selectedPets.length > 0 && !isDropdownOpen

    //? 펫시터 찾기 버튼 활성화 여부 결정
    const isActivated = useMemo(() => {
      if (serviceType === "방문" && selectedTimeText === "방문시간을 선택해주세요") return false

      if (serviceType === "방문" && !date) return false

      if (serviceType === "위탁" && dateRange.length !== 2) return false

      if (address === "주소를 입력해주세요") return false

      if (selectedPets.length === 0) return false

      return true
    }, [serviceType, selectedTimeText, date, dateRange, address, selectedPets])

    return (
      <Screen testID="SearchScreen" preset="fixed" style={{ paddingHorizontal: 0 }}>
        <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}>
            {/* 펫시팅 헤더 이미지 - "나에게 딱맞는 펫시터 찾아보기" */}
            <Image source={images.search_screen_header_image} style={styles.headerImage} />
            {/* //* 방문 | 위탁 */}
            <Row style={{ marginTop: 44, justifyContent: "space-between", width: "100%" }}>
              <ServiceTypeIndicatorHeader
                onPress={() => {
                  setServiceType("방문")
                }}
                label={"방문 펫시팅 서비스"}
                state={serviceType}
                isActivated={serviceType === "방문"}
              />
              {/* <ServiceTypeIndicatorHeader
                onPress={() => {
                  setServiceType("위탁")
                }}
                style={{ marginLeft: 10 }}
                label={"위탁"}
                state={serviceType}
                isActivated={serviceType === "위탁"}
              /> */}
            </Row>
            <Row style={{ marginTop: 16 }}>
              <Image source={images.right_arrow_grey} style={styles.image} />
              <PreReg14
                text={
                  serviceType === "방문"
                    ? "펫시터가 직접 당신의 집을 방문합니다. \n날짜와 시간을 선택해주세요."
                    : "펫시터가 있는 곳으로 아이를 맡기러 갑니다. \n날짜 범위를 선택해주세요."
                }
                color={DISABLED}
                style={styles.text}
              />
            </Row>

            {/* //* 날짜 선택 */}
            {/* //? 날짜 선택 버튼 */}
            <RowRoundedButton
              onPress={() => {
                setIsDropdownOpen(false)
                setIsCalendarOpen(!isCalendarOpen)
                LayoutAnimation.configureNext(LayoutAnimation.create(170, "easeOut", "opacity"))
                // TODO: 아이폰 디바이스에서 제대로 된 QA 필요함
                scrollViewRef.current?.scrollTo({
                  x: 0,
                  y: 200,
                  animated: true,
                })
              }}
              image={images.calendar}
              // text={date ? `${date?.dateString?.replace(/-/g, ".")}` : "날짜를 선택해주세요"} // 주의! replaceAll() 은 RN 에서 사용불가 (안드로이드에서 작동 불능 😂) - https://stackoverflow.com/q/69297024/16673541
              text={calendarButtonText()}
              textColor={HEAD_LINE}
              style={{ marginTop: 36 }}
              borderColor={isCalendarOpen ? GIVER_CASUAL_NAVY : LIGHT_LINE}
            />
            {/* 캘린더 */}
            {isCalendarOpen &&
              (serviceType === "방문" ? (
                // 방문 캘린더: 한 개의 날짜만 선택
                <ClientCalendar
                  style={{ alignSelf: "center", marginTop: 12 }}
                  onDayPress={(date) => {
                    setDate(date)
                    setIsCalendarOpen(false)
                    LayoutAnimation.configureNext(LayoutAnimation.create(170, "easeIn", "opacity"))
                  }}
                  selectedDate={date ? date.dateString : now.toISOString().substring(0, 10)}
                  dateRange={[]} //? 방문인 경우, dateRange 는 사용하지 않음
                />
              ) : (
                // 위탁 캘린더: 날짜 범위(시작일, 종료일)를 선택
                <ClientCalendar
                  style={{ alignSelf: "center", marginTop: 12 }}
                  onDayPress={(date) => {
                    switch (dateRange.length) {
                      case 0:
                        // 첫번째 날짜 (시작일) 설정
                        setDateRange([date])
                        break
                      case 1:
                        // 두번째 날짜 (종료일) 추가후, 시간순으로 날짜 정렬
                        setDateRange((pre) =>
                          [...pre, date].sort((a, b) => a.timestamp - b.timestamp),
                        )
                        break
                      case 2:
                        // 날짜 초기화후, 선택한 날짜를 새로운 첫번째 날짜(시작일)로 설정
                        setDateRange([date])
                        break
                    }
                  }}
                  selectedDate={""} //? 위탁 경우, selectedDate 는 사용하지 않음
                  dateRange={dateRange}
                />
              ))}

            {/* //* 시간 선택 */}
            {serviceType === "방문" && (
              <RowRoundedButton
                onPress={() => {
                  // handleBottomSheet(true)
                  bottomSheetModalRefTimePicker.current?.present()
                  setIsCalendarOpen(false)
                }}
                image={images.timer}
                text={selectedTimeText}
                style={{ marginTop: 12 }}
              />
            )}

            {/*//* 위치 선택 */}
            <RowRoundedButton
              onPress={onPressLocation}
              image={images.location}
              text={address}
              textColor={HEAD_LINE}
              style={{ marginTop: 12 }}
            />

            {/*//* 반려동물 선택 */}
            <SelectPetDropdownBox
              style={{ marginTop: 12 }}
              isOpen={isDropdownOpen}
              onPress={() => {
                setIsCalendarOpen(false)
                setIsDropdownOpen(!isDropdownOpen)

                // TODO FIXME: 안드로이드에서 애니메이션이 너무 과장 됨
                // scrollViewRef.current?.scrollToEnd({
                //   animated: true,
                // })
                // LayoutAnimation.create(300, "easeInEaseOut", "opacity")
                //? 드롭박스 열고 닫을 때 애니메이션 효과: https://docs.expo.dev/versions/latest/react-native/layoutanimation/ https://reactnative.dev/docs/layoutanimation  https://qcoding.tistory.com/17
                LayoutAnimation.configureNext(
                  LayoutAnimation.create(170, "easeInEaseOut", "opacity"),
                )
              }}
              selectedPets={selectedPets}
              setSelectedPets={setSelectedPets}
            />

            {/*//* 선택된 반려동물 */}
            {hasSelectedPetsAndDropdownClosed && (
              <View>
                <PreBol14
                  text="선택된 반려동물"
                  color={SUB_HEAD_LINE}
                  style={{ marginTop: 18, marginLeft: 16 }}
                />
                <View style={isDropdownOpen ? styles.hidden : styles.shown}>
                  {/*//* 선택된 반려동물 리스트 */}
                  {selectedPets.map((item, index, array) => (
                    <SelectedPetCard
                      key={index}
                      petData={item}
                      onDeletePress={() => {
                        setSelectedPets((pets) => pets.filter((pet) => pet.id !== item.id))
                      }}
                      style={{
                        width: "92%",
                        marginTop: index === 0 ? 4 : null,
                        marginBottom: index === array.length - 1 ? 4 : null,
                      }}
                    />
                  ))}
                </View>
              </View>
            )}
          </View>

          <Footer mt={FOOTER_CONTENT_GAP + BOTTOM_TAB_BAR_HEIGHT + 16} />
        </ScrollView>

        {/*//* 펫시터 찾기 */}
        <View
          style={{
            width: "100%",
            paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
            alignSelf: "center",
            position: "absolute",
            bottom: BOTTOM_TAB_BAR_HEIGHT + 16,
          }}
        >
          <ConditionalButton
            label={service === "펫시팅" ? " 펫시터 찾기" : "훈련사 찾기"}
            isActivated={isActivated}
            onPress={() => {
              //? 펫시터 검색결과 스크린으로 이동
              navigate("search-result-screen", {
                service,
                serviceType,
                petIds: selectedPets.map((item) => item.id),
                // "방문"인 경우 사용될 값
                startTime:
                  serviceType === "방문"
                    ? startTime
                        .toISOString()
                        .substring(0, 19)
                        .replace(startTime.toISOString().substring(0, 10), date.dateString) // 날짜만 선택한 "날짜"로 변경 (시/분/초 는 유지)
                    : null,
                endTime:
                  serviceType === "방문"
                    ? endTime
                        .toISOString()
                        .substring(0, 19)
                        .replace(endTime.toISOString().substring(0, 10), date.dateString) // 날짜만 선택한 "날짜"로 변경 (시/분/초 는 유지)
                    : null,

                // "위탁"인 경우 사용될 값
                startDate: serviceType === "위탁" ? `${dateRange[0].dateString}T00:00:00` : null,
                endDate: serviceType === "위탁" ? `${dateRange[1].dateString}T00:00:00` : null,

                // 위치 값
                ...location,

                // ---- API REQUEST BODY 와는 상관 없는 데이터 ----
                address, // 검색결과 헤더에 보여줄 주소
              })

              // 검색 정보 저장
              cacheSearchRequest({
                address: address,
                location: location,
              })
            }}
          />
        </View>

        {/* 위치 선택 바텀시트모달 - !항상 컴포넌트 최하단에 있을것! */}
        <BottomSheetModal
          ref={bottomSheetModalRefAddress}
          backdropComponent={renderBackdrop}
          index={0}
          snapPoints={bottomSheetModalRefAddressSnapPoints}
          enablePanDownToClose
          style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}
          containerStyle={{
            flex: 1,
            width: "100%",
            height: DEVICE_SCREEN_HEIGHT,
          }}
          animateOnMount={!reducedMotion}
        >
          <BottomSheetFlatList
            style={{ width: "100%", height: DEVICE_SCREEN_HEIGHT }}
            contentContainerStyle={{ paddingTop: 20 }}
            showsVerticalScrollIndicator={false}
            data={[0]}
            renderItem={() => (
              <Postcode
                style={{
                  flex: 1,
                  width: "100%",
                  height: POSTCODE_HEIGHT,
                }}
                jsOptions={{
                  animation: true,
                  useBannerLink: false,
                }}
                onSelected={onAddressSelected}
                onError={(error) => {
                  console.log("우편주소 서비스 에러 - error", error)
                  alertModal(
                    "우편주소 서비스 에러",
                    "예상치 못한 문제가 발생했습니다. 잠시후 다시 시도해주세요.",
                  )
                }}
              />
            )}
          />
        </BottomSheetModal>

        {/* 시간 선택 바텀시트모달 - !항상 컴포넌트 최하단에 있을것! */}
        <BottomSheetModal
          ref={bottomSheetModalRefTimePicker}
          backdropComponent={renderBackdrop}
          index={0}
          snapPoints={["60%"]}
          enablePanDownToClose
          footerComponent={renderFooter}
          animateOnMount={!reducedMotion}
        >
          <TimePicker
            style={{ marginTop: 20 }}
            beginDate={startTime}
            setBeginDate={setStartTime}
            endDate={endTime}
            setEndDate={setEndTime}
          />
        </BottomSheetModal>
      </Screen>
    )
  },
)
