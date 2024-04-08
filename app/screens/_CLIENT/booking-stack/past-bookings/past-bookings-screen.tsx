import React, { FC, useCallback, useState } from "react"
import { FlatList, View } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../../../navigators"
import { BookingInfoCard, Screen } from "../../../../components"
import { PreviousBooking, getPreviousBookings } from "../../../../services/api"
import { useFocusEffect } from "@react-navigation/native"
import { useStores } from "#models"
import { PreviousBookingAdaptor } from "../../../../components/booking-info-card/booking-info-card-adaptor"

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
      getPreviousBookings().then(setPreviousBookings)
    }, [reviews]),
  )

  return (
    <Screen testID="PastBookings">
      <View style={{ paddingVertical: 20 }}>
        <FlatList
          data={previousBookings}
          renderItem={({ item }) => (
            <BookingInfoCard
              {...new PreviousBookingAdaptor(item).adapt()}
              forceUpdate={forceUpdate}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        />
      </View>
    </Screen>
  )
})
