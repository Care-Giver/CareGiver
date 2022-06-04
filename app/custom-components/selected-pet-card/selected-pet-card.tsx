import { View, Text, Pressable, Image } from "react-native"
import React from "react"
import { styles } from "./styles"
import { PreBol16, PreReg12, PreReg14 } from "../custom-texts/custom-texts"
import { BODY, DBG, HEAD_LINE, LBG, SUB_HEAD_LINE } from "../../theme/palette"
import IMAGES from "../../../assets/common-images"
import { DivisionLine } from "../division-line"
import { HEIGHT, WIDTH } from "../../theme"
import { Row } from "../boxes/basics/row"

export const SelectedPetCard = (props) => {
  const { petData, style, onPress, index } = props
  const { name, size, species, age, sex } = petData

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
        <Image style={styles.image} source={IMAGES.default_pet_image_60} />
        <View style={styles.infoContainer}>
          {/*//? 펫 이름 */}
          <PreBol16 text={`${name}`} color={SUB_HEAD_LINE} />

          {/*//? 타입 | 품종 | 나이 | 성별 */}
          <Row style={{ marginTop: HEIGHT * 8 }}>
            <PreReg14 text={size} color={BODY} />
            <PreReg14 text={"|"} color={DBG} style={{ marginLeft: WIDTH * 8 }} />
            <PreReg14
              text={species.length <= 6 ? `${species}` : `${species.substring(0, 6)}..`}
              color={BODY}
              style={{ marginLeft: WIDTH * 8 }}
            />
            <PreReg14 text={"|"} color={DBG} style={{ marginLeft: WIDTH * 8 }} />
            <PreReg14 text={`${age}세`} color={BODY} style={{ marginLeft: WIDTH * 8 }} />
            <PreReg14 text={"|"} color={DBG} style={{ marginLeft: WIDTH * 8 }} />
            <PreReg14 text={_sex} color={BODY} style={{ marginLeft: WIDTH * 8 }} />
          </Row>
        </View>

        {/*//? 삭제 버튼 */}
        <Pressable onPress={onPress} style={styles.deleteButtonContainer}>
          <Image style={styles.deleteButton} source={IMAGES.x_grey} />
        </Pressable>
      </Row>

      {/*//?  카드 하단, 구분선 */}
      <DivisionLine color={LBG} />
    </View>
  )
}
