import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { BookingInfoCard, BookingInfoCardProps, PreReg18, ScreenRootView } from "#components"
import { View } from "react-native"
import { useShowBottomTab } from "../../utils/hooks"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

//테스트용 더미 데이터
const CareGiverReserveDummy: BookingInfoCardProps = {
  id: "1",
  name: "강영묵",
  serviceType: "visit",
  caregiverType: "trainer",
  petname: "봉봉이",
  species: "푸들",
  petservices: ["산책, 목욕, 미용"],
  address: "경기도 성남시 판교동",
}

export const ManageBookingScreen: FC<
  StackScreenProps<NavigatorParamList, "manage-booking-screen">
> = observer(function ManageBookingScreen({ navigation }) {
  useShowBottomTab(navigation)

  // MST store 를 가져옵니다.
  // const { someStore, anotherStore } = useStores()

  // 필요시, useNavigation 훅을 사용할 수 있습니다.
  // const navigation = useNavigation()
  return (
    <ScreenRootView testID="ManageBooking">
      <View
        style={{
          marginVertical: 40,
          alignSelf: "center",
        }}
      >
        <PreReg18>예약 관리</PreReg18>
      </View>

      <BookingInfoCard
        id={CareGiverReserveDummy.id}
        name={CareGiverReserveDummy.name}
        serviceType={CareGiverReserveDummy.serviceType}
        caregiverType={CareGiverReserveDummy.caregiverType}
        petname={CareGiverReserveDummy.petname}
        species={CareGiverReserveDummy.species}
        petservices={CareGiverReserveDummy.petservices}
        address={CareGiverReserveDummy.address}
      />
    </ScreenRootView>
  )
})
