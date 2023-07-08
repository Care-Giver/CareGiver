import React, { FC, useLayoutEffect, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../../navigators"
import { PastBooking, ScreenRootView } from "../../../components"
import { PreviousBookingParams, getPreviousBookings } from "../../../services/axios"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const PastBookingsScreen: FC<
  StackScreenProps<NavigatorParamList, "past-bookings-screen">
> = observer(function PastBookingsScreen({ route, navigation }) {
  // const { pastBookings } = route.params
  // console.log(pastBookings)

  const [previousBookings, setPreviousBookings] = useState<PreviousBookingParams[]>([])

  useLayoutEffect(() => {
    getPreviousBookings()
      .then((res) => {
        const previousBookings: PreviousBookingParams[] = []
        res.forEach((booking, index) => {
          const type = booking.crecheId ? "creche" : "visiting"
          previousBookings.push({
            profileImage: booking.profileImage,
            serviceType: type,
            petsitterType: type,
            // @ts-ignore
            petsitterId: type === "creche" ? booking.crecheId : booking.visitingId,
            // @ts-ignore
            bookingId: type === "creche" ? booking.crecheBookingId : booking.visitingBookingId,
            petsitterName: booking.petSitterName,
            desc: booking.desc,
            // ? 여기서는 creche | visiting 모두 Date로 통일한다.
            // @ts-ignore
            startDate: type === "creche" ? booking.startDate : booking.startTime,
            // @ts-ignore
            endDate: type === "creche" ? booking.endDate : booking.endTime,
            isCanceled: booking.isCanceled,
            isFavorite: booking.isFavorite,
            reviewStatus: booking.reviewStatus,
          })
        })
        setPreviousBookings(previousBookings)
      })
      .catch((err) => console.log("[past bookings screen] get previous bookings error >>>", err))
  }, [])

  return (
    <ScreenRootView testID="PastBookings">
      <View style={{ paddingVertical: 20 }}>
        <FlatList
          // style={{ paddingTop: 20, marginBottom: 20 }}
          data={previousBookings}
          renderItem={({ item }) => (
            <PastBooking
              {...item}
              // profileImage={item.profileImage}
              // petsitterName={item.petSitterName}
              // desc={item.desc}
              // petsitterId={item.crecheId ? item.crecheId : item.visitingId}
              // bookingId={item.crecheId ? item.crecheBookingId : item.visitingBookingId}
              // petsitterType={item.crecheBookingId ? "creche" : "visiting"}
              // serviceType={item.crecheId ? "creche" : "visiting"}
              // startDate={item.crecheId ? item.startDate : item.startTime}
              // endDate={item.crecheId ? item.endDate : item.endTime}
              // isCanceled={item.isCanceled}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        />
      </View>
    </ScreenRootView>
  )
})

const styles = StyleSheet.create({
  root: {},
})
