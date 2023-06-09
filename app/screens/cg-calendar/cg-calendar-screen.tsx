import React, { FC, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { CgCalendar, ScreenRootView } from "#components"
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

  const [dates, setDates] = useState([])
  const [userId, setUserId] = useState(4)

  useLayoutEffect(() => {
    setAllVisitingAvailableTimes(userId)
    setDates(visitingAvailableTimes)
  }, [userId])

  console.log("dates:", dates)

  return (
    <ScreenRootView testID="CgCalendar">
      <CgCalendar dates={dates}></CgCalendar>
    </ScreenRootView>
  )
})
