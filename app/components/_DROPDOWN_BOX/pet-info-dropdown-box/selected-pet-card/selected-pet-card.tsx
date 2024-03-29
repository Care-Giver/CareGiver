import React from "react"
import { View, Pressable, Image, StyleProp, ViewStyle, TouchableOpacity } from "react-native"
import { styles } from "./styles"
import { PreBol16, PreReg14 } from "../../../_BASIC/custom-texts/custom-texts"
import { BODY, DBG, LBG, SUB_HEAD_LINE } from "#theme"
import { images } from "#images"
import { DivisionLine } from "../../../_BASIC/division-line/division-line"
import { Row } from "../../../_BASIC/row/row"
import { Pet, PetSex } from "#api"
import { HandleType } from "../../../../services/api/types/creches.visitings.common.types"
import { profileImageUriHandler } from "../../../../utils/image-format-validate"

interface SelectedPetCardProps {
  style?: StyleProp<ViewStyle>
  petData: Pet
  onPress?: () => void
  index?: any
  deletable?: boolean
  onDeletePress?: () => void
  hasDivision?: boolean
}

export const SelectedPetCard = (props: SelectedPetCardProps) => {
  const {
    petData,
    style,
    onPress,
    index,
    deletable = true,
    hasDivision = true,
    onDeletePress,
  } = props
  const { id, name, petType, species, age, sex } = petData

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
    // UT 테스트
    default:
      _petType = petType
      break
  }

  let _sex = ""
  if (sex === PetSex.MALE) {
    _sex = "남"
  } else {
    _sex = "여"
  }

  return (
    <View style={[styles.root, style]}>
      {/*//? 이름, 사이즈, 종, 나이, 성별 */}
      <TouchableOpacity style={styles.infoBox} onPress={onPress} disabled={!onPress}>
        <Image
          style={styles.image}
          source={profileImageUriHandler(
            images.default_pet_image_60,
            "medium",
            petData?.images.length > 0 ? petData?.images[0] : null,
          )}
        />
        <View style={styles.infoContainer}>
          {/*//? 펫 이름 */}
          <PreBol16 text={`${name}`} color={SUB_HEAD_LINE} />

          {/*//? 타입 | 품종 | 나이 | 성별 */}
          <Row style={{ marginTop: 8 }}>
            <PreReg14 text={_petType} color={BODY} />
            <PreReg14 text={"|"} color={DBG} style={{ marginLeft: 8 }} />
            <PreReg14
              text={species?.name}
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
          <Pressable onPress={onDeletePress} style={styles.deleteButtonContainer}>
            <Image style={styles.deleteButton} source={images.x_grey} />
          </Pressable>
        )}
      </TouchableOpacity>

      {/*//?  카드 하단, 구분선 */}
      {hasDivision && <DivisionLine color={LBG} />}
    </View>
  )
}
