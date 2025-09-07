import React, { Dispatch, SetStateAction } from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { styles } from "./styles"
import { PreBol16, PreReg14 } from "../../../_BASIC/custom-texts/custom-texts"
import { BODY } from "#theme"
import { Row } from "../../../_BASIC/row/row"
import { BlueCheckbox } from "../../../blue-checkbox/blue-checkbox"
import { Pet, PetSex } from "#api"
import { HandleType } from "../../../../services/api"

interface SelectPetItemProps {
  style?: StyleProp<ViewStyle>
  petData: Pet
  setSelectedPets: Dispatch<SetStateAction<Pet[]>>
  isSelected: boolean
}

export const SelectPetItem = (props: SelectPetItemProps) => {
  const { petData, style, setSelectedPets, isSelected } = props
  const { id, name, petType, species, age, sex } = petData

  const onPress = () => {
    // 선택이 되어있는 상태에서 누른다 = 선택취소
    if (isSelected) {
      setSelectedPets((pets) => pets.filter((pet) => pet.id !== id))
    }
    // 선택이 안 되어 있는 상태에서 누른다 = 선택하겠다
    else {
      setSelectedPets((pets) => [...pets, petData])
    }
  }

  let _petType = ""
  switch (petType) {
    case HandleType.SMALL:
      _petType = "소형"
      break
    case HandleType.MEDIUM:
      _petType = "중형"
      break
    case HandleType.LARGE:
      _petType = "대형"
      break
  }

  let _sex = ""
  if (sex === PetSex.MALE) {
    _sex = "남"
  } else {
    _sex = "여"
  }

  return (
    <Row style={[styles.root, style]}>
      {/* //? 이름 */}
      <View style={styles.nameContainer}>
        <PreBol16 text={name} style={{ textAlign: "center" }} />
      </View>

      {/* //? 사이즈 */}
      <View style={styles.sizeContainer}>
        <PreReg14 text={_petType} color={BODY} style={{ textAlign: "center" }} />
      </View>

      {/* //? 종 */}
      <View style={styles.speciesContainer}>
        <PreReg14
          text={species?.name}
          color={BODY}
          style={{ textAlign: "center" }}
          //@ts-ignore
          numberOfLines={1}
        />
      </View>

      {/* //? 나이 */}
      <View style={styles.ageContainer}>
        <PreReg14 text={`${age}세`} color={BODY} style={{ textAlign: "center" }} />
      </View>

      {/* //? 성별 */}
      <View style={styles.sexContainer}>
        <PreReg14 text={_sex} color={BODY} style={{ textAlign: "center" }} />
      </View>

      {/* //? 추가/삭제 체크박스 버튼 */}
      <View style={styles.checkboxContainer}>
        <BlueCheckbox onPress={onPress} value={isSelected} />
      </View>
    </Row>
  )
}
