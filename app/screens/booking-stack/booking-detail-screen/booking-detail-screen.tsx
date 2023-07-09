import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Pressable,
  View,
  StyleSheet,
  Image,
  ViewStyle,
  ScrollView,
  Keyboard,
  TouchableOpacity,
} from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  BASIC_BACKGROUND_PADDING_WIDTH,
  CaregiverTypeButton,
  ConditionalButton,
  DivisionLine,
  DivisionLineVertical,
  PreBol14,
  PreBol16,
  PreBol18,
  PreMed16,
  PreReg12,
  PreReg14,
  ReasonType,
  Row,
  ScreenRootView,
  SelectReason,
  SelectedPetCard,
  bookingCancelReasons,
} from "#components"
import {
  SHADOW_1,
  DBG,
  GIVER_CASUAL_NAVY,
  HEAD_LINE,
  LIGHT_LINE,
  SUB_HEAD_LINE,
  DEVICE_SCREEN_WIDTH,
  DISABLED,
  MIDDLE_LINE,
  BOTTOM_HEIGHT,
} from "#theme"
import { korCgType, korSvcType, won } from "../../../utils/format"
import { images } from "#images"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetTextInput } from "@gorhom/bottom-sheet"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

const caregiverData = {
  serviceType: "visit",
  caregiverType: "petsitter",
  name: "유혜린",
  ratings: 4.7,
  numberOfReviews: 12,
}

const bookingData = {
  location: "경기도 안산시 상록구 한양대학로 55",
  time: "6월 14일 10:00 - 6월 14일 18:00",
  selectedPets: [
    {
      id: "1",
      name: "초코",
      size: "중형견",
      species: "푸들",
      age: 3,
      sex: "여",
    },
    {
      id: "2",
      name: "우유",
      size: "중형견",
      species: "비숑",
      age: 3,
      sex: "여",
    },
    {
      id: "3",
      name: "자두",
      size: "소형",
      species: "여섯글자가넘어가",
      age: 3,
      sex: "남",
    },
  ],
}

const paymentData = {
  price: 42000,
  discount: -8000,
  totalPrice: 34000,
}

const PROFILE_IMAGE_WIDTH = 84

export const BookingDetailScreen: FC<
  StackScreenProps<NavigatorParamList, "booking-detail-screen">
