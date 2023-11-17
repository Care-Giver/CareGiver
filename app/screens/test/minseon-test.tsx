import { View, Text, FlatList } from "react-native"
import React, { FC, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { Screen, InProgressBooking } from "#components"
import { petsitterReserves, crecheReserves } from "./dummy-data"

export const MinseonTest: FC<StackScreenProps<NavigatorParamList, "minseon-test">> = observer(
  ({ navigation, route }) => {
    const [inprogressReserves, setInprogressReserves] = useState([])
    const [completeReserves, setCompleteReserves] = useState([])

    useLayoutEffect(() => {
      const inprogress = []
      const completes = []

      petsitterReserves.forEach((value, index) => {
        if (new Date(value.endDateTime).getTime() >= new Date().getTime()) {
          // ? 예약 내역의 종료 시간이 현재 시간보다 나중일 때 -> 진행중인 예약
          inprogress.push(value)
        } else {
          // ? 예약 내역의 종료 시간이 현재 시간보다 앞설 때 -> 지난 예약
          completes.push(value)
        }
      })

      crecheReserves.forEach((value, index) => {
        if (new Date(value.endDateTime).getTime() >= new Date().getTime()) {
          // ? 예약 내역의 종료 시간이 현재 시간보다 나중일 때 -> 진행중인 예약
          inprogress.push(value)
        } else {
          // ? 예약 내역의 종료 시간이 현재 시간보다 앞설 때 -> 지난 예약
          completes.push(value)
        }
      })

      setInprogressReserves(inprogress)
      setCompleteReserves(completes)
    }, [])

    console.log("inprogressReserves=========")
    console.log(inprogressReserves)
    console.log("inprogressReserves=========")
    return (
      <Screen>
        {/* //? 진행중인 예약 */}
        <FlatList
          data={inprogressReserves}
          renderItem={({ item, index }) => <InProgressBooking reserveData={item} />}
        />
        {/* <InProgressBooking reserveData={inprogressReserves[0]} /> */}
      </Screen>
    )
  },
)
