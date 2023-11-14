import { View, TouchableOpacity, Image, ViewStyle, StyleProp, FlatList } from "react-native"
import React from "react"
import { styles } from "./styles"
import { PreBol16, PreReg14 } from "../basics/custom-texts/custom-texts"
import { BODY, DBG, SUB_HEAD_LINE } from "#theme"
import { images } from "#images"
import { Row } from "../basics/row/row"
import { Pet, PetSex } from "#models"
import { HandleType } from "../../services/axios/types/creches.visitings.common.types"

interface PetProfileCardProps {
  /**
   * 추가적인 padding, margin 을 줌으로써, 위치를 조정할 수 있습니다.
   */
  style?: StyleProp<ViewStyle>

  /**
   * 펫 데이터
   * TODO: Pet 타입으로 변경
   */
  petData: Pet
  index?: number
  onPress: () => void
  onDeletePress?: () => void
  /**
   * 삭제 행위 가능 여부
   */
  isDeletable?: boolean
}

export const PetProfileCard = (props: PetProfileCardProps) => {
  const { petData, style, index, onPress, isDeletable = true, onDeletePress } = props
  const { name, petType, species, age, sex } = petData
  const petImageUri = petData.images ? petData.images[0] : null

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
    <View style={[styles.root, style]}>
      {/*//? 이름, 사이즈, 종, 나이, 성별 */}
      <TouchableOpacity style={styles.infoContainerWrapper} onPress={onPress}>
        <Image
          style={styles.image}
          source={petImageUri ? { uri: petImageUri } : images.default_pet_image_60}
        />
        <View style={styles.infoContainer}>
          {/*//? 펫 이름 */}
          <PreBol16 text={`${name}`} color={SUB_HEAD_LINE} />

          {/*//? 타입 | 품종 | 나이 | 성별 */}
          <Row style={{ marginTop: 8 }}>
            <PreReg14 text={_petType} color={BODY} />
            <PreReg14 text={"|"} color={DBG} style={{ marginLeft: 8 }} />
            <PreReg14
              text={
                species?.name.length <= 6
                  ? `${species?.name}`
                  : `${species?.name.substring(0, 5)}..`
              } //? 총 글자가 6글자 이내면 그대로 표기, 7글자 부터는 5글자까지만 표기하고 점 두개. ex) 브리티시쇼트헤어 -> 브리티시쇼..
              color={BODY}
              style={{ marginLeft: 8 }}
            />
            <PreReg14 text={"|"} color={DBG} style={{ marginLeft: 8 }} />
            <PreReg14 text={`${age}세`} color={BODY} style={{ marginLeft: 8 }} />
            <PreReg14 text={"|"} color={DBG} style={{ marginLeft: 8 }} />
            <PreReg14 text={_sex} color={BODY} style={{ marginLeft: 8 }} />
          </Row>
        </View>
      </TouchableOpacity>

      {/* //? 삭제 버튼 */}
      {isDeletable && (
        <TouchableOpacity
          onPress={onDeletePress}
          disabled={!isDeletable}
          style={styles.deleteButtonContainer}
        >
          <Image style={styles.deleteButton} source={images.x_grey} />
        </TouchableOpacity>
      )}

      {/* //?  카드 하단, 구분선
      <DivisionLine color={LBG} /> */}
    </View>
  )
}
