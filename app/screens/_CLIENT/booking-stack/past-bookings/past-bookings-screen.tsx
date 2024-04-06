import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../../../navigators"
import { BookingInfoCard, Screen } from "../../../../components"
import { PreviousBooking, getPreviousBookings } from "../../../../services/api"
import { useFocusEffect } from "@react-navigation/native"
import { useStores } from "#models"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "#models"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const PastBookingsScreen: FC<
  StackScreenProps<NavigatorParamList, "past-bookings-screen">
> = observer(function PastBookingsScreen({ route, navigation }) {
  const [previousBookings, setPreviousBookings] = useState<PreviousBooking[]>([])
  const {
    reviewStoreModel: { reviews },
  } = useStores()
  // * 찜 버튼을 누를 시 강제로 화면 전체를 리렌더링하기 위한 함수
  const forceUpdate = useCallback(() => {
    navigation.setParams(undefined)
  }, [])

  useFocusEffect(
    useCallback(() => {
      const fetchBookings = async () => {
        console.log("focused!! - 2")

        await getPreviousBookings()
          .then((res) => {
            console.log("focused!! - 3")

            const previousBookings: PreviousBooking[] = []
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
                // @ts-ignore
                startDate: booking?.startDate,
                // @ts-ignore
                endDate: booking?.endDate,
                startTime: booking?.startTime,
                // @ts-ignore
                endTime: booking?.endTime,
                isCanceled: booking.isCanceled,
                isFavorite: false,
                reviewStatus: booking.reviewStatus,
              })
            })
            setPreviousBookings(previousBookings)
            console.log("focused!! - 4")
          })
          .catch((err) =>
            console.log("[past bookings screen] get previous bookings error >>>", err),
          )
      }
      fetchBookings()
      console.log("focused!! - 5")
    }, [reviews]),
  )

  return (
    <Screen testID="PastBookings">
      <View style={{ paddingVertical: 20 }}>
        <FlatList
          data={previousBookings}
          renderItem={({ item }) => <BookingInfoCard {...item} forceUpdate={forceUpdate} />}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        />
      </View>
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {},
})
