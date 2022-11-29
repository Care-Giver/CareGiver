import { View, Text, Pressable, Image } from "react-native"
import React from "react"
import { styles } from "./styles"
import { PreBol16, PreReg12, PreReg14 } from "../basics/custom-texts/custom-texts"
import { BODY, DBG, HEAD_LINE, LBG, SUB_HEAD_LINE } from "#theme"
import { images } from "#images"
import { HEIGHT, WIDTH } from "#theme"
import { Row } from "../basics/row/row"

export const PetProfileCard = (props) => {
  const { petData, style, index, deletable = false } = props
  const { name, petType, species, age, sex } = petData

  let _sex = ""
  if (sex === "male") {
    _sex = "남"
  } else {
    _sex = "여"
  }

  const onPress = () => {
    alert("선택된 펫 삭제")
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
          <Row style={{ marginTop: HEIGHT * 8 }}>
            <PreReg14 text={petType} color={BODY} />
            <PreReg14 text={"|"} color={DBG} style={{ marginLeft: WIDTH * 8 }} />
            <PreReg14
              text={species.length <= 6 ? `${species}` : `${species.substring(0, 5)}..`} //? 총 글자가 6글자 이내면 그대로 표기, 7글자 부터는 5글자까지만 표기하고 점 두개. ex) 브리티시쇼트헤어 -> 브리티시쇼..
              color={BODY}
              style={{ marginLeft: WIDTH * 8 }}
            />
            <PreReg14 text={"|"} color={DBG} style={{ marginLeft: WIDTH * 8 }} />
            <PreReg14 text={`${age}세`} color={BODY} style={{ marginLeft: WIDTH * 8 }} />
            <PreReg14 text={"|"} color={DBG} style={{ marginLeft: WIDTH * 8 }} />
            <PreReg14 text={_sex} color={BODY} style={{ marginLeft: WIDTH * 8 }} />
          </Row>
        </View>

        {/* //? 삭제 버튼 */}
        {deletable && (
          <Pressable onPress={onPress} style={styles.deleteButtonContainer}>
            <Image style={styles.deleteButton} source={images.x_grey} />
          </Pressable>
        )}
      </Row>

      {/* //?  카드 하단, 구분선
      <DivisionLine color={LBG} /> */}
    </View>
  )
}
