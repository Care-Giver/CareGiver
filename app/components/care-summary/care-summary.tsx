import React from "react"
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import { PreBol14, PreReg14 } from "../_BASIC/custom-texts/custom-texts"
import { SelectedPetCard } from "../_DROPDOWN_BOX/pet-info-dropdown-box/selected-pet-card/selected-pet-card"
import { ServiceTypeKorean } from "#models"
import { SUB_HEAD_LINE } from "#theme"
import { formatSchedule } from "../../utils/format"
import { Pet } from "#api"

export interface CareSummaryProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  /** 케어장소. 예) "경기 하남시 미사강변동로 95 809호" */
  address: string //장소

  /** 케어 시작 시각. 예) "2022-09-26T10:00:00.000Z" */
  start: string //

  /** 케어 종료 시각. 예) "2022-09-26T10:00:00.000Z" */
  end: string

  /** 케어 반려동물 리스트. */
  pets: Pet[]

  /** 케어 타입. 방문 OR 위탁 */
  serviceTypeKorean: ServiceTypeKorean

  showServiceType?: boolean
}

export const CareSummary = observer(function CareSummary(props: CareSummaryProps) {
  const { style, address, start, end, pets, serviceTypeKorean, showServiceType = true } = props
  const allStyles = Object.assign({}, styles.root, style)
  const schedule = formatSchedule({ start, end, serviceTypeKorean })

  return (
    <View style={allStyles}>
      {showServiceType && serviceTypeKorean && (
        <View style={{ marginBottom: 36 }}>
          <PreBol14 text={"케어 방식"} color={SUB_HEAD_LINE} mb={8} />
          <PreReg14 text={`${serviceTypeKorean} 펫시팅`} color={SUB_HEAD_LINE} />
        </View>
      )}

      <PreBol14 text={"케어 장소"} color={SUB_HEAD_LINE} />
      <PreReg14 text={address} color={SUB_HEAD_LINE} mt={8} />

      <PreBol14 text={"케어 일정"} color={SUB_HEAD_LINE} mt={36} />
      <PreReg14 text={schedule} color={SUB_HEAD_LINE} mt={8} />

      {pets ? (
        <View style={{ marginTop: 36, marginBottom: 12 }}>
          <PreBol14 text={"맡길 반려동물"} color={SUB_HEAD_LINE} />
          {pets.map((item, index) => (
            <SelectedPetCard key={index} petData={item} deletable={false} />
          ))}
        </View>
      ) : null}
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    width: "100%",
  },
})
