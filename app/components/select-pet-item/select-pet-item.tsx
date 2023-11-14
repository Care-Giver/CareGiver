import React, { Dispatch, SetStateAction, useState } from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { styles } from "./styles"
import { PreBol16, PreReg14 } from "../basics/custom-texts/custom-texts"
import { BODY } from "#theme"
import { Row } from "../basics/row/row"
import { BlueCheckbox } from "../blue-checkbox/blue-checkbox"
import { Pet, PetSex } from "#models"
import { HandleType } from "../../services/axios/types/creches.visitings.common.types"

interface SelectPetItemProps {
  style?: StyleProp<ViewStyle>
  petData: Pet
  selectedPets: Pet[]
  setSelectedPets: Dispatch<SetStateAction<Pet[]>>
}

export const SelectPetItem = (props: SelectPetItemProps) => {
  const { petData, style, selectedPets, setSelectedPets } = props
  const { id, name, petType, species, age, sex } = petData

  const [isChecked, setIsChecked] = useState(false)
  const selectedPetsIds = selectedPets.map((pertInfo) => pertInfo.id)
  const isSelected = selectedPetsIds.includes(id)

  const addPet = (petData: Pet) => {
    //! forEach 는 retrun 값을 못 내보낸다. 항상 undefined 임 주의할 것! (map 과의 가장 큰 차이!) https://dream-frontend.tistory.com/341
    //! 이때문에, map 을 사용하였다
    //? 이전 값들(pet 객체) 중에서, id 값이 이미 존재하면, true 를 리턴한다.
    const didAlreadyHave = selectedPets.map((ele) => ele.id === petData.id).includes(true)

    //? 이미 있지 않으면 state 를 추가한다(setSelectedPets)
    if (!didAlreadyHave) {
      setSelectedPets((prevState) => [...prevState, petData])
    }
  }

  const handle = () => {
    // ? 선택이 되어있는 상태에서 누른다 = 선택취소
    if (isSelected) {
      setIsChecked(false)
      setSelectedPets((pets) => pets.filter((pet) => pet.id !== id))
    }
    //  ? 선택이 안 되어 있는 상태에서 누른다 = 선택하겠다 = addPet
    else {
      addPet(petData)
      setIsChecked(true)
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
        <BlueCheckbox onPress={handle} value={isChecked} />
      </View>
    </Row>
  )
}
