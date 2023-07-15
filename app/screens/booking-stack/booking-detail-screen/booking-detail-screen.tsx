import React, { FC } from "react"
import { FlatList, Pressable, View, StyleSheet, Image, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  CaregiverTypeButton,
  DivisionLine,
  DivisionLineVertical,
  PreBol14,
  PreBol16,
  PreMed16,
  PreReg12,
  PreReg14,
  Row,
  Screen,
  SelectedPetCard,
} from "#components"
import { SHADOW_1, DBG, GIVER_CASUAL_NAVY, HEAD_LINE, LIGHT_LINE, SUB_HEAD_LINE } from "#theme"
import { korCgType, korSvcType, won } from "../../../utils/format"
import { images } from "#images"
import { MaterialCommunityIcons } from "@expo/vector-icons"
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

export const BookingDetailScreen: FC<
  StackScreenProps<NavigatorParamList, "booking-detail-screen">
> = observer(function BookingDetailScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const { serviceType, caregiverType, name, ratings, numberOfReviews } = caregiverData
  const { location, time, selectedPets } = bookingData
  const { price, discount, totalPrice } = paymentData

  return (
    <Screen testID="BookingDetail">
      <Row>
        <Image style={styles.profileImage} source={images.default_pet_image_60} />

        <View
          style={{
            height: "100%",
            width: "74%",
            marginLeft: 12,
          }}
        >
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
              // style={{ marginLeft: 4 }}
            />
          </Row>

          <Row mt={12} style={{ justifyContent: "space-between" }}>
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
      </Row>

      <DivisionLine mt={16} />

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
    </Screen>
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
  width: "auto",
  height: "auto",
  paddingHorizontal: 6,
  paddingVertical: 6,
  borderRadius: 6,
  backgroundColor: "white",
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: 60,
  },
  profileImage: {
    width: 84,
    height: 84,
    borderRadius: 84,
    borderWidth: 2,
    borderColor: LIGHT_LINE,
    resizeMode: "cover",
  },
  star: {
    width: 13.12,
    height: 12,
  },
  rightArrow: { width: 16, height: 16 },
})
