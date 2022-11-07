import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "#navigators"
import { CaregiverTypeButton, Row, ScreenRootView } from "#components"
import { WIDTH } from "#theme/index"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"

const caregiverData = {
  serviceType: "visit",
  caregiverType: "petsitter",
}
export const BookingDetailScreen: FC<
  StackScreenProps<NavigatorParamList, "booking-detail-screen">
> = observer(function BookingDetailScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <ScreenRootView testID="BookingDetail" preset="fixed">
      <Row>
        {/* //TODO: 방문or위탁 / 펫시터or훈련사 데이터 구분 어떻게 할건지 */}
        <CaregiverTypeButton
          text={
            caregiverData.serviceType === "visit"
              ? "방문"
              : caregiverData.serviceType === "creche"
              ? "위탁"
              : ""
          }
        />
        <CaregiverTypeButton
          text={
            caregiverData.caregiverType === "petsitter"
              ? "펫시터"
              : caregiverData.caregiverType === "trainer"
              ? "훈련사"
              : ""
          }
          style={{ marginLeft: WIDTH * 4 }}
        />
      </Row>
    </ScreenRootView>
  )
})
