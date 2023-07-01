import { View } from "react-native"
import React, { useState, useLayoutEffect } from "react"
import { styles } from "./styles"
import { PreBol16, PreReg14 } from "../basics/custom-texts/custom-texts"
import { BODY } from "#theme"
import { Row } from "../basics/row/row"
import { BlueCheckbox } from "../blue-checkbox/blue-checkbox"
import { HandleType, Pet, Sex } from "#models"

interface PetWithSize extends Pet {
  size: HandleType
}

type PetData = Pick<PetWithSize, "id" | "name" | "species" | "age" | "sex" | "size">

interface SelectPetItemProps {
  petData: PetData

  // TODO : 아래에 있는 type들 수정하기
  style: any
  onPress: any
  index: any
  selectedPets: any
  setSelectedPets: any
}

export const SelectPetItem = (props: SelectPetItemProps) => {
  const { petData, style, onPress, index, selectedPets, setSelectedPets } = props
  const { id, name, size, species, age, sex } = petData

  const [isOn, setIsOn] = useState(false)
  const toggle = () => {
    isOn ? setIsOn(false) : setIsOn(true)
  }

  // console.log("id")
  // console.log(selectedPets.includes(id))

  const selectedPetsIds = selectedPets.map((pertInfo) => pertInfo.id)
  const isSelected = selectedPetsIds.includes(id)

  const addPet = (petData) => {
    //! forEach 는 retrun 값을 못 내보낸다. 항상 undefined 임 주의할 것! (map 과의 가장 큰 차이!) https://dream-frontend.tistory.com/341
    //! 이때문에, map 을 사용하였다
    //? 이전 값들(pet 객체) 중에서, id 값이 이미 존재하면, true 를 리턴한다.
    const didAlreadyHave = selectedPets.map((ele) => ele.id === petData.id).includes(true)

    //? 이미 있으면 아무것도 안하고(null), 없으면 state 를 추가한다(setSelectedPets)
    didAlreadyHave ? null : setSelectedPets((prevState) => [...prevState, petData])
  }

  useLayoutEffect(() => {
    isSelected ? setIsOn(true) : setIsOn(false)
  }, [])

  const handle = () => {
    // ? 선택이 되어있는 상태에서 누른다 = 선택취소
    if (isSelected) {
      setIsOn(false)
      setSelectedPets((pets) => pets.filter((pet) => pet.id !== id))
    }
    //  ? 선택이 안 되어 있는 상태에서 누른다 = 선택하겠다 = addPet
    else {
      addPet(petData)
      setIsOn(true)
    }
  }

  let sexText = ""
  if (sex === Sex.MALE) {
    sexText = "남"
  } else if (sex === Sex.FEMALE) {
    sexText = "여"
  }

  return (
    <Row style={[styles.root, style]}>
      {/* //? 이름 */}
      <View style={styles.nameContainer}>
        <PreBol16 text={name} style={{ textAlign: "center" }} />
      </View>

      {/* //? 사이즈 */}
      <View style={styles.sizeContainer}>
        <PreReg14 text={size} color={BODY} style={{ textAlign: "center" }} />
      </View>

      {/* //? 종 */}
      <View style={styles.speciesContainer}>
        <PreReg14
          text={species.name}
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
        <PreReg14 text={sexText} color={BODY} style={{ textAlign: "center" }} />
      </View>

      {/* //? 추가/삭제 체크박스 버튼 */}
      <View style={styles.checkboxContainer}>
        <BlueCheckbox onPress={handle} value={isOn} />
      </View>
    </Row>
  )
}
