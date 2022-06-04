import { View, Text, Pressable, Image } from "react-native"
import React, { useState } from "react"
import { styles } from "./styles"
import { PreBol16, PreReg12, PreReg14 } from "../custom-texts/custom-texts"
import { BODY, DBG, HEAD_LINE, LBG, SUB_HEAD_LINE } from "../../theme/palette"
import IMAGES from "../../../assets/common-images"
import { DivisionLine } from "../division-line"
import { HEIGHT, WIDTH } from "../../theme"
import { Row } from "../boxes/basics/row"
import { BlueCheckbox } from "../blue-checkbox/blue-checkbox"

export const SelectPetItem = (props) => {
  const { petData, style, onPress, index } = props
  const { name, size, species, age, sex } = petData

  const [isOn, setIsOn] = useState(false)
  const toggle = () => {
    isOn ? setIsOn(false) : setIsOn(true)
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
          <BlueCheckbox onToggle={toggle} value={isOn} />
        </View>
        {/*//? 삭제 버튼 */}
      </Row>

      {/*//?  카드 하단, 구분선 */}
      {/* <DivisionLine color={LBG} /> */}
    </View>
  )
}