> = observer(function BookingDetailScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const { serviceType, caregiverType, name, ratings, numberOfReviews } = caregiverData
  const { location, time, selectedPets } = bookingData
  const { price, discount, totalPrice } = paymentData

  // "기타" 사유를 제외한 객관식 사유 - reason 선택시 selected 에 저장.
  const [selected, setSelected] = useState<ReasonType>(null)
  // reason 에서 "기타" 선택시, inputText 입력값 저장
  const [input, setInput] = useState("")
  // 최종적으로 선택한 reason finalReason에 저장.
  const [finalReason, setFinalReason] = useState("")

  // 키보드가 가려졌는지 여부 확인
  const [keyboardDidHide, setkeyboardDidHide] = useState(false)

  const onSubmit = () => {
    setFinalReason(input === "" ? selected : input)
    alert("예약 취소 API 아직 연결 안 함")
  }

  // * BottomSheet Modal
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  // vaiables
  const snapPoints = useMemo(() => ["60%"], [])
  // callbacks
  const handleBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

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

  // 키보드 가려짐 여부 갱신
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setkeyboardDidHide(false)
    })
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setkeyboardDidHide(true)
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  // 키보드가 가려지면, 바텀시트 크기 최소화 - BottomSheetTextInput 와 관련있음
  useEffect(() => {
    if (keyboardDidHide) {
      bottomSheetModalRef.current?.collapse()
    }
  }, [keyboardDidHide])

  return (
    <ScreenRootView testID="BookingDetail" style={{ paddingHorizontal: 0 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
          }}
        >
          <Image style={styles.profileImage} source={images.default_pet_image_60} />

          <View
            style={{
              height: "auto",
              width: DEVICE_SCREEN_WIDTH - PROFILE_IMAGE_WIDTH - 2 * BASIC_BACKGROUND_PADDING_WIDTH,
              paddingLeft: 12,
            }}
          >
            {/* 케어기버 닉네임 | 방문/위탁 | 펫시터/훈련사 */}
            <Row>
              <PreMed16 text={name} color={HEAD_LINE} />
              <Row
                style={{
                  width: "auto",
                  marginLeft: "auto",
                }}
              >
                {/* //TODO: 방문or위탁 / 펫시터or훈련사 데이터 구분 어떻게 할건지 */}
                <CaregiverTypeButton text={korSvcType(serviceType)} />
                <CaregiverTypeButton text={korCgType(caregiverType)} style={{ marginLeft: 4 }} />
              </Row>
            </Row>

            {/* 별점 | 후기 00 개 */}
            <Row mt={4}>
              <Image style={styles.star} source={images.rating_star} />

              <PreReg12 text={`(${ratings})`} color={SUB_HEAD_LINE} style={{ marginLeft: 4 }} />

              <DivisionLineVertical
                color={DBG}
                width={1}
                height={14}
                style={{ marginLeft: 8, marginRight: 8 }}
              />

              <PreReg12
                text={`후기 ${numberOfReviews}개`}
                color={GIVER_CASUAL_NAVY}
                style={{ marginLeft: 4 }}
              />
            </Row>

            {/* 전화하기 | 메시지 보내기 | 신고하기 */}
            <Row
              mt={12}
              style={{
                justifyContent: "space-between",
              }}
            >
              <Pressable
                style={[$pressableBox, SHADOW_1]}
                onPress={() => {
                  alert("전화 기능은 준비중입니다.")
                }}
              >
                <PreReg14 text={"전화하기"} color={HEAD_LINE} />
              </Pressable>
              <Pressable
                style={[$pressableBox, SHADOW_1]}
                onPress={() => {
                  alert("메시지 보내기 기능은 준비중입니다.")
                }}
              >
                <PreReg14 text={"메시지 보내기"} color={HEAD_LINE} />
              </Pressable>

              <Pressable
                style={[$pressableAlarmBox, SHADOW_1]}
                onPress={() => {
                  alert("신고 기능은 준비중입니다.")
                }}
              >
                <MaterialCommunityIcons name="alarm-light-outline" size={24} color={"#707070"} />
              </Pressable>
            </Row>
          </View>
        </View>

        <DivisionLine mt={16} />

        <View style={{ paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH }}>
          <PreBol14 text={"방문 장소"} color={SUB_HEAD_LINE} mt={16} />
          <PreReg14 text={location} color={SUB_HEAD_LINE} mt={8} />

          <PreBol14 text={"방문 시간"} color={SUB_HEAD_LINE} mt={36} />
          <PreReg14 text={time} color={SUB_HEAD_LINE} mt={8} />

          <PreBol14 text={"맡길 반려동물"} color={SUB_HEAD_LINE} mt={36} mb={12} />
          {selectedPets.map((item, index) => (
            <SelectedPetCard
              key={index}
              petData={item}
              deletable={false}
              // onPress={() => {
              //   setSelectedPets((pets) => pets.filter((pet) => pet.id !== item.id))
              // }}
            />
          ))}

          <PreBol14 text={"결제 정보"} color={SUB_HEAD_LINE} mt={36} />

          <Row style={{ justifyContent: "space-between" }} mt={16}>
            <PreReg14
              text={`상품합계(${korSvcType(serviceType)}-${korCgType(caregiverType)})`}
              color={SUB_HEAD_LINE}
            />
            <PreReg14 text={won(price)} color={SUB_HEAD_LINE} />
          </Row>

          <Row style={{ justifyContent: "space-between" }} mt={10}>
            <PreReg14 text={"할인 합계"} color={SUB_HEAD_LINE} />
            <PreReg14 text={won(discount)} color={SUB_HEAD_LINE} />
          </Row>

          <DivisionLine mv={12} />

          <Row style={{ justifyContent: "space-between" }}>
            <PreBol16 text={"총 결제 금액"} color={SUB_HEAD_LINE} />
            <PreBol16 text={won(totalPrice)} color={SUB_HEAD_LINE} />
          </Row>
        </View>
      </ScrollView>

      <View
        style={{
          height: 200,
          paddingHorizontal: BASIC_BACKGROUND_PADDING_WIDTH,
          justifyContent: "space-between",
          backgroundColor: "transparent",
          marginBottom: BOTTOM_HEIGHT,
        }}
      >
        <ConditionalButton label="케어 완료" style={$bottomButtonDisabled} textColor={DISABLED} />
        <ConditionalButton label="케어 진행중" style={$bottomButtonDisabled} textColor={DISABLED} />
        <ConditionalButton
          label="예약 취소하기"
          isActivated
          style={$bottomButton}
          textColor={GIVER_CASUAL_NAVY}
          onPress={handleBottomSheet}
        />
      </View>

      {/* 예약 취소 사유 바텀시트 */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ borderRadius: 20 }}
        style={{ flex: 1 }}
      >
        <View style={styles.bottomSheetContainer}>
          <PreBol18
            text="케어기버에게 전달할 거절 메시지를 선택해주세요."
            mt={20}
            ml={16}
            mb={32}
          />

          {/* 취소 사유들 표시 */}
          {bookingCancelReasons.map((item, index) => (
            <SelectReason key={index} reason={item} selected={selected} setSelected={setSelected} />
          ))}

          {/* "기타" 사유 선택시 TextInput 표시 */}
          {selected === "기타(직접 입력 / 최대 30자)" && (
            <BottomSheetTextInput
              style={styles.textInput}
              placeholder="예약 취소 사유를 직접 입력해주세요."
              value={input}
              onChangeText={(text) => setInput(text)}
              maxLength={30}
            />
          )}

          <TouchableOpacity style={styles.submit} onPress={onSubmit}>
            <PreBol16 text="예약 취소하기" color="white" />
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    </ScreenRootView>
  )
})

const $pressableBox: ViewStyle = {
  width: "auto",
  height: "auto",
  paddingHorizontal: 22,
  paddingVertical: 8,
  borderRadius: 4,
  backgroundColor: "white",
}

const $pressableAlarmBox: ViewStyle = {
  ...$pressableBox,
  paddingHorizontal: 6,
  paddingVertical: 6,
  borderRadius: 6,
}

const $bottomButton: ViewStyle = {
  backgroundColor: "white",
  borderWidth: 2,
  borderColor: GIVER_CASUAL_NAVY,
}

const $bottomButtonDisabled: ViewStyle = {
  ...$bottomButton,
  borderColor: MIDDLE_LINE,
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: 60,
  },

  profileImage: {
    width: PROFILE_IMAGE_WIDTH,
    height: PROFILE_IMAGE_WIDTH,
    borderRadius: PROFILE_IMAGE_WIDTH,
    borderWidth: 2,
    borderColor: LIGHT_LINE,
    resizeMode: "cover",
  },

  star: {
    width: 13.12,
    height: 12,
  },

  rightArrow: { width: 16, height: 16 },

  bottomSheetContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  textInput: {
    alignSelf: "center",
    borderBottomColor: LIGHT_LINE,
    borderBottomWidth: 1,
    borderStyle: "solid",
    width: 310,
  },
  submit: {
    paddingHorizontal: 16,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    backgroundColor: GIVER_CASUAL_NAVY,
    marginTop: 54,
    borderRadius: 10,
  },
})
