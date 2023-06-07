import React, { FC, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { CgCalendar, ScreenRootView } from "#components"
import { DateData } from "react-native-calendars"
import { CalendarStoreModel } from "../../models/calendar-store/calendar-store"
import { Calendar } from "../../models/calendar/calendar"
import { getvisitingAvailableTimes } from "../../services/axios/calendar"
import { getCrechePetsitters } from "#axios"
import { useStores } from "../../models"

// import { useNavigation } from "@react-navigation/native"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export const CgCalendarScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-calendar-screen">
> = observer(({ navigation, route }) => {
  // MST store 를 가져옵니다.
  const {
    visitingAvailableTimesModel: {
      setAllVisitingAvailableTimes,
      visitingAvailableTimes,
      showAllVisitingAvailableTimes,
    },
  } = useStores()

  // const 데이터가져오기 = visitingAvailableTimesModel.setAllVisitingAvailableTimes

  // 필요시, useNavigation 훅을 사용할 수 있습니다.
  // const navigation = useNavigation()

  //* 달력 - Calendar
  const calendarStore = CalendarStoreModel.create({
    visitingAvailableTimes: [],
  })
  const [fees, setFees] = useState([])

  useEffect(() => {
    async function fetchData() {
      calendarStore.setCalendarFee(4)
      console.log("calendarStore.visitingAvailableTimes:", calendarStore.visitingAvailableTimes)
      setFees(calendarStore.visitingAvailableTimes)
      // console.log("fetch")
      // const _response = await getvisitingAvailableTimes(4)
      // const _fees = []
      // _response.forEach((value) => _fees.push(value))
      // // console.log("response: ", _response)
      // // console.log("_fees:", _fees)
      // setFees(_fees)
    }

    // fetchData()
    console.log("fees: ", fees)
    // console.log(calendarStore.datefee)

    // setAllVisitingAvailableTimes(4)
    // console.log("야호 >>>", visitingAvailableTimes)
    console.log("다시 두잇어게인", visitingAvailableTimes)
  }, [])
  return (
    <ScreenRootView testID="CgCalendar">
      <CgCalendar dateFee={fees}></CgCalendar>
    </ScreenRootView>
  )
})
