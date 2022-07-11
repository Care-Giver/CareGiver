import { View, Text, FlatList } from "react-native"
import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { InProgressBooking } from "../../custom-components/in-progress-booking/in-progress-booking"
import { ScreenRootView } from "../../custom-components"
import { petsitterReserves, crecheReserves } from "./dummy-data"

export const MinseonTest: FC<StackScreenProps<NavigatorParamList, "minseon-test">> = observer(
  ({ navigation, route }) => {
    const inprogressReserves = []
    const completeReserves = []

    petsitterReserves.forEach((value, index) => {
      if (new Date(value.endTime).getTime() >= new Date().getTime()) {
        // ? 예약 내역의 종료 시간이 현재 시간보다 나중일 때 -> 진행중인 예약
        inprogressReserves.push(value)
      } else {
        // ? 예약 내역의 종료 시간이 현재 시간보다 앞설 때 -> 지난 예약
        completeReserves.push(value)
      }
    })

    crecheReserves.forEach((value, index) => {
      if (new Date(value.endDay).getTime() >= new Date().getTime()) {
        // ? 예약 내역의 종료 시간이 현재 시간보다 나중일 때 -> 진행중인 예약
        inprogressReserves.push(value)
      } else {
        // ? 예약 내역의 종료 시간이 현재 시간보다 앞설 때 -> 지난 예약
        completeReserves.push(value)
      }
    })

    console.log(petsitterReserves)
    return (
      <ScreenRootView>
        {/* //? 진행중인 예약 */}
        {/* <FlatList
          data={inprogressReserves}
          renderItem={(item, index) => <InProgressBooking reserveData={item} />}
        /> */}
        <InProgressBooking reserveData={petsitterReserves[0]} />
      </ScreenRootView>
    )
  },
)
