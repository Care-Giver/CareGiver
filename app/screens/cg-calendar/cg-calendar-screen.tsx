import React, { FC, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { CancelButton, CgCalendar, CgCalendarEditButton, ScreenRootView, Text } from "#components"
import { useStores } from "../../models"
import { Pressable, View } from "react-native"
import { crecheDays as _crecheDays } from "./dummy-data"
import { string } from "mobx-state-tree/dist/internal"

// import { useNavigation } from "@react-navigation/native"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export type ServiceType = "방문" | "위탁"

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
  const {
    CrecheDayModel: { setAllCrecheDays, crecheDays },
  } = useStores()
  // const 데이터가져오기 = visitingAvailableTimesModel.setAllVisitingAvailableTimes

  // 필요시, useNavigation 훅을 사용할 수 있습니다.
  // const navigation = useNavigation()

  const [dates, setDates] = useState([])
  const [userId, setUserId] = useState(1)
  const [serviceType, setServiceType] = useState<ServiceType>("방문")
  const onTestPress = () => {
    if (serviceType == "방문") {
      setServiceType("위탁")
    } else {
      setServiceType("방문")
    }
  }

  useLayoutEffect(() => {
    if (serviceType == "방문") {
      setAllVisitingAvailableTimes(userId)
      setDates(visitingAvailableTimes)
    } else {
      setAllCrecheDays(userId)
      setDates(crecheDays)
    }
  }, [serviceType])

  console.log("dates", serviceType, ":", dates)

  return (
    <ScreenRootView testID="CgCalendar">
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        {/*이 전 스크린 제작 전, 위탁 방문을 구분하기 위한 버튼*/}
        <Pressable style={{ borderColor: "black", borderWidth: 2 }} onPress={onTestPress}>
          <Text style={{ color: "black" }}>{serviceType == "방문" ? "방문" : "위탁"}</Text>
        </Pressable>
        <CancelButton title={"전체해제"} textcolor="#767676" style={{ alignSelf: "flex-end" }} />
      </View>
      <CgCalendar dates={dates} serviceType={serviceType}></CgCalendar>
      <CgCalendarEditButton
        style={{ position: "absolute", bottom: 0, alignSelf: "center" }}
        title={"수정"}
      />
    </ScreenRootView>
  )
})
