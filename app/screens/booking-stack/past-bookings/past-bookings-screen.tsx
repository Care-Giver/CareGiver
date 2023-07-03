import React, { FC } from "react"
import { FlatList, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { PastBooking, ScreenRootView } from "#components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const PastBookingsScreen: FC<
  StackScreenProps<NavigatorParamList, "past-bookings-screen">
> = observer(function PastBookingsScreen({ route, navigation }) {
  const { pastBookings } = route.params
  console.log(pastBookings)

  return (
    <ScreenRootView testID="PastBookings">
      <FlatList
        data={pastBookings}
        renderItem={({ item }) => (
          <PastBooking
            style={{ marginTop: 13 }}
            profileImage={item.profileImage}
            petsitterName={item.petSitterName}
            desc={item.desc}
            petsitterId={item.crecheId ? item.crecheId : item.visitingId}
            bookingId={item.crecheId ? item.crecheBookingId : item.visitingBookingId}
            petsitterType={item.crecheBookingId ? "creche" : "visiting"}
            serviceType={item.crecheId ? "creche" : "visiting"}
            startDate={item.crecheId ? item.startDate : item.startTime}
            endDate={item.crecheId ? item.endDate : item.endTime}
            isCanceled={item.isCanceled}
          />
        )}
      />
    </ScreenRootView>
  )
})

const styles = StyleSheet.create({
  root: {},
})
