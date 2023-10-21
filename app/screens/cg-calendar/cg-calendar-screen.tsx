import React, { FC, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import {
  CancelButton,
  CgCalendar,
  CgCalendarEditButton,
  Screen,
  Text,
  BOTTOM_TAB_BAR_HEIGHT,
  ConditionalButton,
  Row,
  PreBol18,
} from "#components"
import { useStores } from "../../models"
import { Pressable, View, Image } from "react-native"
import { crecheDays as _crecheDays } from "./dummy-data"
import { BODY, GIVER_CASUAL_NAVY } from "#theme"
import { GroupedVisitingAvailableTimesByDate } from "../../services/axios/visiting-available-time"
import { CrecheAvailableDates } from "../../services/axios/creche-day"
import { useShowBottomTab } from "../../utils/hooks"
import { images } from "#images"

export const CgCalendarScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-calendar-screen">
> = observer(({ navigation }) => {
  useShowBottomTab(navigation)

  // MST store 를 가져옵니다.
  const {
    visitingAvailableTimesModel: {
      setAllVisitingAvailableTimes,
      visitingAvailableTimes,
      showAllVisitingAvailableTimes,
    },
    CrecheDayModel: { setAllCrecheDays, crecheDays },
    userStore: { switchType, userDetail },
    petsitterStore: { serviceTypeKorean, hasPetsitterProfile, petsitter, fetchPetsitter },
  } = useStores()

  const [visitingDates, setVisitingDates] = useState<GroupedVisitingAvailableTimesByDate[]>([])
  const [crecheDates, setCrecheDates] = useState<CrecheAvailableDates[]>([])
  const [selected, setSelected] = useState<string[]>([]) // TODO - 타입 제발 정해주세요
  const [crecheId, setCrecheId] = useState(1)

  return (
    <Screen testID="CgCalendar">
      {hasPetsitterProfile ? (
        <>
          <PreBol18
            text={`${serviceTypeKorean} 일정 관리`}
            style={{ alignSelf: "flex-start" }}
            mt={10}
          />
          <CancelButton
            title={"전체해제"}
            textcolor={BODY}
            style={{ alignSelf: "flex-end", marginBottom: 8 }}
          />
          <CgCalendar
            availableDates={serviceTypeKorean === "방문" ? visitingAvailableTimes : crecheDays}
            serviceType={serviceTypeKorean}
            selected={selected}
            setSelected={setSelected}
          />

          {/* 수정 버튼 */}
          <ConditionalButton
            label={"수정"}
            isActivated={true}
            style={{
              alignSelf: "center",
              position: "absolute",
              bottom: BOTTOM_TAB_BAR_HEIGHT + 16,
              backgroundColor: "white",
              borderColor: GIVER_CASUAL_NAVY,
              borderWidth: 2,
            }}
            labelTextColor={GIVER_CASUAL_NAVY}
            onPress={() => {
              serviceTypeKorean === "방문"
                ? navigate("set-visiting-service-day-screen", {
                    // TODO - 여러개의 selected 가 넘겨질 경우 처리
                    date: selected,
                    crecheId,
                  })
                : navigate("set-creche-service-day-screen", {
                    date: selected,
                    crecheId,
                  })
            }}
          />
        </>
      ) : (
        <>
          <Image
            source={images.cat_with_heart}
            style={{
              width: 158 * 2,
              height: 122 * 2,
              alignSelf: "center",
              position: "absolute",
              top: 160,
            }}
          />
          <ConditionalButton
            label={`펫시터 서비스 등록하러 가기!`}
            isActivated={true}
            style={{
              alignSelf: "center",
              position: "absolute",
              bottom: BOTTOM_TAB_BAR_HEIGHT,
              backgroundColor: "white",
              borderColor: GIVER_CASUAL_NAVY,
              borderWidth: 2,
            }}
            labelTextColor={GIVER_CASUAL_NAVY}
            onPress={() => {
              navigate("cg-mypage-screen")
            }}
          />
        </>
      )}
    </Screen>
  )
})
