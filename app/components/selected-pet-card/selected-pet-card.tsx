import React from "react"
import { View, Pressable, Image, StyleProp, ViewStyle } from "react-native"
import { styles } from "./styles"
import { PreBol16, PreReg14 } from "../basics/custom-texts/custom-texts"
import { BODY, DBG, LBG, SUB_HEAD_LINE } from "#theme"
import { images } from "#images"
import { DivisionLine } from "../division-line/division-line"
import { Row } from "../basics/row/row"
import { Pet, PetSex } from "#models"

interface SelectedPetCardProps {
  style?: StyleProp<ViewStyle>
  petData: Pet
  onPress: () => void
  index?: any
  deletable?: boolean
}

export const SelectedPetCard = (props: SelectedPetCardProps) => {
  const { petData, style, onPress, index, deletable = true } = props
  const { id, name, petType, species, age, sex } = petData

  let _sex = ""
  if (sex === PetSex.MALE) {
    _sex = "남"
  } else {
    _sex = "여"
  }

  return (
    <View style={[styles.root, style]}>
      {/*//? 이름, 사이즈, 종, 나이, 성별 */}
      <Row>
        <Image style={styles.image} source={images.default_pet_image_60} />
        <View style={styles.infoContainer}>
          {/*//? 펫 이름 */}
          <PreBol16 text={`${name}`} color={SUB_HEAD_LINE} />

          {/*//? 타입 | 품종 | 나이 | 성별 */}
          <Row style={{ marginTop: 8 }}>
            <PreReg14 text={petType} color={BODY} />
            <PreReg14 text={"|"} color={DBG} style={{ marginLeft: 8 }} />
            <PreReg14
              // text={species.name}
              color={BODY}
              style={{ marginLeft: 8 }}
              //@ts-ignore
              numberOfLines={1}
            />
            <PreReg14 text={"|"} color={DBG} style={{ marginLeft: 8 }} />
            <PreReg14 text={`${age}세`} color={BODY} style={{ marginLeft: 8 }} />
            <PreReg14 text={"|"} color={DBG} style={{ marginLeft: 8 }} />
            <PreReg14 text={_sex} color={BODY} style={{ marginLeft: 8 }} />
          </Row>
        </View>

        {/*//? 삭제 버튼 */}
        {deletable && (
          <Pressable onPress={onPress} style={styles.deleteButtonContainer}>
            <Image style={styles.deleteButton} source={images.x_grey} />
          </Pressable>
        )}
      </Row>

      {/*//?  카드 하단, 구분선 */}
      <DivisionLine color={LBG} />
    </View>
  )
}
