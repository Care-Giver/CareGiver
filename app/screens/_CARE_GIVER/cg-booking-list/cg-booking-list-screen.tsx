import React, { FC } from "react"
import { StyleSheet, View } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { PreBol18, Screen } from "#components"
import { useStores } from "#models"

export const CgBookingListScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-booking-list-screen">
> = observer(function CgBookingListScreen() {
  const {
    cgBookingStore: { setBookings, waitingBookings, rejectedBookings },
  } = useStores()

  return (
    <Screen testID="CgBookingList">
      <View>
        <PreBol18 text={`대기중인 예약: ${waitingBookings.length} 개`} />
        <PreBol18 text={`거절한 예약: ${rejectedBookings.length} 개`} />
      </View>
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {},
})
