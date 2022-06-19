import { View, Text, Pressable, Image } from "react-native"
import React, { useState, useLayoutEffect } from "react"
import { styles } from "./styles"
import { PreBol16, PreReg12, PreReg14 } from "../custom-texts/custom-texts"
import { BODY, DBG, HEAD_LINE, LBG, SUB_HEAD_LINE } from "../../theme/palette"
import IMAGES from "../../../assets/common-images"
import { DivisionLine } from "../division-line"
import { HEIGHT, WIDTH } from "../../theme"
import { Row } from "../boxes/basics/row"
import { BlueCheckbox } from "../blue-checkbox/blue-checkbox"

export const SelectPetItem = (props) => {
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
    // if (selectedPetsIds.includes(id)) {
    //   setIsOn(true)
    // } else {
    //   setIsOn(false)
    // }
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

  let _sex = ""
  if (sex === "male") {
    _sex = "남"
  } else {
    _sex = "여"
  }

  return (
    <View style={[styles.root, style]}>
      {/*//? 이름, 사이즈, 종, 나이, 성별 */}
      <Row>
        <View style={styles.nameContainer}>
          <PreBol16 text={name} style={{ textAlign: "center" }} />
        </View>

        <View style={styles.sizeContainer}>
          <PreReg14 text={size} color={BODY} style={{ textAlign: "center" }} />
        </View>

        <View style={styles.speciesContainer}>
          <PreReg14 text={species} color={BODY} style={{ textAlign: "center" }} />
        </View>

        <View style={styles.ageContainer}>
          <PreReg14 text={`${age}세`} color={BODY} style={{ textAlign: "center" }} />
        </View>

        <View style={styles.sexContainer}>
          <PreReg14 text={sex} color={BODY} style={{ textAlign: "center" }} />
        </View>

        <View style={styles.checkboxContainer}>
          <BlueCheckbox onPress={handle} value={isOn} />
        </View>
        {/*//? 삭제 버튼 */}
      </Row>

      {/*//?  카드 하단, 구분선 */}
      {/* <DivisionLine color={LBG} /> */}
    </View>
  )
}
