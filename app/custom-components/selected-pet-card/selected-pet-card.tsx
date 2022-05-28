import { View, Text, Pressable, Image } from "react-native"
import React from "react"
import { styles } from "./styles"
import { PreBol16, PreReg12, PreReg14 } from "../custom-texts/custom-texts"
import { BODY, HEAD_LINE, LBG, SUB_HEAD_LINE } from "../../theme/palette"
import IMAGES from "../../../assets/common-images"
import { DivisionLine } from "../division-line"
import { WIDTH } from "../../theme"

export const SelectedPetCard = (props) => {
  const { name, size, species, age, sex, style, onPress, index } = props

  return (
    <View style={[styles.root, style]}>
      {/*//? 이름, 사이즈, 종, 나이, 성별 */}
      <View style={{ flexDirection: "row" }}>
        <View style={styles.infoContainer}>
          <PreBol16 text={"초코"} color={SUB_HEAD_LINE} />
          <PreReg14 text={"중형견 | 푸들 | 3세 | 여"} color={BODY} />
        </View>

        {/*//? 삭제 버튼 */}
        <Pressable onPress={onPress} style={styles.imageContainer}>
          <Image style={styles.image} source={IMAGES.x_grey} />
        </Pressable>
      </View>

      {/*//?  카드 하단, 구분선 */}
      <DivisionLine color={LBG} />
    </View>
  )
}
