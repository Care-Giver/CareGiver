import React, { FC, useCallback, useEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList, navigate } from "#navigators"
import {
  CancelButton,
  CgCalendar,
  Screen,
  BOTTOM_TAB_BAR_HEIGHT,
  ConditionalButton,
  PreBol18,
} from "#components"
import { useStores } from "../../../models"
import { Pressable, View, Image, ScrollView } from "react-native"
import { BODY, GIVER_CASUAL_NAVY } from "#theme"
import {
  GroupedVisitingAvailableTimesByDate,
  getVisitingAvailableTimes,
} from "../../../services/axios/visiting-available-time"
import { CrecheAvailableDate, getCrecheDates } from "../../../services/axios/creche-date"
import { useShowBottomTab } from "../../../utils/hooks"
import { images } from "#images"
import { dummy } from "./dummy-data"
import _ from "lodash"
import { useFocusEffect } from "@react-navigation/native"
import { alertModal } from "../../../utils/alert-modal"

export const CgCalendarScreen: FC<
  StackScreenProps<NavigatorParamList, "cg-calendar-screen">
> = observer(({ navigation }) => {
  useShowBottomTab(navigation)

  const {
    userStore: { userAuth, userDetail },
    petsitterStore: { serviceType, serviceTypeKorean, hasPetsitterProfile, petsitter },
  } = useStores()

  useFocusEffect(
    useCallback(() => {
      if (hasPetsitterProfile) {
        const getter = serviceType === "visiting" ? getVisitingAvailableTimes : getCrecheDates
        const setter = serviceType === "visiting" ? setVisitingAvailableTimes : setCrecheDates
        getter(petsitter.id).then((res) => {
          setter(res)
          // console.log("res 🔷", res)
        })
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [petsitter?.id, serviceType, hasPetsitterProfile]),
  )

  // useEffect(() => {
  //   const getter = serviceType === "visiting" ? getVisitingAvailableTimes : getCrecheDates
  //   const setter = serviceType === "visiting" ? setVisitingAvailableTimes : setCrecheDates
  //   getter(petsitter.id).then((res) => {
  //     console.log("res 🔷", res)
  //     setter(res)
  //   })
  // }, [petsitter.id, serviceType])

  // 더미 데이터 테스트용.
  // useEffect(() => {
  //   const setter = serviceType === "visiting" ? setVisitingAvailableTimes : setCrecheDates

  //   setter(
  //     // @ts-ignore
  //     serviceType === "visiting"
  //       ? dummy.visitingAvailableTimes.map((item) => ({
  //           ...item,
  //           date: item.date.substring(0, 10),
  //         }))
  //       : dummy.crecheDates.map((item) => ({
  //           ...item,
  //           startDate: item.startDate.substring(0, 10),
  //         })),
  //   )
  // }, [serviceType])

  const [visitingAvailableTimes, setVisitingAvailableTimes] = useState<
    GroupedVisitingAvailableTimesByDate[]
  >([])
  const [crecheDates, setCrecheDates] = useState<CrecheAvailableDate[]>([])
  const [selectedDates, setSelectedDates] = useState<string[]>([])

  /**
   * 선택된 날짜 (selectedDates) 가 1개일때
   * 그 날짜가 이전에 비활성화(disable) 된 적이 있는지를 판별한다.
   * 현재 여러개의 날짜의 시간대를 동시에 수정할 수 없기 때문에
   * 선택된 날짜가 여러개라면, 무조건 false 를 리턴한다.
   */
  const isDeletedVis = useMemo(() => {
    if (selectedDates?.length === 1) {
      const target = visitingAvailableTimes.find((v) => v.date === selectedDates[0])
      if (target === undefined) {
        return false
      } else if (target?.deletedAt === null) {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }, [visitingAvailableTimes, selectedDates])

  const isDeletedCre = useMemo(() => {
    if (selectedDates?.length === 1) {
      const target = crecheDates.find((v) => v.startDate.slice(0, 10) === selectedDates[0])
      if (target === undefined) {
        return false
      } else if (target?.deletedAt === null) {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }, [crecheDates, selectedDates])

  return (
    <Screen testID="CgCalendar">
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
      >
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
              onPress={() => {
                setSelectedDates([])
              }}
            />
            <CgCalendar
              availableDates={serviceTypeKorean === "방문" ? visitingAvailableTimes : crecheDates}
              serviceTypeKorean={serviceTypeKorean}
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
              style={{
                alignSelf: "center",
              }}
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
                if (selectedDates.length === 0) {
                  alertModal("일정 선택", "한 개 이상의 날짜를 선택 해 주세요.")
                  return
                }

                serviceTypeKorean === "방문"
                  ? navigate("set-visiting-service-day-screen", {
                      // TODO - 여러개의 selected 가 넘겨질 경우 처리
                      selectedDates,
                      visitingId: petsitter.id,
                      isAvailableDate:
                        _.intersection(
                          visitingAvailableTimes.map((item) => item.date),
                          selectedDates,
                        ).length !== 0,
                      isDeleted: isDeletedVis,
                    })
                  : navigate("set-creche-service-day-screen", {
                      selectedDates,
                      crecheId: petsitter.id,
                      isAvailableDate:
                        _.intersection(
                          crecheDates.map((item) => item.startDate),
                          selectedDates,
                        ).length !== 0,
                      availableDate: crecheDates.find(
                        (item) => item.startDate === selectedDates[0],
                      ),
                      isDeleted: isDeletedCre,
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
                // @ts-ignore
                navigate("CgMypage")
              }}
            />
          </>
        )}
      </ScrollView>
    </Screen>
  )
})
