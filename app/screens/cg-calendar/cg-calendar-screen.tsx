import React, { FC, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import {
  CancelButton,
  CgCalendar,
  CgCalendarEditButton,
  Screen,
  Text,
  Button,
  PreBol16,
} from "#components"
import { useStores } from "../../models"
import { Pressable, View } from "react-native"
import { crecheDays as _crecheDays } from "./dummy-data"
import { GIVER_CASUAL_NAVY } from "#theme"
import { groupedVisitingAvailableTimesByDate } from "../../services/axios/visiting-available-time"
import { crecheAvailableDates } from "../../services/axios/creche-day"

// import { useNavigation } from "@react-navigation/native"

// [주의] app/navigators/app-navigator.tsx 에 위치한, NavigatorParamList 변수에 새로운 값 "xxxx-screen": undefined 을 추가해주세요.
// 그 뒤에는 아래에 있는 @ts-ignore 를 제거해도, 빨간줄이 뜨지 않습니다 :)
// @ts-ignore
export type ServiceType = "방문" | "위탁"

export const CgCalendarScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-calendar-screen">
> = observer(({ navigation }) => {
  // MST store 를 가져옵니다.
  const {
    visitingAvailableTimesModel: {
      setAllVisitingAvailableTimes,
      visitingAvailableTimes,
      showAllVisitingAvailableTimes,
    },
    CrecheDayModel: { setAllCrecheDays, crecheDays },
  } = useStores()
  // const 데이터가져오기 = visitingAvailableTimesModel.setAllVisitingAvailableTimes

  // 필요시, useNavigation 훅을 사용할 수 있습니다.
  // const navigation = useNavigation()

  const [visitingDates, setVisitingDates] = useState<groupedVisitingAvailableTimesByDate[]>([])
  const [crecheDates, setCrecheDates] = useState<crecheAvailableDates[]>([])
  const [selected, setSelected] = useState("") // TODO - 타입 제발 정해주세요
  const [crecheId, setCrecheId] = useState(1)
  const [serviceType, setServiceType] = useState<ServiceType>("방문")
  const onTestPress = () => {
    if (serviceType == "방문") {
      setServiceType("위탁")
    } else {
      setServiceType("방문")
    }
  }

  useEffect(() => {
    if (serviceType == "방문") {
      setAllVisitingAvailableTimes(crecheId)
      setVisitingDates(visitingAvailableTimes)
    } else {
      setAllCrecheDays(crecheId)
      setCrecheDates(crecheDays)
    }
  }, [serviceType])

  console.log("serviceType in CgCalendarScreen >>>", serviceType)
  console.log("selected >>>", selected)

  return (
    <Screen testID="CgCalendar">
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        {/*이 전 스크린 제작 전, 위탁 방문을 구분하기 위한 버튼*/}
        <Pressable style={{ borderColor: "black", borderWidth: 2 }} onPress={onTestPress}>
          <Text style={{ color: "black" }}>{serviceType == "방문" ? "방문" : "위탁"}</Text>
        </Pressable>
        <CancelButton title={"전체해제"} textcolor="#767676" style={{ alignSelf: "flex-end" }} />
      </View>

      <CgCalendar
        dates={serviceType === "방문" ? visitingAvailableTimes : crecheDays}
        serviceType={serviceType}
        selected={selected}
        setSelected={setSelected}
      />
      {/* <CgCalendarEditButton
        style={{ position: "absolute", bottom: 0, alignSelf: "center" }}
        title={"수정"}
      /> */}

      {/* 수정 버튼 새로 생성 */}
      <Pressable
        style={{
          position: "absolute",
          bottom: 10,
          paddingVertical: 18,
          alignSelf: "center",
          backgroundColor: "white",
          borderColor: GIVER_CASUAL_NAVY,
          borderWidth: 2,
          borderStyle: "solid",
          borderRadius: 10,
          width: 358,
        }}
        onPress={() => {
          serviceType === "방문"
            ? navigation.navigate("set-visiting-service-day-screen", {
                // TODO - 여러개의 selected 가 넘겨질 경우 처리
                date: selected,
                crecheId,
              })
            : navigation.navigate("set-creche-service-day-screen", {
                date: selected,
                crecheId,
              })
        }}
      >
        <PreBol16 text="수정" color={GIVER_CASUAL_NAVY} style={{ alignSelf: "center" }} />
      </Pressable>
    </Screen>
  )
})
